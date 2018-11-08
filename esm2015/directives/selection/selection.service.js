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
/**
 * @template T
 */
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9zZWxlY3Rpb24vc2VsZWN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXZELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNsRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQzs7OztBQUdqRixNQUFNOzt3QkFhNkIsSUFBSSx1QkFBdUIsQ0FBSSxJQUFJLENBQUM7eUJBQ2hELElBQUk7OEJBQ0MsSUFBSTtpQ0FDRCxJQUFJO3NCQUV4QixJQUFJLGVBQWUsQ0FBSSxJQUFJLENBQUM7dUJBQzNCLElBQUksZUFBZSxDQUFJLElBQUksQ0FBQzswQkFDekIsSUFBSSxlQUFlLENBQU0sRUFBRSxDQUFDO3dCQUdKLEVBQUU7MEJBQ2xCLElBQUksR0FBRyxFQUFFO2tDQUNxQixJQUFJLENBQUMsUUFBUTs7Ozs7O0lBdkJoRSxJQUFJLE9BQU8sQ0FBQyxPQUF5QjtRQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1NBQzlCO0tBQ0Y7Ozs7SUFFRCxJQUFJLE9BQU87UUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztLQUN0Qjs7OztJQWdCRCxXQUFXO1FBQ1QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDbkM7S0FDRjs7Ozs7OztJQU1ELE1BQU0sQ0FBQyxHQUFHLFVBQWU7O1FBR3ZCLFVBQVUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOztRQUdoRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztLQUM1Qjs7Ozs7O0lBS0QsUUFBUSxDQUFDLEdBQUcsVUFBZTs7UUFFekIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7O1FBR25FLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0tBQzVCOzs7OztJQUtELFdBQVc7O1FBRVQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7UUFHaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUN6Qjs7Ozs7O0lBS0QsTUFBTSxDQUFDLEdBQUcsVUFBZTtRQUN2QixVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0tBQ2pIOzs7Ozs7SUFLRCxVQUFVLENBQUMsSUFBTztRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDbEM7Ozs7Ozs7SUFNRCxpQkFBaUIsQ0FBQyxJQUFPO1FBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQztLQUN2Rjs7Ozs7Ozs7O0lBUUQsV0FBVyxDQUFDLElBQTBDO1FBRXBELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7O1lBRTVCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNsQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1NBQ2hDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxZQUFZLGlCQUFpQixDQUFDLENBQUMsQ0FBQzs7WUFHdEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUV6QztRQUFDLElBQUksQ0FBQyxDQUFDO1lBRU4sTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFFbEMsS0FBSyxRQUFRO29CQUNYLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksdUJBQXVCLENBQUksSUFBSSxDQUFDLENBQUM7b0JBQy9FLEtBQUssQ0FBQztnQkFFUixLQUFLLEtBQUs7b0JBQ1IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxvQkFBb0IsQ0FBSSxJQUFJLENBQUMsQ0FBQztvQkFDNUUsS0FBSyxDQUFDO2dCQUVSLEtBQUssU0FBUztvQkFDWixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLHVCQUF1QixDQUFJLElBQUksQ0FBQyxDQUFDO29CQUMvRSxLQUFLLENBQUM7Z0JBRVI7b0JBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsSUFBSSxrRUFBa0UsQ0FBQyxDQUFDO2FBQ2xIO1NBQ0Y7S0FDRjs7Ozs7O0lBS0QsUUFBUSxDQUFDLElBQU87UUFDZCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDakM7Ozs7O0lBS0QsVUFBVTtRQUNSLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNqQzs7Ozs7O0lBTUQsVUFBVSxDQUFDLFdBQW9CLEtBQUs7O1FBR2xDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDbEIsTUFBTSxDQUFDO1NBQ1I7O1FBR0QsdUJBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQyx1QkFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUUxRCxNQUFNLENBQUMsTUFBTSxDQUFDO0tBQ2Y7Ozs7Ozs7OztJQVFELGVBQWUsQ0FBQyxXQUFvQixLQUFLO1FBRXZDLHVCQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztRQUd6QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN2QjtRQUVELE1BQU0sQ0FBQyxNQUFNLENBQUM7S0FDZjs7Ozs7SUFFRCxXQUFXLENBQUMsUUFBaUI7O1FBRTNCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxRQUFRLENBQUM7O1FBRzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDOztRQUd4QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztLQUM1Qjs7OztJQUVPLG1CQUFtQjtRQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDOzs7OztJQUc1QyxxQkFBcUI7UUFDM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2pDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztTQUNyQjs7OztZQWhOSixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBSb3dBbHRTZWxlY3Rpb25TdHJhdGVneSB9IGZyb20gJy4vc3RyYXRlZ2llcy9yb3ctYWx0LXNlbGVjdGlvbi5zdHJhdGVneSc7XG5pbXBvcnQgeyBSb3dTZWxlY3Rpb25TdHJhdGVneSB9IGZyb20gJy4vc3RyYXRlZ2llcy9yb3ctc2VsZWN0aW9uLnN0cmF0ZWd5JztcbmltcG9ydCB7IFNlbGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnLi9zdHJhdGVnaWVzL3NlbGVjdGlvbi5zdHJhdGVneSc7XG5pbXBvcnQgeyBTaW1wbGVTZWxlY3Rpb25TdHJhdGVneSB9IGZyb20gJy4vc3RyYXRlZ2llcy9zaW1wbGUtc2VsZWN0aW9uLnN0cmF0ZWd5JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlbGVjdGlvblNlcnZpY2U8VD4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIHNldCBkYXRhc2V0KGRhdGFzZXQ6IFJlYWRvbmx5QXJyYXk8VD4pIHtcbiAgICB0aGlzLl9kYXRhc2V0ID0gZGF0YXNldDtcbiAgICBpZiAodGhpcy5fZGF0YXNldC5pbmRleE9mKHRoaXMuX2FjdGl2ZSkgPT09IC0xKSB7XG4gICAgICB0aGlzLnNldEZpcnN0SXRlbUZvY3VzYWJsZSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBkYXRhc2V0KCk6IFJlYWRvbmx5QXJyYXk8VD4ge1xuICAgIHJldHVybiB0aGlzLl9kYXRhc2V0O1xuICB9XG5cbiAgc3RyYXRlZ3k6IFNlbGVjdGlvblN0cmF0ZWd5PFQ+ID0gbmV3IFNpbXBsZVNlbGVjdGlvblN0cmF0ZWd5PFQ+KHRoaXMpO1xuICBpc0VuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlO1xuICBpc0NsaWNrRW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XG4gIGlzS2V5Ym9hcmRFbmFibGVkOiBib29sZWFuID0gdHJ1ZTtcblxuICBmb2N1cyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFQ+KG51bGwpO1xuICBhY3RpdmUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUPihudWxsKTtcbiAgc2VsZWN0aW9uJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VFtdPihbXSk7XG5cbiAgcHJpdmF0ZSBfYWN0aXZlOiBUO1xuICBwcml2YXRlIF9kYXRhc2V0OiBSZWFkb25seUFycmF5PFQ+ID0gW107XG4gIHByaXZhdGUgX3NlbGVjdGlvbiA9IG5ldyBTZXQoKTtcbiAgcHJpdmF0ZSBfc3RyYXRlZ3lUb0Rlc3Ryb3k6IFNlbGVjdGlvblN0cmF0ZWd5PFQ+ID0gdGhpcy5zdHJhdGVneTtcblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc3RyYXRlZ3lUb0Rlc3Ryb3kpIHtcbiAgICAgIHRoaXMuX3N0cmF0ZWd5VG9EZXN0cm95LmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSWYgdGhlIGl0ZW0gaXMgbm90IGN1cnJlbnRseSBzZWxlY3RlZCB0aGVuIGFkZCBpdFxuICAgKiB0byB0aGUgbGlzdCBvZiBzZWxlY3RlZCBpdGVtc1xuICAgKi9cbiAgc2VsZWN0KC4uLnNlbGVjdGlvbnM6IFRbXSk6IHZvaWQge1xuXG4gICAgLy8gYWRkIGVhY2ggc2VsZWN0aW9uIHRvIHRoZSBzZXRcbiAgICBzZWxlY3Rpb25zLmZvckVhY2goc2VsZWN0aW9uID0+IHRoaXMuX3NlbGVjdGlvbi5hZGQoc2VsZWN0aW9uKSk7XG5cbiAgICAvLyBwcm9wYWdhdGUgdGhlIGNoYW5nZXNcbiAgICB0aGlzLnNlbGVjdGlvbkhhc011dGF0ZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYW4gaXRlbSBmcm9tIHRoZSBsaXN0IG9mIHNlbGVjdGVkIGl0ZW1zXG4gICAqL1xuICBkZXNlbGVjdCguLi5zZWxlY3Rpb25zOiBUW10pOiB2b2lkIHtcbiAgICAvLyByZW1vdmUgZWFjaCBpdGVtIGZyb20gdGhlIHNldFxuICAgIHNlbGVjdGlvbnMuZm9yRWFjaChzZWxlY3Rpb24gPT4gdGhpcy5fc2VsZWN0aW9uLmRlbGV0ZShzZWxlY3Rpb24pKTtcblxuICAgIC8vIHByb3BhZ2F0ZSB0aGUgY2hhbmdlc1xuICAgIHRoaXMuc2VsZWN0aW9uSGFzTXV0YXRlZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbGwgaXRlbXMgZnJvbSB0aGUgbGlzdCBvZiBzZWxlY3RlZCBpdGVtc1xuICAgKi9cbiAgZGVzZWxlY3RBbGwoKTogdm9pZCB7XG4gICAgLy8gcmVtb3ZlIGFsbCBpdGVtcyBpbiB0aGUgYXJyYXlcbiAgICB0aGlzLmRlc2VsZWN0KC4uLnRoaXMuX2RhdGFzZXQpO1xuXG4gICAgLy8gY2xlYXIgdGhlIHNldCBpbiBjYXNlIGFueSBpdGVtcyBoYXZlIGJlZW4gcmVtb3ZlZCBmcm9tIHRoZSBET00gYnV0IGFyZSBzdGlsbCBzZWxlY3RlZFxuICAgIHRoaXMuX3NlbGVjdGlvbi5jbGVhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZSB0aGUgc2VsZWN0ZWQgc3RhdGUgb2YgYW55IHNwZWNpZmllZCBpdGVtc1xuICAgKi9cbiAgdG9nZ2xlKC4uLnNlbGVjdGlvbnM6IFRbXSk6IHZvaWQge1xuICAgIHNlbGVjdGlvbnMuZm9yRWFjaChzZWxlY3Rpb24gPT4gdGhpcy5pc1NlbGVjdGVkKHNlbGVjdGlvbikgPyB0aGlzLmRlc2VsZWN0KHNlbGVjdGlvbikgOiB0aGlzLnNlbGVjdChzZWxlY3Rpb24pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgd2hldGhlciBvciBub3QgYSBzcGVjaWZpYyBpdGVtIGlzIGN1cnJlbnRseSBzZWxlY3RlZFxuICAgKi9cbiAgaXNTZWxlY3RlZChkYXRhOiBUKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGlvbi5oYXMoZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGFuIG9ic2VydmFibGUgc3BlY2lmaWNhbGx5IGZvciBub3RpZnlpbmcgdGhlIHN1YnNjcmliZXJcbiAgICogb25seSB3aGVuIHRoZSBzZWxlY3Rpb24gc3RhdGUgb2YgYSBzcGVjaWZpYyBvYmplY3QgaGFzIGNoYW5nZWRcbiAgICovXG4gIGdldFNlbGVjdGlvblN0YXRlKGRhdGE6IFQpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb24kLnBpcGUobWFwKCgpID0+IHRoaXMuaXNTZWxlY3RlZChkYXRhKSksIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZSBob3cgc2VsZWN0aW9ucyBzaG91bGQgYmUgcGVyZm9ybWVkLlxuICAgKiBUaGlzIGFsbG93cyB1cyB0byB1c2UgYW4gc3RyYXRlZ3kgcGF0dGVybiB0byBoYW5kbGUgdGhlIHZhcmlvdXMga2V5Ym9hcmRcbiAgICogYW5kIG1vdXNlIGludGVyYWN0aW9ucyB3aGlsZSBrZWVwaW5nIGVhY2ggbW9kZSBzZXBhcmF0ZWQgYW5kXG4gICAqIGVhc2lseSBleHRlbnNpYmxlIGlmIHdlIHdhbnQgdG8gYWRkIG1vcmUgbW9kZXMgaW4gZnV0dXJlIVxuICAgKi9cbiAgc2V0U3RyYXRlZ3kobW9kZTogU2VsZWN0aW9uTW9kZSB8IFNlbGVjdGlvblN0cmF0ZWd5PFQ+KTogdm9pZCB7XG5cbiAgICBpZiAodGhpcy5fc3RyYXRlZ3lUb0Rlc3Ryb3kpIHtcbiAgICAgIC8vIERlc3Ryb3kgcHJldmlvdXMgc3RyYXRlZ3kgaWYgaXQgd2FzIGNyZWF0ZWQgaW50ZXJuYWxseVxuICAgICAgdGhpcy5fc3RyYXRlZ3lUb0Rlc3Ryb3kuZGVzdHJveSgpO1xuICAgICAgdGhpcy5fc3RyYXRlZ3lUb0Rlc3Ryb3kgPSBudWxsO1xuICAgIH1cblxuICAgIGlmIChtb2RlIGluc3RhbmNlb2YgU2VsZWN0aW9uU3RyYXRlZ3kpIHtcblxuICAgICAgLy8gQ3VzdG9tIHN0cmF0ZWd5IC0gcGFzcyBpbiB0aGUgc2VydmljZSBpbnN0YW5jZVxuICAgICAgdGhpcy5zdHJhdGVneSA9IG1vZGU7XG4gICAgICB0aGlzLnN0cmF0ZWd5LnNldFNlbGVjdGlvblNlcnZpY2UodGhpcyk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBzd2l0Y2ggKG1vZGUudG9Mb3dlckNhc2UoKS50cmltKCkpIHtcblxuICAgICAgICBjYXNlICdzaW1wbGUnOlxuICAgICAgICAgIHRoaXMuc3RyYXRlZ3kgPSB0aGlzLl9zdHJhdGVneVRvRGVzdHJveSA9IG5ldyBTaW1wbGVTZWxlY3Rpb25TdHJhdGVneTxUPih0aGlzKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdyb3cnOlxuICAgICAgICAgIHRoaXMuc3RyYXRlZ3kgPSB0aGlzLl9zdHJhdGVneVRvRGVzdHJveSA9IG5ldyBSb3dTZWxlY3Rpb25TdHJhdGVneTxUPih0aGlzKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdyb3ctYWx0JzpcbiAgICAgICAgICB0aGlzLnN0cmF0ZWd5ID0gdGhpcy5fc3RyYXRlZ3lUb0Rlc3Ryb3kgPSBuZXcgUm93QWx0U2VsZWN0aW9uU3RyYXRlZ3k8VD4odGhpcyk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBzZWxlY3Rpb24gbW9kZSAnJHttb2RlfScgZG9lcyBub3QgZXhpc3QuIFZhbGlkIG1vZGVzIGFyZSAnc2ltcGxlJywgJ3JvdycsIG9yICdyb3ctYWx0Jy5gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBjdXJyZW50IGFjdGl2ZSBpdGVtXG4gICAqL1xuICBhY3RpdmF0ZShkYXRhOiBUKTogdm9pZCB7XG4gICAgdGhpcy5fYWN0aXZlID0gZGF0YTtcbiAgICB0aGlzLmFjdGl2ZSQubmV4dCh0aGlzLl9hY3RpdmUpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlYWN0aXZlIGFsbCBpdGVtc1xuICAgKi9cbiAgZGVhY3RpdmF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9hY3RpdmUgPSBudWxsO1xuICAgIHRoaXMuYWN0aXZlJC5uZXh0KHRoaXMuX2FjdGl2ZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBuZXh0IG9yIHByZXZpb3VzIHNpYmxpbmcgb2YgdGhlIGN1cnJlbnQgYWN0aXZlIGl0ZW0uXG4gICAqIEBwYXJhbSBwcmV2aW91cyBJZiB0cnVlLCB0aGUgcHJldmlvdXMgc2libGluZyB3aWxsIGJlIHJldHVybmVkLlxuICAgKi9cbiAgZ2V0U2libGluZyhwcmV2aW91czogYm9vbGVhbiA9IGZhbHNlKTogVCB7XG5cbiAgICAvLyBjaGVjayBpZiB0aGVyZSBpcyBhIGN1cnJlbnQgYWN0aXZlIGl0ZW1cbiAgICBpZiAoIXRoaXMuX2FjdGl2ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGdldCB0aGUgaW5kZXggb2YgdGhlIGN1cnJlbnQgaXRlbVxuICAgIGNvbnN0IGlkeCA9IHRoaXMuZGF0YXNldC5pbmRleE9mKHRoaXMuX2FjdGl2ZSk7XG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5kYXRhc2V0W3ByZXZpb3VzID8gaWR4IC0gMSA6IGlkeCArIDFdO1xuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBY3RpdmF0ZSB0aGUgc2libGluZyBvZiB0aGUgY3VycmVudCBhY3RpdmUgaXRlbS5cbiAgICogSWYgcHJldmlvdXMgaXMgc2V0IHRvIHRydWUgdGhlIHByZXZpb3VzIHNpYmxpbmcgd2lsbCBiZSBhY3RpdmF0ZWRcbiAgICogcmF0aGVyIHRoYW4gdGhlIG5leHQgc2libGluZy4gVGhpcyBmdW5jdGlvbiB3aWxsIGFsc28gcmV0dXJuIHRoZVxuICAgKiBkYXRhIG9mIHRoZSBuZXdseSBhY3RpdmF0ZWQgc2libGluZ1xuICAgKi9cbiAgYWN0aXZhdGVTaWJsaW5nKHByZXZpb3VzOiBib29sZWFuID0gZmFsc2UpOiBUIHtcblxuICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0U2libGluZyhwcmV2aW91cyk7XG5cbiAgICAvLyBjaGVjayBpZiB0aGUgdGFyZ2V0IGV4aXN0c1xuICAgIGlmICh0YXJnZXQpIHtcbiAgICAgIHRoaXMuYWN0aXZhdGUodGFyZ2V0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgc2V0RGlzYWJsZWQoZGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAvLyBzdG9yZSB0aGUgY3VycmVudCBkaXNhYmxlZCBzdGF0ZVxuICAgIHRoaXMuaXNFbmFibGVkID0gIWRpc2FibGVkO1xuXG4gICAgLy8gY2xlYXIgYW55IHN0YXRlZnVsIGRhdGFcbiAgICB0aGlzLl9hY3RpdmUgPSBudWxsO1xuICAgIHRoaXMuYWN0aXZlJC5uZXh0KHRoaXMuX2FjdGl2ZSk7XG4gICAgdGhpcy5fc2VsZWN0aW9uLmNsZWFyKCk7XG5cbiAgICAvLyBlbWl0IHRoZSBzZWxlY3Rpb24gY2hhbmdlIGluZm9ybWF0aW9uXG4gICAgdGhpcy5zZWxlY3Rpb25IYXNNdXRhdGVkKCk7XG4gIH1cblxuICBwcml2YXRlIHNlbGVjdGlvbkhhc011dGF0ZWQoKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3Rpb24kLm5leHQoQXJyYXkuZnJvbSh0aGlzLl9zZWxlY3Rpb24pKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Rmlyc3RJdGVtRm9jdXNhYmxlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9kYXRhc2V0Lmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuZm9jdXMkLm5leHQodGhpcy5fZGF0YXNldFswXSk7XG4gICAgICB0aGlzLl9hY3RpdmUgPSB0aGlzLl9kYXRhc2V0WzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9hY3RpdmUgPSBudWxsO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgdHlwZSBTZWxlY3Rpb25Nb2RlID0gJ3NpbXBsZScgfCAncm93JyB8ICdyb3ctYWx0JzsiXX0=