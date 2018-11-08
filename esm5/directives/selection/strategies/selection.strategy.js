/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * @template T
 */
var /**
 * @template T
 */
SelectionStrategy = /** @class */ (function () {
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
/**
 * @template T
 */
export { SelectionStrategy };
function SelectionStrategy_tsickle_Closure_declarations() {
    /** @type {?} */
    SelectionStrategy.prototype.selectionService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLnN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvc2VsZWN0aW9uL3N0cmF0ZWdpZXMvc2VsZWN0aW9uLnN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBRUE7OztBQUFBO0lBRUUsMkJBQXNCLGdCQUFzQztRQUF0QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXNCO0tBQUs7Ozs7O0lBRWpFLCtDQUFtQjs7OztJQUFuQixVQUFvQixnQkFBcUM7UUFDdkQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO0tBQzFDOzs7Ozs7SUFFRCxxQ0FBUzs7Ozs7SUFBVCxVQUFVLEtBQWlCLEVBQUUsSUFBTyxLQUFXOzs7Ozs7SUFFL0MsaUNBQUs7Ozs7O0lBQUwsVUFBTSxLQUFpQixFQUFFLElBQU8sS0FBVzs7Ozs7O0lBRTNDLG1DQUFPOzs7OztJQUFQLFVBQVEsS0FBb0IsRUFBRSxJQUFPLEtBQVc7SUFFaEQ7O09BRUc7Ozs7OztJQUNILGtDQUFNOzs7OztJQUFOO1FBQU8sY0FBWTthQUFaLFVBQVksRUFBWixxQkFBWSxFQUFaLElBQVk7WUFBWix5QkFBWTs7UUFDakIsQ0FBQSxLQUFBLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQSxDQUFDLE1BQU0sNEJBQUksSUFBSSxHQUFFOztLQUN2QztJQUVEOztPQUVHOzs7Ozs7SUFDSCxrQ0FBTTs7Ozs7SUFBTjtRQUFPLGNBQVk7YUFBWixVQUFZLEVBQVoscUJBQVksRUFBWixJQUFZO1lBQVoseUJBQVk7O1FBQ2pCLENBQUEsS0FBQSxJQUFJLENBQUMsZ0JBQWdCLENBQUEsQ0FBQyxNQUFNLDRCQUFJLElBQUksR0FBRTs7S0FDdkM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0gsb0NBQVE7Ozs7O0lBQVI7UUFBUyxjQUFZO2FBQVosVUFBWSxFQUFaLHFCQUFZLEVBQVosSUFBWTtZQUFaLHlCQUFZOztRQUNuQixDQUFBLEtBQUEsSUFBSSxDQUFDLGdCQUFnQixDQUFBLENBQUMsUUFBUSw0QkFBSSxJQUFJLEdBQUU7O0tBQ3pDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gscUNBQVM7Ozs7SUFBVDtRQUNFLElBQUksQ0FBQyxNQUFNLE9BQVgsSUFBSSxtQkFBVyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxHQUFFO0tBQy9DO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsdUNBQVc7Ozs7SUFBWDs7UUFHRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDckM7Ozs7SUFFRCxtQ0FBTzs7O0lBQVAsZUFBbUI7NEJBckRyQjtJQXNEQyxDQUFBOzs7O0FBcERELDZCQW9EQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlbGVjdGlvblNlcnZpY2UgfSBmcm9tICcuLi9zZWxlY3Rpb24uc2VydmljZSc7XG5cbmV4cG9ydCBjbGFzcyBTZWxlY3Rpb25TdHJhdGVneTxUID0gYW55PiB7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHNlbGVjdGlvblNlcnZpY2U/OiBTZWxlY3Rpb25TZXJ2aWNlPFQ+KSB7IH1cblxuICBzZXRTZWxlY3Rpb25TZXJ2aWNlKHNlbGVjdGlvblNlcnZpY2U6IFNlbGVjdGlvblNlcnZpY2U8VD4pOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UgPSBzZWxlY3Rpb25TZXJ2aWNlO1xuICB9XG5cbiAgbW91c2Vkb3duKGV2ZW50OiBNb3VzZUV2ZW50LCBkYXRhOiBUKTogdm9pZCB7IH1cblxuICBjbGljayhldmVudDogTW91c2VFdmVudCwgZGF0YTogVCk6IHZvaWQgeyB9XG5cbiAga2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCwgZGF0YTogVCk6IHZvaWQgeyB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdCB0aGUgaXRlbSAtIGRlZmF1bHQgYmVoYXZpb3JcbiAgICovXG4gIHNlbGVjdCguLi5kYXRhOiBUW10pOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2Uuc2VsZWN0KC4uLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZSB0aGUgaXRlbSdzIHNlbGVjdGVkIHN0YXRlIC0gZGVmYXVsdCBiZWhhdmlvclxuICAgKi9cbiAgdG9nZ2xlKC4uLmRhdGE6IFRbXSk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS50b2dnbGUoLi4uZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogRGVzZWxlY3QgdGhlIGl0ZW0gLSBkZWZhdWx0IGJlaGF2aW9yXG4gICAqL1xuICBkZXNlbGVjdCguLi5kYXRhOiBUW10pOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UuZGVzZWxlY3QoLi4uZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IGFsbCBpdGVtcyAtIGRlZmF1bHQgYmVoYXZpb3JcbiAgICovXG4gIHNlbGVjdEFsbCgpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdCguLi50aGlzLnNlbGVjdGlvblNlcnZpY2UuZGF0YXNldCk7XG4gIH1cblxuICAvKipcbiAgICogRGVzZWxlY3QgYWxsIGl0ZW1zIC0gZGVmYXVsdCBiZWhhdmlvclxuICAgKi9cbiAgZGVzZWxlY3RBbGwoKTogdm9pZCB7XG5cbiAgICAvLyBjYWxsIGRlc2VsZWN0IG9uIGFsbCBpdGVtcyBpbiB0aGUgZGF0YXNldFxuICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS5kZXNlbGVjdEFsbCgpO1xuICB9XG5cbiAgZGVzdHJveSgpOiB2b2lkIHsgfVxufVxuIl19