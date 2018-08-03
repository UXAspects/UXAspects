/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { DateTimePickerService, ModeDirection } from '../date-time-picker.service';
import { compareDays, dateRange, gridify, months } from '../date-time-picker.utils';
var DayViewService = /** @class */ (function () {
    function DayViewService(_datepicker) {
        var _this = this;
        this._datepicker = _datepicker;
        this.grid$ = new BehaviorSubject([[]]);
        this.focused$ = new BehaviorSubject(null);
        this._subscription = combineLatest(_datepicker.month$, _datepicker.year$)
            .subscribe(function (_a) {
            var _b = tslib_1.__read(_a, 2), month = _b[0], year = _b[1];
            return _this.createDayGrid(month, year);
        });
    }
    /**
     * @return {?}
     */
    DayViewService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * @param {?} day
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    DayViewService.prototype.setFocus = /**
     * @param {?} day
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    function (day, month, year) {
        this.focused$.next({ day: day, month: month, year: year });
        // update the date picker to show the required month and year
        this._datepicker.setViewportMonth(month);
        this._datepicker.setViewportYear(year);
    };
    /**
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    DayViewService.prototype.createDayGrid = /**
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    function (month, year) {
        var _this = this;
        // update the header
        this._datepicker.setHeader(months[month] + ' ' + year);
        // find the lower and upper boundaries
        var /** @type {?} */ start = new Date(year, month, 1);
        var /** @type {?} */ end = new Date(year, month + 1, 0);
        // we always want to show from the sunday - this may include showing some dates from the previous month
        start.setDate(start.getDate() - start.getDay());
        // we also want to make sure that the range ends on a saturday
        end.setDate(end.getDate() + (6 - end.getDay()));
        // create an array of all the days to display
        var /** @type {?} */ dates = dateRange(start, end).map(function (date) { return ({
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
            date: date,
            isToday: _this.isToday(date),
            isActive: _this.isActive(date),
            isCurrentMonth: date.getMonth() === month
        }); });
        // turn the dates into a grid
        var /** @type {?} */ items = gridify(dates, 7);
        this.grid$.next(items);
        // if no item has yet been focused then focus the first day of the month
        if ((this._datepicker.modeDirection === ModeDirection.None || this._datepicker.modeDirection === ModeDirection.Descend) && this.focused$.value === null) {
            // check if the selected item is visible
            var /** @type {?} */ selectedDay = dates.find(function (day) { return day.isCurrentMonth && day.isActive; });
            if (selectedDay) {
                this.setFocus(selectedDay.day, selectedDay.month, selectedDay.year);
            }
            else {
                // find the first day of the month
                var /** @type {?} */ first = dates.find(function (date) { return date.day === 1; });
                // focus the date
                this.setFocus(first.day, first.month, first.year);
            }
        }
    };
    /**
     * Determine whether or not a specific date is today
     * @param {?} date The date to check
     * @return {?}
     */
    DayViewService.prototype.isToday = /**
     * Determine whether or not a specific date is today
     * @param {?} date The date to check
     * @return {?}
     */
    function (date) {
        return compareDays(new Date(), date);
    };
    /**
     * Determines whether or not a specific date is the selected one
     * @param {?} date the date to check
     * @return {?}
     */
    DayViewService.prototype.isActive = /**
     * Determines whether or not a specific date is the selected one
     * @param {?} date the date to check
     * @return {?}
     */
    function (date) {
        return compareDays(this._datepicker.selected$.value, date);
    };
    DayViewService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DayViewService.ctorParameters = function () { return [
        { type: DateTimePickerService }
    ]; };
    return DayViewService;
}());
export { DayViewService };
function DayViewService_tsickle_Closure_declarations() {
    /** @type {?} */
    DayViewService.prototype.grid$;
    /** @type {?} */
    DayViewService.prototype.focused$;
    /** @type {?} */
    DayViewService.prototype._subscription;
    /** @type {?} */
    DayViewService.prototype._datepicker;
}
/**
 * @record
 */
