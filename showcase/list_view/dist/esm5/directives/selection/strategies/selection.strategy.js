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
     * @param {?} selectionService
     * @return {?}
     */
    SelectionStrategy.prototype.setSelectionService = /**
     * @param {?} selectionService
     * @return {?}
     */
    function (selectionService) {
        this.selectionService = selectionService;
    };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLnN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvc2VsZWN0aW9uL3N0cmF0ZWdpZXMvc2VsZWN0aW9uLnN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsSUFBQTtJQUVFLDJCQUFzQixnQkFBbUM7UUFBbkMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFtQjtLQUFLOzs7OztJQUU5RCwrQ0FBbUI7Ozs7SUFBbkIsVUFBb0IsZ0JBQWtDO1FBQ3BELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztLQUMxQzs7Ozs7O0lBRUQscUNBQVM7Ozs7O0lBQVQsVUFBVSxLQUFpQixFQUFFLElBQVMsS0FBVzs7Ozs7O0lBRWpELGlDQUFLOzs7OztJQUFMLFVBQU0sS0FBaUIsRUFBRSxJQUFTLEtBQVc7Ozs7OztJQUU3QyxtQ0FBTzs7Ozs7SUFBUCxVQUFRLEtBQW9CLEVBQUUsSUFBUyxLQUFXO0lBRWxEOztPQUVHOzs7Ozs7SUFDSCxrQ0FBTTs7Ozs7SUFBTjtRQUFPLGNBQWM7YUFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1lBQWQseUJBQWM7O1FBQ25CLENBQUEsS0FBQSxJQUFJLENBQUMsZ0JBQWdCLENBQUEsQ0FBQyxNQUFNLDRCQUFJLElBQUksR0FBRTs7S0FDdkM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0gsa0NBQU07Ozs7O0lBQU47UUFBTyxjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLHlCQUFjOztRQUNuQixDQUFBLEtBQUEsSUFBSSxDQUFDLGdCQUFnQixDQUFBLENBQUMsTUFBTSw0QkFBSSxJQUFJLEdBQUU7O0tBQ3ZDO0lBRUQ7O09BRUc7Ozs7OztJQUNILG9DQUFROzs7OztJQUFSO1FBQVMsY0FBYzthQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7WUFBZCx5QkFBYzs7UUFDckIsQ0FBQSxLQUFBLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQSxDQUFDLFFBQVEsNEJBQUksSUFBSSxHQUFFOztLQUN6QztJQUVEOztPQUVHOzs7OztJQUNILHFDQUFTOzs7O0lBQVQ7UUFDRSxJQUFJLENBQUMsTUFBTSxPQUFYLElBQUksbUJBQVcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sR0FBRTtLQUMvQztJQUVEOztPQUVHOzs7OztJQUNILHVDQUFXOzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsUUFBUSxPQUFiLElBQUksbUJBQWEsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sR0FBRTtLQUNqRDs7OztJQUVELG1DQUFPOzs7SUFBUCxlQUFtQjs0QkFuRHJCO0lBb0RDLENBQUE7QUFsREQsNkJBa0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VsZWN0aW9uU2VydmljZSB9IGZyb20gJy4uL3NlbGVjdGlvbi5zZXJ2aWNlJztcblxuZXhwb3J0IGNsYXNzIFNlbGVjdGlvblN0cmF0ZWd5IHtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgc2VsZWN0aW9uU2VydmljZT86IFNlbGVjdGlvblNlcnZpY2UpIHsgfVxuXG4gIHNldFNlbGVjdGlvblNlcnZpY2Uoc2VsZWN0aW9uU2VydmljZTogU2VsZWN0aW9uU2VydmljZSk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZSA9IHNlbGVjdGlvblNlcnZpY2U7XG4gIH1cblxuICBtb3VzZWRvd24oZXZlbnQ6IE1vdXNlRXZlbnQsIGRhdGE6IGFueSk6IHZvaWQgeyB9XG5cbiAgY2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQsIGRhdGE6IGFueSk6IHZvaWQgeyB9XG5cbiAga2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCwgZGF0YTogYW55KTogdm9pZCB7IH1cblxuICAvKipcbiAgICogU2VsZWN0IHRoZSBpdGVtIC0gZGVmYXVsdCBiZWhhdmlvclxuICAgKi9cbiAgc2VsZWN0KC4uLmRhdGE6IGFueVtdKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLnNlbGVjdCguLi5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGUgdGhlIGl0ZW0ncyBzZWxlY3RlZCBzdGF0ZSAtIGRlZmF1bHQgYmVoYXZpb3JcbiAgICovXG4gIHRvZ2dsZSguLi5kYXRhOiBhbnlbXSk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS50b2dnbGUoLi4uZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogRGVzZWxlY3QgdGhlIGl0ZW0gLSBkZWZhdWx0IGJlaGF2aW9yXG4gICAqL1xuICBkZXNlbGVjdCguLi5kYXRhOiBhbnlbXSk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS5kZXNlbGVjdCguLi5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3QgYWxsIGl0ZW1zIC0gZGVmYXVsdCBiZWhhdmlvclxuICAgKi9cbiAgc2VsZWN0QWxsKCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0KC4uLnRoaXMuc2VsZWN0aW9uU2VydmljZS5kYXRhc2V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXNlbGVjdCBhbGwgaXRlbXMgLSBkZWZhdWx0IGJlaGF2aW9yXG4gICAqL1xuICBkZXNlbGVjdEFsbCgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc2VsZWN0KC4uLnRoaXMuc2VsZWN0aW9uU2VydmljZS5kYXRhc2V0KTtcbiAgfVxuXG4gIGRlc3Ryb3koKTogdm9pZCB7IH1cbn1cbiJdfQ==