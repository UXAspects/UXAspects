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
var DayViewService = (function () {
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
        var /** @type {?} */ dates = dateRange(start, end).map(function (date) {
            return ({
                day: date.getDate(),
                month: date.getMonth(),
                year: date.getFullYear(),
                date: date,
                isToday: _this.isToday(date),
                isActive: _this.isActive(date),
                isCurrentMonth: date.getMonth() === month
            });
        });
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
        { type: Injectable },
    ];
    /** @nocollapse */
    DayViewService.ctorParameters = function () { return [
        { type: DateTimePickerService, },
    ]; };
    return DayViewService;
}());
export { DayViewService };
function DayViewService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DayViewService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DayViewService.ctorParameters;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF5LXZpZXcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvZGF5LXZpZXcvZGF5LXZpZXcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsYUFBYSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDbkYsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDJCQUEyQixDQUFDOztJQVVoRix3QkFBb0IsV0FBa0M7UUFBdEQsaUJBR0M7UUFIbUIsZ0JBQVcsR0FBWCxXQUFXLENBQXVCO3FCQUw5QyxJQUFJLGVBQWUsQ0FBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDdkMsSUFBSSxlQUFlLENBQWlCLElBQUksQ0FBQztRQUtoRCxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUM7YUFDcEUsU0FBUyxDQUFDLFVBQUMsRUFBYTtnQkFBYiwwQkFBYSxFQUFaLGFBQUssRUFBRSxZQUFJO1lBQU0sT0FBQSxLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUM7UUFBL0IsQ0FBK0IsQ0FBQyxDQUFDO0tBQ3RFOzs7O0lBRUQsb0NBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwQzs7Ozs7OztJQUVELGlDQUFROzs7Ozs7SUFBUixVQUFTLEdBQVcsRUFBRSxLQUFh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Q0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3JEO1NBRUo7Ozs7Ozs7SUFPRyxnQ0FBTzs7Ozs7Y0FBQyxJQUFVO1FBQ3RCLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQzs7Ozs7OztJQU9qQyxpQ0FBUTs7Ozs7Y0FBQyxJQUFVO1FBQ3ZCLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDOzs7Z0JBekZsRSxVQUFVOzs7O2dCQUhGLHFCQUFxQjs7eUJBSjlCOztTQVFhLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QgfSBmcm9tICdyeGpzL29ic2VydmFibGUvY29tYmluZUxhdGVzdCc7XG5pbXBvcnQgeyBEYXRlVGltZVBpY2tlclNlcnZpY2UsIE1vZGVEaXJlY3Rpb24gfSBmcm9tICcuLi9kYXRlLXRpbWUtcGlja2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgY29tcGFyZURheXMsIGRhdGVSYW5nZSwgZ3JpZGlmeSwgbW9udGhzIH0gZnJvbSAnLi4vZGF0ZS10aW1lLXBpY2tlci51dGlscyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXlWaWV3U2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBncmlkJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RGF5Vmlld0l0ZW1bXVtdPihbW11dKTtcbiAgICBmb2N1c2VkJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Rm9jdXNlZERheUl0ZW0+KG51bGwpO1xuXG4gICAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9kYXRlcGlja2VyOiBEYXRlVGltZVBpY2tlclNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gY29tYmluZUxhdGVzdChfZGF0ZXBpY2tlci5tb250aCQsIF9kYXRlcGlja2VyLnllYXIkKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoW21vbnRoLCB5ZWFyXSkgPT4gdGhpcy5jcmVhdGVEYXlHcmlkKG1vbnRoLCB5ZWFyKSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHNldEZvY3VzKGRheTogbnVtYmVyLCBtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkJC5uZXh0KHsgZGF5OiBkYXksIG1vbnRoOiBtb250aCwgeWVhcjogeWVhciB9KTtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIGRhdGUgcGlja2VyIHRvIHNob3cgdGhlIHJlcXVpcmVkIG1vbnRoIGFuZCB5ZWFyXG4gICAgICAgIHRoaXMuX2RhdGVwaWNrZXIuc2V0Vmlld3BvcnRNb250aChtb250aCk7XG4gICAgICAgIHRoaXMuX2RhdGVwaWNrZXIuc2V0Vmlld3BvcnRZZWFyKHllYXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlRGF5R3JpZChtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpOiB2b2lkIHtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIGhlYWRlclxuICAgICAgICB0aGlzLl9kYXRlcGlja2VyLnNldEhlYWRlcihtb250aHNbbW9udGhdICsgJyAnICsgeWVhcik7XG5cbiAgICAgICAgLy8gZmluZCB0aGUgbG93ZXIgYW5kIHVwcGVyIGJvdW5kYXJpZXNcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgMSk7XG4gICAgICAgIGNvbnN0IGVuZCA9IG5ldyBEYXRlKHllYXIsIG1vbnRoICsgMSwgMCk7XG5cbiAgICAgICAgLy8gd2UgYWx3YXlzIHdhbnQgdG8gc2hvdyBmcm9tIHRoZSBzdW5kYXkgLSB0aGlzIG1heSBpbmNsdWRlIHNob3dpbmcgc29tZSBkYXRlcyBmcm9tIHRoZSBwcmV2aW91cyBtb250aFxuICAgICAgICBzdGFydC5zZXREYXRlKHN0YXJ0LmdldERhdGUoKSAtIHN0YXJ0LmdldERheSgpKTtcblxuICAgICAgICAvLyB3ZSBhbHNvIHdhbnQgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIHJhbmdlIGVuZHMgb24gYSBzYXR1cmRheVxuICAgICAgICBlbmQuc2V0RGF0ZShlbmQuZ2V0RGF0ZSgpICsgKDYgLSBlbmQuZ2V0RGF5KCkpKTtcblxuICAgICAgICAvLyBjcmVhdGUgYW4gYXJyYXkgb2YgYWxsIHRoZSBkYXlzIHRvIGRpc3BsYXlcbiAgICAgICAgY29uc3QgZGF0ZXM6IERheVZpZXdJdGVtW10gPSBkYXRlUmFuZ2Uoc3RhcnQsIGVuZCkubWFwKGRhdGUgPT4gKHtcbiAgICAgICAgICAgIGRheTogZGF0ZS5nZXREYXRlKCksXG4gICAgICAgICAgICBtb250aDogZGF0ZS5nZXRNb250aCgpLFxuICAgICAgICAgICAgeWVhcjogZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgICAgZGF0ZTogZGF0ZSxcbiAgICAgICAgICAgIGlzVG9kYXk6IHRoaXMuaXNUb2RheShkYXRlKSxcbiAgICAgICAgICAgIGlzQWN0aXZlOiB0aGlzLmlzQWN0aXZlKGRhdGUpLFxuICAgICAgICAgICAgaXNDdXJyZW50TW9udGg6IGRhdGUuZ2V0TW9udGgoKSA9PT0gbW9udGhcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIC8vIHR1cm4gdGhlIGRhdGVzIGludG8gYSBncmlkXG4gICAgICAgIGNvbnN0IGl0ZW1zOiBEYXlWaWV3SXRlbVtdW10gPSBncmlkaWZ5KGRhdGVzLCA3KTtcblxuICAgICAgICB0aGlzLmdyaWQkLm5leHQoaXRlbXMpO1xuXG4gICAgICAgIC8vIGlmIG5vIGl0ZW0gaGFzIHlldCBiZWVuIGZvY3VzZWQgdGhlbiBmb2N1cyB0aGUgZmlyc3QgZGF5IG9mIHRoZSBtb250aFxuICAgICAgICBpZiAoKHRoaXMuX2RhdGVwaWNrZXIubW9kZURpcmVjdGlvbiA9PT0gTW9kZURpcmVjdGlvbi5Ob25lIHx8IHRoaXMuX2RhdGVwaWNrZXIubW9kZURpcmVjdGlvbiA9PT0gTW9kZURpcmVjdGlvbi5EZXNjZW5kKSAmJiB0aGlzLmZvY3VzZWQkLnZhbHVlID09PSBudWxsKSB7XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBzZWxlY3RlZCBpdGVtIGlzIHZpc2libGVcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkRGF5ID0gZGF0ZXMuZmluZChkYXkgPT4gZGF5LmlzQ3VycmVudE1vbnRoICYmIGRheS5pc0FjdGl2ZSk7XG5cbiAgICAgICAgICAgIGlmIChzZWxlY3RlZERheSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXMoc2VsZWN0ZWREYXkuZGF5LCBzZWxlY3RlZERheS5tb250aCwgc2VsZWN0ZWREYXkueWVhcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgLy8gZmluZCB0aGUgZmlyc3QgZGF5IG9mIHRoZSBtb250aFxuICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0ID0gZGF0ZXMuZmluZChkYXRlID0+IGRhdGUuZGF5ID09PSAxKTtcbiAgICBcbiAgICAgICAgICAgICAgICAvLyBmb2N1cyB0aGUgZGF0ZVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXMoZmlyc3QuZGF5LCBmaXJzdC5tb250aCwgZmlyc3QueWVhcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgKiBEZXRlcm1pbmUgd2hldGhlciBvciBub3QgYSBzcGVjaWZpYyBkYXRlIGlzIHRvZGF5XG4gICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGNoZWNrXG4gICAqL1xuICAgIHByaXZhdGUgaXNUb2RheShkYXRlOiBEYXRlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBjb21wYXJlRGF5cyhuZXcgRGF0ZSgpLCBkYXRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IGEgc3BlY2lmaWMgZGF0ZSBpcyB0aGUgc2VsZWN0ZWQgb25lXG4gICAgICogQHBhcmFtIGRhdGUgdGhlIGRhdGUgdG8gY2hlY2tcbiAgICAgKi9cbiAgICBwcml2YXRlIGlzQWN0aXZlKGRhdGU6IERhdGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmVEYXlzKHRoaXMuX2RhdGVwaWNrZXIuc2VsZWN0ZWQkLnZhbHVlLCBkYXRlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF5Vmlld0l0ZW0ge1xuICAgIGRheTogbnVtYmVyO1xuICAgIG1vbnRoOiBudW1iZXI7XG4gICAgeWVhcjogbnVtYmVyO1xuICAgIGRhdGU6IERhdGU7XG4gICAgaXNUb2RheTogYm9vbGVhbjtcbiAgICBpc0FjdGl2ZTogYm9vbGVhbjtcbiAgICBpc0N1cnJlbnRNb250aDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGb2N1c2VkRGF5SXRlbSB7XG4gICAgZGF5OiBudW1iZXI7XG4gICAgbW9udGg6IG51bWJlcjtcbiAgICB5ZWFyOiBudW1iZXI7XG59Il19