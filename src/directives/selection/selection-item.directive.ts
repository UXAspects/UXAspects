import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { FocusIndicator, FocusIndicatorService, ManagedFocusContainerService } from '../accessibility/index';
import { SelectionService } from './selection.service';

@Directive({
    selector: '[uxSelectionItem]',
    exportAs: 'ux-selection-item'
})
export class SelectionItemDirective<T> implements OnInit, OnDestroy {

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

    /** Defines whether or not this item is currently selected. */
    @Output() selectedChange = new EventEmitter<boolean>();

    @HostBinding('class.ux-selection-focused') active: boolean = false;

    @HostBinding('attr.tabindex')
    get attrTabIndex(): number {
        return (this.tabindex !== null) ? this.tabindex : this._managedTabIndex;
    }

    private _selected: boolean = false;
    private _managedTabIndex: number = -1;
    private _onDestroy = new Subject<void>();
    private _focusIndicator: FocusIndicator;

    constructor(
        private _selectionService: SelectionService<T>,
        private _elementRef: ElementRef,
        focusIndicatorService: FocusIndicatorService,
        private _managedFocusContainerService: ManagedFocusContainerService
    ) {
        this._focusIndicator = focusIndicatorService.monitor(_elementRef.nativeElement);
    }

    ngOnInit(): void {

        // if there is no associated data then throw an error
        if (!this.uxSelectionItem) {
            throw new Error('The uxSelectionItem directive must have data associated with it.');
        }

        // subscribe to selection changes on this item
        this._selectionService.getSelectionState(this.uxSelectionItem).pipe(takeUntil(this._onDestroy)).subscribe(selected => {

            // store the selected state
            this._selected = selected;

            // emit the selected state
            this.selectedChange.emit(selected);
        });

        this._selected = this._selectionService.isSelected(this.uxSelectionItem);

        this.selectedChange.emit(this._selected);

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
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
        this._focusIndicator.destroy();
        this._managedFocusContainerService.unregister(this._elementRef.nativeElement, this);
    }

    @HostListener('click', ['$event'])
    click(event: MouseEvent): void {
        if (this._selectionService.isEnabled && this._selectionService.isClickEnabled) {
            this._selectionService.strategy.click(event, this.uxSelectionItem);
        }
    }

    @HostListener('mousedown', ['$event'])
    mousedown(event: MouseEvent): void {
        if (this._selectionService.isEnabled && this._selectionService.isClickEnabled) {
            this._selectionService.strategy.mousedown(event, this.uxSelectionItem);
        }
    }

    @HostListener('keydown', ['$event'])
    keydown(event: KeyboardEvent): void {
        if (this._selectionService.isEnabled && this._selectionService.isKeyboardEnabled) {
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
        if (this._selectionService.isEnabled) {
            this._selectionService.strategy.select(this.uxSelectionItem);
        }
    }

    /**
     * Deselect this item using the current strategy
     */
    deselect(): void {
        if (this._selectionService.isEnabled) {
            this._selectionService.strategy.deselect(this.uxSelectionItem);
        }
    }
}
