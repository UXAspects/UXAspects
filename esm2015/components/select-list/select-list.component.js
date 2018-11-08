/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { SelectionService } from '../../directives/selection/selection.service';
import { MultipleSelectListStrategy } from './multiple-select-list.strategy';
import { SelectListItemComponent } from './select-list-item/select-list-item.component';
import { SingleSelectListStrategy } from './single-select-list.strategy';
/**
 * @template T
 */
export class SelectListComponent {
    /**
     * @param {?} _selection
     */
    constructor(_selection) {
        this._selection = _selection;
        /**
         * Emit when the selection changes
         */
        this.selectedChange = new EventEmitter();
        /**
         * Automatically unsubscribe all observables
         */
        this._onDestroy = new Subject();
        // set the selection strategy to single by default
        this._selection.setStrategy(new SingleSelectListStrategy());
        // emit the selection changes when they occur
        this._selection.selection$.pipe(takeUntil(this._onDestroy))
            .subscribe(selection => this.selectedChange.emit(selection));
    }
    /**
     * Determine if we allow multiple items to be selected
     * @param {?} multiple
     * @return {?}
     */
    set multiple(multiple) {
        this._selection.strategy.deselectAll();
        this._selection.setStrategy(multiple ? new MultipleSelectListStrategy() : new SingleSelectListStrategy());
    }
    /**
     * Set the selected items
     * @param {?} selected
     * @return {?}
     */
    set selected(selected) {
        // deselect all currently selected items
        this._selection.deselectAll();
        // select only the specified items
        if (Array.isArray(selected)) {
            this._selection.select(...selected);
        }
        else {
            this._selection.select(selected);
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // supply the initial item set
        this._selection.dataset = this.items.map(item => item.data);
        // if the item set changes update the list
        this.items.changes.pipe(takeUntil(this._onDestroy)).subscribe(() => this._selection.dataset = this.items.map(item => item.data));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
SelectListComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-select-list',
                template: "<ng-content></ng-content>",
                providers: [SelectionService],
                host: {
                    role: 'list'
                }
            }] }
];
/** @nocollapse */
SelectListComponent.ctorParameters = () => [
    { type: SelectionService }
];
SelectListComponent.propDecorators = {
    multiple: [{ type: Input }],
    selected: [{ type: Input }],
    selectedChange: [{ type: Output }],
    items: [{ type: ContentChildren, args: [SelectListItemComponent,] }]
};
function SelectListComponent_tsickle_Closure_declarations() {
    /**
     * Emit when the selection changes
     * @type {?}
     */
    SelectListComponent.prototype.selectedChange;
    /**
     * Find all select list items
     * @type {?}
     */
    SelectListComponent.prototype.items;
    /**
     * Automatically unsubscribe all observables
     * @type {?}
     */
    SelectListComponent.prototype._onDestroy;
    /** @type {?} */
    SelectListComponent.prototype._selection;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VsZWN0LWxpc3Qvc2VsZWN0LWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQW9CLFNBQVMsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hJLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtCQUErQixDQUFDOzs7O0FBVXpFLE1BQU07Ozs7SUErQkYsWUFBb0IsVUFBK0I7UUFBL0IsZUFBVSxHQUFWLFVBQVUsQ0FBcUI7Ozs7OEJBUnhCLElBQUksWUFBWSxFQUFPOzs7OzBCQU03QixJQUFJLE9BQU8sRUFBUTs7UUFJcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSx3QkFBd0IsRUFBSyxDQUFDLENBQUM7O1FBRy9ELElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3RELFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7S0FDcEU7Ozs7OztJQW5DRCxJQUFhLFFBQVEsQ0FBQyxRQUFpQjtRQUNuQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksMEJBQTBCLEVBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSx3QkFBd0IsRUFBSyxDQUFDLENBQUM7S0FDbkg7Ozs7OztJQUdELElBQWEsUUFBUSxDQUFDLFFBQWlCOztRQUduQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDOztRQUc5QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDO1NBQ3ZDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNwQztLQUNKOzs7O0lBb0JELGtCQUFrQjs7UUFHZCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7UUFHNUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUNwSTs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDOUI7OztZQTVESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIscUNBQTJDO2dCQUMzQyxTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDN0IsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxNQUFNO2lCQUNmO2FBQ0o7Ozs7WUFaUSxnQkFBZ0I7Ozt1QkFnQnBCLEtBQUs7dUJBTUwsS0FBSzs2QkFjTCxNQUFNO29CQUdOLGVBQWUsU0FBQyx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBTZWxlY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9zZWxlY3Rpb24vc2VsZWN0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgTXVsdGlwbGVTZWxlY3RMaXN0U3RyYXRlZ3kgfSBmcm9tICcuL211bHRpcGxlLXNlbGVjdC1saXN0LnN0cmF0ZWd5JztcbmltcG9ydCB7IFNlbGVjdExpc3RJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9zZWxlY3QtbGlzdC1pdGVtL3NlbGVjdC1saXN0LWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IFNpbmdsZVNlbGVjdExpc3RTdHJhdGVneSB9IGZyb20gJy4vc2luZ2xlLXNlbGVjdC1saXN0LnN0cmF0ZWd5JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1zZWxlY3QtbGlzdCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NlbGVjdC1saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgICBwcm92aWRlcnM6IFtTZWxlY3Rpb25TZXJ2aWNlXSxcbiAgICBob3N0OiB7XG4gICAgICAgIHJvbGU6ICdsaXN0J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0TGlzdENvbXBvbmVudDxUPiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG5cbiAgICAvKiogRGV0ZXJtaW5lIGlmIHdlIGFsbG93IG11bHRpcGxlIGl0ZW1zIHRvIGJlIHNlbGVjdGVkICovXG4gICAgQElucHV0KCkgc2V0IG11bHRpcGxlKG11bHRpcGxlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGlvbi5zdHJhdGVneS5kZXNlbGVjdEFsbCgpO1xuICAgICAgICB0aGlzLl9zZWxlY3Rpb24uc2V0U3RyYXRlZ3kobXVsdGlwbGUgPyBuZXcgTXVsdGlwbGVTZWxlY3RMaXN0U3RyYXRlZ3k8VD4oKSA6IG5ldyBTaW5nbGVTZWxlY3RMaXN0U3RyYXRlZ3k8VD4oKSk7XG4gICAgfVxuXG4gICAgLyoqIFNldCB0aGUgc2VsZWN0ZWQgaXRlbXMgKi9cbiAgICBASW5wdXQoKSBzZXQgc2VsZWN0ZWQoc2VsZWN0ZWQ6IFQgfCBUW10pIHtcblxuICAgICAgICAvLyBkZXNlbGVjdCBhbGwgY3VycmVudGx5IHNlbGVjdGVkIGl0ZW1zXG4gICAgICAgIHRoaXMuX3NlbGVjdGlvbi5kZXNlbGVjdEFsbCgpO1xuXG4gICAgICAgIC8vIHNlbGVjdCBvbmx5IHRoZSBzcGVjaWZpZWQgaXRlbXNcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2VsZWN0ZWQpKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24uc2VsZWN0KC4uLnNlbGVjdGVkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbi5zZWxlY3Qoc2VsZWN0ZWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEVtaXQgd2hlbiB0aGUgc2VsZWN0aW9uIGNoYW5nZXMgKi9cbiAgICBAT3V0cHV0KCkgc2VsZWN0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFRbXT4oKTtcblxuICAgIC8qKiBGaW5kIGFsbCBzZWxlY3QgbGlzdCBpdGVtcyAqL1xuICAgIEBDb250ZW50Q2hpbGRyZW4oU2VsZWN0TGlzdEl0ZW1Db21wb25lbnQpIGl0ZW1zOiBRdWVyeUxpc3Q8U2VsZWN0TGlzdEl0ZW1Db21wb25lbnQ8VD4+O1xuXG4gICAgLyoqIEF1dG9tYXRpY2FsbHkgdW5zdWJzY3JpYmUgYWxsIG9ic2VydmFibGVzICovXG4gICAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlbGVjdGlvbjogU2VsZWN0aW9uU2VydmljZTxUPikge1xuICAgICAgICAvLyBzZXQgdGhlIHNlbGVjdGlvbiBzdHJhdGVneSB0byBzaW5nbGUgYnkgZGVmYXVsdFxuICAgICAgICB0aGlzLl9zZWxlY3Rpb24uc2V0U3RyYXRlZ3kobmV3IFNpbmdsZVNlbGVjdExpc3RTdHJhdGVneTxUPigpKTtcblxuICAgICAgICAvLyBlbWl0IHRoZSBzZWxlY3Rpb24gY2hhbmdlcyB3aGVuIHRoZXkgb2NjdXJcbiAgICAgICAgdGhpcy5fc2VsZWN0aW9uLnNlbGVjdGlvbiQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoc2VsZWN0aW9uID0+IHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdChzZWxlY3Rpb24pKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gc3VwcGx5IHRoZSBpbml0aWFsIGl0ZW0gc2V0XG4gICAgICAgIHRoaXMuX3NlbGVjdGlvbi5kYXRhc2V0ID0gdGhpcy5pdGVtcy5tYXAoaXRlbSA9PiBpdGVtLmRhdGEpO1xuXG4gICAgICAgIC8vIGlmIHRoZSBpdGVtIHNldCBjaGFuZ2VzIHVwZGF0ZSB0aGUgbGlzdFxuICAgICAgICB0aGlzLml0ZW1zLmNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKCgpID0+IHRoaXMuX3NlbGVjdGlvbi5kYXRhc2V0ID0gdGhpcy5pdGVtcy5tYXAoaXRlbSA9PiBpdGVtLmRhdGEpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgfVxufSJdfQ==