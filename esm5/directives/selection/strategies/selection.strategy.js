/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
var SelectionStrategy = /** @class */ (function () {
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
        // call deselect on all items in the dataset
        this.selectionService.deselectAll();
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLnN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvc2VsZWN0aW9uL3N0cmF0ZWdpZXMvc2VsZWN0aW9uLnN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsSUFBQTtJQUVFLDJCQUFzQixnQkFBbUM7UUFBbkMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFtQjtLQUFLOzs7OztJQUU5RCwrQ0FBbUI7Ozs7SUFBbkIsVUFBb0IsZ0JBQWtDO1FBQ3BELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztLQUMxQzs7Ozs7O0lBRUQscUNBQVM7Ozs7O0lBQVQsVUFBVSxLQUFpQixFQUFFLElBQVMsS0FBVzs7Ozs7O0lBRWpELGlDQUFLOzs7OztJQUFMLFVBQU0sS0FBaUIsRUFBRSxJQUFTLEtBQVc7Ozs7OztJQUU3QyxtQ0FBTzs7Ozs7SUFBUCxVQUFRLEtBQW9CLEVBQUUsSUFBUyxLQUFXO0lBRWxEOztPQUVHOzs7Ozs7SUFDSCxrQ0FBTTs7Ozs7SUFBTjtRQUFPLGNBQWM7YUFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1lBQWQseUJBQWM7O1FBQ25CLENBQUEsS0FBQSxJQUFJLENBQUMsZ0JBQWdCLENBQUEsQ0FBQyxNQUFNLDRCQUFJLElBQUksR0FBRTs7S0FDdkM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0gsa0NBQU07Ozs7O0lBQU47UUFBTyxjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLHlCQUFjOztRQUNuQixDQUFBLEtBQUEsSUFBSSxDQUFDLGdCQUFnQixDQUFBLENBQUMsTUFBTSw0QkFBSSxJQUFJLEdBQUU7O0tBQ3ZDO0lBRUQ7O09BRUc7Ozs7OztJQUNILG9DQUFROzs7OztJQUFSO1FBQVMsY0FBYzthQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7WUFBZCx5QkFBYzs7UUFDckIsQ0FBQSxLQUFBLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQSxDQUFDLFFBQVEsNEJBQUksSUFBSSxHQUFFOztLQUN6QztJQUVEOztPQUVHOzs7OztJQUNILHFDQUFTOzs7O0lBQVQ7UUFDRSxJQUFJLENBQUMsTUFBTSxPQUFYLElBQUksbUJBQVcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sR0FBRTtLQUMvQztJQUVEOztPQUVHOzs7OztJQUNILHVDQUFXOzs7O0lBQVg7O1FBR0UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3JDOzs7O0lBRUQsbUNBQU87OztJQUFQLGVBQW1COzRCQXJEckI7SUFzREMsQ0FBQTtBQXBERCw2QkFvREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZWxlY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VsZWN0aW9uLnNlcnZpY2UnO1xuXG5leHBvcnQgY2xhc3MgU2VsZWN0aW9uU3RyYXRlZ3kge1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBzZWxlY3Rpb25TZXJ2aWNlPzogU2VsZWN0aW9uU2VydmljZSkgeyB9XG5cbiAgc2V0U2VsZWN0aW9uU2VydmljZShzZWxlY3Rpb25TZXJ2aWNlOiBTZWxlY3Rpb25TZXJ2aWNlKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3Rpb25TZXJ2aWNlID0gc2VsZWN0aW9uU2VydmljZTtcbiAgfVxuXG4gIG1vdXNlZG93bihldmVudDogTW91c2VFdmVudCwgZGF0YTogYW55KTogdm9pZCB7IH1cblxuICBjbGljayhldmVudDogTW91c2VFdmVudCwgZGF0YTogYW55KTogdm9pZCB7IH1cblxuICBrZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50LCBkYXRhOiBhbnkpOiB2b2lkIHsgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3QgdGhlIGl0ZW0gLSBkZWZhdWx0IGJlaGF2aW9yXG4gICAqL1xuICBzZWxlY3QoLi4uZGF0YTogYW55W10pOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2Uuc2VsZWN0KC4uLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZSB0aGUgaXRlbSdzIHNlbGVjdGVkIHN0YXRlIC0gZGVmYXVsdCBiZWhhdmlvclxuICAgKi9cbiAgdG9nZ2xlKC4uLmRhdGE6IGFueVtdKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLnRvZ2dsZSguLi5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXNlbGVjdCB0aGUgaXRlbSAtIGRlZmF1bHQgYmVoYXZpb3JcbiAgICovXG4gIGRlc2VsZWN0KC4uLmRhdGE6IGFueVtdKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmRlc2VsZWN0KC4uLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdCBhbGwgaXRlbXMgLSBkZWZhdWx0IGJlaGF2aW9yXG4gICAqL1xuICBzZWxlY3RBbGwoKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3QoLi4udGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmRhdGFzZXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc2VsZWN0IGFsbCBpdGVtcyAtIGRlZmF1bHQgYmVoYXZpb3JcbiAgICovXG4gIGRlc2VsZWN0QWxsKCk6IHZvaWQge1xuXG4gICAgLy8gY2FsbCBkZXNlbGVjdCBvbiBhbGwgaXRlbXMgaW4gdGhlIGRhdGFzZXRcbiAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UuZGVzZWxlY3RBbGwoKTtcbiAgfVxuXG4gIGRlc3Ryb3koKTogdm9pZCB7IH1cbn1cbiJdfQ==