/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseSearchComponent } from '../base-search.component';
var SearchDateComponent = /** @class */ (function (_super) {
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
                    template: "<label class=\"form-label\" *ngIf=\"label\">{{ label }}</label>\n\n<div class=\"input-group date m-nil\">\n    <span class=\"input-group-addon\" tabindex=\"1\" (click)=\"popover.show()\">\n        <i class=\"hpe-icon hpe-calendar\" aria-hidden=\"true\"></i>\n    </span>\n    <input type=\"text\"\n        class=\"form-control\"\n        aria-label=\"Selected date\"\n        [placeholder]=\"placeholder\"\n        #popover=\"ux-popover\"\n        [ngModel]=\"value | date:'dd MMMM yyyy'\"\n        [uxPopover]=\"popoverTemplate\"\n        placement=\"bottom\"\n        popoverClass=\"date-time-picker-popover\"\n        [focusIf]=\"focus\">\n</div>\n\n<ng-template #popoverTemplate>\n    <ux-date-time-picker [(date)]=\"value\" [showTime]=\"false\"></ux-date-time-picker>\n</ng-template>"
                }] }
    ];
    return SearchDateComponent;
}(BaseSearchComponent));
export { SearchDateComponent };
function SearchDateComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    SearchDateComponent.prototype.type;
}
/**
 * @record
 */
export function SearchDateConfig() { }
function SearchDateConfig_tsickle_Closure_declarations() {
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zZWFyY2gtYnVpbGRlci9zZWFyY2gtY29tcG9uZW50cy9kYXRlL2RhdGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsbUJBQW1CLEVBQTZCLE1BQU0sMEJBQTBCLENBQUM7O0lBTWpELCtDQUFtQjs7O3FCQUUzQyxNQUFNOzs7SUFFckIsc0JBQUksc0NBQUs7Ozs7UUFBVDtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUMxQjs7O09BQUE7SUFFRCxzQkFBSSw0Q0FBVzs7OztRQUFmO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxJQUFJLFlBQVksQ0FBQztTQUNoRDs7O09BQUE7Ozs7SUFFRCxzQ0FBUTs7O0lBQVI7O1FBR0UsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7U0FDekI7S0FDRjs7Z0JBdEJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixneUJBQW9DO2lCQUNyQzs7OEJBTkQ7RUFPeUMsbUJBQW1CO1NBQS9DLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYXNlU2VhcmNoQ29tcG9uZW50LCBCYXNlU2VhcmNoQ29tcG9uZW50Q29uZmlnIH0gZnJvbSAnLi4vYmFzZS1zZWFyY2guY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndXgtc2VhcmNoLWRhdGUnLFxuICB0ZW1wbGF0ZVVybDogJy4vZGF0ZS5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoRGF0ZUNvbXBvbmVudCBleHRlbmRzIEJhc2VTZWFyY2hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHR5cGU6IHN0cmluZyA9ICdkYXRlJztcblxuICBnZXQgbGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcubGFiZWw7XG4gIH1cblxuICBnZXQgcGxhY2Vob2xkZXIoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcucGxhY2Vob2xkZXIgfHwgJ0VudGVyIGRhdGUnO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgICAvLyBieSBkZWZhdWx0IHNldCB0byB0aGUgY3VycmVudCBkYXRlIGlmIG5vdCBzcGVjaWZpZWRcbiAgICBpZiAoIXRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMudmFsdWUgPSBuZXcgRGF0ZSgpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNlYXJjaERhdGVDb25maWcgZXh0ZW5kcyBCYXNlU2VhcmNoQ29tcG9uZW50Q29uZmlnIHsgfSJdfQ==