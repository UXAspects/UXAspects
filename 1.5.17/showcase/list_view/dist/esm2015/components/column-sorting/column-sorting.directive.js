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
            },] },
];
/** @nocollapse */
ColumnSortingDirective.ctorParameters = () => [];
ColumnSortingDirective.propDecorators = {
    "singleSort": [{ type: Input },],
};
function ColumnSortingDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ColumnSortingDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ColumnSortingDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    ColumnSortingDirective.propDecorators;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXNvcnRpbmcuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY29sdW1uLXNvcnRpbmcvY29sdW1uLXNvcnRpbmcuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUM1RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBS3ZDLE1BQU07O3NCQUdPLElBQUksT0FBTyxFQUF3QjtxQkFDZCxFQUFFOzs7OztJQUVoQyxXQUFXO1FBQ1AsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUMxQjs7Ozs7SUFFRCxZQUFZLENBQUMsT0FBMkI7O1FBR3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDOztRQUdyRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDckI7Ozs7O0lBRU8sa0JBQWtCLENBQUMsT0FBMkI7UUFDbEQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssa0JBQWtCLENBQUMsTUFBTSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDOzs7Ozs7SUFHbkcsb0JBQW9CLENBQUMsT0FBMkI7O1FBRXBELHVCQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLEdBQUcsS0FBSyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7O1FBR3ZFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDYixNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDdEU7O1FBR0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxrQkFBa0IsQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDLEtBQUssS0FBSyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3BHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLEtBQUssT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQ3JIOztRQUdELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLEdBQUcsS0FBSyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7WUEzQ3hFLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsbUJBQW1CO2FBQ2hDOzs7OzsyQkFHSSxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBZ0RNLFdBQVc7Z0JBQ1YsWUFBWTtZQUNoQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhDb2x1bW5Tb3J0aW5nXSdcbn0pXG5leHBvcnQgY2xhc3MgQ29sdW1uU29ydGluZ0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBzaW5nbGVTb3J0OiBib29sZWFuO1xuICAgIGV2ZW50cyA9IG5ldyBTdWJqZWN0PENvbHVtblNvcnRpbmdPcmRlcltdPigpO1xuICAgIG9yZGVyOiBDb2x1bW5Tb3J0aW5nT3JkZXJbXSA9IFtdO1xuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZXZlbnRzLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlQ29sdW1uKHNvcnRpbmc6IENvbHVtblNvcnRpbmdPcmRlcik6IENvbHVtblNvcnRpbmdPcmRlcltdIHtcblxuICAgICAgICAvLyBhcHBseSBzb3J0aW5nIGJhc2VkIG9uIHRoZSBzaW5nbGUgb3IgbXVsdGlwbGUgc29ydFxuICAgICAgICB0aGlzLm9yZGVyID0gdGhpcy5zaW5nbGVTb3J0ID8gdGhpcy50b2dnbGVTaW5nbGVDb2x1bW4oc29ydGluZykgOiB0aGlzLnRvZ2dsZU11bHRpcGxlQ29sdW1uKHNvcnRpbmcpO1xuXG4gICAgICAgIC8vIGVtaXQgdGhlIGxhdGVzdCBvcmRlclxuICAgICAgICB0aGlzLmV2ZW50cy5uZXh0KHRoaXMub3JkZXIpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm9yZGVyO1xuICAgIH1cblxuICAgIHByaXZhdGUgdG9nZ2xlU2luZ2xlQ29sdW1uKHNvcnRpbmc6IENvbHVtblNvcnRpbmdPcmRlcik6IENvbHVtblNvcnRpbmdPcmRlcltdIHtcbiAgICAgICAgcmV0dXJuIHNvcnRpbmcuc3RhdGUgPT09IENvbHVtblNvcnRpbmdTdGF0ZS5Ob1NvcnQgPyBbXSA6IFt7IGtleTogc29ydGluZy5rZXksIHN0YXRlOiBzb3J0aW5nLnN0YXRlIH1dO1xuICAgIH1cblxuICAgIHByaXZhdGUgdG9nZ2xlTXVsdGlwbGVDb2x1bW4oc29ydGluZzogQ29sdW1uU29ydGluZ09yZGVyKTogQ29sdW1uU29ydGluZ09yZGVyW10ge1xuICAgICAgICAvLyByZW9yZGVyIGNvbHVtbnMgaGVyZVxuICAgICAgICBjb25zdCBpZHggPSB0aGlzLm9yZGVyLmZpbmRJbmRleChjb2x1bW4gPT4gY29sdW1uLmtleSA9PT0gc29ydGluZy5rZXkpO1xuXG4gICAgICAgIC8vIGlmIHdhc250IHByZXZpb3VzbHkgc2VsZWN0ZWQgYWRkIHRvIGxpc3RcbiAgICAgICAgaWYgKGlkeCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiBbLi4udGhpcy5vcmRlciwgeyBrZXk6IHNvcnRpbmcua2V5LCBzdGF0ZTogc29ydGluZy5zdGF0ZSB9XTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHdlIGFyZSBzb3J0aW5nIGl0IGNoYW5nZSB0aGUgc29ydGluZyBvcmRlclxuICAgICAgICBpZiAoc29ydGluZy5zdGF0ZSA9PT0gQ29sdW1uU29ydGluZ1N0YXRlLkFzY2VuZGluZyB8fCBzb3J0aW5nLnN0YXRlID09PSBDb2x1bW5Tb3J0aW5nU3RhdGUuRGVzY2VuZGluZykge1xuICAgICAgICAgICAgcmV0dXJuIFsuLi50aGlzLm9yZGVyLmZpbHRlcihfY29sdW1uID0+IF9jb2x1bW4ua2V5ICE9PSBzb3J0aW5nLmtleSksIHsga2V5OiBzb3J0aW5nLmtleSwgc3RhdGU6IHNvcnRpbmcuc3RhdGUgfV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBPdGhlcndpc2UgcmVtb3ZlIHRoZSBpdGVtXG4gICAgICAgIHJldHVybiB0aGlzLm9yZGVyLmZpbHRlcihfY29sdW1uID0+IF9jb2x1bW4ua2V5ICE9PSBzb3J0aW5nLmtleSk7XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbHVtblNvcnRpbmdPcmRlciB7XG4gICAga2V5OiBzdHJpbmc7XG4gICAgc3RhdGU6IENvbHVtblNvcnRpbmdTdGF0ZTtcbn1cblxuZXhwb3J0IGVudW0gQ29sdW1uU29ydGluZ1N0YXRlIHtcbiAgICBBc2NlbmRpbmcgPSAnYXNjZW5kaW5nJyxcbiAgICBEZXNjZW5kaW5nID0gJ2Rlc2NlbmRpbmcnLFxuICAgIE5vU29ydCA9ICdub25lJ1xufSJdfQ==