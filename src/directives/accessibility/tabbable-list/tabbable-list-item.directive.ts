import { FocusableOption, FocusOrigin } from '@angular/cdk/a11y';
import { Platform } from '@angular/cdk/platform';
import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { tick } from '../../../common/index';
import { FocusIndicator } from '../focus-indicator/focus-indicator';
import { FocusIndicatorService } from '../focus-indicator/focus-indicator.service';
import { ManagedFocusContainerService } from '../managed-focus-container/managed-focus-container.service';
import { TabbableListService } from './tabbable-list.service';

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

    /** Indicate if this item is disabled */
    @Input() disabled: boolean = false;

    /** Indicate if the item is expanded if used as a hierarchical item. */
    @Input() expanded: boolean = false;

    /** Provide a unique key to help identify items when used in a virtual list */
    @Input() set key(key: any) {

        // store the previous key
        const previousKey = this._key;

        // check if the key has changed eg. via cell reuse
        const didChangeRef = previousKey && key !== previousKey;

        // update the current key
        this._key = key;

        // if this element was the previously tabbable item then update the reference
        if (didChangeRef && this.isTabbable()) {

            // allow the virtual scroll to update
            requestAnimationFrame(() => {
                // this item should no longer be tabbable
                this.tabindex = -1;

                // store the focus origin before we blur
                const origin = this._focusOrigin;

                // blur this item
                this._elementRef.nativeElement.blur();

                // update the reference
                this._tabbableList.itemReferenceChange(previousKey, origin);
            });
        }
    }

    get key(): any {
        return this._key || this._defaultKey;
    }

    /** Emit when the expanded state changes. */
    @Output() expandedChange = new EventEmitter<boolean>();

    @HostBinding() tabindex: number = -1;

    id: number = nextId++;

    initialized: boolean = false;

    children: TabbableListItemDirective[] = [];

    keyboardExpanded$ = new Subject<boolean>();

    private _onDestroy = new Subject<void>();

    /** Store a reference to the focus indicator instance */
    private _focusIndicator: FocusIndicator;

    /** Store the current key - it may change in a ngFor/uxVirtualFor if the cell is reused. */
    private _key: any;

    /** Store a default key to use if one is not provided */
    private _defaultKey: string = `tabbable-list-key-${uniqueKey++}`;

    /** Determine if this element has a focus indicator visible */
    private _focusOrigin: FocusOrigin = null;

    constructor(
        /** Access the tabbable list service */
        private _tabbableList: TabbableListService,
        /** Access the tabbable item element */
        private _elementRef: ElementRef,
        /** Access the service to programmatically control focus indicators */
        focusIndicatorService: FocusIndicatorService,
        /** Access the service responsible for handling focus in child elements */
        private _managedFocusContainerService: ManagedFocusContainerService,
        /** Access the service which can provide us with browser identification */
        private _platform: Platform
    ) {

        // create the focus indicator
        this._focusIndicator = focusIndicatorService.monitor(_elementRef.nativeElement);

        // store the most current focus origin
        this._focusIndicator.origin$.pipe(takeUntil(this._onDestroy))
            .subscribe(origin => this._focusOrigin = origin);

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
    }

    onInit(): void {
        this.initialized = true;

        this._tabbableList.focusKeyManager.change
            .pipe(takeUntil(this._onDestroy), map(() => this._tabbableList.isItemActive(this)))
            .subscribe(active => this.tabindex = active ? 0 : -1);

        // Watch for focus within the container element and manage tabindex of descendants
        this._managedFocusContainerService.register(this._elementRef.nativeElement, this);
    }

    ngOnDestroy(): void {

        // check if this is the currently focused item - if so we need to make another item tabbable
        if (this.tabindex === 0) {
            this._tabbableList.setFirstItemTabbable();
        }

        this._onDestroy.next();
        this._onDestroy.complete();

        this._focusIndicator.destroy();

        this._managedFocusContainerService.unregister(this._elementRef.nativeElement, this);
    }

    focus(): void {

        // apply focus to the element
        this.focusWithOrigin('keyboard', !this._tabbableList.shouldScrollInView);

        // ensure the focus key manager updates the active item correctly
        this._tabbableList.activate(this, true);
    }

    @HostListener('focus')
    @HostListener('click')
    onFocus(): void {
        this._tabbableList.activate(this, true);
    }

    @HostListener('keydown', ['$event'])
    onKeydown(event: KeyboardEvent): void {
        this._tabbableList.onKeydown(this, event);
    }

    getFocused(): boolean {
        return this._elementRef.nativeElement === document.activeElement;
    }

    /** We can programmatically focus an element but may want a different origin than 'programmatic' */
    focusWithOrigin(origin: FocusOrigin, preventScroll: boolean = true): void {

        if (origin) {

            const scrollTop = this._tabbableList.containerRef.scrollTop;

            // focus the item with a given origin
            this._focusIndicator.focus(origin, { preventScroll });

            // IE and Firefox don't support prevent scroll
            if (preventScroll && !this._platform.WEBKIT) {
                this._tabbableList.containerRef.scrollTop = scrollTop;
            }
        }
    }

    private isTabbable(): boolean {
        return this.tabindex === 0;
    }
}