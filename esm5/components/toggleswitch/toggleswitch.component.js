/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var /** @type {?} */ TOGGLESWITCH_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return ToggleSwitchComponent; }),
    multi: true
};
var /** @type {?} */ uniqueToggleSwitchId = 0;
var ToggleSwitchComponent = (function () {
    function ToggleSwitchComponent() {
        this._toggleSwitchId = "ux-toggleswitch-" + ++uniqueToggleSwitchId;
        this.id = this._toggleSwitchId;
        this.tabindex = 0;
        this.clickable = true;
        this.disabled = false;
        this.ariaLabel = '';
        this.ariaLabelledby = null;
        this.valueChange = new EventEmitter();
        this._value = false;
        this.focused = false;
        this.onTouchedCallback = function () { };
        this.onChangeCallback = function () { };
    }
    Object.defineProperty(ToggleSwitchComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._value = value;
            // Update value output
            this.valueChange.emit(value);
            // Notify ngModel
            this.onChangeCallback(value);
            this.onTouchedCallback();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToggleSwitchComponent.prototype, "inputId", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.id || this._toggleSwitchId) + "-input";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ToggleSwitchComponent.prototype.toggle = /**
     * @return {?}
     */
    function () {
        if (!this.disabled && this.clickable) {
            this.value = !this.value;
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ToggleSwitchComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = !!value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ToggleSwitchComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ToggleSwitchComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    ToggleSwitchComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    ToggleSwitchComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-toggleswitch',
                    template: "<label [attr.for]=\"inputId\"\n       class=\"ux-toggleswitch\"\n       [class.ux-toggleswitch-checked]=\"value\"\n       [class.ux-toggleswitch-disabled]=\"disabled\"\n       [class.ux-toggleswitch-focused]=\"focused\">\n\n    <input class=\"ux-toggleswitch-input\"\n           type=\"checkbox\"\n           role=\"switch\"\n           [id]=\"inputId\"\n           [checked]=\"value\"\n           [disabled]=\"disabled\"\n           [attr.name]=\"name\"\n           [tabindex]=\"tabindex\"\n           [attr.aria-label]=\"ariaLabel\"\n           [attr.aria-labelledby]=\"ariaLabelledby\"\n           [attr.aria-checked]=\"value\"\n           (focus)=\"focused = true\"\n           (blur)=\"focused = false\"\n           (change)=\"toggle()\"\n           (click)=\"$event.stopPropagation()\">\n\n    <div class=\"ux-toggleswitch-container\">\n        <div class=\"ux-toggleswitch-bg\"></div>\n        <div class=\"ux-toggleswitch-nub\"></div>\n    </div>\n\n    <span class=\"ux-toggleswitch-label\">\n        <ng-content></ng-content>\n    </span>\n</label>",
                    providers: [TOGGLESWITCH_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    ToggleSwitchComponent.propDecorators = {
        "id": [{ type: Input },],
        "name": [{ type: Input },],
        "tabindex": [{ type: Input },],
        "clickable": [{ type: Input },],
        "disabled": [{ type: Input },],
        "ariaLabel": [{ type: Input, args: ['aria-label',] },],
        "ariaLabelledby": [{ type: Input, args: ['aria-labelledby',] },],
        "valueChange": [{ type: Output },],
        "value": [{ type: Input },],
    };
    return ToggleSwitchComponent;
}());
export { ToggleSwitchComponent };
function ToggleSwitchComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ToggleSwitchComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ToggleSwitchComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    ToggleSwitchComponent.propDecorators;
    /** @type {?} */
    ToggleSwitchComponent.prototype._toggleSwitchId;
    /** @type {?} */
    ToggleSwitchComponent.prototype.id;
    /** @type {?} */
    ToggleSwitchComponent.prototype.name;
    /** @type {?} */
    ToggleSwitchComponent.prototype.tabindex;
    /** @type {?} */
    ToggleSwitchComponent.prototype.clickable;
    /** @type {?} */
    ToggleSwitchComponent.prototype.disabled;
    /** @type {?} */
    ToggleSwitchComponent.prototype.ariaLabel;
    /** @type {?} */
    ToggleSwitchComponent.prototype.ariaLabelledby;
    /** @type {?} */
    ToggleSwitchComponent.prototype.valueChange;
    /** @type {?} */
    ToggleSwitchComponent.prototype._value;
    /** @type {?} */
    ToggleSwitchComponent.prototype.focused;
    /** @type {?} */
    ToggleSwitchComponent.prototype.onTouchedCallback;
    /** @type {?} */
    ToggleSwitchComponent.prototype.onChangeCallback;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlc3dpdGNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3RvZ2dsZXN3aXRjaC90b2dnbGVzd2l0Y2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUscUJBQU0sMkJBQTJCLEdBQUc7SUFDaEMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxxQkFBcUIsRUFBckIsQ0FBcUIsQ0FBQztJQUNwRCxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUFFRixxQkFBSSxvQkFBb0IsR0FBRyxDQUFDLENBQUM7OzsrQkF1Q1MscUJBQW1CLEVBQUUsb0JBQXNCO2tCQUV2RCxJQUFJLENBQUMsZUFBZTt3QkFFZCxDQUFDO3lCQUNDLElBQUk7d0JBQ0wsS0FBSzt5QkFDTyxFQUFFOzhCQUNRLElBQUk7MkJBRVIsSUFBSSxZQUFZLEVBQVc7c0JBc0JoRCxLQUFLO3VCQUVaLEtBQUs7aUNBQ1EsZUFBUztnQ0FDSixlQUFTOzswQkF2QjFDLHdDQUFLOzs7OztZQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDOzs7Ozs7UUFHdkIsVUFBVSxLQUFjO1lBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDOztZQUdwQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7WUFHN0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzVCOzs7O0lBRUQsc0JBQUksMENBQU87Ozs7UUFBWDtZQUNJLE1BQU0sQ0FBQyxDQUFHLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLGVBQWUsWUFBUSxDQUFDO1NBQ3JEOzs7T0FBQTs7OztJQVFELHNDQUFNOzs7SUFBTjtRQUNJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUM1QjtLQUNKOzs7OztJQUVELDBDQUFVOzs7O0lBQVYsVUFBVyxLQUFjO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztLQUN4Qjs7Ozs7SUFFRCxnREFBZ0I7Ozs7SUFBaEIsVUFBaUIsRUFBTztRQUNwQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0tBQzlCOzs7OztJQUVELGlEQUFpQjs7OztJQUFqQixVQUFrQixFQUFPO1FBQ3JCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7S0FDL0I7Ozs7O0lBRUQsZ0RBQWdCOzs7O0lBQWhCLFVBQWlCLFVBQW1CO1FBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0tBQzlCOztnQkEvRkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRSxvaUNBOEJMO29CQUNMLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO2lCQUMzQzs7Ozt1QkFLSSxLQUFLO3lCQUNMLEtBQUs7NkJBQ0wsS0FBSzs4QkFDTCxLQUFLOzZCQUNMLEtBQUs7OEJBQ0wsS0FBSyxTQUFDLFlBQVk7bUNBQ2xCLEtBQUssU0FBQyxpQkFBaUI7Z0NBRXZCLE1BQU07MEJBRU4sS0FBSzs7Z0NBNURWOztTQThDYSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5jb25zdCBUT0dHTEVTV0lUQ0hfVkFMVUVfQUNDRVNTT1IgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gVG9nZ2xlU3dpdGNoQ29tcG9uZW50KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxubGV0IHVuaXF1ZVRvZ2dsZVN3aXRjaElkID0gMDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC10b2dnbGVzd2l0Y2gnLFxuICAgIHRlbXBsYXRlOiBgPGxhYmVsIFthdHRyLmZvcl09XCJpbnB1dElkXCJcbiAgICAgICBjbGFzcz1cInV4LXRvZ2dsZXN3aXRjaFwiXG4gICAgICAgW2NsYXNzLnV4LXRvZ2dsZXN3aXRjaC1jaGVja2VkXT1cInZhbHVlXCJcbiAgICAgICBbY2xhc3MudXgtdG9nZ2xlc3dpdGNoLWRpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICBbY2xhc3MudXgtdG9nZ2xlc3dpdGNoLWZvY3VzZWRdPVwiZm9jdXNlZFwiPlxuXG4gICAgPGlucHV0IGNsYXNzPVwidXgtdG9nZ2xlc3dpdGNoLWlucHV0XCJcbiAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgcm9sZT1cInN3aXRjaFwiXG4gICAgICAgICAgIFtpZF09XCJpbnB1dElkXCJcbiAgICAgICAgICAgW2NoZWNrZWRdPVwidmFsdWVcIlxuICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICBbYXR0ci5uYW1lXT1cIm5hbWVcIlxuICAgICAgICAgICBbdGFiaW5kZXhdPVwidGFiaW5kZXhcIlxuICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFMYWJlbFwiXG4gICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRieVwiXG4gICAgICAgICAgIFthdHRyLmFyaWEtY2hlY2tlZF09XCJ2YWx1ZVwiXG4gICAgICAgICAgIChmb2N1cyk9XCJmb2N1c2VkID0gdHJ1ZVwiXG4gICAgICAgICAgIChibHVyKT1cImZvY3VzZWQgPSBmYWxzZVwiXG4gICAgICAgICAgIChjaGFuZ2UpPVwidG9nZ2xlKClcIlxuICAgICAgICAgICAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCI+XG5cbiAgICA8ZGl2IGNsYXNzPVwidXgtdG9nZ2xlc3dpdGNoLWNvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidXgtdG9nZ2xlc3dpdGNoLWJnXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1eC10b2dnbGVzd2l0Y2gtbnViXCI+PC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8c3BhbiBjbGFzcz1cInV4LXRvZ2dsZXN3aXRjaC1sYWJlbFwiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9zcGFuPlxuPC9sYWJlbD5gLFxuICAgIHByb3ZpZGVyczogW1RPR0dMRVNXSVRDSF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgVG9nZ2xlU3dpdGNoQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gICAgcHJpdmF0ZSBfdG9nZ2xlU3dpdGNoSWQ6IHN0cmluZyA9IGB1eC10b2dnbGVzd2l0Y2gtJHsrK3VuaXF1ZVRvZ2dsZVN3aXRjaElkfWA7XG5cbiAgICBASW5wdXQoKSBpZDogc3RyaW5nID0gdGhpcy5fdG9nZ2xlU3dpdGNoSWQ7XG4gICAgQElucHV0KCkgbmFtZTogc3RyaW5nIHwgbnVsbDtcbiAgICBASW5wdXQoKSB0YWJpbmRleDogbnVtYmVyID0gMDtcbiAgICBASW5wdXQoKSBjbGlja2FibGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCdhcmlhLWxhYmVsJykgYXJpYUxhYmVsOiBzdHJpbmcgPSAnJztcbiAgICBASW5wdXQoJ2FyaWEtbGFiZWxsZWRieScpIGFyaWFMYWJlbGxlZGJ5OiBzdHJpbmcgPSBudWxsO1xuXG4gICAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cblxuICAgIHNldCB2YWx1ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuXG4gICAgICAgIC8vIFVwZGF0ZSB2YWx1ZSBvdXRwdXRcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcblxuICAgICAgICAvLyBOb3RpZnkgbmdNb2RlbFxuICAgICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodmFsdWUpO1xuICAgICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XG4gICAgfVxuXG4gICAgZ2V0IGlucHV0SWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuaWQgfHwgdGhpcy5fdG9nZ2xlU3dpdGNoSWR9LWlucHV0YDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF92YWx1ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgZm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gKCkgPT4geyB9O1xuICAgIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7IH07XG5cbiAgICB0b2dnbGUoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCAmJiB0aGlzLmNsaWNrYWJsZSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9ICF0aGlzLnZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gISF2YWx1ZTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIH1cbn1cbiJdfQ==