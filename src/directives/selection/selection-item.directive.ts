import { SPACE } from '@angular/cdk/keycodes';
import { ChangeDetectorRef, Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, map, skip, takeUntil, tap } from 'rxjs/operators';
import { FocusIndicator, FocusIndicatorService, ManagedFocusContainerService } from '../accessibility/index';
import { SelectionService } from './selection.service';

@Directive({
    selector: '[uxSelectionItem]',
    exportAs: 'ux-selection-item'
})
export class SelectionItemDirective<T> implements OnInit, OnChanges, OnDestroy {

    /** Defines the data associated with this item. */
    @Input() uxSelectionItem: T;

    /** Defines whether or not this item is currently selected. */
    @Input()
    @HostBinding('class.ux-selection-selected')
    @HostBinding('attr.aria-selected')
    set selected(selected: boolean) {
        selected ? this.select() : this.deselect();
    }

    get selected(): boolean {
        return this._selected;
    }

    /** Defines the tab index of the row */
    @Input() tabindex: number = null;

    /** Determine whether or not this item can be selected */
    @Input() set uxSelectionDisabled(isDisabled: boolean) {
        // if this item was selected then deselect it
        if (this._selected && isDisabled) {
            this.deselect();
        }

        // inform the selection service of the disabled state
        this._selectionService.setItemDisabled(this.uxSelectionItem, isDisabled);

        // store the current disabled state
        this._isDisabled = isDisabled;
    }

    /** Defines whether or not this item is currently selected. */
    @Output() selectedChange = new EventEmitter<boolean>();

    /** Store whether this item is the focusable item */
    active: boolean = false;

    /** Store the focused state of the element */
    @HostBinding('class.ux-selection-focused') isFocused: boolean = false;

    @HostBinding('attr.tabindex')
    get attrTabIndex(): number {
        return (this.tabindex !== null) ? this.tabindex : this._managedTabIndex;
    }

    /** Store the current selected state */
    private _selected: boolean = false;

    /** Store the disabled state */
    private _isDisabled: boolean = false;

    /** Store the tab indexed if using the managed focus container */
    private _managedTabIndex: number = -1;

    /** Determine if there is a pending state change as we debounce before emitting */
    private _hasPendingStateChange: boolean = false;

    /** Subscription to the selection state observable. */
    private _selectionStateSubscription: Subscription;

    /** Automatically unsubscribe when the component is destroyed */
    private readonly _onDestroy = new Subject<void>();

    /** The the instance of the focus indicator */
    private readonly _focusIndicator: FocusIndicator;

    constructor(
        private readonly _selectionService: SelectionService<T>,
        private readonly _elementRef: ElementRef,
        readonly focusIndicatorService: FocusIndicatorService,
        private readonly _managedFocusContainerService: ManagedFocusContainerService,
        private readonly _changeDetector: ChangeDetectorRef
    ) {
        this._focusIndicator = focusIndicatorService.monitor(_elementRef.nativeElement);
    }

    ngOnInit(): void {

        // if there is no associated data then throw an error
        if (!this.uxSelectionItem) {
            throw new Error('The uxSelectionItem directive must have data associated with it.');
        }

        // subscribe to changes to the active state
        this._selectionService.active$.pipe(takeUntil(this._onDestroy), map(active => active === this.uxSelectionItem)).subscribe(active => {

            // store the focus state
            this.active = active;

            // if it is active then focus the element
            if (active === true) {
                this._selectionService.focus$.next(this.uxSelectionItem);
                this._elementRef.nativeElement.focus();
            }
        });

        // Subscribe to changes to the focus target
        // This is mostly the same as active$, except that it has an initial value of the first item in the collection.
        this._selectionService.focus$.pipe(takeUntil(this._onDestroy)).subscribe(focusTarget => {
            this._managedTabIndex = (focusTarget === this.uxSelectionItem) ? 0 : -1;
        });

        // Watch for focus within the container element and manage tabindex of descendants
        this._managedFocusContainerService.register(this._elementRef.nativeElement, this);

        // Listen for changes to the focus state and apply the appropriate class
       this._focusIndicator.origin$.pipe(map(origin => origin === 'keyboard'), takeUntil(this._onDestroy))
           .subscribe(isFocused => {
               this.isFocused = isFocused;
               this._changeDetector.markForCheck();
           });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.uxSelectionItem) {
            this.updateSelectionItem();
        }
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
        this._focusIndicator.destroy();
        this._managedFocusContainerService.unregister(this._elementRef.nativeElement, this);
    }

    @HostListener('click', ['$event'])
    click(event: MouseEvent): void {
        if (!this._isDisabled && !this._hasPendingStateChange && this._selectionService.isEnabled && this._selectionService.isClickEnabled) {
            this._selectionService.strategy.click(event, this.uxSelectionItem);
        }
    }

    @HostListener('mousedown', ['$event'])
    mousedown(event: MouseEvent): void {
        if (!this._isDisabled && this._selectionService.isEnabled && this._selectionService.isClickEnabled) {
            this._selectionService.strategy.mousedown(event, this.uxSelectionItem);
        }
    }

    @HostListener('keydown', ['$event'])
    keydown(event: KeyboardEvent): void {

        // if the space key (selection key) is pressed and we are disabled then we should block
        // the event from propagating. However if this is a key such as arrow presses then we do
        // still want this to propagate to allow keyboard navigation for accessibility purposes.
        const isDisabled = this._isDisabled && event.keyCode === SPACE;

        if (!isDisabled && this._selectionService.isEnabled && this._selectionService.isKeyboardEnabled) {
            this._selectionService.strategy.keydown(event, this.uxSelectionItem);
        }
    }

    @HostListener('focus')
    focus(): void {
        // If tabbed to from outside the component, activate.
        if (this._selectionService.active$.getValue() !== this.uxSelectionItem) {
            this._selectionService.activate(this.uxSelectionItem);
        }
    }

    /**
     * Select this item using the current strategy
     */
    select(): void {
        if (!this._isDisabled && this._selectionService.isEnabled) {
            this._selectionService.strategy.select(this.uxSelectionItem);
        }
    }

    /**
     * Deselect this item using the current strategy
     */
    deselect(): void {
        if (!this._isDisabled && this._selectionService.isEnabled) {
            this._selectionService.strategy.deselect(this.uxSelectionItem);
        }
    }

    private updateSelectionItem(): void {

        if (this._selectionStateSubscription) {
            this._selectionStateSubscription.unsubscribe();
        }

        // subscribe to selection changes on this item (don't emit the initial value)
        this._selectionStateSubscription = this._selectionService.getSelectionState(this.uxSelectionItem).pipe(
            skip(1),
            tap(() => this._hasPendingStateChange = true),
            debounceTime(0),
            takeUntil(this._onDestroy)
        ).subscribe(selected => {
            this._hasPendingStateChange = false;

            if (this._selected === selected) {
                return;
            }

            // store the selected state
            this._selected = selected;

            // emit the selected state
            this.selectedChange.emit(selected);

            this._changeDetector.markForCheck();
        });

        this._selected = this._selectionService.isSelected(this.uxSelectionItem);
    }
}
