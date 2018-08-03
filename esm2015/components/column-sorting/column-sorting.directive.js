/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
export class ColumnSortingDirective {
    constructor() {
        this.events = new Subject();
        this.order = [];
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.events.complete();
    }
    /**
     * @param {?} sorting
     * @return {?}
     */
    toggleColumn(sorting) {
        // apply sorting based on the single or multiple sort
        this.order = this.singleSort ? this.toggleSingleColumn(sorting) : this.toggleMultipleColumn(sorting);
        // emit the latest order
        this.events.next(this.order);
        return this.order;
    }
    /**
     * @param {?} sorting
     * @return {?}
     */
    toggleSingleColumn(sorting) {
        return sorting.state === ColumnSortingState.NoSort ? [] : [{ key: sorting.key, state: sorting.state }];
    }
    /**
     * @param {?} sorting
     * @return {?}
     */
    toggleMultipleColumn(sorting) {
        // reorder columns here
        const /** @type {?} */ idx = this.order.findIndex(column => column.key === sorting.key);
        // if wasnt previously selected add to list
        if (idx === -1) {
            return [...this.order, { key: sorting.key, state: sorting.state }];
        }
        // if we are sorting it change the sorting order
        if (sorting.state === ColumnSortingState.Ascending || sorting.state === ColumnSortingState.Descending) {
            return [...this.order.filter(_column => _column.key !== sorting.key), { key: sorting.key, state: sorting.state }];
        }
        // Otherwise remove the item
        return this.order.filter(_column => _column.key !== sorting.key);
    }
}
ColumnSortingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxColumnSorting]'
            },] }
];
ColumnSortingDirective.propDecorators = {
    singleSort: [{ type: Input }]
};
function ColumnSortingDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    ColumnSortingDirective.prototype.singleSort;
    /** @type {?} */
    ColumnSortingDirective.prototype.events;
    /** @type {?} */
    ColumnSortingDirective.prototype.order;
}
/**
 * @record
 */
