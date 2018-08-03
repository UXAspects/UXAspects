/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
var ColumnSortingDirective = /** @class */ (function () {
    function ColumnSortingDirective() {
        this.events = new Subject();
        this.order = [];
    }
    /**
     * @return {?}
     */
    ColumnSortingDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.events.complete();
    };
    /**
     * @param {?} sorting
     * @return {?}
     */
    ColumnSortingDirective.prototype.toggleColumn = /**
     * @param {?} sorting
     * @return {?}
     */
    function (sorting) {
        // apply sorting based on the single or multiple sort
        this.order = this.singleSort ? this.toggleSingleColumn(sorting) : this.toggleMultipleColumn(sorting);
        // emit the latest order
        this.events.next(this.order);
        return this.order;
    };
    /**
     * @param {?} sorting
     * @return {?}
     */
    ColumnSortingDirective.prototype.toggleSingleColumn = /**
     * @param {?} sorting
     * @return {?}
     */
    function (sorting) {
        return sorting.state === ColumnSortingState.NoSort ? [] : [{ key: sorting.key, state: sorting.state }];
    };
    /**
     * @param {?} sorting
     * @return {?}
     */
    ColumnSortingDirective.prototype.toggleMultipleColumn = /**
     * @param {?} sorting
     * @return {?}
     */
    function (sorting) {
        // reorder columns here
        var /** @type {?} */ idx = this.order.findIndex(function (column) { return column.key === sorting.key; });
        // if wasnt previously selected add to list
        if (idx === -1) {
            return tslib_1.__spread(this.order, [{ key: sorting.key, state: sorting.state }]);
        }
        // if we are sorting it change the sorting order
        if (sorting.state === ColumnSortingState.Ascending || sorting.state === ColumnSortingState.Descending) {
            return tslib_1.__spread(this.order.filter(function (_column) { return _column.key !== sorting.key; }), [{ key: sorting.key, state: sorting.state }]);
        }
        // Otherwise remove the item
        return this.order.filter(function (_column) { return _column.key !== sorting.key; });
    };
    ColumnSortingDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxColumnSorting]'
                },] }
    ];
    ColumnSortingDirective.propDecorators = {
        singleSort: [{ type: Input }]
    };
    return ColumnSortingDirective;
}());
export { ColumnSortingDirective };
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
var ColumnSortingState = {
    Ascending: 'ascending',
    Descending: 'descending',
    NoSort: 'none',
};
export { ColumnSortingState };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXNvcnRpbmcuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY29sdW1uLXNvcnRpbmcvY29sdW1uLXNvcnRpbmcuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQzs7O3NCQVExQixJQUFJLE9BQU8sRUFBd0I7cUJBQ2QsRUFBRTs7Ozs7SUFFaEMsNENBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUMxQjs7Ozs7SUFFRCw2Q0FBWTs7OztJQUFaLFVBQWEsT0FBMkI7O1FBR3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7O1FBR3JHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU3QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztLQUNyQjs7Ozs7SUFFTyxtREFBa0I7Ozs7Y0FBQyxPQUEyQjtRQUNsRCxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQzs7Ozs7O0lBR25HLHFEQUFvQjs7OztjQUFDLE9BQTJCOztRQUVwRCxxQkFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsR0FBRyxLQUFLLE9BQU8sQ0FBQyxHQUFHLEVBQTFCLENBQTBCLENBQUMsQ0FBQzs7UUFHdkUsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNiLE1BQU0sa0JBQUssSUFBSSxDQUFDLEtBQUssR0FBRSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUU7U0FDdEU7O1FBR0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxrQkFBa0IsQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDLEtBQUssS0FBSyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3BHLE1BQU0sa0JBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxLQUFLLE9BQU8sQ0FBQyxHQUFHLEVBQTNCLENBQTJCLENBQUMsR0FBRSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUU7U0FDckg7O1FBR0QsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsS0FBSyxPQUFPLENBQUMsR0FBRyxFQUEzQixDQUEyQixDQUFDLENBQUM7OztnQkEzQ3hFLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsbUJBQW1CO2lCQUNoQzs7OzZCQUdJLEtBQUs7O2lDQVJWOztTQU1hLHNCQUFzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBa0RuQixXQUFXO2dCQUNWLFlBQVk7WUFDaEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4Q29sdW1uU29ydGluZ10nXG59KVxuZXhwb3J0IGNsYXNzIENvbHVtblNvcnRpbmdEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgc2luZ2xlU29ydDogYm9vbGVhbjtcbiAgICBldmVudHMgPSBuZXcgU3ViamVjdDxDb2x1bW5Tb3J0aW5nT3JkZXJbXT4oKTtcbiAgICBvcmRlcjogQ29sdW1uU29ydGluZ09yZGVyW10gPSBbXTtcblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmV2ZW50cy5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIHRvZ2dsZUNvbHVtbihzb3J0aW5nOiBDb2x1bW5Tb3J0aW5nT3JkZXIpOiBDb2x1bW5Tb3J0aW5nT3JkZXJbXSB7XG5cbiAgICAgICAgLy8gYXBwbHkgc29ydGluZyBiYXNlZCBvbiB0aGUgc2luZ2xlIG9yIG11bHRpcGxlIHNvcnRcbiAgICAgICAgdGhpcy5vcmRlciA9IHRoaXMuc2luZ2xlU29ydCA/IHRoaXMudG9nZ2xlU2luZ2xlQ29sdW1uKHNvcnRpbmcpIDogdGhpcy50b2dnbGVNdWx0aXBsZUNvbHVtbihzb3J0aW5nKTtcblxuICAgICAgICAvLyBlbWl0IHRoZSBsYXRlc3Qgb3JkZXJcbiAgICAgICAgdGhpcy5ldmVudHMubmV4dCh0aGlzLm9yZGVyKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5vcmRlcjtcbiAgICB9XG5cbiAgICBwcml2YXRlIHRvZ2dsZVNpbmdsZUNvbHVtbihzb3J0aW5nOiBDb2x1bW5Tb3J0aW5nT3JkZXIpOiBDb2x1bW5Tb3J0aW5nT3JkZXJbXSB7XG4gICAgICAgIHJldHVybiBzb3J0aW5nLnN0YXRlID09PSBDb2x1bW5Tb3J0aW5nU3RhdGUuTm9Tb3J0ID8gW10gOiBbeyBrZXk6IHNvcnRpbmcua2V5LCBzdGF0ZTogc29ydGluZy5zdGF0ZSB9XTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHRvZ2dsZU11bHRpcGxlQ29sdW1uKHNvcnRpbmc6IENvbHVtblNvcnRpbmdPcmRlcik6IENvbHVtblNvcnRpbmdPcmRlcltdIHtcbiAgICAgICAgLy8gcmVvcmRlciBjb2x1bW5zIGhlcmVcbiAgICAgICAgY29uc3QgaWR4ID0gdGhpcy5vcmRlci5maW5kSW5kZXgoY29sdW1uID0+IGNvbHVtbi5rZXkgPT09IHNvcnRpbmcua2V5KTtcblxuICAgICAgICAvLyBpZiB3YXNudCBwcmV2aW91c2x5IHNlbGVjdGVkIGFkZCB0byBsaXN0XG4gICAgICAgIGlmIChpZHggPT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gWy4uLnRoaXMub3JkZXIsIHsga2V5OiBzb3J0aW5nLmtleSwgc3RhdGU6IHNvcnRpbmcuc3RhdGUgfV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB3ZSBhcmUgc29ydGluZyBpdCBjaGFuZ2UgdGhlIHNvcnRpbmcgb3JkZXJcbiAgICAgICAgaWYgKHNvcnRpbmcuc3RhdGUgPT09IENvbHVtblNvcnRpbmdTdGF0ZS5Bc2NlbmRpbmcgfHwgc29ydGluZy5zdGF0ZSA9PT0gQ29sdW1uU29ydGluZ1N0YXRlLkRlc2NlbmRpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBbLi4udGhpcy5vcmRlci5maWx0ZXIoX2NvbHVtbiA9PiBfY29sdW1uLmtleSAhPT0gc29ydGluZy5rZXkpLCB7IGtleTogc29ydGluZy5rZXksIHN0YXRlOiBzb3J0aW5nLnN0YXRlIH1dO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gT3RoZXJ3aXNlIHJlbW92ZSB0aGUgaXRlbVxuICAgICAgICByZXR1cm4gdGhpcy5vcmRlci5maWx0ZXIoX2NvbHVtbiA9PiBfY29sdW1uLmtleSAhPT0gc29ydGluZy5rZXkpO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb2x1bW5Tb3J0aW5nT3JkZXIge1xuICAgIGtleTogc3RyaW5nO1xuICAgIHN0YXRlOiBDb2x1bW5Tb3J0aW5nU3RhdGU7XG59XG5cbmV4cG9ydCBlbnVtIENvbHVtblNvcnRpbmdTdGF0ZSB7XG4gICAgQXNjZW5kaW5nID0gJ2FzY2VuZGluZycsXG4gICAgRGVzY2VuZGluZyA9ICdkZXNjZW5kaW5nJyxcbiAgICBOb1NvcnQgPSAnbm9uZSdcbn0iXX0=