/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template T
 */
export class SelectionStrategy {
    /**
     * @param {?=} selectionService
     */
    constructor(selectionService) {
        this.selectionService = selectionService;
    }
    /**
     * @param {?} selectionService
     * @return {?}
     */
    setSelectionService(selectionService) {
        this.selectionService = selectionService;
    }
    /**
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    mousedown(event, data) { }
    /**
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    click(event, data) { }
    /**
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    keydown(event, data) { }
    /**
     * Select the item - default behavior
     * @param {...?} data
     * @return {?}
     */
    select(...data) {
        this.selectionService.select(...data);
    }
    /**
     * Toggle the item's selected state - default behavior
     * @param {...?} data
     * @return {?}
     */
    toggle(...data) {
        this.selectionService.toggle(...data);
    }
    /**
     * Deselect the item - default behavior
     * @param {...?} data
     * @return {?}
     */
    deselect(...data) {
        this.selectionService.deselect(...data);
    }
    /**
     * Select all items - default behavior
     * @return {?}
     */
    selectAll() {
        this.select(...this.selectionService.dataset);
    }
    /**
     * Deselect all items - default behavior
     * @return {?}
     */
    deselectAll() {
        // call deselect on all items in the dataset
        this.selectionService.deselectAll();
    }
    /**
     * @return {?}
     */
    destroy() { }
}
function SelectionStrategy_tsickle_Closure_declarations() {
    /** @type {?} */
    SelectionStrategy.prototype.selectionService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLnN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvc2VsZWN0aW9uL3N0cmF0ZWdpZXMvc2VsZWN0aW9uLnN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQSxNQUFNOzs7O0lBRUosWUFBc0IsZ0JBQXNDO1FBQXRDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBc0I7S0FBSzs7Ozs7SUFFakUsbUJBQW1CLENBQUMsZ0JBQXFDO1FBQ3ZELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztLQUMxQzs7Ozs7O0lBRUQsU0FBUyxDQUFDLEtBQWlCLEVBQUUsSUFBTyxLQUFXOzs7Ozs7SUFFL0MsS0FBSyxDQUFDLEtBQWlCLEVBQUUsSUFBTyxLQUFXOzs7Ozs7SUFFM0MsT0FBTyxDQUFDLEtBQW9CLEVBQUUsSUFBTyxLQUFXOzs7Ozs7SUFLaEQsTUFBTSxDQUFDLEdBQUcsSUFBUztRQUNqQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7S0FDdkM7Ozs7OztJQUtELE1BQU0sQ0FBQyxHQUFHLElBQVM7UUFDakIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0tBQ3ZDOzs7Ozs7SUFLRCxRQUFRLENBQUMsR0FBRyxJQUFTO1FBQ25CLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUN6Qzs7Ozs7SUFLRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUMvQzs7Ozs7SUFLRCxXQUFXOztRQUdULElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNyQzs7OztJQUVELE9BQU8sTUFBWTtDQUNwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlbGVjdGlvblNlcnZpY2UgfSBmcm9tICcuLi9zZWxlY3Rpb24uc2VydmljZSc7XG5cbmV4cG9ydCBjbGFzcyBTZWxlY3Rpb25TdHJhdGVneTxUID0gYW55PiB7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHNlbGVjdGlvblNlcnZpY2U/OiBTZWxlY3Rpb25TZXJ2aWNlPFQ+KSB7IH1cblxuICBzZXRTZWxlY3Rpb25TZXJ2aWNlKHNlbGVjdGlvblNlcnZpY2U6IFNlbGVjdGlvblNlcnZpY2U8VD4pOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UgPSBzZWxlY3Rpb25TZXJ2aWNlO1xuICB9XG5cbiAgbW91c2Vkb3duKGV2ZW50OiBNb3VzZUV2ZW50LCBkYXRhOiBUKTogdm9pZCB7IH1cblxuICBjbGljayhldmVudDogTW91c2VFdmVudCwgZGF0YTogVCk6IHZvaWQgeyB9XG5cbiAga2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCwgZGF0YTogVCk6IHZvaWQgeyB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdCB0aGUgaXRlbSAtIGRlZmF1bHQgYmVoYXZpb3JcbiAgICovXG4gIHNlbGVjdCguLi5kYXRhOiBUW10pOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2Uuc2VsZWN0KC4uLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZSB0aGUgaXRlbSdzIHNlbGVjdGVkIHN0YXRlIC0gZGVmYXVsdCBiZWhhdmlvclxuICAgKi9cbiAgdG9nZ2xlKC4uLmRhdGE6IFRbXSk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS50b2dnbGUoLi4uZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogRGVzZWxlY3QgdGhlIGl0ZW0gLSBkZWZhdWx0IGJlaGF2aW9yXG4gICAqL1xuICBkZXNlbGVjdCguLi5kYXRhOiBUW10pOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UuZGVzZWxlY3QoLi4uZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IGFsbCBpdGVtcyAtIGRlZmF1bHQgYmVoYXZpb3JcbiAgICovXG4gIHNlbGVjdEFsbCgpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdCguLi50aGlzLnNlbGVjdGlvblNlcnZpY2UuZGF0YXNldCk7XG4gIH1cblxuICAvKipcbiAgICogRGVzZWxlY3QgYWxsIGl0ZW1zIC0gZGVmYXVsdCBiZWhhdmlvclxuICAgKi9cbiAgZGVzZWxlY3RBbGwoKTogdm9pZCB7XG5cbiAgICAvLyBjYWxsIGRlc2VsZWN0IG9uIGFsbCBpdGVtcyBpbiB0aGUgZGF0YXNldFxuICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS5kZXNlbGVjdEFsbCgpO1xuICB9XG5cbiAgZGVzdHJveSgpOiB2b2lkIHsgfVxufVxuIl19