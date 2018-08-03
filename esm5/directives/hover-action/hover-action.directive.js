/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { HoverActionService } from './hover-action.service';
var HoverActionDirective = /** @class */ (function () {
    function HoverActionDirective(_elementRef, _hoverActionService) {
        var _this = this;
        this._elementRef = _elementRef;
        this._hoverActionService = _hoverActionService;
        this.tabindex = 1;
        this.active = false;
        this.focused = false;
        // register the action
        this._hoverActionService.register(this);
        // watch for changes to the activeness of the container
        this.active$ = this._hoverActionService.active.subscribe(function (active) { return _this.active = active; });
    }
    /**
     * @return {?}
     */
    HoverActionDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._hoverActionService.unregister(this);
        this.active$.unsubscribe();
    };
    /**
     * @return {?}
     */
    HoverActionDirective.prototype.focus = /**
     * @return {?}
     */
    function () {
        this._elementRef.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    HoverActionDirective.prototype.onFocus = /**
     * @return {?}
     */
    function () {
        this.focused = true;
        this._hoverActionService.updateVisibility();
    };
    /**
     * @return {?}
     */
    HoverActionDirective.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        this.focused = false;
        this._hoverActionService.updateVisibility();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    HoverActionDirective.prototype.previous = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        this._hoverActionService.previous();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    HoverActionDirective.prototype.next = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        this._hoverActionService.next();
    };
    HoverActionDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxHoverAction]',
                    host: {
                        '[class.hover-action-active]': 'active',
                        '[class.hover-action-focused]': 'focused',
                        '[tabindex]': 'tabindex'
                    }
                },] }
    ];
    /** @nocollapse */
    HoverActionDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: HoverActionService }
    ]; };
    HoverActionDirective.propDecorators = {
        tabindex: [{ type: Input }],
        onFocus: [{ type: HostListener, args: ['focus',] }],
        onBlur: [{ type: HostListener, args: ['blur',] }],
        previous: [{ type: HostListener, args: ['keydown.arrowleft', ['$event'],] }],
        next: [{ type: HostListener, args: ['keydown.arrowright', ['$event'],] }]
    };
    return HoverActionDirective;
}());
export { HoverActionDirective };
function HoverActionDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    HoverActionDirective.prototype.tabindex;
    /** @type {?} */
    HoverActionDirective.prototype.active;
    /** @type {?} */
    HoverActionDirective.prototype.focused;
    /** @type {?} */
    HoverActionDirective.prototype.active$;
    /** @type {?} */
    HoverActionDirective.prototype._elementRef;
    /** @type {?} */
    HoverActionDirective.prototype._hoverActionService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG92ZXItYWN0aW9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2hvdmVyLWFjdGlvbi9ob3Zlci1hY3Rpb24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQWEsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDOztJQW1CeEQsOEJBQW9CLFdBQXVCLEVBQVUsbUJBQXVDO1FBQTVGLGlCQU9DO1FBUG1CLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQVUsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFvQjt3QkFOaEUsQ0FBQztzQkFDWCxLQUFLO3VCQUNKLEtBQUs7O1FBT3BCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7O1FBR3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDO0tBQzVGOzs7O0lBRUQsMENBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQzlCOzs7O0lBRUQsb0NBQUs7OztJQUFMO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7S0FDMUM7Ozs7SUFFc0Isc0NBQU87OztJQUE5QjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0tBQy9DOzs7O0lBRXFCLHFDQUFNOzs7SUFBNUI7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztLQUMvQzs7Ozs7SUFFOEMsdUNBQVE7Ozs7SUFBdkQsVUFBd0QsS0FBaUI7UUFDckUsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUN2Qzs7Ozs7SUFFK0MsbUNBQUk7Ozs7SUFBcEQsVUFBcUQsS0FBaUI7UUFDbEUsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNuQzs7Z0JBcERKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixJQUFJLEVBQUU7d0JBQ0YsNkJBQTZCLEVBQUUsUUFBUTt3QkFDdkMsOEJBQThCLEVBQUUsU0FBUzt3QkFDekMsWUFBWSxFQUFFLFVBQVU7cUJBQzNCO2lCQUNKOzs7O2dCQVhtQixVQUFVO2dCQUNyQixrQkFBa0I7OzsyQkFhdEIsS0FBSzswQkF3QkwsWUFBWSxTQUFDLE9BQU87eUJBS3BCLFlBQVksU0FBQyxNQUFNOzJCQUtuQixZQUFZLFNBQUMsbUJBQW1CLEVBQUUsQ0FBQyxRQUFRLENBQUM7dUJBSzVDLFlBQVksU0FBQyxvQkFBb0IsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7K0JBckRsRDs7U0FZYSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgT25EZXN0cm95LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSG92ZXJBY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9ob3Zlci1hY3Rpb24uc2VydmljZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4SG92ZXJBY3Rpb25dJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MuaG92ZXItYWN0aW9uLWFjdGl2ZV0nOiAnYWN0aXZlJyxcbiAgICAgICAgJ1tjbGFzcy5ob3Zlci1hY3Rpb24tZm9jdXNlZF0nOiAnZm9jdXNlZCcsXG4gICAgICAgICdbdGFiaW5kZXhdJzogJ3RhYmluZGV4J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgSG92ZXJBY3Rpb25EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlciA9IDE7XG4gICAgYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG4gICAgZm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBhY3RpdmUkOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIF9ob3ZlckFjdGlvblNlcnZpY2U6IEhvdmVyQWN0aW9uU2VydmljZSkge1xuXG4gICAgICAgIC8vIHJlZ2lzdGVyIHRoZSBhY3Rpb25cbiAgICAgICAgdGhpcy5faG92ZXJBY3Rpb25TZXJ2aWNlLnJlZ2lzdGVyKHRoaXMpO1xuXG4gICAgICAgIC8vIHdhdGNoIGZvciBjaGFuZ2VzIHRvIHRoZSBhY3RpdmVuZXNzIG9mIHRoZSBjb250YWluZXJcbiAgICAgICAgdGhpcy5hY3RpdmUkID0gdGhpcy5faG92ZXJBY3Rpb25TZXJ2aWNlLmFjdGl2ZS5zdWJzY3JpYmUoYWN0aXZlID0+IHRoaXMuYWN0aXZlID0gYWN0aXZlKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5faG92ZXJBY3Rpb25TZXJ2aWNlLnVucmVnaXN0ZXIodGhpcyk7XG4gICAgICAgIHRoaXMuYWN0aXZlJC51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdmb2N1cycpIG9uRm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2hvdmVyQWN0aW9uU2VydmljZS51cGRhdGVWaXNpYmlsaXR5KCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignYmx1cicpIG9uQmx1cigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2hvdmVyQWN0aW9uU2VydmljZS51cGRhdGVWaXNpYmlsaXR5KCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5hcnJvd2xlZnQnLCBbJyRldmVudCddKSBwcmV2aW91cyhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgICAgICAgIFxuICAgICAgICB0aGlzLl9ob3ZlckFjdGlvblNlcnZpY2UucHJldmlvdXMoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLmFycm93cmlnaHQnLCBbJyRldmVudCddKSBuZXh0KGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzLl9ob3ZlckFjdGlvblNlcnZpY2UubmV4dCgpO1xuICAgIH1cbn0iXX0=