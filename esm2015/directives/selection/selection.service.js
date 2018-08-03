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
    { type: Injectable }
];
/** @nocollapse */
SelectionService.ctorParameters = () => [];
function SelectionService_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9zZWxlY3Rpb24vc2VsZWN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXZELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNsRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUdqRixNQUFNO0lBZUo7MEJBYnFCLElBQUksR0FBRyxFQUFFO3VCQUdiLEVBQUU7dUJBQ0EsSUFBSTs0QkFDQyxJQUFJOytCQUNELElBQUk7d0JBQ0QsSUFBSSx1QkFBdUIsQ0FBQyxJQUFJLENBQUM7dUJBRXJELElBQUksZUFBZSxDQUFNLElBQUksQ0FBQzs0QkFDekIsSUFBSSxlQUFlLENBQU0sSUFBSSxDQUFDOzBCQUNoQyxJQUFJLGVBQWUsQ0FBUSxFQUFFLENBQUM7UUFHekMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDekM7Ozs7SUFFRCxXQUFXO1FBQ1QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDbkM7S0FDRjs7Ozs7OztJQU1ELE1BQU0sQ0FBQyxHQUFHLFVB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b3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFJvd0FsdFNlbGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnLi9zdHJhdGVnaWVzL3Jvdy1hbHQtc2VsZWN0aW9uLnN0cmF0ZWd5JztcbmltcG9ydCB7IFJvd1NlbGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnLi9zdHJhdGVnaWVzL3Jvdy1zZWxlY3Rpb24uc3RyYXRlZ3knO1xuaW1wb3J0IHsgU2VsZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICcuL3N0cmF0ZWdpZXMvc2VsZWN0aW9uLnN0cmF0ZWd5JztcbmltcG9ydCB7IFNpbXBsZVNlbGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnLi9zdHJhdGVnaWVzL3NpbXBsZS1zZWxlY3Rpb24uc3RyYXRlZ3knO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VsZWN0aW9uU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgcHJpdmF0ZSBfc2VsZWN0aW9uID0gbmV3IFNldCgpO1xuICBwcml2YXRlIF9zdHJhdGVneVRvRGVzdHJveTogU2VsZWN0aW9uU3RyYXRlZ3k7XG5cbiAgZGF0YXNldDogYW55W10gPSBbXTtcbiAgZW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XG4gIGNsaWNrRW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XG4gIGtleWJvYXJkRW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XG4gIHN0cmF0ZWd5OiBTZWxlY3Rpb25TdHJhdGVneSA9IG5ldyBTaW1wbGVTZWxlY3Rpb25TdHJhdGVneSh0aGlzKTtcblxuICBhY3RpdmUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KG51bGwpO1xuICBmb2N1c1RhcmdldCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4obnVsbCk7XG4gIHNlbGVjdGlvbiQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueVtdPihbXSk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fc3RyYXRlZ3lUb0Rlc3Ryb3kgPSB0aGlzLnN0cmF0ZWd5O1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3N0cmF0ZWd5VG9EZXN0cm95KSB7XG4gICAgICB0aGlzLl9zdHJhdGVneVRvRGVzdHJveS5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIElmIHRoZSBpdGVtIGlzIG5vdCBjdXJyZW50bHkgc2VsZWN0ZWQgdGhlbiBhZGQgaXRcbiAgICogdG8gdGhlIGxpc3Qgb2Ygc2VsZWN0ZWQgaXRlbXNcbiAgICovXG4gIHNlbGVjdCguLi5zZWxlY3Rpb25zOiBhbnlbXSk6IHZvaWQge1xuXG4gICAgLy8gYWRkIGVhY2ggc2VsZWN0aW9uIHRvIHRoZSBzZXRcbiAgICBzZWxlY3Rpb25zLmZvckVhY2goc2VsZWN0aW9uID0+IHRoaXMuX3NlbGVjdGlvbi5hZGQoc2VsZWN0aW9uKSk7XG5cbiAgICAvLyBwcm9wYWdhdGUgdGhlIGNoYW5nZXNcbiAgICB0aGlzLnNlbGVjdGlvbkhhc011dGF0ZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYW4gaXRlbSBmcm9tIHRoZSBsaXN0IG9mIHNlbGVjdGVkIGl0ZW1zXG4gICAqL1xuICBkZXNlbGVjdCguLi5zZWxlY3Rpb25zOiBhbnlbXSk6IHZvaWQge1xuICAgIC8vIHJlbW92ZSBlYWNoIGl0ZW0gZnJvbSB0aGUgc2V0XG4gICAgc2VsZWN0aW9ucy5mb3JFYWNoKHNlbGVjdGlvbiA9PiB0aGlzLl9zZWxlY3Rpb24uZGVsZXRlKHNlbGVjdGlvbikpO1xuXG4gICAgLy8gcHJvcGFnYXRlIHRoZSBjaGFuZ2VzXG4gICAgdGhpcy5zZWxlY3Rpb25IYXNNdXRhdGVkKCk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlIHRoZSBzZWxlY3RlZCBzdGF0ZSBvZiBhbnkgc3BlY2lmaWVkIGl0ZW1zXG4gICAqL1xuICB0b2dnbGUoLi4uc2VsZWN0aW9uczogYW55W10pOiB2b2lkIHtcbiAgICBzZWxlY3Rpb25zLmZvckVhY2goc2VsZWN0aW9uID0+IHRoaXMuaXNTZWxlY3RlZChzZWxlY3Rpb24pID8gdGhpcy5kZXNlbGVjdChzZWxlY3Rpb24pIDogdGhpcy5zZWxlY3Qoc2VsZWN0aW9uKSk7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lIHdoZXRoZXIgb3Igbm90IGEgc3BlY2lmaWMgaXRlbSBpcyBjdXJyZW50bHkgc2VsZWN0ZWRcbiAgICovXG4gIGlzU2VsZWN0ZWQoZGF0YTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGlvbi5oYXMoZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGFuIG9ic2VydmFibGUgc3BlY2lmaWNhbGx5IGZvciBub3RpZnlpbmcgdGhlIHN1YnNjcmliZXJcbiAgICogb25seSB3aGVuIHRoZSBzZWxlY3Rpb24gc3RhdGUgb2YgYSBzcGVjaWZpYyBvYmplY3QgaGFzIGNoYW5nZWRcbiAgICovXG4gIHNlbGVjdGVkJChkYXRhOiBhbnkpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb24kLnBpcGUobWFwKCgpID0+IHRoaXMuaXNTZWxlY3RlZChkYXRhKSksIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZSBob3cgc2VsZWN0aW9ucyBzaG91bGQgYmUgcGVyZm9ybWVkLlxuICAgKiBUaGlzIGFsbG93cyB1cyB0byB1c2UgYW4gc3RyYXRlZ3kgcGF0dGVybiB0byBoYW5kbGUgdGhlIHZhcmlvdXMga2V5Ym9hcmRcbiAgICogYW5kIG1vdXNlIGludGVyYWN0aW9ucyB3aGlsZSBrZWVwaW5nIGVhY2ggbW9kZSBzZXBhcmF0ZWQgYW5kXG4gICAqIGVhc2lseSBleHRlbnNpYmxlIGlmIHdlIHdhbnQgdG8gYWRkIG1vcmUgbW9kZXMgaW4gZnV0dXJlIVxuICAgKi9cbiAgc2V0TW9kZShtb2RlOiBTZWxlY3Rpb25Nb2RlIHwgU2VsZWN0aW9uU3RyYXRlZ3kpOiB2b2lkIHtcblxuICAgIGlmICh0aGlzLl9zdHJhdGVneVRvRGVzdHJveSkge1xuICAgICAgLy8gRGVzdHJveSBwcmV2aW91cyBzdHJhdGVneSBpZiBpdCB3YXMgY3JlYXRlZCBpbnRlcm5hbGx5XG4gICAgICB0aGlzLl9zdHJhdGVneVRvRGVzdHJveS5kZXN0cm95KCk7XG4gICAgICB0aGlzLl9zdHJhdGVneVRvRGVzdHJveSA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKG1vZGUgaW5zdGFuY2VvZiBTZWxlY3Rpb25TdHJhdGVneSkge1xuXG4gICAgICAvLyBDdXN0b20gc3RyYXRlZ3kgLSBwYXNzIGluIHRoZSBzZXJ2aWNlIGluc3RhbmNlXG4gICAgICB0aGlzLnN0cmF0ZWd5ID0gbW9kZTtcbiAgICAgIHRoaXMuc3RyYXRlZ3kuc2V0U2VsZWN0aW9uU2VydmljZSh0aGlzKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHN3aXRjaCAobW9kZS50b0xvd2VyQ2FzZSgpLnRyaW0oKSkge1xuXG4gICAgICAgIGNhc2UgJ3NpbXBsZSc6XG4gICAgICAgICAgdGhpcy5zdHJhdGVneSA9IHRoaXMuX3N0cmF0ZWd5VG9EZXN0cm95ID0gbmV3IFNpbXBsZVNlbGVjdGlvblN0cmF0ZWd5KHRoaXMpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3Jvdyc6XG4gICAgICAgICAgdGhpcy5zdHJhdGVneSA9IHRoaXMuX3N0cmF0ZWd5VG9EZXN0cm95ID0gbmV3IFJvd1NlbGVjdGlvblN0cmF0ZWd5KHRoaXMpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3Jvdy1hbHQnOlxuICAgICAgICAgIHRoaXMuc3RyYXRlZ3kgPSB0aGlzLl9zdHJhdGVneVRvRGVzdHJveSA9IG5ldyBSb3dBbHRTZWxlY3Rpb25TdHJhdGVneSh0aGlzKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIHNlbGVjdGlvbiBtb2RlICcke21vZGV9JyBkb2VzIG5vdCBleGlzdC4gVmFsaWQgbW9kZXMgYXJlICdzaW1wbGUnLCAncm93Jywgb3IgJ3Jvdy1hbHQnLmApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGN1cnJlbnQgYWN0aXZlIGl0ZW1cbiAgICovXG4gIGFjdGl2YXRlKGRhdGE6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZlJC5uZXh0KGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlYWN0aXZlIGFsbCBpdGVtc1xuICAgKi9cbiAgZGVhY3RpdmF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2ZSQubmV4dChudWxsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIG5leHQgb3IgcHJldmlvdXMgc2libGluZyBvZiB0aGUgY3VycmVudCBhY3RpdmUgaXRlbS5cbiAgICogQHBhcmFtIHByZXZpb3VzIElmIHRydWUsIHRoZSBwcmV2aW91cyBzaWJsaW5nIHdpbGwgYmUgcmV0dXJuZWQuXG4gICAqL1xuICBnZXRTaWJsaW5nKHByZXZpb3VzOiBib29sZWFuID0gZmFsc2UpOiBhbnkge1xuXG4gICAgLy8gZ2V0IHRoZSBjdXJyZW50bHkgYWN0aXZlIGl0ZW1cbiAgICBjb25zdCBjdXJyZW50ID0gdGhpcy5hY3RpdmUkLmdldFZhbHVlKCk7XG5cbiAgICAvLyBjaGVjayBpZiB0aGVyZSBpcyBhIGN1cnJlbnQgYWN0aXZlIGl0ZW1cbiAgICBpZiAoIWN1cnJlbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBnZXQgdGhlIGluZGV4IG9mIHRoZSBjdXJyZW50IGl0ZW1cbiAgICBjb25zdCBpZHggPSB0aGlzLmRhdGFzZXQuaW5kZXhPZihjdXJyZW50KTtcbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmRhdGFzZXRbcHJldmlvdXMgPyBpZHggLSAxIDogaWR4ICsgMV07XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIEFjdGl2YXRlIHRoZSBzaWJsaW5nIG9mIHRoZSBjdXJyZW50IGFjdGl2ZSBpdGVtLlxuICAgKiBJZiBwcmV2aW91cyBpcyBzZXQgdG8gdHJ1ZSB0aGUgcHJldmlvdXMgc2libGluZyB3aWxsIGJlIGFjdGl2YXRlZFxuICAgKiByYXRoZXIgdGhhbiB0aGUgbmV4dCBzaWJsaW5nLiBUaGlzIGZ1bmN0aW9uIHdpbGwgYWxzbyByZXR1cm4gdGhlXG4gICAqIGRhdGEgb2YgdGhlIG5ld2x5IGFjdGl2YXRlZCBzaWJsaW5nXG4gICAqL1xuICBhY3RpdmF0ZVNpYmxpbmcocHJldmlvdXM6IGJvb2xlYW4gPSBmYWxzZSk6IGFueSB7XG5cbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldFNpYmxpbmcocHJldmlvdXMpO1xuXG4gICAgLy8gY2hlY2sgaWYgdGhlIHRhcmdldCBleGlzdHNcbiAgICBpZiAodGFyZ2V0KSB7XG4gICAgICB0aGlzLmFjdGl2YXRlKHRhcmdldCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIHNldERpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgLy8gc3RvcmUgdGhlIGN1cnJlbnQgZGlzYWJsZWQgc3RhdGVcbiAgICB0aGlzLmVuYWJsZWQgPSAhZGlzYWJsZWQ7XG5cbiAgICAvLyBjbGVhciBhbnkgc3RhdGVmdWwgZGF0YVxuICAgIHRoaXMuYWN0aXZlJC5uZXh0KG51bGwpO1xuICAgIHRoaXMuX3NlbGVjdGlvbi5jbGVhcigpO1xuXG4gICAgLy8gZW1pdCB0aGUgc2VsZWN0aW9uIGNoYW5nZSBpbmZvcm1hdGlvblxuICAgIHRoaXMuc2VsZWN0aW9uSGFzTXV0YXRlZCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZWxlY3Rpb25IYXNNdXRhdGVkKCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0aW9uJC5uZXh0KEFycmF5LmZyb20odGhpcy5fc2VsZWN0aW9uKSk7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgU2VsZWN0aW9uTW9kZSA9ICdzaW1wbGUnIHwgJ3JvdycgfCAncm93LWFsdCc7XG4iXX0=