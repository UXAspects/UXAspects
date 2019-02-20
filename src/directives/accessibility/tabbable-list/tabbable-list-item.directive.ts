import { FocusableOption } from '@angular/cdk/a11y';
import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { tick } from '../../../common/index';
import { FocusIndicator } from '../focus-indicator/focus-indicator';
import { FocusIndicatorService } from '../focus-indicator/focus-indicator.service';
import { TabbableListService } from './tabbable-list.service';
import { ManagedFocusContainer, ManagedFocusContainerService } from '../managed-focus-container/managed-focus-container.service';

let nextId = 0;
let uniqueKey = 0;

@Directive({
    selector: '[uxTabbableListItem]',
    exportAs: 'ux-tabbable-list-item'
})
export class TabbableListItemDirective implements FocusableOption, OnDestroy {

    /** Indicate the parent tabbable list item if one is present. */
    @Input() parent: TabbableListItemDirective;

    @Input() rank: number = 0;

    @Input() disabled: boolean = false;

    /** Indicate if the item is expanded if used as a hierarchical item. */
    @Input() expanded: boolean = false;

    /** Provide a unique key to help identify items when used in a virtual list */
    @Input() key: any = `tabbable-list-key-${uniqueKey++}`;

    /** Emit when the expanded state changes. */
    @Output() expandedChange = new EventEmitter<boolean>();

    @HostBinding() tabindex: number = -1;

    id: number = nextId++;

    initialized: boolean = false;

    children: TabbableListItemDirective[] = [];

    keyboardExpanded$ = new Subject<boolean>();

    private _container: ManagedFocusContainer;
    private _onDestroy = new Subject<void>();

    /** Store a reference to the focus indicator instance */
    private _focusIndicator: FocusIndicator;

    constructor(
        private _tabbableList: TabbableListService,
        private _elementRef: ElementRef,
        focusIndicatorService: FocusIndicatorService,
        managedFocusContainerService: ManagedFocusContainerService
    ) {

        // create the focus indicator
        this._focusIndicator = focusIndicatorService.monitor(_elementRef.nativeElement);

        this.keyboardExpanded$.pipe(tick(), takeUntil(this._onDestroy)).subscribe(expanded => {

            // Emit event which may alter the DOM
            this.expandedChange.emit(expanded);

            // Activate the appropriate item
            if (expanded) {
                if (this.children.length > 0) {
                    this._tabbableList.activate(this.children[0]);
                }
            } else {
                this._tabbableList.activate(this);
            }
        });

        this._container = managedFocusContainerService.createContainer(_elementRef.nativeElement);
    }

    onInit(): void {
        this.initialized = true;

        this._tabbableList.focusKeyManager.change
            .pipe(takeUntil(this._onDestroy), map(() => this._tabbableList.isItemActive(this)))
            .subscribe(active => this.tabindex = active ? 0 : -1);

        this._container.register();
    }

    ngOnDestroy(): void {

        // check if this is the currently focused item - if so we need to make another item tabbable
        if (this.tabindex === 0) {
            this._tabbableList.setFirstItemTabbable();
        }

        this._onDestroy.next();
        this._onDestroy.complete();

        this._focusIndicator.destroy();

        if (this._container) {
            this._container.unregister();
        }
    }

    @HostListener('focus')
    focus(): void {

        // apply focus to the element
        (this._elementRef.nativeElement as HTMLElement).focus({ preventScroll: !this._tabbableList.shouldScrollInView });

        // ensure the focus key manager updates the active item correctly
        this._tabbableList.activate(this);
    }

    @HostListener('keydown', ['$event'])
    onKeydown(event: KeyboardEvent): void {
        this._tabbableList.onKeydown(this, event);
    }

    getFocused(): boolean {
        return this._elementRef.nativeElement === document.activeElement;
    }
}