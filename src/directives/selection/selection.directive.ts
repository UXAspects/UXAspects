import { AfterContentInit, ChangeDetectorRef, ContentChildren, Directive, EventEmitter, HostBinding, Input, OnDestroy, Output, QueryList } from '@angular/core';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SelectionItemDirective } from './selection-item.directive';
import { SelectionMode, SelectionService } from './selection.service';
import { SelectionStrategy } from './strategies/selection.strategy';

@Directive({
    selector: '[uxSelection]',
    exportAs: 'ux-selection',
    providers: [SelectionService]
})
export class SelectionDirective<T> implements AfterContentInit, OnDestroy {

    /** Defines the items that should be selected. */
    @Input() set uxSelection(items: T[]) {
        this._selectionService.selectOnly(...items);
    }

    /** Can be used to enabled/disable selection behavior. */
    @Input() set disabled(disabled: boolean) {
        this._selectionService.setDisabled(disabled);
    }

    /**
     * Defines the selection behavior. Alternatively, custom selection behavior can be defined by defining a
     * class which extends SelectionStrategy, and providing an instance of the custom class to this property.
     * See below for details of the SelectionStrategy class.
     */
    @Input() set mode(mode: SelectionMode | SelectionStrategy<T>) {
        this._selectionService.setStrategy(mode);
    }

    /**
     * Can be used to enable/disable click selection on items. This can be used to manually control the selection of an item,
     * for example, binding the selection state to a checkbox.
     */
    @Input() set clickSelection(isClickEnabled: boolean) {
        this._selectionService.isClickEnabled = isClickEnabled;
    }

    /** Can be used to enable/disable keyboard navigation on items. Use this if you wish to provide custom keyboard controls for selection. */
    @Input() set keyboardSelection(isKeyboardEnabled: boolean) {
        this._selectionService.isKeyboardEnabled = isKeyboardEnabled;
    }

    /** The tabstop of the selection outer element */
    @Input() @HostBinding('attr.tabindex') tabindex: number = null;

    /** This event will be triggered when there is a change to the selected items. It will contain an array of the currently selected items. */
    @Output() uxSelectionChange = new EventEmitter<T[]>();

    /** Access all items within the list */
    @ContentChildren(SelectionItemDirective) items: QueryList<SelectionItemDirective<T>>;

    /** Unsubscribe from all observables on component destroy */
    private _onDestroy = new Subject<void>();

    /** Store the previous selection so we don't emit more than we have to */
    private _lastSelection: ReadonlyArray<T>;

    constructor(private _selectionService: SelectionService<T>, private _cdRef: ChangeDetectorRef) {
        _selectionService.selection$.pipe(takeUntil(this._onDestroy), debounceTime(0)).subscribe(items => {
            if (this.isSelectionChanged(items)) {
                this.uxSelectionChange.emit(items);
            }

            // store the most recent selection
            this._lastSelection = [...items];
        });
    }

    ngAfterContentInit(): void {
        // provide the initial list of selection items
        this.update();

        // if the list changes then inform the service
        this.items.changes.pipe(takeUntil(this._onDestroy)).subscribe(() => this.update());
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /**
     * Update the dataset to reflect the latest selection items
     */
    update(): void {

        this._selectionService.dataset = this.items.map(item => item.uxSelectionItem);

        // Make sure that a tab target has been defined so that the component can be tabbed to.
        if (this._selectionService.focus$.getValue() === null && this._selectionService.dataset.length > 0) {
            this._selectionService.focus$.next(this._selectionService.dataset[0]);
        }

        // The above could trigger a change in the computed tabindex for selection items
        this._cdRef.detectChanges();
    }

    /**
     * Select all the items in the list
     */
    selectAll(): void {
        if (this._selectionService.isEnabled) {
            this._selectionService.strategy.selectAll();
        }
    }

    /**
     * Deselect all currently selected items
     */
    deselectAll(): void {
        if (this._selectionService.isEnabled) {
            this._selectionService.strategy.deselectAll();
        }
    }

    /**
     * Determine if the previous selection is the same as the current selection
     */
    private isSelectionChanged(selection: T[]): boolean {

        // fast, efficient check, if length is different they must have changed
        if (!this._lastSelection && selection || this._lastSelection.length !== selection.length) {
            return true;
        }

        // if both arrays have 0 items then they have not changed
        if (this._lastSelection.length === 0 && selection.length === 0) {
            return false;
        }

        // otherwise do a check on each item
        return !this._lastSelection.every(item => selection.indexOf(item) !== -1);
    }
}