export function ColumnSortingOrder() { }
function ColumnSortingOrder_tsickle_Closure_declarations() {
    /** @type {?} */
    ColumnSortingOrder.prototype.key;
    /** @type {?} */
    ColumnSortingOrder.prototype.state;
}
/** @enum {string} */
const ColumnSortingState = {
    Ascending: 'ascending',
    Descending: 'descending',
    NoSort: 'none',
};
export { ColumnSortingState };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXNvcnRpbmcuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY29sdW1uLXNvcnRpbmcvY29sdW1uLXNvcnRpbmcuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUM1RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBS3ZDLE1BQU07O3NCQUdPLElBQUksT0FBTyxFQUF3QjtxQkFDZCxFQUFFOzs7OztJQUVoQyxXQUFXO1FBQ1AsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUMxQjs7Ozs7SUFFRCxZQUFZLENBQUMsT0FBMkI7O1FBR3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7O1FBR3JHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU3QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztLQUNyQjs7Ozs7SUFFTyxrQkFBa0IsQ0FBQyxPQUEyQjtRQUNsRCxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQzs7Ozs7O0lBR25HLG9CQUFvQixDQUFDLE9BQTJCOztRQUVwRCx1QkFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzs7UUFHdkUsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNiLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUN0RTs7UUFHRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLGtCQUFrQixDQUFDLFNBQVMsSUFBSSxPQUFPLENBQUMsS0FBSyxLQUFLLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDcEcsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQ3JIOztRQUdELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7O1lBM0N4RSxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG1CQUFtQjthQUNoQzs7O3lCQUdJLEtBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFnRE0sV0FBVztnQkFDVixZQUFZO1lBQ2hCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t1eENvbHVtblNvcnRpbmddJ1xufSlcbmV4cG9ydCBjbGFzcyBDb2x1bW5Tb3J0aW5nRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIHNpbmdsZVNvcnQ6IGJvb2xlYW47XG4gICAgZXZlbnRzID0gbmV3IFN1YmplY3Q8Q29sdW1uU29ydGluZ09yZGVyW10+KCk7XG4gICAgb3JkZXI6IENvbHVtblNvcnRpbmdPcmRlcltdID0gW107XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ldmVudHMuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICB0b2dnbGVDb2x1bW4oc29ydGluZzogQ29sdW1uU29ydGluZ09yZGVyKTogQ29sdW1uU29ydGluZ09yZGVyW10ge1xuXG4gICAgICAgIC8vIGFwcGx5IHNvcnRpbmcgYmFzZWQgb24gdGhlIHNpbmdsZSBvciBtdWx0aXBsZSBzb3J0XG4gICAgICAgIHRoaXMub3JkZXIgPSB0aGlzLnNpbmdsZVNvcnQgPyB0aGlzLnRvZ2dsZVNpbmdsZUNvbHVtbihzb3J0aW5nKSA6IHRoaXMudG9nZ2xlTXVsdGlwbGVDb2x1bW4oc29ydGluZyk7XG5cbiAgICAgICAgLy8gZW1pdCB0aGUgbGF0ZXN0IG9yZGVyXG4gICAgICAgIHRoaXMuZXZlbnRzLm5leHQodGhpcy5vcmRlcik7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub3JkZXI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0b2dnbGVTaW5nbGVDb2x1bW4oc29ydGluZzogQ29sdW1uU29ydGluZ09yZGVyKTogQ29sdW1uU29ydGluZ09yZGVyW10ge1xuICAgICAgICByZXR1cm4gc29ydGluZy5zdGF0ZSA9PT0gQ29sdW1uU29ydGluZ1N0YXRlLk5vU29ydCA/IFtdIDogW3sga2V5OiBzb3J0aW5nLmtleSwgc3RhdGU6IHNvcnRpbmcuc3RhdGUgfV07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0b2dnbGVNdWx0aXBsZUNvbHVtbihzb3J0aW5nOiBDb2x1bW5Tb3J0aW5nT3JkZXIpOiBDb2x1bW5Tb3J0aW5nT3JkZXJbXSB7XG4gICAgICAgIC8vIHJlb3JkZXIgY29sdW1ucyBoZXJlXG4gICAgICAgIGNvbnN0IGlkeCA9IHRoaXMub3JkZXIuZmluZEluZGV4KGNvbHVtbiA9PiBjb2x1bW4ua2V5ID09PSBzb3J0aW5nLmtleSk7XG5cbiAgICAgICAgLy8gaWYgd2FzbnQgcHJldmlvdXNseSBzZWxlY3RlZCBhZGQgdG8gbGlzdFxuICAgICAgICBpZiAoaWR4ID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIFsuLi50aGlzLm9yZGVyLCB7IGtleTogc29ydGluZy5rZXksIHN0YXRlOiBzb3J0aW5nLnN0YXRlIH1dO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgd2UgYXJlIHNvcnRpbmcgaXQgY2hhbmdlIHRoZSBzb3J0aW5nIG9yZGVyXG4gICAgICAgIGlmIChzb3J0aW5nLnN0YXRlID09PSBDb2x1bW5Tb3J0aW5nU3RhdGUuQXNjZW5kaW5nIHx8IHNvcnRpbmcuc3RhdGUgPT09IENvbHVtblNvcnRpbmdTdGF0ZS5EZXNjZW5kaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gWy4uLnRoaXMub3JkZXIuZmlsdGVyKF9jb2x1bW4gPT4gX2NvbHVtbi5rZXkgIT09IHNvcnRpbmcua2V5KSwgeyBrZXk6IHNvcnRpbmcua2V5LCBzdGF0ZTogc29ydGluZy5zdGF0ZSB9XTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE90aGVyd2lzZSByZW1vdmUgdGhlIGl0ZW1cbiAgICAgICAgcmV0dXJuIHRoaXMub3JkZXIuZmlsdGVyKF9jb2x1bW4gPT4gX2NvbHVtbi5rZXkgIT09IHNvcnRpbmcua2V5KTtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29sdW1uU29ydGluZ09yZGVyIHtcbiAgICBrZXk6IHN0cmluZztcbiAgICBzdGF0ZTogQ29sdW1uU29ydGluZ1N0YXRlO1xufVxuXG5leHBvcnQgZW51bSBDb2x1bW5Tb3J0aW5nU3RhdGUge1xuICAgIEFzY2VuZGluZyA9ICdhc2NlbmRpbmcnLFxuICAgIERlc2NlbmRpbmcgPSAnZGVzY2VuZGluZycsXG4gICAgTm9Tb3J0ID0gJ25vbmUnXG59Il19