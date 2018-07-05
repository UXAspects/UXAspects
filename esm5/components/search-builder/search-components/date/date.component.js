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
    /** @nocollapse */
    SearchDateComponent.ctorParameters = function () { return []; };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zZWFyY2gtYnVpbGRlci9zZWFyY2gtY29tcG9uZW50cy9kYXRlL2RhdGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsbUJBQW1CLEVBQTZCLE1BQU0sMEJBQTBCLENBQUM7O0lBa0JqRCwrQ0FBbUI7OztxQkFFM0MsTUFBTTs7O0lBRXJCLHNCQUFJLHNDQUFLOzs7O1FBQVQ7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDMUI7OztPQUFBO0lBRUQsc0JBQUksNENBQVc7Ozs7UUFBZjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxZQUFZLENBQUM7U0FDaEQ7OztPQUFBOzs7O0lBRUQsc0NBQVE7OztJQUFSOztRQUdFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1NBQ3pCO0tBQ0Y7O2dCQWxDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsUUFBUSxFQUFFLDByQkFZRztpQkFDZDs7Ozs4QkFsQkQ7RUFtQnlDLG1CQUFtQjtTQUEvQyxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmFzZVNlYXJjaENvbXBvbmVudCwgQmFzZVNlYXJjaENvbXBvbmVudENvbmZpZyB9IGZyb20gJy4uL2Jhc2Utc2VhcmNoLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3V4LXNlYXJjaC1kYXRlJyxcbiAgdGVtcGxhdGU6IGA8bGFiZWwgY2xhc3M9XCJmb3JtLWxhYmVsXCIgKm5nSWY9XCJsYWJlbFwiPnt7IGxhYmVsIH19PC9sYWJlbD5cblxuPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwIGRhdGUgbS1uaWxcIj5cbiAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uXCIgdGFiaW5kZXg9XCIxXCIgKGNsaWNrKT1cInBvcG92ZXIuc2hvdygpXCI+XG4gICAgICAgIDxpIGNsYXNzPVwiaHBlLWljb24gaHBlLWNhbGVuZGFyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgIDwvc3Bhbj5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiAjcG9wb3Zlcj1cInV4LXBvcG92ZXJcIiBbbmdNb2RlbF09XCJ2YWx1ZSB8IGRhdGU6J2RkIE1NTU0geXl5eSdcIiBbdXhQb3BvdmVyXT1cInBvcG92ZXJUZW1wbGF0ZVwiXG4gICAgICAgIHBsYWNlbWVudD1cImJvdHRvbVwiIHBvcG92ZXJDbGFzcz1cImRhdGUtdGltZS1waWNrZXItcG9wb3ZlclwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgYXJpYS1sYWJlbD1cIlNlbGVjdGVkIGRhdGVcIiBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIj5cbjwvZGl2PlxuXG48bmctdGVtcGxhdGUgI3BvcG92ZXJUZW1wbGF0ZT5cbiAgICA8dXgtZGF0ZS10aW1lLXBpY2tlciBbKGRhdGUpXT1cInZhbHVlXCIgW3Nob3dUaW1lXT1cImZhbHNlXCI+PC91eC1kYXRlLXRpbWUtcGlja2VyPlxuPC9uZy10ZW1wbGF0ZT5gXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaERhdGVDb21wb25lbnQgZXh0ZW5kcyBCYXNlU2VhcmNoQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICB0eXBlOiBzdHJpbmcgPSAnZGF0ZSc7XG5cbiAgZ2V0IGxhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmxhYmVsO1xuICB9XG5cbiAgZ2V0IHBsYWNlaG9sZGVyKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLnBsYWNlaG9sZGVyIHx8ICdFbnRlciBkYXRlJztcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuXG4gICAgLy8gYnkgZGVmYXVsdCBzZXQgdG8gdGhlIGN1cnJlbnQgZGF0ZSBpZiBub3Qgc3BlY2lmaWVkXG4gICAgaWYgKCF0aGlzLnZhbHVlKSB7XG4gICAgICB0aGlzLnZhbHVlID0gbmV3IERhdGUoKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZWFyY2hEYXRlQ29uZmlnIGV4dGVuZHMgQmFzZVNlYXJjaENvbXBvbmVudENvbmZpZyB7IH0iXX0=