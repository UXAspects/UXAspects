/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
var SelectionStrategy = (function () {
    function SelectionStrategy(selectionService) {
        this.selectionService = selectionService;
    }
    /**
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    SelectionStrategy.prototype.mousedown = /**
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    function (event, data) { };
    /**
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    SelectionStrategy.prototype.click = /**
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    function (event, data) { };
    /**
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    SelectionStrategy.prototype.keydown = /**
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    function (event, data) { };
    /**
     * Select the item - default behavior
     */
    /**
     * Select the item - default behavior
     * @param {...?} data
     * @return {?}
     */
    SelectionStrategy.prototype.select = /**
     * Select the item - default behavior
     * @param {...?} data
     * @return {?}
     */
    function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        (_a = this.selectionService).select.apply(_a, tslib_1.__spread(data));
        var _a;
    };
    /**
     * Toggle the item's selected state - default behavior
     */
    /**
     * Toggle the item's selected state - default behavior
     * @param {...?} data
     * @return {?}
     */
    SelectionStrategy.prototype.toggle = /**
     * Toggle the item's selected state - default behavior
     * @param {...?} data
     * @return {?}
     */
    function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        (_a = this.selectionService).toggle.apply(_a, tslib_1.__spread(data));
        var _a;
    };
    /**
     * Deselect the item - default behavior
     */
    /**
     * Deselect the item - default behavior
     * @param {...?} data
     * @return {?}
     */
    SelectionStrategy.prototype.deselect = /**
     * Deselect the item - default behavior
     * @param {...?} data
     * @return {?}
     */
    function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        (_a = this.selectionService).deselect.apply(_a, tslib_1.__spread(data));
        var _a;
    };
    /**
     * Select all items - default behavior
     */
    /**
     * Select all items - default behavior
     * @return {?}
     */
    SelectionStrategy.prototype.selectAll = /**
     * Select all items - default behavior
     * @return {?}
     */
    function () {
        this.select.apply(this, tslib_1.__spread(this.selectionService.dataset));
    };
    /**
     * Deselect all items - default behavior
     */
    /**
     * Deselect all items - default behavior
     * @return {?}
     */
    SelectionStrategy.prototype.deselectAll = /**
     * Deselect all items - default behavior
     * @return {?}
     */
    function () {
        this.deselect.apply(this, tslib_1.__spread(this.selectionService.dataset));
    };
    /**
     * @return {?}
     */
    SelectionStrategy.prototype.destroy = /**
     * @return {?}
     */
    function () { };
    return SelectionStrategy;
}());
export { SelectionStrategy };
function SelectionStrategy_tsickle_Closure_declarations() {
    /** @type {?} */
    SelectionStrategy.prototype.selectionService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLnN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvc2VsZWN0aW9uL3N0cmF0ZWdpZXMvc2VsZWN0aW9uLnN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsSUFBQTtJQUVFLDJCQUFzQixnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtLQUFLOzs7Ozs7SUFFN0QscUNBQVM7Ozs7O0lBQVQsVUFBVSxLQUFpQixFQUFFLElBQVMsS0FBVzs7Ozs7O0lBRWpELGlDQUFLOzs7OztJQUFMLFVBQU0sS0FBaUIsRUFBRSxJQUFTLEtBQVc7Ozs7OztJQUU3QyxtQ0FBTzs7Ozs7SUFBUCxVQUFRLEtBQW9CLEVBQUUsSUFBUyxLQUFXO0lBRWxEOztPQUVHOzs7Ozs7SUFDSCxrQ0FBTTs7Ozs7SUFBTjtRQUFPLGNBQWM7YUFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1lBQWQseUJBQWM7O1FBQ25CLENBQUEsS0FBQSxJQUFJLENBQUMsZ0JBQWdCLENBQUEsQ0FBQyxNQUFNLDRCQUFJLElBQUksR0FBRTs7S0FDdkM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0gsa0NBQU07Ozs7O0lBQU47UUFBTyxjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLHlCQUFjOztRQUNuQixDQUFBLEtBQUEsSUFBSSxDQUFDLGdCQUFnQixDQUFBLENBQUMsTUFBTSw0QkFBSSxJQUFJLEdBQUU7O0tBQ3ZDO0lBRUQ7O09BRUc7Ozs7OztJQUNILG9DQUFROzs7OztJQUFSO1FBQVMsY0FBYzthQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7WUFBZCx5QkFBYzs7UUFDckIsQ0FBQSxLQUFBLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQSxDQUFDLFFBQVEsNEJBQUksSUFBSSxHQUFFOztLQUN6QztJQUVEOztPQUVHOzs7OztJQUNILHFDQUFTOzs7O0lBQVQ7UUFDRSxJQUFJLENBQUMsTUFBTSxPQUFYLElBQUksbUJBQVcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sR0FBRTtLQUMvQztJQUVEOztPQUVHOzs7OztJQUNILHVDQUFXOzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsUUFBUSxPQUFiLElBQUksbUJBQWEsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sR0FBRTtLQUNqRDs7OztJQUVELG1DQUFPOzs7SUFBUCxlQUFtQjs0QkEvQ3JCO0lBZ0RDLENBQUE7QUE5Q0QsNkJBOENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VsZWN0aW9uU2VydmljZSB9IGZyb20gJy4uL3NlbGVjdGlvbi5zZXJ2aWNlJztcblxuZXhwb3J0IGNsYXNzIFNlbGVjdGlvblN0cmF0ZWd5IHtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgc2VsZWN0aW9uU2VydmljZTogU2VsZWN0aW9uU2VydmljZSkgeyB9XG5cbiAgbW91c2Vkb3duKGV2ZW50OiBNb3VzZUV2ZW50LCBkYXRhOiBhbnkpOiB2b2lkIHsgfVxuXG4gIGNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50LCBkYXRhOiBhbnkpOiB2b2lkIHsgfVxuXG4gIGtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGRhdGE6IGFueSk6IHZvaWQgeyB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdCB0aGUgaXRlbSAtIGRlZmF1bHQgYmVoYXZpb3JcbiAgICovXG4gIHNlbGVjdCguLi5kYXRhOiBhbnlbXSk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS5zZWxlY3QoLi4uZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlIHRoZSBpdGVtJ3Mgc2VsZWN0ZWQgc3RhdGUgLSBkZWZhdWx0IGJlaGF2aW9yXG4gICAqL1xuICB0b2dnbGUoLi4uZGF0YTogYW55W10pOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UudG9nZ2xlKC4uLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc2VsZWN0IHRoZSBpdGVtIC0gZGVmYXVsdCBiZWhhdmlvclxuICAgKi9cbiAgZGVzZWxlY3QoLi4uZGF0YTogYW55W10pOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UuZGVzZWxlY3QoLi4uZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IGFsbCBpdGVtcyAtIGRlZmF1bHQgYmVoYXZpb3JcbiAgICovXG4gIHNlbGVjdEFsbCgpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdCguLi50aGlzLnNlbGVjdGlvblNlcnZpY2UuZGF0YXNldCk7XG4gIH1cblxuICAvKipcbiAgICogRGVzZWxlY3QgYWxsIGl0ZW1zIC0gZGVmYXVsdCBiZWhhdmlvclxuICAgKi9cbiAgZGVzZWxlY3RBbGwoKTogdm9pZCB7XG4gICAgdGhpcy5kZXNlbGVjdCguLi50aGlzLnNlbGVjdGlvblNlcnZpY2UuZGF0YXNldCk7XG4gIH1cblxuICBkZXN0cm95KCk6IHZvaWQgeyB9XG59XG4iXX0=