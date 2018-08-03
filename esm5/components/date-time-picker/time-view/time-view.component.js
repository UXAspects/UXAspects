/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DateTimePickerService } from '../date-time-picker.service';
var TimeViewComponent = /** @class */ (function () {
    function TimeViewComponent(datepicker) {
        this.datepicker = datepicker;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    TimeViewComponent.prototype.selectTimezone = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        var /** @type {?} */ timezones = this.datepicker.timezones$.value;
        // find matching timezone
        var /** @type {?} */ timezone = timezones.find(function (_timezone) { return _timezone.name === name; });
        if (timezone) {
            this.datepicker.setTimezone(timezone);
        }
    };
    /**
     * @return {?}
     */
    TimeViewComponent.prototype.incrementTimezone = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ timezone = this.datepicker.timezone$.value;
        var /** @type {?} */ timezones = this.datepicker.timezones$.value;
        var /** @type {?} */ currentZone = timezones.findIndex(function (zone) { return zone.name === timezone.name && zone.offset === timezone.offset; });
        // try to get the previous zone
        this.datepicker.setTimezone(timezones[currentZone + 1] ? timezones[currentZone + 1] : timezones[currentZone]);
    };
    /**
     * @return {?}
     */
    TimeViewComponent.prototype.decrementTimezone = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ timezone = this.datepicker.timezone$.value;
        var /** @type {?} */ timezones = this.datepicker.timezones$.value;
        var /** @type {?} */ currentZone = timezones.findIndex(function (zone) { return zone.name === timezone.name && zone.offset === timezone.offset; });
        // try to get the previous zone
        this.datepicker.setTimezone(timezones[currentZone - 1] ? timezones[currentZone - 1] : timezones[currentZone]);
    };
    TimeViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-date-time-picker-time-view',
                    template: "<ux-time-picker *ngIf=\"datepicker.showTime$ | async\"\n    [value]=\"datepicker.selected$ | async\"\n    (valueChange)=\"datepicker.selected$.next($event)\"\n    [showSeconds]=\"datepicker.showSeconds$ | async\"\n    [showMeridian]=\"datepicker.showMeridian$ | async\"\n    [showSpinners]=\"datepicker.showSpinners$ | async\">\n</ux-time-picker>\n\n<ng-container *ngIf=\"datepicker.showTimezone$ | async\">\n\n    <div class=\"time-zone-picker\" *ngIf=\"datepicker.showSpinners$ | async\">\n\n        <ux-spin-button\n            class=\"time-zone-spinner\"\n            [value]=\"(datepicker.timezone$ | async).name\"\n            [readOnly]=\"true\"\n            (increment)=\"incrementTimezone()\"\n            (decrement)=\"decrementTimezone()\"\n            inputAriaLabel=\"Time Zone\"\n            incrementAriaLabel=\"Switch to the next time zone\"\n            decrementAriaLabel=\"Switch to the previous time zone\">\n        </ux-spin-button>\n    </div>\n\n    <div class=\"time-zone-picker\" *ngIf=\"!(datepicker.showSpinners$ | async)\">\n\n        <select class=\"form-control time-zone-select\"\n                tabindex=\"0\"\n                [ngModel]=\"(datepicker.timezone$ | async).name\"\n                (ngModelChange)=\"selectTimezone($event)\"\n                aria-label=\"Timezone\"\n                [attr.aria-valuenow]=\"(datepicker.timezone$ | async).name\">\n\n            <option *ngFor=\"let zone of datepicker.timezones$ | async\"\n                    [selected]=\"zone.name === (datepicker.timezone$ | async).name\"\n                    [value]=\"zone.name\">\n                {{ zone?.name }}\n            </option>\n\n        </select>\n    </div>\n\n</ng-container>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    TimeViewComponent.ctorParameters = function () { return [
        { type: DateTimePickerService }
    ]; };
    return TimeViewComponent;
}());
export { TimeViewComponent };
function TimeViewComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    TimeViewComponent.prototype.datepicker;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvdGltZS12aWV3L3RpbWUtdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7O0lBU2hFLDJCQUFtQixVQUFpQztRQUFqQyxlQUFVLEdBQVYsVUFBVSxDQUF1QjtLQUFLOzs7OztJQUV6RCwwQ0FBYzs7OztJQUFkLFVBQWUsSUFBWTtRQUN2QixxQkFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDOztRQUduRCxxQkFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFBLFNBQVMsSUFBSSxPQUFBLFNBQVMsQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUF2QixDQUF1QixDQUFDLENBQUM7UUFFdEUsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3pDO0tBQ0o7Ozs7SUFFRCw2Q0FBaUI7OztJQUFqQjtRQUNJLHFCQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDakQscUJBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUVuRCxxQkFBTSxXQUFXLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxNQUFNLEVBQTlELENBQThELENBQUMsQ0FBQzs7UUFHaEgsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7S0FDakg7Ozs7SUFFRCw2Q0FBaUI7OztJQUFqQjtRQUNJLHFCQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDakQscUJBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUVuRCxxQkFBTSxXQUFXLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxNQUFNLEVBQTlELENBQThELENBQUMsQ0FBQzs7UUFHaEgsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7S0FDakg7O2dCQXRDSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLCtCQUErQjtvQkFDekMsdXJEQUF5QztvQkFDekMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2xEOzs7O2dCQU5RLHFCQUFxQjs7NEJBRDlCOztTQVFhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGVUaW1lUGlja2VyU2VydmljZSB9IGZyb20gJy4uL2RhdGUtdGltZS1waWNrZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtZGF0ZS10aW1lLXBpY2tlci10aW1lLXZpZXcnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90aW1lLXZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVWaWV3Q29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkYXRlcGlja2VyOiBEYXRlVGltZVBpY2tlclNlcnZpY2UpIHsgfVxuXG4gICAgc2VsZWN0VGltZXpvbmUobmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHRpbWV6b25lcyA9IHRoaXMuZGF0ZXBpY2tlci50aW1lem9uZXMkLnZhbHVlO1xuICAgICAgICBcbiAgICAgICAgLy8gZmluZCBtYXRjaGluZyB0aW1lem9uZVxuICAgICAgICBjb25zdCB0aW1lem9uZSA9IHRpbWV6b25lcy5maW5kKF90aW1lem9uZSA9PiBfdGltZXpvbmUubmFtZSA9PT0gbmFtZSk7XG5cbiAgICAgICAgaWYgKHRpbWV6b25lKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGVwaWNrZXIuc2V0VGltZXpvbmUodGltZXpvbmUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5jcmVtZW50VGltZXpvbmUoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHRpbWV6b25lID0gdGhpcy5kYXRlcGlja2VyLnRpbWV6b25lJC52YWx1ZTtcbiAgICAgICAgY29uc3QgdGltZXpvbmVzID0gdGhpcy5kYXRlcGlja2VyLnRpbWV6b25lcyQudmFsdWU7XG5cbiAgICAgICAgY29uc3QgY3VycmVudFpvbmUgPSB0aW1lem9uZXMuZmluZEluZGV4KHpvbmUgPT4gem9uZS5uYW1lID09PSB0aW1lem9uZS5uYW1lICYmIHpvbmUub2Zmc2V0ID09PSB0aW1lem9uZS5vZmZzZXQpO1xuXG4gICAgICAgIC8vIHRyeSB0byBnZXQgdGhlIHByZXZpb3VzIHpvbmVcbiAgICAgICAgdGhpcy5kYXRlcGlja2VyLnNldFRpbWV6b25lKHRpbWV6b25lc1tjdXJyZW50Wm9uZSArIDFdID8gdGltZXpvbmVzW2N1cnJlbnRab25lICsgMV0gOiB0aW1lem9uZXNbY3VycmVudFpvbmVdKTtcbiAgICB9XG5cbiAgICBkZWNyZW1lbnRUaW1lem9uZSgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdGltZXpvbmUgPSB0aGlzLmRhdGVwaWNrZXIudGltZXpvbmUkLnZhbHVlO1xuICAgICAgICBjb25zdCB0aW1lem9uZXMgPSB0aGlzLmRhdGVwaWNrZXIudGltZXpvbmVzJC52YWx1ZTtcblxuICAgICAgICBjb25zdCBjdXJyZW50Wm9uZSA9IHRpbWV6b25lcy5maW5kSW5kZXgoem9uZSA9PiB6b25lLm5hbWUgPT09IHRpbWV6b25lLm5hbWUgJiYgem9uZS5vZmZzZXQgPT09IHRpbWV6b25lLm9mZnNldCk7XG5cbiAgICAgICAgLy8gdHJ5IHRvIGdldCB0aGUgcHJldmlvdXMgem9uZVxuICAgICAgICB0aGlzLmRhdGVwaWNrZXIuc2V0VGltZXpvbmUodGltZXpvbmVzW2N1cnJlbnRab25lIC0gMV0gPyB0aW1lem9uZXNbY3VycmVudFpvbmUgLSAxXSA6IHRpbWV6b25lc1tjdXJyZW50Wm9uZV0pO1xuICAgIH1cbn0iXX0=