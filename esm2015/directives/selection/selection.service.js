/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { RowAltSelectionStrategy } from './strategies/row-alt-selection.strategy';
import { RowSelectionStrategy } from './strategies/row-selection.strategy';
import { SelectionStrategy } from './strategies/selection.strategy';
import { SimpleSelectionStrategy } from './strategies/simple-selection.strategy';
export class SelectionService {
    constructor() {
        this.strategy = new SimpleSelectionStrategy(this);
        this.isEnabled = true;
        this.isClickEnabled = true;
        this.isKeyboardEnabled = true;
        this.focus$ = new BehaviorSubject(null);
        this.active$ = new BehaviorSubject(null);
        this.selection$ = new BehaviorSubject([]);
        this._dataset = [];
        this._selection = new Set();
        this._strategyToDestroy = this.strategy;
    }
    /**
     * @param {?} dataset
     * @return {?}
     */
    set dataset(dataset) {
        this._dataset = dataset;
        if (this._dataset.indexOf(this._active) === -1) {
            this.setFirstItemFocusable();
        }
    }
    /**
     * @return {?}
     */
    get dataset() {
        return this._dataset;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._strategyToDestroy) {
            this._strategyToDestroy.destroy();
        }
    }
    /**
     * If the item is not currently selected then add it
     * to the list of selected items
     * @param {...?} selections
     * @return {?}
     */
    select(...selections) {
        // add each selection to the set
        selections.forEach(selection => this._selection.add(selection));
        // propagate the changes
        this.selectionHasMutated();
    }
    /**
     * Remove an item from the list of selected items
     * @param {...?} selections
     * @return {?}
     */
    deselect(...selections) {
        // remove each item from the set
        selections.forEach(selection => this._selection.delete(selection));
        // propagate the changes
        this.selectionHasMutated();
    }
    /**
     * Remove all items from the list of selected items
     * @return {?}
     */
    deselectAll() {
        // remove all items in the array
        this.deselect(...this._dataset);
        // clear the set in case any items have been removed from the DOM but are still selected
        this._selection.clear();
    }
    /**
     * Toggle the selected state of any specified items
     * @param {...?} selections
     * @return {?}
     */
    toggle(...selections) {
        selections.forEach(selection => this.isSelected(selection) ? this.deselect(selection) : this.select(selection));
    }
    /**
     * Determine whether or not a specific item is currently selected
     * @param {?} data
     * @return {?}
     */
    isSelected(data) {
        return this._selection.has(data);
    }
    /**
     * Return an observable specifically for notifying the subscriber
     * only when the selection state of a specific object has changed
     * @param {?} data
     * @return {?}
     */
    getSelectionState(data) {
        return this.selection$.pipe(map(() => this.isSelected(data)), distinctUntilChanged());
    }
    /**
     * Define how selections should be performed.
     * This allows us to use an strategy pattern to handle the various keyboard
     * and mouse interactions while keeping each mode separated and
     * easily extensible if we want to add more modes in future!
     * @param {?} mode
     * @return {?}
     */
    setStrategy(mode) {
        if (this._strategyToDestroy) {
            // Destroy previous strategy if it was created internally
            this._strategyToDestroy.destroy();
            this._strategyToDestroy = null;
        }
        if (mode instanceof SelectionStrategy) {
            // Custom strategy - pass in the service instance
            this.strategy = mode;
            this.strategy.setSelectionService(this);
        }
        else {
            switch (mode.toLowerCase().trim()) {
                case 'simple':
                    this.strategy = this._strategyToDestroy = new SimpleSelectionStrategy(this);
                    break;
                case 'row':
                    this.strategy = this._strategyToDestroy = new RowSelectionStrategy(this);
                    break;
                case 'row-alt':
                    this.strategy = this._strategyToDestroy = new RowAltSelectionStrategy(this);
                    break;
                default:
                    throw new Error(`The selection mode '${mode}' does not exist. Valid modes are 'simple', 'row', or 'row-alt'.`);
            }
        }
    }
    /**
     * Set the current active item
     * @param {?} data
     * @return {?}
     */
    activate(data) {
        this._active = data;
        this.active$.next(this._active);
    }
    /**
     * Deactive all items
     * @return {?}
     */
    deactivate() {
        this._active = null;
        this.active$.next(this._active);
    }
    /**
     * Return the next or previous sibling of the current active item.
     * @param {?=} previous If true, the previous sibling will be returned.
     * @return {?}
     */
    getSibling(previous = false) {
        // check if there is a current active item
        if (!this._active) {
            return;
        }
        // get the index of the current item
        const /** @type {?} */ idx = this.dataset.indexOf(this._active);
        const /** @type {?} */ target = this.dataset[previous ? idx - 1 : idx + 1];
        return target;
    }
    /**
     * Activate the sibling of the current active item.
     * If previous is set to true the previous sibling will be activated
     * rather than the next sibling. This function will also return the
     * data of the newly activated sibling
     * @param {?=} previous
     * @return {?}
     */
    activateSibling(previous = false) {
        const /** @type {?} */ target = this.getSibling(previous);
        // check if the target exists
        if (target) {
            this.activate(target);
        }
        return target;
    }
    /**
     * @param {?} disabled
     * @return {?}
     */
    setDisabled(disabled) {
        // store the current disabled state
        this.isEnabled = !disabled;
        // clear any stateful data
        this._active = null;
        this.active$.next(this._active);
        this._selection.clear();
        // emit the selection change information
        this.selectionHasMutated();
    }
    /**
     * @return {?}
     */
    selectionHasMutated() {
        this.selection$.next(Array.from(this._selection));
    }
    /**
     * @return {?}
     */
    setFirstItemFocusable() {
        if (this._dataset.length > 0) {
            this.focus$.next(this._dataset[0]);
            this._active = this._dataset[0];
        }
        else {
            this._active = null;
        }
    }
}
SelectionService.decorators = [
    { type: Injectable }
];
function SelectionService_tsickle_Closure_declarations() {
    /** @type {?} */
    SelectionService.prototype.strategy;
    /** @type {?} */
    SelectionService.prototype.isEnabled;
    /** @type {?} */
    SelectionService.prototype.isClickEnabled;
    /** @type {?} */
    SelectionService.prototype.isKeyboardEnabled;
    /** @type {?} */
    SelectionService.prototype.focus$;
    /** @type {?} */
    SelectionService.prototype.active$;
    /** @type {?} */
    SelectionService.prototype.selection$;
    /** @type {?} */
    SelectionService.prototype._active;
    /** @type {?} */
    SelectionService.prototype._dataset;
    /** @type {?} */
    SelectionService.prototype._selection;
    /** @type {?} */
    SelectionService.prototype._strategyToDestroy;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9zZWxlY3Rpb24vc2VsZWN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXZELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNsRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUdqRixNQUFNOzt3QkFhMEIsSUFBSSx1QkFBdUIsQ0FBQyxJQUFJLENBQUM7eUJBQzFDLElBQUk7OEJBQ0MsSUFBSTtpQ0FDRCxJQUFJO3NCQUV4QixJQUFJLGVBQWUsQ0FBTSxJQUFJLENBQUM7dUJBQzdCLElBQUksZUFBZSxDQUFNLElBQUksQ0FBQzswQkFDM0IsSUFBSSxlQUFlLENBQVEsRUFBRSxDQUFDO3dCQUdKLEVBQUU7MEJBQ3BCLElBQUksR0FBRyxFQUFFO2tDQUNrQixJQUFJLENBQUMsUUFBUTs7Ozs7O0lBdkI3RCxJQUFJLE9BQU8sQ0FBQyxPQUEyQjtRQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9DLElBQUks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TUFBTSxDQUFDLENBQUM7U0FDdkI7UUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDO0tBQ2Y7Ozs7O0lBRUQsV0FBVyxDQUFDLFFBQWlCOztRQUUzQixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsUUFBUSxDQUFDOztRQUczQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7UUFHeEIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7S0FDNUI7Ozs7SUFFTyxtQkFBbUI7UUFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFHNUMscUJBQXFCO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNqQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7U0FDckI7Ozs7WUFoTkosVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgUm93QWx0U2VsZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICcuL3N0cmF0ZWdpZXMvcm93LWFsdC1zZWxlY3Rpb24uc3RyYXRlZ3knO1xuaW1wb3J0IHsgUm93U2VsZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICcuL3N0cmF0ZWdpZXMvcm93LXNlbGVjdGlvbi5zdHJhdGVneSc7XG5pbXBvcnQgeyBTZWxlY3Rpb25TdHJhdGVneSB9IGZyb20gJy4vc3RyYXRlZ2llcy9zZWxlY3Rpb24uc3RyYXRlZ3knO1xuaW1wb3J0IHsgU2ltcGxlU2VsZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICcuL3N0cmF0ZWdpZXMvc2ltcGxlLXNlbGVjdGlvbi5zdHJhdGVneSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZWxlY3Rpb25TZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICBzZXQgZGF0YXNldChkYXRhc2V0OiBSZWFkb25seUFycmF5PGFueT4pIHtcbiAgICB0aGlzLl9kYXRhc2V0ID0gZGF0YXNldDtcbiAgICBpZiAodGhpcy5fZGF0YXNldC5pbmRleE9mKHRoaXMuX2FjdGl2ZSkgPT09IC0xKSB7XG4gICAgICB0aGlzLnNldEZpcnN0SXRlbUZvY3VzYWJsZSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBkYXRhc2V0KCk6IFJlYWRvbmx5QXJyYXk8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGFzZXQ7XG4gIH1cblxuICBzdHJhdGVneTogU2VsZWN0aW9uU3RyYXRlZ3kgPSBuZXcgU2ltcGxlU2VsZWN0aW9uU3RyYXRlZ3kodGhpcyk7XG4gIGlzRW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XG4gIGlzQ2xpY2tFbmFibGVkOiBib29sZWFuID0gdHJ1ZTtcbiAgaXNLZXlib2FyZEVuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIGZvY3VzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihudWxsKTtcbiAgYWN0aXZlJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihudWxsKTtcbiAgc2VsZWN0aW9uJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55W10+KFtdKTtcblxuICBwcml2YXRlIF9hY3RpdmU6IGFueTtcbiAgcHJpdmF0ZSBfZGF0YXNldDogUmVhZG9ubHlBcnJheTxhbnk+ID0gW107XG4gIHByaXZhdGUgX3NlbGVjdGlvbiA9IG5ldyBTZXQoKTtcbiAgcHJpdmF0ZSBfc3RyYXRlZ3lUb0Rlc3Ryb3k6IFNlbGVjdGlvblN0cmF0ZWd5ID0gdGhpcy5zdHJhdGVneTtcblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc3RyYXRlZ3lUb0Rlc3Ryb3kpIHtcbiAgICAgIHRoaXMuX3N0cmF0ZWd5VG9EZXN0cm95LmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSWYgdGhlIGl0ZW0gaXMgbm90IGN1cnJlbnRseSBzZWxlY3RlZCB0aGVuIGFkZCBpdFxuICAgKiB0byB0aGUgbGlzdCBvZiBzZWxlY3RlZCBpdGVtc1xuICAgKi9cbiAgc2VsZWN0KC4uLnNlbGVjdGlvbnM6IGFueVtdKTogdm9pZCB7XG5cbiAgICAvLyBhZGQgZWFjaCBzZWxlY3Rpb24gdG8gdGhlIHNldFxuICAgIHNlbGVjdGlvbnMuZm9yRWFjaChzZWxlY3Rpb24gPT4gdGhpcy5fc2VsZWN0aW9uLmFkZChzZWxlY3Rpb24pKTtcblxuICAgIC8vIHByb3BhZ2F0ZSB0aGUgY2hhbmdlc1xuICAgIHRoaXMuc2VsZWN0aW9uSGFzTXV0YXRlZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbiBpdGVtIGZyb20gdGhlIGxpc3Qgb2Ygc2VsZWN0ZWQgaXRlbXNcbiAgICovXG4gIGRlc2VsZWN0KC4uLnNlbGVjdGlvbnM6IGFueVtdKTogdm9pZCB7XG4gICAgLy8gcmVtb3ZlIGVhY2ggaXRlbSBmcm9tIHRoZSBzZXRcbiAgICBzZWxlY3Rpb25zLmZvckVhY2goc2VsZWN0aW9uID0+IHRoaXMuX3NlbGVjdGlvbi5kZWxldGUoc2VsZWN0aW9uKSk7XG5cbiAgICAvLyBwcm9wYWdhdGUgdGhlIGNoYW5nZXNcbiAgICB0aGlzLnNlbGVjdGlvbkhhc011dGF0ZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYWxsIGl0ZW1zIGZyb20gdGhlIGxpc3Qgb2Ygc2VsZWN0ZWQgaXRlbXNcbiAgICovXG4gIGRlc2VsZWN0QWxsKCk6IHZvaWQge1xuICAgIC8vIHJlbW92ZSBhbGwgaXRlbXMgaW4gdGhlIGFycmF5XG4gICAgdGhpcy5kZXNlbGVjdCguLi50aGlzLl9kYXRhc2V0KTtcblxuICAgIC8vIGNsZWFyIHRoZSBzZXQgaW4gY2FzZSBhbnkgaXRlbXMgaGF2ZSBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgRE9NIGJ1dCBhcmUgc3RpbGwgc2VsZWN0ZWRcbiAgICB0aGlzLl9zZWxlY3Rpb24uY2xlYXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGUgdGhlIHNlbGVjdGVkIHN0YXRlIG9mIGFueSBzcGVjaWZpZWQgaXRlbXNcbiAgICovXG4gIHRvZ2dsZSguLi5zZWxlY3Rpb25zOiBhbnlbXSk6IHZvaWQge1xuICAgIHNlbGVjdGlvbnMuZm9yRWFjaChzZWxlY3Rpb24gPT4gdGhpcy5pc1NlbGVjdGVkKHNlbGVjdGlvbikgPyB0aGlzLmRlc2VsZWN0KHNlbGVjdGlvbikgOiB0aGlzLnNlbGVjdChzZWxlY3Rpb24pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgd2hldGhlciBvciBub3QgYSBzcGVjaWZpYyBpdGVtIGlzIGN1cnJlbnRseSBzZWxlY3RlZFxuICAgKi9cbiAgaXNTZWxlY3RlZChkYXRhOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uLmhhcyhkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYW4gb2JzZXJ2YWJsZSBzcGVjaWZpY2FsbHkgZm9yIG5vdGlmeWluZyB0aGUgc3Vic2NyaWJlclxuICAgKiBvbmx5IHdoZW4gdGhlIHNlbGVjdGlvbiBzdGF0ZSBvZiBhIHNwZWNpZmljIG9iamVjdCBoYXMgY2hhbmdlZFxuICAgKi9cbiAgZ2V0U2VsZWN0aW9uU3RhdGUoZGF0YTogYW55KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uJC5waXBlKG1hcCgoKSA9PiB0aGlzLmlzU2VsZWN0ZWQoZGF0YSkpLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmUgaG93IHNlbGVjdGlvbnMgc2hvdWxkIGJlIHBlcmZvcm1lZC5cbiAgICogVGhpcyBhbGxvd3MgdXMgdG8gdXNlIGFuIHN0cmF0ZWd5IHBhdHRlcm4gdG8gaGFuZGxlIHRoZSB2YXJpb3VzIGtleWJvYXJkXG4gICAqIGFuZCBtb3VzZSBpbnRlcmFjdGlvbnMgd2hpbGUga2VlcGluZyBlYWNoIG1vZGUgc2VwYXJhdGVkIGFuZFxuICAgKiBlYXNpbHkgZXh0ZW5zaWJsZSBpZiB3ZSB3YW50IHRvIGFkZCBtb3JlIG1vZGVzIGluIGZ1dHVyZSFcbiAgICovXG4gIHNldFN0cmF0ZWd5KG1vZGU6IFNlbGVjdGlvbk1vZGUgfCBTZWxlY3Rpb25TdHJhdGVneSk6IHZvaWQge1xuXG4gICAgaWYgKHRoaXMuX3N0cmF0ZWd5VG9EZXN0cm95KSB7XG4gICAgICAvLyBEZXN0cm95IHByZXZpb3VzIHN0cmF0ZWd5IGlmIGl0IHdhcyBjcmVhdGVkIGludGVybmFsbHlcbiAgICAgIHRoaXMuX3N0cmF0ZWd5VG9EZXN0cm95LmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuX3N0cmF0ZWd5VG9EZXN0cm95ID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAobW9kZSBpbnN0YW5jZW9mIFNlbGVjdGlvblN0cmF0ZWd5KSB7XG5cbiAgICAgIC8vIEN1c3RvbSBzdHJhdGVneSAtIHBhc3MgaW4gdGhlIHNlcnZpY2UgaW5zdGFuY2VcbiAgICAgIHRoaXMuc3RyYXRlZ3kgPSBtb2RlO1xuICAgICAgdGhpcy5zdHJhdGVneS5zZXRTZWxlY3Rpb25TZXJ2aWNlKHRoaXMpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgc3dpdGNoIChtb2RlLnRvTG93ZXJDYXNlKCkudHJpbSgpKSB7XG5cbiAgICAgICAgY2FzZSAnc2ltcGxlJzpcbiAgICAgICAgICB0aGlzLnN0cmF0ZWd5ID0gdGhpcy5fc3RyYXRlZ3lUb0Rlc3Ryb3kgPSBuZXcgU2ltcGxlU2VsZWN0aW9uU3RyYXRlZ3kodGhpcyk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAncm93JzpcbiAgICAgICAgICB0aGlzLnN0cmF0ZWd5ID0gdGhpcy5fc3RyYXRlZ3lUb0Rlc3Ryb3kgPSBuZXcgUm93U2VsZWN0aW9uU3RyYXRlZ3kodGhpcyk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAncm93LWFsdCc6XG4gICAgICAgICAgdGhpcy5zdHJhdGVneSA9IHRoaXMuX3N0cmF0ZWd5VG9EZXN0cm95ID0gbmV3IFJvd0FsdFNlbGVjdGlvblN0cmF0ZWd5KHRoaXMpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgc2VsZWN0aW9uIG1vZGUgJyR7bW9kZX0nIGRvZXMgbm90IGV4aXN0LiBWYWxpZCBtb2RlcyBhcmUgJ3NpbXBsZScsICdyb3cnLCBvciAncm93LWFsdCcuYCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgY3VycmVudCBhY3RpdmUgaXRlbVxuICAgKi9cbiAgYWN0aXZhdGUoZGF0YTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fYWN0aXZlID0gZGF0YTtcbiAgICB0aGlzLmFjdGl2ZSQubmV4dCh0aGlzLl9hY3RpdmUpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlYWN0aXZlIGFsbCBpdGVtc1xuICAgKi9cbiAgZGVhY3RpdmF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9hY3RpdmUgPSBudWxsO1xuICAgIHRoaXMuYWN0aXZlJC5uZXh0KHRoaXMuX2FjdGl2ZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBuZXh0IG9yIHByZXZpb3VzIHNpYmxpbmcgb2YgdGhlIGN1cnJlbnQgYWN0aXZlIGl0ZW0uXG4gICAqIEBwYXJhbSBwcmV2aW91cyBJZiB0cnVlLCB0aGUgcHJldmlvdXMgc2libGluZyB3aWxsIGJlIHJldHVybmVkLlxuICAgKi9cbiAgZ2V0U2libGluZyhwcmV2aW91czogYm9vbGVhbiA9IGZhbHNlKTogYW55IHtcblxuICAgIC8vIGNoZWNrIGlmIHRoZXJlIGlzIGEgY3VycmVudCBhY3RpdmUgaXRlbVxuICAgIGlmICghdGhpcy5fYWN0aXZlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gZ2V0IHRoZSBpbmRleCBvZiB0aGUgY3VycmVudCBpdGVtXG4gICAgY29uc3QgaWR4ID0gdGhpcy5kYXRhc2V0LmluZGV4T2YodGhpcy5fYWN0aXZlKTtcbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmRhdGFzZXRbcHJldmlvdXMgPyBpZHggLSAxIDogaWR4ICsgMV07XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIEFjdGl2YXRlIHRoZSBzaWJsaW5nIG9mIHRoZSBjdXJyZW50IGFjdGl2ZSBpdGVtLlxuICAgKiBJZiBwcmV2aW91cyBpcyBzZXQgdG8gdHJ1ZSB0aGUgcHJldmlvdXMgc2libGluZyB3aWxsIGJlIGFjdGl2YXRlZFxuICAgKiByYXRoZXIgdGhhbiB0aGUgbmV4dCBzaWJsaW5nLiBUaGlzIGZ1bmN0aW9uIHdpbGwgYWxzbyByZXR1cm4gdGhlXG4gICAqIGRhdGEgb2YgdGhlIG5ld2x5IGFjdGl2YXRlZCBzaWJsaW5nXG4gICAqL1xuICBhY3RpdmF0ZVNpYmxpbmcocHJldmlvdXM6IGJvb2xlYW4gPSBmYWxzZSk6IGFueSB7XG5cbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldFNpYmxpbmcocHJldmlvdXMpO1xuXG4gICAgLy8gY2hlY2sgaWYgdGhlIHRhcmdldCBleGlzdHNcbiAgICBpZiAodGFyZ2V0KSB7XG4gICAgICB0aGlzLmFjdGl2YXRlKHRhcmdldCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIHNldERpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgLy8gc3RvcmUgdGhlIGN1cnJlbnQgZGlzYWJsZWQgc3RhdGVcbiAgICB0aGlzLmlzRW5hYmxlZCA9ICFkaXNhYmxlZDtcblxuICAgIC8vIGNsZWFyIGFueSBzdGF0ZWZ1bCBkYXRhXG4gICAgdGhpcy5fYWN0aXZlID0gbnVsbDtcbiAgICB0aGlzLmFjdGl2ZSQubmV4dCh0aGlzLl9hY3RpdmUpO1xuICAgIHRoaXMuX3NlbGVjdGlvbi5jbGVhcigpO1xuXG4gICAgLy8gZW1pdCB0aGUgc2VsZWN0aW9uIGNoYW5nZSBpbmZvcm1hdGlvblxuICAgIHRoaXMuc2VsZWN0aW9uSGFzTXV0YXRlZCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZWxlY3Rpb25IYXNNdXRhdGVkKCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0aW9uJC5uZXh0KEFycmF5LmZyb20odGhpcy5fc2VsZWN0aW9uKSk7XG4gIH1cblxuICBwcml2YXRlIHNldEZpcnN0SXRlbUZvY3VzYWJsZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZGF0YXNldC5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmZvY3VzJC5uZXh0KHRoaXMuX2RhdGFzZXRbMF0pO1xuICAgICAgdGhpcy5fYWN0aXZlID0gdGhpcy5fZGF0YXNldFswXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYWN0aXZlID0gbnVsbDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgU2VsZWN0aW9uTW9kZSA9ICdzaW1wbGUnIHwgJ3JvdycgfCAncm93LWFsdCc7Il19