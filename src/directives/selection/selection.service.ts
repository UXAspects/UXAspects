import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { RowAltSelectionStrategy } from './strategies/row-alt-selection.strategy';
import { RowSelectionStrategy } from './strategies/row-selection.strategy';
import { SelectionStrategy } from './strategies/selection.strategy';
import { SimpleSelectionStrategy } from './strategies/simple-selection.strategy';

@Injectable()
export class SelectionService<T> implements OnDestroy {

    /** Store the current set of selectable items and ensure an item can be focused */
    set dataset(dataset: ReadonlyArray<T>) {
        this._dataset = dataset;
        if (this._dataset.indexOf(this._active) === -1) {
            this.setFirstItemFocusable();
        }
    }

    /** Get the current set of selectable items */
    get dataset(): ReadonlyArray<T> {
        return this._dataset;
    }

    /** The active selection strategy that defines how selections can be made */
    strategy: SelectionStrategy<T> = new SimpleSelectionStrategy<T>(this);

    /** Define if selections can be performed on any items */
    isEnabled: boolean = true;

    /** Define if the mouse can be used to perform selections */
    isClickEnabled: boolean = true;

    /** Define if the keyboard can be used to perform selections */
    isKeyboardEnabled: boolean = true;

    /** Define the currently focused item */
    readonly focus$ = new BehaviorSubject<T>(null);

    /** Define the currently active item */
    readonly active$ = new BehaviorSubject<T>(null);

    /** Store the current list of selected items as an array */
    readonly selection$ = new BehaviorSubject<T[]>([]);

    /** Store the active item */
    private _active: T;

    /** Store the current set of selectable items */
    private _dataset: ReadonlyArray<T> = [];

    /** Store the selection strategy that should be destroyed */
    private _strategyToDestroy: SelectionStrategy<T> = this.strategy;

    /** Store the current selection in a set */
    private readonly _selection = new Set<T>();

    /** Store the current disabled items in a set */
    private readonly _disabled = new Set<T>();

    ngOnDestroy(): void {
        // destroy the active strategy
        if (this._strategyToDestroy) {
            this._strategyToDestroy.destroy();
        }

        // complete all observables
        this.focus$.complete();
        this.active$.complete();
        this.selection$.complete();
    }

    /**
     * If the item is not currently selected then add it
     * to the list of selected items
     */
    select(...selections: T[]): void {

        // filter out any disabled items
        selections = selections.filter(item => !this._disabled.has(item));

        // add each selection to the set
        selections.forEach(selection => this._selection.add(selection));

        // propagate the changes
        this.selectionHasMutated();
    }

    /**
     * Deselect all currently selected items and replace with a new selection
     */
    selectOnly(...selection: T[]): void {

        // filter out any disabled items
        selection = selection.filter(item => !this._disabled.has(item));

        // remove all currently selected items
        this._selection.clear();

        // select only the specified item
        selection.forEach(item => this._selection.add(item));

        // emit the changes
        this.selectionHasMutated();
    }

    /**
     * Remove an item from the list of selected items
     */
    deselect(...selections: T[]): void {

        // remove each item from the set
        selections.forEach(selection => this._selection.delete(selection));

        // propagate the changes
        this.selectionHasMutated();
    }

    /**
     * Remove all items from the list of selected items
     */
    deselectAll(): void {
        // remove all items in the array
        this.deselect(...this._dataset);

        // clear the set in case any items have been removed from the DOM but are still selected
        this._selection.clear();
    }

    /**
     * Toggle the selected state of any specified items
     */
    toggle(...selections: T[]): void {
        selections.forEach(selection => this.isSelected(selection) ? this.deselect(selection) : this.select(selection));
    }

    /**
     * Determine whether or not a specific item is currently selected
     */
    isSelected(data: T): boolean {
        return this._selection.has(data);
    }

    /**
     * Return an observable specifically for notifying the subscriber
     * only when the selection state of a specific object has changed
     */
    getSelectionState(data: T): Observable<boolean> {
        return this.selection$.pipe(map(() => this.isSelected(data)), distinctUntilChanged());
    }

    /**
     * Define how selections should be performed.
     * This allows us to use an strategy pattern to handle the various keyboard
     * and mouse interactions while keeping each mode separated and
     * easily extensible if we want to add more modes in future!
     */
    setStrategy(mode: SelectionMode | SelectionStrategy<T>): void {

        if (this._strategyToDestroy) {
            // Destroy previous strategy if it was created internally
            this._strategyToDestroy.destroy();
            this._strategyToDestroy = null;
        }

        if (mode instanceof SelectionStrategy) {

            // Custom strategy - pass in the service instance
            this.strategy = mode;
            this.strategy.setSelectionService(this);

        } else {

            switch (mode.toLowerCase().trim()) {

                case 'simple':
                    this.strategy = this._strategyToDestroy = new SimpleSelectionStrategy<T>(this);
                    break;

                case 'row':
                    this.strategy = this._strategyToDestroy = new RowSelectionStrategy<T>(this);
                    break;

                case 'row-alt':
                    this.strategy = this._strategyToDestroy = new RowAltSelectionStrategy<T>(this);
                    break;

                default:
                    throw new Error(`The selection mode '${mode}' does not exist. Valid modes are 'simple', 'row', or 'row-alt'.`);
            }
        }
    }

    /**
     * Set the current active item
     */
    activate(data: T): void {
        this._active = data;
        this.active$.next(this._active);
    }

    /**
     * Deactive all items
     */
    deactivate(): void {
        this._active = null;
        this.active$.next(this._active);
    }

    /**
     * Return the next or previous sibling of the current active item.
     * @param previous If true, the previous sibling will be returned.
     */
    getSibling(previous: boolean = false): T {

        // check if there is a current active item
        if (!this._active) {
            return;
        }

        // get the index of the current item
        const idx = this.dataset.indexOf(this._active);
        const target = this.dataset[previous ? idx - 1 : idx + 1];

        return target;
    }

    /**
     * Activate the sibling of the current active item.
     * If previous is set to true the previous sibling will be activated
     * rather than the next sibling. This function will also return the
     * data of the newly activated sibling
     */
    activateSibling(previous: boolean = false): T {

        const target = this.getSibling(previous);

        // check if the target exists
        if (target) {
            this.activate(target);
        }

        return target;
    }

    setDisabled(disabled: boolean): void {
        // store the current disabled state
        this.isEnabled = !disabled;

        // clear any stateful data
        this._active = null;
        this.active$.next(this._active);
        this._selection.clear();

        // emit the selection change information
        this.selectionHasMutated();
    }

    /** Store the disabled state of an item */
    setItemDisabled(item: T, isDisabled: boolean): void {

        // update the internal list of disabled items
        if (isDisabled && !this._disabled.has(item)) {
            this._disabled.add(item);
        } else if (!isDisabled) {
            this._disabled.delete(item);
        }
    }

    private selectionHasMutated(): void {
        this.selection$.next(Array.from(this._selection));
    }

    private setFirstItemFocusable(): void {
        if (this._dataset.length > 0) {
            this.focus$.next(this._dataset[0]);
            this._active = this._dataset[0];
        } else {
            this._active = null;
        }
    }
}

export type SelectionMode = 'simple' | 'row' | 'row-alt';
