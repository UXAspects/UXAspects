import { FocusableOption, FocusMonitor } from '@angular/cdk/a11y';
import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { tick } from '../../../common/index';
import { TabbableListService } from './tabbable-list.service';

let nextId = 0;
let uniqueKey = 0;

@Directive({
    selector: '[uxTabbableListItem]',
    exportAs: 'ux-tabbable-list-item'
})
export class TabbableListItemDirective implements FocusableOption, OnDestroy {

    @Input() parent: TabbableListItemDirective;

    @Input() rank: number = 0;

    @Input() disabled: boolean = false;

    @Input() expanded: boolean = false;

    /** Provide a unique key to help identify items when used in a virtual list */
    @Input() key: any = `tabbable-list-key-${uniqueKey++}`;

    @Output() expandedChange = new EventEmitter<boolean>();

    @HostBinding() tabindex: number = -1;

    id: number = nextId++;

    initialized: boolean = false;

    children: TabbableListItemDirective[] = [];

    keyboardExpanded$ = new Subject<boolean>();

    private _onDestroy = new Subject<void>();

    constructor(private _tabbableList: TabbableListService, private _elementRef: ElementRef, focusMonitor: FocusMonitor) {

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

        // add classes to indicate the origin of the focus event
        focusMonitor.monitor(_elementRef.nativeElement, false).pipe(takeUntil(this._onDestroy)).subscribe();
    }

    onInit(): void {
        this.initialized = true;

        this._tabbableList.focusKeyManager.change
            .pipe(takeUntil(this._onDestroy), map(() => this._tabbableList.isItemActive(this)))
            .subscribe(active => this.tabindex = active ? 0 : -1);
    }

    ngOnDestroy(): void {

        // check if this is the currently focused item - if so we need to make another item tabbable
        if (this.tabindex === 0) {
            this._tabbableList.setFirstItemTabbable();
        }

        this._onDestroy.next();
        this._onDestroy.complete();
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