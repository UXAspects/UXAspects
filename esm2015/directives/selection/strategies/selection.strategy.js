/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
export class SelectionStrategy {
    /**
     * @param {?} selectionService
     */
    constructor(selectionService) {
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
        this.deselect(...this.selectionService.dataset);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLnN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvc2VsZWN0aW9uL3N0cmF0ZWdpZXMvc2VsZWN0aW9uLnN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxNQUFNOzs7O0lBRUosWUFBc0IsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7S0FBSzs7Ozs7O0lBRTdELFNBQVMsQ0FBQyxLQUFpQixFQUFFLElBQVMsS0FBVzs7Ozs7O0lBRWpELEtBQUssQ0FBQyxLQUFpQixFQUFFLElBQVMsS0FBVzs7Ozs7O0lBRTdDLE9BQU8sQ0FBQyxLQUFvQixFQUFFLElBQVMsS0FBVzs7Ozs7O0lBS2xELE1BQU0sQ0FBQyxHQUFHLElBQVc7UUFDbkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0tBQ3ZDOzs7Ozs7SUFLRCxNQUFNLENBQUMsR0FBRyxJQUFXO1FBQ25CLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUN2Qzs7Ozs7O0lBS0QsUUFBUSxDQUFDLEdBQUcsSUFBVztRQUNyQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7S0FDekM7Ozs7O0lBS0QsU0FBUztRQUNQLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDL0M7Ozs7O0lBS0QsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDakQ7Ozs7SUFFRCxPQUFPLE1BQVk7Q0FDcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZWxlY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VsZWN0aW9uLnNlcnZpY2UnO1xuXG5leHBvcnQgY2xhc3MgU2VsZWN0aW9uU3RyYXRlZ3kge1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBzZWxlY3Rpb25TZXJ2aWNlOiBTZWxlY3Rpb25TZXJ2aWNlKSB7IH1cblxuICBtb3VzZWRvd24oZXZlbnQ6IE1vdXNlRXZlbnQsIGRhdGE6IGFueSk6IHZvaWQgeyB9XG5cbiAgY2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQsIGRhdGE6IGFueSk6IHZvaWQgeyB9XG5cbiAga2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCwgZGF0YTogYW55KTogdm9pZCB7IH1cblxuICAvKipcbiAgICogU2VsZWN0IHRoZSBpdGVtIC0gZGVmYXVsdCBiZWhhdmlvclxuICAgKi9cbiAgc2VsZWN0KC4uLmRhdGE6IGFueVtdKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLnNlbGVjdCguLi5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGUgdGhlIGl0ZW0ncyBzZWxlY3RlZCBzdGF0ZSAtIGRlZmF1bHQgYmVoYXZpb3JcbiAgICovXG4gIHRvZ2dsZSguLi5kYXRhOiBhbnlbXSk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS50b2dnbGUoLi4uZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogRGVzZWxlY3QgdGhlIGl0ZW0gLSBkZWZhdWx0IGJlaGF2aW9yXG4gICAqL1xuICBkZXNlbGVjdCguLi5kYXRhOiBhbnlbXSk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS5kZXNlbGVjdCguLi5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3QgYWxsIGl0ZW1zIC0gZGVmYXVsdCBiZWhhdmlvclxuICAgKi9cbiAgc2VsZWN0QWxsKCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0KC4uLnRoaXMuc2VsZWN0aW9uU2VydmljZS5kYXRhc2V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXNlbGVjdCBhbGwgaXRlbXMgLSBkZWZhdWx0IGJlaGF2aW9yXG4gICAqL1xuICBkZXNlbGVjdEFsbCgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc2VsZWN0KC4uLnRoaXMuc2VsZWN0aW9uU2VydmljZS5kYXRhc2V0KTtcbiAgfVxuXG4gIGRlc3Ryb3koKTogdm9pZCB7IH1cbn1cbiJdfQ==