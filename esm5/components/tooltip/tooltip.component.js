/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
var /** @type {?} */ uniqueTooltipId = 0;
var TooltipComponent = /** @class */ (function () {
    function TooltipComponent(_changeDetectorRef) {
        this._changeDetectorRef = _changeDetectorRef;
        /**
         * Define a unique id for each tooltip
         */
        this.id = "ux-tooltip-" + ++uniqueTooltipId;
        /**
         * Define the tooltip role
         */
        this.role = 'tooltip';
        /**
         * Allow a custom class to be added to the tooltip to allow custom styling
         */
        this.customClass = '';
        /**
         * Indicates whether or not the content is a string or a TemplateRef
         */
        this.isTemplateRef = false;
        /**
         * Emit when the tooltip need to update it's position
         */
        this.reposition$ = new Subject();
    }
    /** Cleanup after the component is destroyed */
    /**
     * Cleanup after the component is destroyed
     * @return {?}
     */
    TooltipComponent.prototype.ngOnDestroy = /**
     * Cleanup after the component is destroyed
     * @return {?}
     */
    function () {
        this.reposition$.complete();
    };
    /** Inform the parent directive that it needs to recalulate the position */
    /**
     * Inform the parent directive that it needs to recalulate the position
     * @return {?}
     */
    TooltipComponent.prototype.reposition = /**
     * Inform the parent directive that it needs to recalulate the position
     * @return {?}
     */
    function () {
        this.reposition$.next();
    };
    /** This will update the content of the tooltip and trigger change detection */
    /**
     * This will update the content of the tooltip and trigger change detection
     * @param {?} content
     * @return {?}
     */
    TooltipComponent.prototype.setContent = /**
     * This will update the content of the tooltip and trigger change detection
     * @param {?} content
     * @return {?}
     */
    function (content) {
        this.content = content;
        this.isTemplateRef = content instanceof TemplateRef;
        this._changeDetectorRef.markForCheck();
    };
    /** This will update the tooltip placement and trigger change detection */
    /**
     * This will update the tooltip placement and trigger change detection
     * @param {?} placement
     * @return {?}
     */
    TooltipComponent.prototype.setPlacement = /**
     * This will update the tooltip placement and trigger change detection
     * @param {?} placement
     * @return {?}
     */
    function (placement) {
        if (!placement) {
            return;
        }
        this.placement = placement;
        this._changeDetectorRef.markForCheck();
    };
    /** This will set a custom class on the tooltip and trigger change detection */
    /**
     * This will set a custom class on the tooltip and trigger change detection
     * @param {?} customClass
     * @return {?}
     */
    TooltipComponent.prototype.setClass = /**
     * This will set a custom class on the tooltip and trigger change detection
     * @param {?} customClass
     * @return {?}
     */
    function (customClass) {
        if (!customClass) {
            return;
        }
        this.customClass = customClass;
        this._changeDetectorRef.markForCheck();
    };
    /** Updates the context used by the TemplateRef */
    /**
     * Updates the context used by the TemplateRef
     * @param {?} context
     * @return {?}
     */
    TooltipComponent.prototype.setContext = /**
     * Updates the context used by the TemplateRef
     * @param {?} context
     * @return {?}
     */
    function (context) {
        if (!context) {
            return;
        }
        this.context = context;
        this._changeDetectorRef.markForCheck();
    };
    /** Specify the tooltip role attribute */
    /**
     * Specify the tooltip role attribute
     * @param {?} role
     * @return {?}
     */
    TooltipComponent.prototype.setRole = /**
     * Specify the tooltip role attribute
     * @param {?} role
     * @return {?}
     */
    function (role) {
        if (!role) {
            return;
        }
        this.role = role;
        this._changeDetectorRef.markForCheck();
    };
    TooltipComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-tooltip',
                    template: "<div class=\"tooltip in\" [id]=\"id\" [attr.role]=\"role\" [ngClass]=\"[placement, customClass]\">\n    <div class=\"tooltip-arrow\"></div>\n    <div class=\"tooltip-inner\" (cdkObserveContent)=\"reposition()\">\n        <ng-container *ngIf=\"!isTemplateRef\">{{ content }}</ng-container>\n        <ng-container *ngIf=\"isTemplateRef\" [ngTemplateOutlet]=\"content\" [ngTemplateOutletContext]=\"context\"></ng-container>\n    </div>\n</div>",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    TooltipComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    return TooltipComponent;
}());
export { TooltipComponent };
function TooltipComponent_tsickle_Closure_declarations() {
    /**
     * Define a unique id for each tooltip
     * @type {?}
     */
    TooltipComponent.prototype.id;
    /**
     * Define the tooltip role
     * @type {?}
     */
    TooltipComponent.prototype.role;
    /**
     * The content of the tooltip, either a string or a TemplateRef for further customization
     * @type {?}
     */
    TooltipComponent.prototype.content;
    /**
     * Allow the user to supply a context for the tooltip TemplateRef
     * @type {?}
     */
    TooltipComponent.prototype.context;
    /**
     * The position the tooltip should display relative to the associated element
     * @type {?}
     */
    TooltipComponent.prototype.placement;
    /**
     * Allow a custom class to be added to the tooltip to allow custom styling
     * @type {?}
     */
    TooltipComponent.prototype.customClass;
    /**
     * Indicates whether or not the content is a string or a TemplateRef
     * @type {?}
     */
    TooltipComponent.prototype.isTemplateRef;
    /**
     * Emit when the tooltip need to update it's position
     * @type {?}
     */
    TooltipComponent.prototype.reposition$;
    /** @type {?} */
    TooltipComponent.prototype._changeDetectorRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy90b29sdGlwL3Rvb2x0aXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUU5RyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXZDLHFCQUFJLGVBQWUsR0FBRyxDQUFDLENBQUM7O0lBaUN0QiwwQkFBc0Isa0JBQXFDO1FBQXJDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7Ozs7a0JBdkI5QyxnQkFBYyxFQUFFLGVBQWlCOzs7O29CQUcvQixTQUFTOzs7OzJCQVlGLEVBQUU7Ozs7NkJBR0MsS0FBSzs7OzsyQkFHaEIsSUFBSSxPQUFPLEVBQVE7S0FFOEI7SUFFL0QsK0NBQStDOzs7OztJQUMvQyxzQ0FBVzs7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM3QjtJQUVELDJFQUEyRTs7Ozs7SUFDM0UscUNBQVU7Ozs7SUFBVjtRQUNFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDekI7SUFFRCwrRUFBK0U7Ozs7OztJQUMvRSxxQ0FBVTs7Ozs7SUFBVixVQUFXLE9BQWtDO1FBQzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxZQUFZLFdBQVcsQ0FBQztRQUNwRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDeEM7SUFFRCwwRUFBMEU7Ozs7OztJQUMxRSx1Q0FBWTs7Ozs7SUFBWixVQUFhLFNBQTBCO1FBRXJDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNmLE1BQU0sQ0FBQztTQUNSO1FBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ3hDO0lBRUQsK0VBQStFOzs7Ozs7SUFDL0UsbUNBQVE7Ozs7O0lBQVIsVUFBUyxXQUFtQjtRQUUxQixFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDO1NBQ1I7UUFFRCxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDeEM7SUFFRCxrREFBa0Q7Ozs7OztJQUNsRCxxQ0FBVTs7Ozs7SUFBVixVQUFXLE9BQVk7UUFFckIsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2IsTUFBTSxDQUFDO1NBQ1I7UUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDeEM7SUFFRCx5Q0FBeUM7Ozs7OztJQUN6QyxrQ0FBTzs7Ozs7SUFBUCxVQUFRLElBQVk7UUFFbEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1YsTUFBTSxDQUFDO1NBQ1I7UUFFRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDeEM7O2dCQTVGRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFlBQVk7b0JBQ3RCLG9jQUF1QztvQkFDdkMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzs7O2dCQVZpQyxpQkFBaUI7OzJCQUFuRDs7U0FXYSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgVGVtcGxhdGVSZWYsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5jaG9yUGxhY2VtZW50IH0gZnJvbSAnLi90b29sdGlwLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcblxubGV0IHVuaXF1ZVRvb2x0aXBJZCA9IDA7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3V4LXRvb2x0aXAnLFxuICB0ZW1wbGF0ZVVybDogJy4vdG9vbHRpcC5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFRvb2x0aXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIC8qKiBEZWZpbmUgYSB1bmlxdWUgaWQgZm9yIGVhY2ggdG9vbHRpcCAqL1xuICBpZDogc3RyaW5nID0gYHV4LXRvb2x0aXAtJHsrK3VuaXF1ZVRvb2x0aXBJZH1gO1xuXG4gIC8qKiBEZWZpbmUgdGhlIHRvb2x0aXAgcm9sZSAqL1xuICByb2xlOiBzdHJpbmcgPSAndG9vbHRpcCc7XG5cbiAgLyoqIFRoZSBjb250ZW50IG9mIHRoZSB0b29sdGlwLCBlaXRoZXIgYSBzdHJpbmcgb3IgYSBUZW1wbGF0ZVJlZiBmb3IgZnVydGhlciBjdXN0b21pemF0aW9uICovXG4gIGNvbnRlbnQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqIEFsbG93IHRoZSB1c2VyIHRvIHN1cHBseSBhIGNvbnRleHQgZm9yIHRoZSB0b29sdGlwIFRlbXBsYXRlUmVmICovXG4gIGNvbnRleHQ6IGFueTtcblxuICAvKiogVGhlIHBvc2l0aW9uIHRoZSB0b29sdGlwIHNob3VsZCBkaXNwbGF5IHJlbGF0aXZlIHRvIHRoZSBhc3NvY2lhdGVkIGVsZW1lbnQgKi9cbiAgcGxhY2VtZW50OiBBbmNob3JQbGFjZW1lbnQ7XG5cbiAgLyoqIEFsbG93IGEgY3VzdG9tIGNsYXNzIHRvIGJlIGFkZGVkIHRvIHRoZSB0b29sdGlwIHRvIGFsbG93IGN1c3RvbSBzdHlsaW5nICovXG4gIGN1c3RvbUNsYXNzOiBzdHJpbmcgPSAnJztcblxuICAvKiogSW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IHRoZSBjb250ZW50IGlzIGEgc3RyaW5nIG9yIGEgVGVtcGxhdGVSZWYgKi9cbiAgaXNUZW1wbGF0ZVJlZjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBFbWl0IHdoZW4gdGhlIHRvb2x0aXAgbmVlZCB0byB1cGRhdGUgaXQncyBwb3NpdGlvbiAqL1xuICByZXBvc2l0aW9uJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgLyoqIENsZWFudXAgYWZ0ZXIgdGhlIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQgKi9cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5yZXBvc2l0aW9uJC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgLyoqIEluZm9ybSB0aGUgcGFyZW50IGRpcmVjdGl2ZSB0aGF0IGl0IG5lZWRzIHRvIHJlY2FsdWxhdGUgdGhlIHBvc2l0aW9uICovXG4gIHJlcG9zaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5yZXBvc2l0aW9uJC5uZXh0KCk7XG4gIH1cblxuICAvKiogVGhpcyB3aWxsIHVwZGF0ZSB0aGUgY29udGVudCBvZiB0aGUgdG9vbHRpcCBhbmQgdHJpZ2dlciBjaGFuZ2UgZGV0ZWN0aW9uICovXG4gIHNldENvbnRlbnQoY29udGVudDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55Pik6IHZvaWQge1xuICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgdGhpcy5pc1RlbXBsYXRlUmVmID0gY29udGVudCBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqIFRoaXMgd2lsbCB1cGRhdGUgdGhlIHRvb2x0aXAgcGxhY2VtZW50IGFuZCB0cmlnZ2VyIGNoYW5nZSBkZXRlY3Rpb24gKi9cbiAgc2V0UGxhY2VtZW50KHBsYWNlbWVudDogQW5jaG9yUGxhY2VtZW50KSB7XG5cbiAgICBpZiAoIXBsYWNlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMucGxhY2VtZW50ID0gcGxhY2VtZW50O1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqIFRoaXMgd2lsbCBzZXQgYSBjdXN0b20gY2xhc3Mgb24gdGhlIHRvb2x0aXAgYW5kIHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvbiAqL1xuICBzZXRDbGFzcyhjdXN0b21DbGFzczogc3RyaW5nKTogdm9pZCB7XG5cbiAgICBpZiAoIWN1c3RvbUNsYXNzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jdXN0b21DbGFzcyA9IGN1c3RvbUNsYXNzO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqIFVwZGF0ZXMgdGhlIGNvbnRleHQgdXNlZCBieSB0aGUgVGVtcGxhdGVSZWYgKi9cbiAgc2V0Q29udGV4dChjb250ZXh0OiBhbnkpOiB2b2lkIHtcblxuICAgIGlmICghY29udGV4dCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKiogU3BlY2lmeSB0aGUgdG9vbHRpcCByb2xlIGF0dHJpYnV0ZSAqL1xuICBzZXRSb2xlKHJvbGU6IHN0cmluZyk6IHZvaWQge1xuXG4gICAgaWYgKCFyb2xlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5yb2xlID0gcm9sZTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxufSJdfQ==