/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DateTimePickerService } from '../date-time-picker.service';
var TimeViewComponent = (function () {
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
                },] },
    ];
    /** @nocollapse */
    TimeViewComponent.ctorParameters = function () { return [
        { type: DateTimePickerService, },
    ]; };
    return TimeViewComponent;
}());
export { TimeViewComponent };
function TimeViewComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    TimeViewComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    TimeViewComponent.ctorParameters;
    /** @type {?} */
    TimeViewComponent.prototype.datepicker;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvdGltZS12aWV3L3RpbWUtdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7O0lBb0RoRSwyQkFBbUIsVUFBaUM7UUFBakMsZUFBVSxHQUFWLFVBQVUsQ0FBdUI7S0FBSzs7Ozs7SUFFekQsMENBQWM7Ozs7SUFBZCxVQUFlLElBQVk7UUFDdkIscUJBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQzs7UUFHbkQscUJBQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBQSxTQUFTLElBQUksT0FBQSxTQUFTLENBQUMsSUFBSSxLQUFLLElBQUksRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDO1FBRXRFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDWCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN6QztLQUNKOzs7O0lBRUQsNkNBQWlCOzs7SUFBakI7UUFDSSxxQkFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBQ2pELHFCQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFFbkQscUJBQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxRQUFRLENBQUMsTUFBTSxFQUE5RCxDQUE4RCxDQUFDLENBQUM7O1FBR2hILElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztLQUNqSDs7OztJQUVELDZDQUFpQjs7O0lBQWpCO1FBQ0kscUJBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUNqRCxxQkFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBRW5ELHFCQUFNLFdBQVcsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUSxDQUFDLE1BQU0sRUFBOUQsQ0FBOEQsQ0FBQyxDQUFDOztRQUdoSCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7S0FDakg7O2dCQWpGSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLCtCQUErQjtvQkFDekMsUUFBUSxFQUFFLDZxREEyQ2I7b0JBQ0csZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2xEOzs7O2dCQWpEUSxxQkFBcUI7OzRCQUQ5Qjs7U0FtRGEsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZVRpbWVQaWNrZXJTZXJ2aWNlIH0gZnJvbSAnLi4vZGF0ZS10aW1lLXBpY2tlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1kYXRlLXRpbWUtcGlja2VyLXRpbWUtdmlldycsXG4gICAgdGVtcGxhdGU6IGA8dXgtdGltZS1waWNrZXIgKm5nSWY9XCJkYXRlcGlja2VyLnNob3dUaW1lJCB8IGFzeW5jXCJcbiAgICBbdmFsdWVdPVwiZGF0ZXBpY2tlci5zZWxlY3RlZCQgfCBhc3luY1wiXG4gICAgKHZhbHVlQ2hhbmdlKT1cImRhdGVwaWNrZXIuc2VsZWN0ZWQkLm5leHQoJGV2ZW50KVwiXG4gICAgW3Nob3dTZWNvbmRzXT1cImRhdGVwaWNrZXIuc2hvd1NlY29uZHMkIHwgYXN5bmNcIlxuICAgIFtzaG93TWVyaWRpYW5dPVwiZGF0ZXBpY2tlci5zaG93TWVyaWRpYW4kIHwgYXN5bmNcIlxuICAgIFtzaG93U3Bpbm5lcnNdPVwiZGF0ZXBpY2tlci5zaG93U3Bpbm5lcnMkIHwgYXN5bmNcIj5cbjwvdXgtdGltZS1waWNrZXI+XG5cbjxuZy1jb250YWluZXIgKm5nSWY9XCJkYXRlcGlja2VyLnNob3dUaW1lem9uZSQgfCBhc3luY1wiPlxuXG4gICAgPGRpdiBjbGFzcz1cInRpbWUtem9uZS1waWNrZXJcIiAqbmdJZj1cImRhdGVwaWNrZXIuc2hvd1NwaW5uZXJzJCB8IGFzeW5jXCI+XG5cbiAgICAgICAgPHV4LXNwaW4tYnV0dG9uXG4gICAgICAgICAgICBjbGFzcz1cInRpbWUtem9uZS1zcGlubmVyXCJcbiAgICAgICAgICAgIFt2YWx1ZV09XCIoZGF0ZXBpY2tlci50aW1lem9uZSQgfCBhc3luYykubmFtZVwiXG4gICAgICAgICAgICBbcmVhZE9ubHldPVwidHJ1ZVwiXG4gICAgICAgICAgICAoaW5jcmVtZW50KT1cImluY3JlbWVudFRpbWV6b25lKClcIlxuICAgICAgICAgICAgKGRlY3JlbWVudCk9XCJkZWNyZW1lbnRUaW1lem9uZSgpXCJcbiAgICAgICAgICAgIGlucHV0QXJpYUxhYmVsPVwiVGltZSBab25lXCJcbiAgICAgICAgICAgIGluY3JlbWVudEFyaWFMYWJlbD1cIlN3aXRjaCB0byB0aGUgbmV4dCB0aW1lIHpvbmVcIlxuICAgICAgICAgICAgZGVjcmVtZW50QXJpYUxhYmVsPVwiU3dpdGNoIHRvIHRoZSBwcmV2aW91cyB0aW1lIHpvbmVcIj5cbiAgICAgICAgPC91eC1zcGluLWJ1dHRvbj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJ0aW1lLXpvbmUtcGlja2VyXCIgKm5nSWY9XCIhKGRhdGVwaWNrZXIuc2hvd1NwaW5uZXJzJCB8IGFzeW5jKVwiPlxuXG4gICAgICAgIDxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2wgdGltZS16b25lLXNlbGVjdFwiXG4gICAgICAgICAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgICAgICAgICBbbmdNb2RlbF09XCIoZGF0ZXBpY2tlci50aW1lem9uZSQgfCBhc3luYykubmFtZVwiXG4gICAgICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwic2VsZWN0VGltZXpvbmUoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIlRpbWV6b25lXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXZhbHVlbm93XT1cIihkYXRlcGlja2VyLnRpbWV6b25lJCB8IGFzeW5jKS5uYW1lXCI+XG5cbiAgICAgICAgICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IHpvbmUgb2YgZGF0ZXBpY2tlci50aW1lem9uZXMkIHwgYXN5bmNcIlxuICAgICAgICAgICAgICAgICAgICBbc2VsZWN0ZWRdPVwiem9uZS5uYW1lID09PSAoZGF0ZXBpY2tlci50aW1lem9uZSQgfCBhc3luYykubmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJ6b25lLm5hbWVcIj5cbiAgICAgICAgICAgICAgICB7eyB6b25lPy5uYW1lIH19XG4gICAgICAgICAgICA8L29wdGlvbj5cblxuICAgICAgICA8L3NlbGVjdD5cbiAgICA8L2Rpdj5cblxuPC9uZy1jb250YWluZXI+XG5gLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVWaWV3Q29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkYXRlcGlja2VyOiBEYXRlVGltZVBpY2tlclNlcnZpY2UpIHsgfVxuXG4gICAgc2VsZWN0VGltZXpvbmUobmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHRpbWV6b25lcyA9IHRoaXMuZGF0ZXBpY2tlci50aW1lem9uZXMkLnZhbHVlO1xuICAgICAgICBcbiAgICAgICAgLy8gZmluZCBtYXRjaGluZyB0aW1lem9uZVxuICAgICAgICBjb25zdCB0aW1lem9uZSA9IHRpbWV6b25lcy5maW5kKF90aW1lem9uZSA9PiBfdGltZXpvbmUubmFtZSA9PT0gbmFtZSk7XG5cbiAgICAgICAgaWYgKHRpbWV6b25lKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGVwaWNrZXIuc2V0VGltZXpvbmUodGltZXpvbmUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5jcmVtZW50VGltZXpvbmUoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHRpbWV6b25lID0gdGhpcy5kYXRlcGlja2VyLnRpbWV6b25lJC52YWx1ZTtcbiAgICAgICAgY29uc3QgdGltZXpvbmVzID0gdGhpcy5kYXRlcGlja2VyLnRpbWV6b25lcyQudmFsdWU7XG5cbiAgICAgICAgY29uc3QgY3VycmVudFpvbmUgPSB0aW1lem9uZXMuZmluZEluZGV4KHpvbmUgPT4gem9uZS5uYW1lID09PSB0aW1lem9uZS5uYW1lICYmIHpvbmUub2Zmc2V0ID09PSB0aW1lem9uZS5vZmZzZXQpO1xuXG4gICAgICAgIC8vIHRyeSB0byBnZXQgdGhlIHByZXZpb3VzIHpvbmVcbiAgICAgICAgdGhpcy5kYXRlcGlja2VyLnNldFRpbWV6b25lKHRpbWV6b25lc1tjdXJyZW50Wm9uZSArIDFdID8gdGltZXpvbmVzW2N1cnJlbnRab25lICsgMV0gOiB0aW1lem9uZXNbY3VycmVudFpvbmVdKTtcbiAgICB9XG5cbiAgICBkZWNyZW1lbnRUaW1lem9uZSgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdGltZXpvbmUgPSB0aGlzLmRhdGVwaWNrZXIudGltZXpvbmUkLnZhbHVlO1xuICAgICAgICBjb25zdCB0aW1lem9uZXMgPSB0aGlzLmRhdGVwaWNrZXIudGltZXpvbmVzJC52YWx1ZTtcblxuICAgICAgICBjb25zdCBjdXJyZW50Wm9uZSA9IHRpbWV6b25lcy5maW5kSW5kZXgoem9uZSA9PiB6b25lLm5hbWUgPT09IHRpbWV6b25lLm5hbWUgJiYgem9uZS5vZmZzZXQgPT09IHRpbWV6b25lLm9mZnNldCk7XG5cbiAgICAgICAgLy8gdHJ5IHRvIGdldCB0aGUgcHJldmlvdXMgem9uZVxuICAgICAgICB0aGlzLmRhdGVwaWNrZXIuc2V0VGltZXpvbmUodGltZXpvbmVzW2N1cnJlbnRab25lIC0gMV0gPyB0aW1lem9uZXNbY3VycmVudFpvbmUgLSAxXSA6IHRpbWV6b25lc1tjdXJyZW50Wm9uZV0pO1xuICAgIH1cbn0iXX0=