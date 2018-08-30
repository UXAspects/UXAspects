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
var SelectionService = /** @class */ (function () {
    function SelectionService() {
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
    Object.defineProperty(SelectionService.prototype, "dataset", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dataset;
        },
        set: /**
         * @param {?} dataset
         * @return {?}
         */
        function (dataset) {
            this._dataset = dataset;
            this.setFirstItemFocusable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SelectionService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._strategyToDestroy) {
            this._strategyToDestroy.destroy();
        }
    };
    /**
     * If the item is not currently selected then add it
     * to the list of selected items
     */
    /**
     * If the item is not currently selected then add it
     * to the list of selected items
     * @param {...?} selections
     * @return {?}
     */
    SelectionService.prototype.select = /**
     * If the item is not currently selected then add it
     * to the list of selected items
     * @param {...?} selections
     * @return {?}
     */
    function () {
        var _this = this;
        var selections = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            selections[_i] = arguments[_i];
        }
        // add each selection to the set
        selections.forEach(function (selection) { return _this._selection.add(selection); });
        // propagate the changes
        this.selectionHasMutated();
    };
    /**
     * Remove an item from the list of selected items
     */
    /**
     * Remove an item from the list of selected items
     * @param {...?} selections
     * @return {?}
     */
    SelectionService.prototype.deselect = /**
     * Remove an item from the list of selected items
     * @param {...?} selections
     * @return {?}
     */
    function () {
        var _this = this;
        var selections = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            selections[_i] = arguments[_i];
        }
        // remove each item from the set
        selections.forEach(function (selection) { return _this._selection.delete(selection); });
        // propagate the changes
        this.selectionHasMutated();
    };
    /**
     * Toggle the selected state of any specified items
     */
    /**
     * Toggle the selected state of any specified items
     * @param {...?} selections
     * @return {?}
     */
    SelectionService.prototype.toggle = /**
     * Toggle the selected state of any specified items
     * @param {...?} selections
     * @return {?}
     */
    function () {
        var _this = this;
        var selections = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            selections[_i] = arguments[_i];
        }
        selections.forEach(function (selection) { return _this.isSelected(selection) ? _this.deselect(selection) : _this.select(selection); });
    };
    /**
     * Determine whether or not a specific item is currently selected
     */
    /**
     * Determine whether or not a specific item is currently selected
     * @param {?} data
     * @return {?}
     */
    SelectionService.prototype.isSelected = /**
     * Determine whether or not a specific item is currently selected
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return this._selection.has(data);
    };
    /**
     * Return an observable specifically for notifying the subscriber
     * only when the selection state of a specific object has changed
     */
    /**
     * Return an observable specifically for notifying the subscriber
     * only when the selection state of a specific object has changed
     * @param {?} data
     * @return {?}
     */
    SelectionService.prototype.getSelectionState = /**
     * Return an observable specifically for notifying the subscriber
     * only when the selection state of a specific object has changed
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        return this.selection$.pipe(map(function () { return _this.isSelected(data); }), distinctUntilChanged());
    };
    /**
     * Define how selections should be performed.
     * This allows us to use an strategy pattern to handle the various keyboard
     * and mouse interactions while keeping each mode separated and
     * easily extensible if we want to add more modes in future!
     */
    /**
     * Define how selections should be performed.
     * This allows us to use an strategy pattern to handle the various keyboard
     * and mouse interactions while keeping each mode separated and
     * easily extensible if we want to add more modes in future!
     * @param {?} mode
     * @return {?}
     */
    SelectionService.prototype.setStrategy = /**
     * Define how selections should be performed.
     * This allows us to use an strategy pattern to handle the various keyboard
     * and mouse interactions while keeping each mode separated and
     * easily extensible if we want to add more modes in future!
     * @param {?} mode
     * @return {?}
     */
    function (mode) {
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
                    throw new Error("The selection mode '" + mode + "' does not exist. Valid modes are 'simple', 'row', or 'row-alt'.");
            }
        }
    };
    /**
     * Set the current active item
     */
    /**
     * Set the current active item
     * @param {?} data
     * @return {?}
     */
    SelectionService.prototype.activate = /**
     * Set the current active item
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this._active = data;
        this.active$.next(this._active);
    };
    /**
     * Deactive all items
     */
    /**
     * Deactive all items
     * @return {?}
     */
    SelectionService.prototype.deactivate = /**
     * Deactive all items
     * @return {?}
     */
    function () {
        this._active = null;
        this.active$.next(this._active);
    };
    /**
     * Return the next or previous sibling of the current active item.
     * @param previous If true, the previous sibling will be returned.
     */
    /**
     * Return the next or previous sibling of the current active item.
     * @param {?=} previous If true, the previous sibling will be returned.
     * @return {?}
     */
    SelectionService.prototype.getSibling = /**
     * Return the next or previous sibling of the current active item.
     * @param {?=} previous If true, the previous sibling will be returned.
     * @return {?}
     */
    function (previous) {
        if (previous === void 0) { previous = false; }
        // check if there is a current active item
        if (!this._active) {
            return;
        }
        // get the index of the current item
        var /** @type {?} */ idx = this.dataset.indexOf(this._active);
        var /** @type {?} */ target = this.dataset[previous ? idx - 1 : idx + 1];
        return target;
    };
    /**
     * Activate the sibling of the current active item.
     * If previous is set to true the previous sibling will be activated
     * rather than the next sibling. This function will also return the
     * data of the newly activated sibling
     */
    /**
     * Activate the sibling of the current active item.
     * If previous is set to true the previous sibling will be activated
     * rather than the next sibling. This function will also return the
     * data of the newly activated sibling
     * @param {?=} previous
     * @return {?}
     */
    SelectionService.prototype.activateSibling = /**
     * Activate the sibling of the current active item.
     * If previous is set to true the previous sibling will be activated
     * rather than the next sibling. This function will also return the
     * data of the newly activated sibling
     * @param {?=} previous
     * @return {?}
     */
    function (previous) {
        if (previous === void 0) { previous = false; }
        var /** @type {?} */ target = this.getSibling(previous);
        // check if the target exists
        if (target) {
            this.activate(target);
        }
        return target;
    };
    /**
     * @param {?} disabled
     * @return {?}
     */
    SelectionService.prototype.setDisabled = /**
     * @param {?} disabled
     * @return {?}
     */
    function (disabled) {
        // store the current disabled state
        this.isEnabled = !disabled;
        // clear any stateful data
        this._active = null;
        this.active$.next(this._active);
        this._selection.clear();
        // emit the selection change information
        this.selectionHasMutated();
    };
    /**
     * @return {?}
     */
    SelectionService.prototype.selectionHasMutated = /**
     * @return {?}
     */
    function () {
        this.selection$.next(Array.from(this._selection));
    };
    /**
     * @return {?}
     */
    SelectionService.prototype.setFirstItemFocusable = /**
     * @return {?}
     */
    function () {
        if (this._dataset.length > 0) {
            this.focus$.next(this._dataset[0]);
            this._active = this._dataset[0];
        }
        else {
            this._active = null;
        }
    };
    SelectionService.decorators = [
        { type: Injectable }
    ];
    return SelectionService;
}());
export { SelectionService };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9zZWxlY3Rpb24vc2VsZWN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXZELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNsRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQzs7O3dCQWNqRCxJQUFJLHVCQUF1QixDQUFDLElBQUksQ0FBQzt5QkFDMUMsSUFBSTs4QkFDQyxJQUFJO2lDQUNELElBQUk7c0JBRXhCLElBQUksZUFBZSxDQUFNLElBQUksQ0FBQzt1QkFDN0IsSUFBSSxlQUFlLENBQU0sSUFBSSxDQUFDOzBCQUMzQixJQUFJLGVBQWUsQ0FBUSxFQUFFLENBQUM7d0JBR0osRUFBRTswQkFDcEIsSUFBSSxHQUFHLEVBQUU7a0NBQ2tCLElBQUksQ0FBQyxRQUFROztJQXJCN0Qsc0JBQUkscUNBQU87Ozs7UUFLWDtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ3RCOzs7OztRQVBELFVBQVksT0FBMkI7WUFDckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7WUFDeEIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7U0FDOUI7OztPQUFBOzs7O0lBb0JELHNDQUFXOzs7SUFB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Q0FBQyxDQUFDO1NBQ2pDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztTQUNyQjs7O2dCQW5NSixVQUFVOzsyQkFUWDs7U0FVYSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFJvd0FsdFNlbGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnLi9zdHJhdGVnaWVzL3Jvdy1hbHQtc2VsZWN0aW9uLnN0cmF0ZWd5JztcbmltcG9ydCB7IFJvd1NlbGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnLi9zdHJhdGVnaWVzL3Jvdy1zZWxlY3Rpb24uc3RyYXRlZ3knO1xuaW1wb3J0IHsgU2VsZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICcuL3N0cmF0ZWdpZXMvc2VsZWN0aW9uLnN0cmF0ZWd5JztcbmltcG9ydCB7IFNpbXBsZVNlbGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnLi9zdHJhdGVnaWVzL3NpbXBsZS1zZWxlY3Rpb24uc3RyYXRlZ3knO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VsZWN0aW9uU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgc2V0IGRhdGFzZXQoZGF0YXNldDogUmVhZG9ubHlBcnJheTxhbnk+KSB7XG4gICAgdGhpcy5fZGF0YXNldCA9IGRhdGFzZXQ7XG4gICAgdGhpcy5zZXRGaXJzdEl0ZW1Gb2N1c2FibGUoKTtcbiAgfVxuXG4gIGdldCBkYXRhc2V0KCk6IFJlYWRvbmx5QXJyYXk8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGFzZXQ7XG4gIH1cblxuICBzdHJhdGVneTogU2VsZWN0aW9uU3RyYXRlZ3kgPSBuZXcgU2ltcGxlU2VsZWN0aW9uU3RyYXRlZ3kodGhpcyk7XG4gIGlzRW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XG4gIGlzQ2xpY2tFbmFibGVkOiBib29sZWFuID0gdHJ1ZTtcbiAgaXNLZXlib2FyZEVuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIGZvY3VzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihudWxsKTtcbiAgYWN0aXZlJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihudWxsKTtcbiAgc2VsZWN0aW9uJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55W10+KFtdKTtcblxuICBwcml2YXRlIF9hY3RpdmU6IGFueTtcbiAgcHJpdmF0ZSBfZGF0YXNldDogUmVhZG9ubHlBcnJheTxhbnk+ID0gW107XG4gIHByaXZhdGUgX3NlbGVjdGlvbiA9IG5ldyBTZXQoKTtcbiAgcHJpdmF0ZSBfc3RyYXRlZ3lUb0Rlc3Ryb3k6IFNlbGVjdGlvblN0cmF0ZWd5ID0gdGhpcy5zdHJhdGVneTtcblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc3RyYXRlZ3lUb0Rlc3Ryb3kpIHtcbiAgICAgIHRoaXMuX3N0cmF0ZWd5VG9EZXN0cm95LmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSWYgdGhlIGl0ZW0gaXMgbm90IGN1cnJlbnRseSBzZWxlY3RlZCB0aGVuIGFkZCBpdFxuICAgKiB0byB0aGUgbGlzdCBvZiBzZWxlY3RlZCBpdGVtc1xuICAgKi9cbiAgc2VsZWN0KC4uLnNlbGVjdGlvbnM6IGFueVtdKTogdm9pZCB7XG5cbiAgICAvLyBhZGQgZWFjaCBzZWxlY3Rpb24gdG8gdGhlIHNldFxuICAgIHNlbGVjdGlvbnMuZm9yRWFjaChzZWxlY3Rpb24gPT4gdGhpcy5fc2VsZWN0aW9uLmFkZChzZWxlY3Rpb24pKTtcblxuICAgIC8vIHByb3BhZ2F0ZSB0aGUgY2hhbmdlc1xuICAgIHRoaXMuc2VsZWN0aW9uSGFzTXV0YXRlZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbiBpdGVtIGZyb20gdGhlIGxpc3Qgb2Ygc2VsZWN0ZWQgaXRlbXNcbiAgICovXG4gIGRlc2VsZWN0KC4uLnNlbGVjdGlvbnM6IGFueVtdKTogdm9pZCB7XG4gICAgLy8gcmVtb3ZlIGVhY2ggaXRlbSBmcm9tIHRoZSBzZXRcbiAgICBzZWxlY3Rpb25zLmZvckVhY2goc2VsZWN0aW9uID0+IHRoaXMuX3NlbGVjdGlvbi5kZWxldGUoc2VsZWN0aW9uKSk7XG5cbiAgICAvLyBwcm9wYWdhdGUgdGhlIGNoYW5nZXNcbiAgICB0aGlzLnNlbGVjdGlvbkhhc011dGF0ZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGUgdGhlIHNlbGVjdGVkIHN0YXRlIG9mIGFueSBzcGVjaWZpZWQgaXRlbXNcbiAgICovXG4gIHRvZ2dsZSguLi5zZWxlY3Rpb25zOiBhbnlbXSk6IHZvaWQge1xuICAgIHNlbGVjdGlvbnMuZm9yRWFjaChzZWxlY3Rpb24gPT4gdGhpcy5pc1NlbGVjdGVkKHNlbGVjdGlvbikgPyB0aGlzLmRlc2VsZWN0KHNlbGVjdGlvbikgOiB0aGlzLnNlbGVjdChzZWxlY3Rpb24pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgd2hldGhlciBvciBub3QgYSBzcGVjaWZpYyBpdGVtIGlzIGN1cnJlbnRseSBzZWxlY3RlZFxuICAgKi9cbiAgaXNTZWxlY3RlZChkYXRhOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uLmhhcyhkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYW4gb2JzZXJ2YWJsZSBzcGVjaWZpY2FsbHkgZm9yIG5vdGlmeWluZyB0aGUgc3Vic2NyaWJlclxuICAgKiBvbmx5IHdoZW4gdGhlIHNlbGVjdGlvbiBzdGF0ZSBvZiBhIHNwZWNpZmljIG9iamVjdCBoYXMgY2hhbmdlZFxuICAgKi9cbiAgZ2V0U2VsZWN0aW9uU3RhdGUoZGF0YTogYW55KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uJC5waXBlKG1hcCgoKSA9PiB0aGlzLmlzU2VsZWN0ZWQoZGF0YSkpLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmUgaG93IHNlbGVjdGlvbnMgc2hvdWxkIGJlIHBlcmZvcm1lZC5cbiAgICogVGhpcyBhbGxvd3MgdXMgdG8gdXNlIGFuIHN0cmF0ZWd5IHBhdHRlcm4gdG8gaGFuZGxlIHRoZSB2YXJpb3VzIGtleWJvYXJkXG4gICAqIGFuZCBtb3VzZSBpbnRlcmFjdGlvbnMgd2hpbGUga2VlcGluZyBlYWNoIG1vZGUgc2VwYXJhdGVkIGFuZFxuICAgKiBlYXNpbHkgZXh0ZW5zaWJsZSBpZiB3ZSB3YW50IHRvIGFkZCBtb3JlIG1vZGVzIGluIGZ1dHVyZSFcbiAgICovXG4gIHNldFN0cmF0ZWd5KG1vZGU6IFNlbGVjdGlvbk1vZGUgfCBTZWxlY3Rpb25TdHJhdGVneSk6IHZvaWQge1xuXG4gICAgaWYgKHRoaXMuX3N0cmF0ZWd5VG9EZXN0cm95KSB7XG4gICAgICAvLyBEZXN0cm95IHByZXZpb3VzIHN0cmF0ZWd5IGlmIGl0IHdhcyBjcmVhdGVkIGludGVybmFsbHlcbiAgICAgIHRoaXMuX3N0cmF0ZWd5VG9EZXN0cm95LmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuX3N0cmF0ZWd5VG9EZXN0cm95ID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAobW9kZSBpbnN0YW5jZW9mIFNlbGVjdGlvblN0cmF0ZWd5KSB7XG5cbiAgICAgIC8vIEN1c3RvbSBzdHJhdGVneSAtIHBhc3MgaW4gdGhlIHNlcnZpY2UgaW5zdGFuY2VcbiAgICAgIHRoaXMuc3RyYXRlZ3kgPSBtb2RlO1xuICAgICAgdGhpcy5zdHJhdGVneS5zZXRTZWxlY3Rpb25TZXJ2aWNlKHRoaXMpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgc3dpdGNoIChtb2RlLnRvTG93ZXJDYXNlKCkudHJpbSgpKSB7XG5cbiAgICAgICAgY2FzZSAnc2ltcGxlJzpcbiAgICAgICAgICB0aGlzLnN0cmF0ZWd5ID0gdGhpcy5fc3RyYXRlZ3lUb0Rlc3Ryb3kgPSBuZXcgU2ltcGxlU2VsZWN0aW9uU3RyYXRlZ3kodGhpcyk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAncm93JzpcbiAgICAgICAgICB0aGlzLnN0cmF0ZWd5ID0gdGhpcy5fc3RyYXRlZ3lUb0Rlc3Ryb3kgPSBuZXcgUm93U2VsZWN0aW9uU3RyYXRlZ3kodGhpcyk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAncm93LWFsdCc6XG4gICAgICAgICAgdGhpcy5zdHJhdGVneSA9IHRoaXMuX3N0cmF0ZWd5VG9EZXN0cm95ID0gbmV3IFJvd0FsdFNlbGVjdGlvblN0cmF0ZWd5KHRoaXMpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgc2VsZWN0aW9uIG1vZGUgJyR7bW9kZX0nIGRvZXMgbm90IGV4aXN0LiBWYWxpZCBtb2RlcyBhcmUgJ3NpbXBsZScsICdyb3cnLCBvciAncm93LWFsdCcuYCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgY3VycmVudCBhY3RpdmUgaXRlbVxuICAgKi9cbiAgYWN0aXZhdGUoZGF0YTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fYWN0aXZlID0gZGF0YTtcbiAgICB0aGlzLmFjdGl2ZSQubmV4dCh0aGlzLl9hY3RpdmUpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlYWN0aXZlIGFsbCBpdGVtc1xuICAgKi9cbiAgZGVhY3RpdmF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9hY3RpdmUgPSBudWxsO1xuICAgIHRoaXMuYWN0aXZlJC5uZXh0KHRoaXMuX2FjdGl2ZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBuZXh0IG9yIHByZXZpb3VzIHNpYmxpbmcgb2YgdGhlIGN1cnJlbnQgYWN0aXZlIGl0ZW0uXG4gICAqIEBwYXJhbSBwcmV2aW91cyBJZiB0cnVlLCB0aGUgcHJldmlvdXMgc2libGluZyB3aWxsIGJlIHJldHVybmVkLlxuICAgKi9cbiAgZ2V0U2libGluZyhwcmV2aW91czogYm9vbGVhbiA9IGZhbHNlKTogYW55IHtcblxuICAgIC8vIGNoZWNrIGlmIHRoZXJlIGlzIGEgY3VycmVudCBhY3RpdmUgaXRlbVxuICAgIGlmICghdGhpcy5fYWN0aXZlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gZ2V0IHRoZSBpbmRleCBvZiB0aGUgY3VycmVudCBpdGVtXG4gICAgY29uc3QgaWR4ID0gdGhpcy5kYXRhc2V0LmluZGV4T2YodGhpcy5fYWN0aXZlKTtcbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmRhdGFzZXRbcHJldmlvdXMgPyBpZHggLSAxIDogaWR4ICsgMV07XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIEFjdGl2YXRlIHRoZSBzaWJsaW5nIG9mIHRoZSBjdXJyZW50IGFjdGl2ZSBpdGVtLlxuICAgKiBJZiBwcmV2aW91cyBpcyBzZXQgdG8gdHJ1ZSB0aGUgcHJldmlvdXMgc2libGluZyB3aWxsIGJlIGFjdGl2YXRlZFxuICAgKiByYXRoZXIgdGhhbiB0aGUgbmV4dCBzaWJsaW5nLiBUaGlzIGZ1bmN0aW9uIHdpbGwgYWxzbyByZXR1cm4gdGhlXG4gICAqIGRhdGEgb2YgdGhlIG5ld2x5IGFjdGl2YXRlZCBzaWJsaW5nXG4gICAqL1xuICBhY3RpdmF0ZVNpYmxpbmcocHJldmlvdXM6IGJvb2xlYW4gPSBmYWxzZSk6IGFueSB7XG5cbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldFNpYmxpbmcocHJldmlvdXMpO1xuXG4gICAgLy8gY2hlY2sgaWYgdGhlIHRhcmdldCBleGlzdHNcbiAgICBpZiAodGFyZ2V0KSB7XG4gICAgICB0aGlzLmFjdGl2YXRlKHRhcmdldCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIHNldERpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgLy8gc3RvcmUgdGhlIGN1cnJlbnQgZGlzYWJsZWQgc3RhdGVcbiAgICB0aGlzLmlzRW5hYmxlZCA9ICFkaXNhYmxlZDtcblxuICAgIC8vIGNsZWFyIGFueSBzdGF0ZWZ1bCBkYXRhXG4gICAgdGhpcy5fYWN0aXZlID0gbnVsbDtcbiAgICB0aGlzLmFjdGl2ZSQubmV4dCh0aGlzLl9hY3RpdmUpO1xuICAgIHRoaXMuX3NlbGVjdGlvbi5jbGVhcigpO1xuXG4gICAgLy8gZW1pdCB0aGUgc2VsZWN0aW9uIGNoYW5nZSBpbmZvcm1hdGlvblxuICAgIHRoaXMuc2VsZWN0aW9uSGFzTXV0YXRlZCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZWxlY3Rpb25IYXNNdXRhdGVkKCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0aW9uJC5uZXh0KEFycmF5LmZyb20odGhpcy5fc2VsZWN0aW9uKSk7XG4gIH1cblxuICBwcml2YXRlIHNldEZpcnN0SXRlbUZvY3VzYWJsZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZGF0YXNldC5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmZvY3VzJC5uZXh0KHRoaXMuX2RhdGFzZXRbMF0pO1xuICAgICAgdGhpcy5fYWN0aXZlID0gdGhpcy5fZGF0YXNldFswXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYWN0aXZlID0gbnVsbDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgU2VsZWN0aW9uTW9kZSA9ICdzaW1wbGUnIHwgJ3JvdycgfCAncm93LWFsdCc7Il19