export function DayViewItem() { }
function DayViewItem_tsickle_Closure_declarations() {
    /** @type {?} */
    DayViewItem.prototype.day;
    /** @type {?} */
    DayViewItem.prototype.month;
    /** @type {?} */
    DayViewItem.prototype.year;
    /** @type {?} */
    DayViewItem.prototype.date;
    /** @type {?} */
    DayViewItem.prototype.isToday;
    /** @type {?} */
    DayViewItem.prototype.isActive;
    /** @type {?} */
    DayViewItem.prototype.isCurrentMonth;
}
/**
 * @record
 */
export function FocusedDayItem() { }
function FocusedDayItem_tsickle_Closure_declarations() {
    /** @type {?} */
    FocusedDayItem.prototype.day;
    /** @type {?} */
    FocusedDayItem.prototype.month;
    /** @type {?} */
    FocusedDayItem.prototype.year;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF5LXZpZXcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvZGF5LXZpZXcvZGF5LXZpZXcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsYUFBYSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDbkYsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDJCQUEyQixDQUFDOztJQVVoRix3QkFBb0IsV0FBa0M7UUFBdEQsaUJBR0M7UUFIbUIsZ0JBQVcsR0FBWCxXQUFXLENBQXVCO3FCQUw5QyxJQUFJLGVBQWUsQ0FBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDdkMsSUFBSSxlQUFlLENBQWlCLElBQUksQ0FBQztRQUtoRCxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUM7YUFDcEUsU0FBUyxDQUFDLFVBQUMsRUFBYTtnQkFBYiwwQkFBYSxFQUFaLGFBQUssRUFBRSxZQUFJO1lBQU0sT0FBQSxLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUM7UUFBL0IsQ0FBK0IsQ0FBQyxDQUFDO0tBQ3RFOzs7O0lBRUQsb0NBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwQzs7Ozs7OztJQUVELGlDQUFROzs7Ozs7SUFBUixVQUFTLEdBQVcsRUFBRSxLQUFhLEVBQUUsSUFBWTtRQUM3QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzs7UUFHM0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMxQzs7Ozs7O0lBRU8sc0NBQWE7Ozs7O2NBQUMsS0FBYSxFQUFFLElBQVk7OztRQUc3QyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDOztRQUd2RCxxQkFBTSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxxQkFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7O1FBR3pDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDOztRQUdoRCxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDOztRQUdoRCxxQkFBTSxLQUFLLEdBQWtCLFNBQVMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsQ0FBQztZQUM1RCxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNuQixLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUN0QixJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUN4QixJQUFJLEVBQUUsSUFBSTtZQUNWLE9BQU8sRUFBRSxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUMzQixRQUFRLEVBQUUsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDN0IsY0FBYyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxLQUFLO1NBQzVDLENBQUMsRUFSNkQsQ0FRN0QsQ0FBQyxDQUFDOztRQUdKLHFCQUFNLEtBQUssR0FBb0IsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVqRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7UUFHdkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsS0FBSyxhQUFhLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxLQUFLLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDOztZQUd0SixxQkFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxjQUFjLElBQUksR0FBRyxDQUFDLFFBQVEsRUFBbEMsQ0FBa0MsQ0FBQyxDQUFDO1lBRTFFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3ZFO1lBQUMsSUFBSSxDQUFDLENBQUM7O2dCQUdKLHFCQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLEVBQWQsQ0FBYyxDQUFDLENBQUM7O2dCQUdqRCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDckQ7U0FFSjs7Ozs7OztJQU9HLGdDQUFPOzs7OztjQUFDLElBQVU7UUFDdEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDOzs7Ozs7O0lBT2pDLGlDQUFROzs7OztjQUFDLElBQVU7UUFDdkIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7OztnQkF6RmxFLFVBQVU7Ozs7Z0JBSEYscUJBQXFCOzt5QkFKOUI7O1NBUWEsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9jb21iaW5lTGF0ZXN0JztcbmltcG9ydCB7IERhdGVUaW1lUGlja2VyU2VydmljZSwgTW9kZURpcmVjdGlvbiB9IGZyb20gJy4uL2RhdGUtdGltZS1waWNrZXIuc2VydmljZSc7XG5pbXBvcnQgeyBjb21wYXJlRGF5cywgZGF0ZVJhbmdlLCBncmlkaWZ5LCBtb250aHMgfSBmcm9tICcuLi9kYXRlLXRpbWUtcGlja2VyLnV0aWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERheVZpZXdTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIGdyaWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEYXlWaWV3SXRlbVtdW10+KFtbXV0pO1xuICAgIGZvY3VzZWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxGb2N1c2VkRGF5SXRlbT4obnVsbCk7XG5cbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2RhdGVwaWNrZXI6IERhdGVUaW1lUGlja2VyU2VydmljZSkge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSBjb21iaW5lTGF0ZXN0KF9kYXRlcGlja2VyLm1vbnRoJCwgX2RhdGVwaWNrZXIueWVhciQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChbbW9udGgsIHllYXJdKSA9PiB0aGlzLmNyZWF0ZURheUdyaWQobW9udGgsIHllYXIpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgc2V0Rm9jdXMoZGF5OiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmZvY3VzZWQkLm5leHQoeyBkYXk6IGRheSwgbW9udGg6IG1vbnRoLCB5ZWFyOiB5ZWFyIH0pO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgZGF0ZSBwaWNrZXIgdG8gc2hvdyB0aGUgcmVxdWlyZWQgbW9udGggYW5kIHllYXJcbiAgICAgICAgdGhpcy5fZGF0ZXBpY2tlci5zZXRWaWV3cG9ydE1vbnRoKG1vbnRoKTtcbiAgICAgICAgdGhpcy5fZGF0ZXBpY2tlci5zZXRWaWV3cG9ydFllYXIoeWVhcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVEYXlHcmlkKG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcik6IHZvaWQge1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgaGVhZGVyXG4gICAgICAgIHRoaXMuX2RhdGVwaWNrZXIuc2V0SGVhZGVyKG1vbnRoc1ttb250aF0gKyAnICcgKyB5ZWFyKTtcblxuICAgICAgICAvLyBmaW5kIHRoZSBsb3dlciBhbmQgdXBwZXIgYm91bmRhcmllc1xuICAgICAgICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCAxKTtcbiAgICAgICAgY29uc3QgZW5kID0gbmV3IERhdGUoeWVhciwgbW9udGggKyAxLCAwKTtcblxuICAgICAgICAvLyB3ZSBhbHdheXMgd2FudCB0byBzaG93IGZyb20gdGhlIHN1bmRheSAtIHRoaXMgbWF5IGluY2x1ZGUgc2hvd2luZyBzb21lIGRhdGVzIGZyb20gdGhlIHByZXZpb3VzIG1vbnRoXG4gICAgICAgIHN0YXJ0LnNldERhdGUoc3RhcnQuZ2V0RGF0ZSgpIC0gc3RhcnQuZ2V0RGF5KCkpO1xuXG4gICAgICAgIC8vIHdlIGFsc28gd2FudCB0byBtYWtlIHN1cmUgdGhhdCB0aGUgcmFuZ2UgZW5kcyBvbiBhIHNhdHVyZGF5XG4gICAgICAgIGVuZC5zZXREYXRlKGVuZC5nZXREYXRlKCkgKyAoNiAtIGVuZC5nZXREYXkoKSkpO1xuXG4gICAgICAgIC8vIGNyZWF0ZSBhbiBhcnJheSBvZiBhbGwgdGhlIGRheXMgdG8gZGlzcGxheVxuICAgICAgICBjb25zdCBkYXRlczogRGF5Vmlld0l0ZW1bXSA9IGRhdGVSYW5nZShzdGFydCwgZW5kKS5tYXAoZGF0ZSA9PiAoe1xuICAgICAgICAgICAgZGF5OiBkYXRlLmdldERhdGUoKSxcbiAgICAgICAgICAgIG1vbnRoOiBkYXRlLmdldE1vbnRoKCksXG4gICAgICAgICAgICB5ZWFyOiBkYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgICBkYXRlOiBkYXRlLFxuICAgICAgICAgICAgaXNUb2RheTogdGhpcy5pc1RvZGF5KGRhdGUpLFxuICAgICAgICAgICAgaXNBY3RpdmU6IHRoaXMuaXNBY3RpdmUoZGF0ZSksXG4gICAgICAgICAgICBpc0N1cnJlbnRNb250aDogZGF0ZS5nZXRNb250aCgpID09PSBtb250aFxuICAgICAgICB9KSk7XG5cbiAgICAgICAgLy8gdHVybiB0aGUgZGF0ZXMgaW50byBhIGdyaWRcbiAgICAgICAgY29uc3QgaXRlbXM6IERheVZpZXdJdGVtW11bXSA9IGdyaWRpZnkoZGF0ZXMsIDcpO1xuXG4gICAgICAgIHRoaXMuZ3JpZCQubmV4dChpdGVtcyk7XG5cbiAgICAgICAgLy8gaWYgbm8gaXRlbSBoYXMgeWV0IGJlZW4gZm9jdXNlZCB0aGVuIGZvY3VzIHRoZSBmaXJzdCBkYXkgb2YgdGhlIG1vbnRoXG4gICAgICAgIGlmICgodGhpcy5fZGF0ZXBpY2tlci5tb2RlRGlyZWN0aW9uID09PSBNb2RlRGlyZWN0aW9uLk5vbmUgfHwgdGhpcy5fZGF0ZXBpY2tlci5tb2RlRGlyZWN0aW9uID09PSBNb2RlRGlyZWN0aW9uLkRlc2NlbmQpICYmIHRoaXMuZm9jdXNlZCQudmFsdWUgPT09IG51bGwpIHtcblxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHNlbGVjdGVkIGl0ZW0gaXMgdmlzaWJsZVxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWREYXkgPSBkYXRlcy5maW5kKGRheSA9PiBkYXkuaXNDdXJyZW50TW9udGggJiYgZGF5LmlzQWN0aXZlKTtcblxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkRGF5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRGb2N1cyhzZWxlY3RlZERheS5kYXksIHNlbGVjdGVkRGF5Lm1vbnRoLCBzZWxlY3RlZERheS55ZWFyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAvLyBmaW5kIHRoZSBmaXJzdCBkYXkgb2YgdGhlIG1vbnRoXG4gICAgICAgICAgICAgICAgY29uc3QgZmlyc3QgPSBkYXRlcy5maW5kKGRhdGUgPT4gZGF0ZS5kYXkgPT09IDEpO1xuICAgIFxuICAgICAgICAgICAgICAgIC8vIGZvY3VzIHRoZSBkYXRlXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRGb2N1cyhmaXJzdC5kYXksIGZpcnN0Lm1vbnRoLCBmaXJzdC55ZWFyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAqIERldGVybWluZSB3aGV0aGVyIG9yIG5vdCBhIHNwZWNpZmljIGRhdGUgaXMgdG9kYXlcbiAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gY2hlY2tcbiAgICovXG4gICAgcHJpdmF0ZSBpc1RvZGF5KGRhdGU6IERhdGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmVEYXlzKG5ldyBEYXRlKCksIGRhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgd2hldGhlciBvciBub3QgYSBzcGVjaWZpYyBkYXRlIGlzIHRoZSBzZWxlY3RlZCBvbmVcbiAgICAgKiBAcGFyYW0gZGF0ZSB0aGUgZGF0ZSB0byBjaGVja1xuICAgICAqL1xuICAgIHByaXZhdGUgaXNBY3RpdmUoZGF0ZTogRGF0ZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gY29tcGFyZURheXModGhpcy5fZGF0ZXBpY2tlci5zZWxlY3RlZCQudmFsdWUsIGRhdGUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBEYXlWaWV3SXRlbSB7XG4gICAgZGF5OiBudW1iZXI7XG4gICAgbW9udGg6IG51bWJlcjtcbiAgICB5ZWFyOiBudW1iZXI7XG4gICAgZGF0ZTogRGF0ZTtcbiAgICBpc1RvZGF5OiBib29sZWFuO1xuICAgIGlzQWN0aXZlOiBib29sZWFuO1xuICAgIGlzQ3VycmVudE1vbnRoOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZvY3VzZWREYXlJdGVtIHtcbiAgICBkYXk6IG51bWJlcjtcbiAgICBtb250aDogbnVtYmVyO1xuICAgIHllYXI6IG51bWJlcjtcbn0iXX0=