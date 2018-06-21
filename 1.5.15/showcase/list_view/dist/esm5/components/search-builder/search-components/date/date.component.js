/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseSearchComponent } from '../base-search.component';
var SearchDateComponent = (function (_super) {
    tslib_1.__extends(SearchDateComponent, _super);
    function SearchDateComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'date';
        return _this;
    }
    Object.defineProperty(SearchDateComponent.prototype, "label", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchDateComponent.prototype, "placeholder", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.placeholder || 'Enter date';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SearchDateComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // by default set to the current date if not specified
        if (!this.value) {
            this.value = new Date();
        }
    };
    SearchDateComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-search-date',
                    template: "<label class=\"form-label\" *ngIf=\"label\">{{ label }}</label>\n\n<div class=\"input-group date m-nil\">\n    <span class=\"input-group-addon\" tabindex=\"1\" (click)=\"popover.show()\">\n        <i class=\"hpe-icon hpe-calendar\" aria-hidden=\"true\"></i>\n    </span>\n    <input type=\"text\" #popover=\"ux-popover\" [ngModel]=\"value | date:'dd MMMM yyyy'\" [uxPopover]=\"popoverTemplate\"\n        placement=\"bottom\" popoverClass=\"date-time-picker-popover\" class=\"form-control\" aria-label=\"Selected date\" [placeholder]=\"placeholder\">\n</div>\n\n<ng-template #popoverTemplate>\n    <ux-date-time-picker [(date)]=\"value\" [showTime]=\"false\"></ux-date-time-picker>\n</ng-template>"
                },] },
    ];
    return SearchDateComponent;
}(BaseSearchComponent));
export { SearchDateComponent };
function SearchDateComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SearchDateComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SearchDateComponent.ctorParameters;
    /** @type {?} */
    SearchDateComponent.prototype.type;
}
/**
 * @record
 */
export function SearchDateConfig() { }
function SearchDateConfig_tsickle_Closure_declarations() {
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zZWFyY2gtYnVpbGRlci9zZWFyY2gtY29tcG9uZW50cy9kYXRlL2RhdGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsbUJBQW1CLEVBQTZCLE1BQU0sMEJBQTBCLENBQUM7O0lBa0JqRCwrQ0FBbUI7OztxQkFFM0MsTUFBTTs7O0lBRXJCLHNCQUFJLHNDQUFLOzs7O1FBQVQ7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDMUI7OztPQUFBO0lBRUQsc0JBQUksNENBQVc7Ozs7UUFBZjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxZQUFZLENBQUM7U0FDaEQ7OztPQUFBOzs7O0lBRUQsc0NBQVE7OztJQUFSOztRQUdFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1NBQ3pCO0tBQ0Y7O2dCQWxDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsUUFBUSxFQUFFLDByQkFZRztpQkFDZDs7OEJBbEJEO0VBbUJ5QyxtQkFBbUI7U0FBL0MsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VTZWFyY2hDb21wb25lbnQsIEJhc2VTZWFyY2hDb21wb25lbnRDb25maWcgfSBmcm9tICcuLi9iYXNlLXNlYXJjaC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd1eC1zZWFyY2gtZGF0ZScsXG4gIHRlbXBsYXRlOiBgPGxhYmVsIGNsYXNzPVwiZm9ybS1sYWJlbFwiICpuZ0lmPVwibGFiZWxcIj57eyBsYWJlbCB9fTwvbGFiZWw+XG5cbjxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cCBkYXRlIG0tbmlsXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvblwiIHRhYmluZGV4PVwiMVwiIChjbGljayk9XCJwb3BvdmVyLnNob3coKVwiPlxuICAgICAgICA8aSBjbGFzcz1cImhwZS1pY29uIGhwZS1jYWxlbmRhclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICA8L3NwYW4+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgI3BvcG92ZXI9XCJ1eC1wb3BvdmVyXCIgW25nTW9kZWxdPVwidmFsdWUgfCBkYXRlOidkZCBNTU1NIHl5eXknXCIgW3V4UG9wb3Zlcl09XCJwb3BvdmVyVGVtcGxhdGVcIlxuICAgICAgICBwbGFjZW1lbnQ9XCJib3R0b21cIiBwb3BvdmVyQ2xhc3M9XCJkYXRlLXRpbWUtcGlja2VyLXBvcG92ZXJcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGFyaWEtbGFiZWw9XCJTZWxlY3RlZCBkYXRlXCIgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCI+XG48L2Rpdj5cblxuPG5nLXRlbXBsYXRlICNwb3BvdmVyVGVtcGxhdGU+XG4gICAgPHV4LWRhdGUtdGltZS1waWNrZXIgWyhkYXRlKV09XCJ2YWx1ZVwiIFtzaG93VGltZV09XCJmYWxzZVwiPjwvdXgtZGF0ZS10aW1lLXBpY2tlcj5cbjwvbmctdGVtcGxhdGU+YFxufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hEYXRlQ29tcG9uZW50IGV4dGVuZHMgQmFzZVNlYXJjaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgdHlwZTogc3RyaW5nID0gJ2RhdGUnO1xuXG4gIGdldCBsYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5sYWJlbDtcbiAgfVxuXG4gIGdldCBwbGFjZWhvbGRlcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5wbGFjZWhvbGRlciB8fCAnRW50ZXIgZGF0ZSc7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcblxuICAgIC8vIGJ5IGRlZmF1bHQgc2V0IHRvIHRoZSBjdXJyZW50IGRhdGUgaWYgbm90IHNwZWNpZmllZFxuICAgIGlmICghdGhpcy52YWx1ZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IG5ldyBEYXRlKCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VhcmNoRGF0ZUNvbmZpZyBleHRlbmRzIEJhc2VTZWFyY2hDb21wb25lbnRDb25maWcgeyB9Il19