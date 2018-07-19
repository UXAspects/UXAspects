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
        this._selection = new Set();
        this.dataset = [];
        this.enabled = true;
        this.clickEnabled = true;
        this.keyboardEnabled = true;
        this.strategy = new SimpleSelectionStrategy(this);
        this.active$ = new BehaviorSubject(null);
        this.focusTarget$ = new BehaviorSubject(null);
        this.selection$ = new BehaviorSubject([]);
        this._strategyToDestroy = this.strategy;
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
    selected$(data) {
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
    setMode(mode) {
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
        this.active$.next(data);
    }
    /**
     * Deactive all items
     * @return {?}
     */
    deactivate() {
        this.active$.next(null);
    }
    /**
     * Return the next or previous sibling of the current active item.
     * @param {?=} previous If true, the previous sibling will be returned.
     * @return {?}
     */
    getSibling(previous = false) {
        // get the currently active item
        const /** @type {?} */ current = this.active$.getValue();
        // check if there is a current active item
        if (!current) {
            return;
        }
        // get the index of the current item
        const /** @type {?} */ idx = this.dataset.indexOf(current);
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
        this.enabled = !disabled;
        // clear any stateful data
        this.active$.next(null);
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
}
SelectionService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SelectionService.ctorParameters = () => [];
function SelectionService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SelectionService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SelectionService.ctorParameters;
    /** @type {?} */
    SelectionService.prototype._selection;
    /** @type {?} */
    SelectionService.prototype._strategyToDestroy;
    /** @type {?} */
    SelectionService.prototype.dataset;
    /** @type {?} */
    SelectionService.prototype.enabled;
    /** @type {?} */
    SelectionService.prototype.clickEnabled;
    /** @type {?} */
    SelectionService.prototype.keyboardEnabled;
    /** @type {?} */
    SelectionService.prototype.strategy;
    /** @type {?} */
    SelectionService.prototype.active$;
    /** @type {?} */
    SelectionService.prototype.focusTarget$;
    /** @type {?} */
    SelectionService.prototype.selection$;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9zZWxlY3Rpb24vc2VsZWN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXZELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNsRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUdqRixNQUFNO0lBZUo7MEJBYnFCLElBQUksR0FBRyxFQUFFO3VCQUdiLEVBQUU7dUJBQ0EsSUFBSTs0QkFDQyxJQUFJOytCQUNELElBQUk7d0JBQ0QsSUFBSSx1QkFBdUIsQ0FBQyxJQUFJLENBQUM7dUJBRXJELElBQUksZUFBZSxDQUFNLElBQUksQ0FBQzs0QkFDekIsSUFBSSxlQUFlLENBQU0sSUFBSSxDQUFDOzBCQUNoQyxJQUFJLGVBQWUsQ0FBUSxFQUFFLENBQUM7UUFHekMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDekM7Ozs7SUFFRCxXQUFXO1FBQ1QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDbkM7S0FDRjs7Ozs7OztJQU1ELE1BQU0sQ0FBQyxHQUFHLFVB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QyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNiLE1BQU0sQ0FBQztTQUNSOztRQUdELHVCQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQyx1QkFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFMUQsTUFBTSxDQUFDLE1BQU0sQ0FBQztLQUNmOzs7Ozs7Ozs7SUFRRCxlQUFlLENBQUMsV0FBb0IsS0FBSztRQUV2Qyx1QkFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7UUFHekMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdkI7UUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDO0tBQ2Y7Ozs7O0lBRUQsV0FBVyxDQUFDLFFBQWlCOztRQUUzQixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDOztRQUd6QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDOztRQUd4QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztLQUM1Qjs7OztJQUVPLG1CQUFtQjtRQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDOzs7O1lBcExyRCxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBSb3dBbHRTZWxlY3Rpb25TdHJhdGVneSB9IGZyb20gJy4vc3RyYXRlZ2llcy9yb3ctYWx0LXNlbGVjdGlvbi5zdHJhdGVneSc7XG5pbXBvcnQgeyBSb3dTZWxlY3Rpb25TdHJhdGVneSB9IGZyb20gJy4vc3RyYXRlZ2llcy9yb3ctc2VsZWN0aW9uLnN0cmF0ZWd5JztcbmltcG9ydCB7IFNlbGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnLi9zdHJhdGVnaWVzL3NlbGVjdGlvbi5zdHJhdGVneSc7XG5pbXBvcnQgeyBTaW1wbGVTZWxlY3Rpb25TdHJhdGVneSB9IGZyb20gJy4vc3RyYXRlZ2llcy9zaW1wbGUtc2VsZWN0aW9uLnN0cmF0ZWd5JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlbGVjdGlvblNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIHByaXZhdGUgX3NlbGVjdGlvbiA9IG5ldyBTZXQoKTtcbiAgcHJpdmF0ZSBfc3RyYXRlZ3lUb0Rlc3Ryb3k6IFNlbGVjdGlvblN0cmF0ZWd5O1xuXG4gIGRhdGFzZXQ6IGFueVtdID0gW107XG4gIGVuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlO1xuICBjbGlja0VuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlO1xuICBrZXlib2FyZEVuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlO1xuICBzdHJhdGVneTogU2VsZWN0aW9uU3RyYXRlZ3kgPSBuZXcgU2ltcGxlU2VsZWN0aW9uU3RyYXRlZ3kodGhpcyk7XG5cbiAgYWN0aXZlJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihudWxsKTtcbiAgZm9jdXNUYXJnZXQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KG51bGwpO1xuICBzZWxlY3Rpb24kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnlbXT4oW10pO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX3N0cmF0ZWd5VG9EZXN0cm95ID0gdGhpcy5zdHJhdGVneTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9zdHJhdGVneVRvRGVzdHJveSkge1xuICAgICAgdGhpcy5fc3RyYXRlZ3lUb0Rlc3Ryb3kuZGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJZiB0aGUgaXRlbSBpcyBub3QgY3VycmVudGx5IHNlbGVjdGVkIHRoZW4gYWRkIGl0XG4gICAqIHRvIHRoZSBsaXN0IG9mIHNlbGVjdGVkIGl0ZW1zXG4gICAqL1xuICBzZWxlY3QoLi4uc2VsZWN0aW9uczogYW55W10pOiB2b2lkIHtcblxuICAgIC8vIGFkZCBlYWNoIHNlbGVjdGlvbiB0byB0aGUgc2V0XG4gICAgc2VsZWN0aW9ucy5mb3JFYWNoKHNlbGVjdGlvbiA9PiB0aGlzLl9zZWxlY3Rpb24uYWRkKHNlbGVjdGlvbikpO1xuXG4gICAgLy8gcHJvcGFnYXRlIHRoZSBjaGFuZ2VzXG4gICAgdGhpcy5zZWxlY3Rpb25IYXNNdXRhdGVkKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFuIGl0ZW0gZnJvbSB0aGUgbGlzdCBvZiBzZWxlY3RlZCBpdGVtc1xuICAgKi9cbiAgZGVzZWxlY3QoLi4uc2VsZWN0aW9uczogYW55W10pOiB2b2lkIHtcbiAgICAvLyByZW1vdmUgZWFjaCBpdGVtIGZyb20gdGhlIHNldFxuICAgIHNlbGVjdGlvbnMuZm9yRWFjaChzZWxlY3Rpb24gPT4gdGhpcy5fc2VsZWN0aW9uLmRlbGV0ZShzZWxlY3Rpb24pKTtcblxuICAgIC8vIHByb3BhZ2F0ZSB0aGUgY2hhbmdlc1xuICAgIHRoaXMuc2VsZWN0aW9uSGFzTXV0YXRlZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZSB0aGUgc2VsZWN0ZWQgc3RhdGUgb2YgYW55IHNwZWNpZmllZCBpdGVtc1xuICAgKi9cbiAgdG9nZ2xlKC4uLnNlbGVjdGlvbnM6IGFueVtdKTogdm9pZCB7XG4gICAgc2VsZWN0aW9ucy5mb3JFYWNoKHNlbGVjdGlvbiA9PiB0aGlzLmlzU2VsZWN0ZWQoc2VsZWN0aW9uKSA/IHRoaXMuZGVzZWxlY3Qoc2VsZWN0aW9uKSA6IHRoaXMuc2VsZWN0KHNlbGVjdGlvbikpO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZSB3aGV0aGVyIG9yIG5vdCBhIHNwZWNpZmljIGl0ZW0gaXMgY3VycmVudGx5IHNlbGVjdGVkXG4gICAqL1xuICBpc1NlbGVjdGVkKGRhdGE6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3Rpb24uaGFzKGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhbiBvYnNlcnZhYmxlIHNwZWNpZmljYWxseSBmb3Igbm90aWZ5aW5nIHRoZSBzdWJzY3JpYmVyXG4gICAqIG9ubHkgd2hlbiB0aGUgc2VsZWN0aW9uIHN0YXRlIG9mIGEgc3BlY2lmaWMgb2JqZWN0IGhhcyBjaGFuZ2VkXG4gICAqL1xuICBzZWxlY3RlZCQoZGF0YTogYW55KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uJC5waXBlKG1hcCgoKSA9PiB0aGlzLmlzU2VsZWN0ZWQoZGF0YSkpLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmUgaG93IHNlbGVjdGlvbnMgc2hvdWxkIGJlIHBlcmZvcm1lZC5cbiAgICogVGhpcyBhbGxvd3MgdXMgdG8gdXNlIGFuIHN0cmF0ZWd5IHBhdHRlcm4gdG8gaGFuZGxlIHRoZSB2YXJpb3VzIGtleWJvYXJkXG4gICAqIGFuZCBtb3VzZSBpbnRlcmFjdGlvbnMgd2hpbGUga2VlcGluZyBlYWNoIG1vZGUgc2VwYXJhdGVkIGFuZFxuICAgKiBlYXNpbHkgZXh0ZW5zaWJsZSBpZiB3ZSB3YW50IHRvIGFkZCBtb3JlIG1vZGVzIGluIGZ1dHVyZSFcbiAgICovXG4gIHNldE1vZGUobW9kZTogU2VsZWN0aW9uTW9kZSB8IFNlbGVjdGlvblN0cmF0ZWd5KTogdm9pZCB7XG5cbiAgICBpZiAodGhpcy5fc3RyYXRlZ3lUb0Rlc3Ryb3kpIHtcbiAgICAgIC8vIERlc3Ryb3kgcHJldmlvdXMgc3RyYXRlZ3kgaWYgaXQgd2FzIGNyZWF0ZWQgaW50ZXJuYWxseVxuICAgICAgdGhpcy5fc3RyYXRlZ3lUb0Rlc3Ryb3kuZGVzdHJveSgpO1xuICAgICAgdGhpcy5fc3RyYXRlZ3lUb0Rlc3Ryb3kgPSBudWxsO1xuICAgIH1cblxuICAgIGlmIChtb2RlIGluc3RhbmNlb2YgU2VsZWN0aW9uU3RyYXRlZ3kpIHtcblxuICAgICAgLy8gQ3VzdG9tIHN0cmF0ZWd5IC0gcGFzcyBpbiB0aGUgc2VydmljZSBpbnN0YW5jZVxuICAgICAgdGhpcy5zdHJhdGVneSA9IG1vZGU7XG4gICAgICB0aGlzLnN0cmF0ZWd5LnNldFNlbGVjdGlvblNlcnZpY2UodGhpcyk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBzd2l0Y2ggKG1vZGUudG9Mb3dlckNhc2UoKS50cmltKCkpIHtcblxuICAgICAgICBjYXNlICdzaW1wbGUnOlxuICAgICAgICAgIHRoaXMuc3RyYXRlZ3kgPSB0aGlzLl9zdHJhdGVneVRvRGVzdHJveSA9IG5ldyBTaW1wbGVTZWxlY3Rpb25TdHJhdGVneSh0aGlzKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdyb3cnOlxuICAgICAgICAgIHRoaXMuc3RyYXRlZ3kgPSB0aGlzLl9zdHJhdGVneVRvRGVzdHJveSA9IG5ldyBSb3dTZWxlY3Rpb25TdHJhdGVneSh0aGlzKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdyb3ctYWx0JzpcbiAgICAgICAgICB0aGlzLnN0cmF0ZWd5ID0gdGhpcy5fc3RyYXRlZ3lUb0Rlc3Ryb3kgPSBuZXcgUm93QWx0U2VsZWN0aW9uU3RyYXRlZ3kodGhpcyk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBzZWxlY3Rpb24gbW9kZSAnJHttb2RlfScgZG9lcyBub3QgZXhpc3QuIFZhbGlkIG1vZGVzIGFyZSAnc2ltcGxlJywgJ3JvdycsIG9yICdyb3ctYWx0Jy5gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBjdXJyZW50IGFjdGl2ZSBpdGVtXG4gICAqL1xuICBhY3RpdmF0ZShkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2ZSQubmV4dChkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWFjdGl2ZSBhbGwgaXRlbXNcbiAgICovXG4gIGRlYWN0aXZhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmUkLm5leHQobnVsbCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBuZXh0IG9yIHByZXZpb3VzIHNpYmxpbmcgb2YgdGhlIGN1cnJlbnQgYWN0aXZlIGl0ZW0uXG4gICAqIEBwYXJhbSBwcmV2aW91cyBJZiB0cnVlLCB0aGUgcHJldmlvdXMgc2libGluZyB3aWxsIGJlIHJldHVybmVkLlxuICAgKi9cbiAgZ2V0U2libGluZyhwcmV2aW91czogYm9vbGVhbiA9IGZhbHNlKTogYW55IHtcblxuICAgIC8vIGdldCB0aGUgY3VycmVudGx5IGFjdGl2ZSBpdGVtXG4gICAgY29uc3QgY3VycmVudCA9IHRoaXMuYWN0aXZlJC5nZXRWYWx1ZSgpO1xuXG4gICAgLy8gY2hlY2sgaWYgdGhlcmUgaXMgYSBjdXJyZW50IGFjdGl2ZSBpdGVtXG4gICAgaWYgKCFjdXJyZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gZ2V0IHRoZSBpbmRleCBvZiB0aGUgY3VycmVudCBpdGVtXG4gICAgY29uc3QgaWR4ID0gdGhpcy5kYXRhc2V0LmluZGV4T2YoY3VycmVudCk7XG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5kYXRhc2V0W3ByZXZpb3VzID8gaWR4IC0gMSA6IGlkeCArIDFdO1xuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBY3RpdmF0ZSB0aGUgc2libGluZyBvZiB0aGUgY3VycmVudCBhY3RpdmUgaXRlbS5cbiAgICogSWYgcHJldmlvdXMgaXMgc2V0IHRvIHRydWUgdGhlIHByZXZpb3VzIHNpYmxpbmcgd2lsbCBiZSBhY3RpdmF0ZWRcbiAgICogcmF0aGVyIHRoYW4gdGhlIG5leHQgc2libGluZy4gVGhpcyBmdW5jdGlvbiB3aWxsIGFsc28gcmV0dXJuIHRoZVxuICAgKiBkYXRhIG9mIHRoZSBuZXdseSBhY3RpdmF0ZWQgc2libGluZ1xuICAgKi9cbiAgYWN0aXZhdGVTaWJsaW5nKHByZXZpb3VzOiBib29sZWFuID0gZmFsc2UpOiBhbnkge1xuXG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRTaWJsaW5nKHByZXZpb3VzKTtcblxuICAgIC8vIGNoZWNrIGlmIHRoZSB0YXJnZXQgZXhpc3RzXG4gICAgaWYgKHRhcmdldCkge1xuICAgICAgdGhpcy5hY3RpdmF0ZSh0YXJnZXQpO1xuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICBzZXREaXNhYmxlZChkaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIC8vIHN0b3JlIHRoZSBjdXJyZW50IGRpc2FibGVkIHN0YXRlXG4gICAgdGhpcy5lbmFibGVkID0gIWRpc2FibGVkO1xuXG4gICAgLy8gY2xlYXIgYW55IHN0YXRlZnVsIGRhdGFcbiAgICB0aGlzLmFjdGl2ZSQubmV4dChudWxsKTtcbiAgICB0aGlzLl9zZWxlY3Rpb24uY2xlYXIoKTtcblxuICAgIC8vIGVtaXQgdGhlIHNlbGVjdGlvbiBjaGFuZ2UgaW5mb3JtYXRpb25cbiAgICB0aGlzLnNlbGVjdGlvbkhhc011dGF0ZWQoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2VsZWN0aW9uSGFzTXV0YXRlZCgpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGlvbiQubmV4dChBcnJheS5mcm9tKHRoaXMuX3NlbGVjdGlvbikpO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIFNlbGVjdGlvbk1vZGUgPSAnc2ltcGxlJyB8ICdyb3cnIHwgJ3Jvdy1hbHQnO1xuIl19