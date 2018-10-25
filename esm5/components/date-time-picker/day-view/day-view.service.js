/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { DateTimePickerService, ModeDirection } from '../date-time-picker.service';
import { compareDays, dateRange, gridify } from '../date-time-picker.utils';
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
        this._datepicker.setHeader(this._datepicker.months[month] + ' ' + year);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF5LXZpZXcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvZGF5LXZpZXcvZGF5LXZpZXcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsYUFBYSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDbkYsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0lBVXhFLHdCQUFvQixXQUFrQztRQUF0RCxpQkFHQztRQUhtQixnQkFBVyxHQUFYLFdBQVcsQ0FBdUI7cUJBTDlDLElBQUksZUFBZSxDQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUN2QyxJQUFJLGVBQWUsQ0FBaUIsSUFBSSxDQUFDO1FBS2hELElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQzthQUNwRSxTQUFTLENBQUMsVUFBQyxFQUFhO2dCQUFiLDBCQUFhLEVBQVosYUFBSyxFQUFFLFlBQUk7WUFBTSxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQztRQUEvQixDQUErQixDQUFDLENBQUM7S0FDdEU7Ozs7SUFFRCxvQ0FBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BDOzs7Ozs7O0lBRUQsaUNBQVE7Ozs7OztJQUFSLFVBQVMsR0FBVyxFQUFFLEtBQWEsRUFBRSxJQUFZ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QVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3JEO1NBRUo7Ozs7Ozs7SUFPRyxnQ0FBTzs7Ozs7Y0FBQyxJQUFVO1FBQ3RCLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQzs7Ozs7OztJQU9qQyxpQ0FBUTs7Ozs7Y0FBQyxJQUFVO1FBQ3ZCLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDOzs7Z0JBekZsRSxVQUFVOzs7O2dCQUhGLHFCQUFxQjs7eUJBSjlCOztTQVFhLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QgfSBmcm9tICdyeGpzL29ic2VydmFibGUvY29tYmluZUxhdGVzdCc7XG5pbXBvcnQgeyBEYXRlVGltZVBpY2tlclNlcnZpY2UsIE1vZGVEaXJlY3Rpb24gfSBmcm9tICcuLi9kYXRlLXRpbWUtcGlja2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgY29tcGFyZURheXMsIGRhdGVSYW5nZSwgZ3JpZGlmeSB9IGZyb20gJy4uL2RhdGUtdGltZS1waWNrZXIudXRpbHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGF5Vmlld1NlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgZ3JpZCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERheVZpZXdJdGVtW11bXT4oW1tdXSk7XG4gICAgZm9jdXNlZCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEZvY3VzZWREYXlJdGVtPihudWxsKTtcblxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZGF0ZXBpY2tlcjogRGF0ZVRpbWVQaWNrZXJTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IGNvbWJpbmVMYXRlc3QoX2RhdGVwaWNrZXIubW9udGgkLCBfZGF0ZXBpY2tlci55ZWFyJClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKFttb250aCwgeWVhcl0pID0+IHRoaXMuY3JlYXRlRGF5R3JpZChtb250aCwgeWVhcikpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBzZXRGb2N1cyhkYXk6IG51bWJlciwgbW9udGg6IG51bWJlciwgeWVhcjogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCQubmV4dCh7IGRheTogZGF5LCBtb250aDogbW9udGgsIHllYXI6IHllYXIgfSk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBkYXRlIHBpY2tlciB0byBzaG93IHRoZSByZXF1aXJlZCBtb250aCBhbmQgeWVhclxuICAgICAgICB0aGlzLl9kYXRlcGlja2VyLnNldFZpZXdwb3J0TW9udGgobW9udGgpO1xuICAgICAgICB0aGlzLl9kYXRlcGlja2VyLnNldFZpZXdwb3J0WWVhcih5ZWFyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZURheUdyaWQobW9udGg6IG51bWJlciwgeWVhcjogbnVtYmVyKTogdm9pZCB7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBoZWFkZXJcbiAgICAgICAgdGhpcy5fZGF0ZXBpY2tlci5zZXRIZWFkZXIodGhpcy5fZGF0ZXBpY2tlci5tb250aHNbbW9udGhdICsgJyAnICsgeWVhcik7XG5cbiAgICAgICAgLy8gZmluZCB0aGUgbG93ZXIgYW5kIHVwcGVyIGJvdW5kYXJpZXNcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgMSk7XG4gICAgICAgIGNvbnN0IGVuZCA9IG5ldyBEYXRlKHllYXIsIG1vbnRoICsgMSwgMCk7XG5cbiAgICAgICAgLy8gd2UgYWx3YXlzIHdhbnQgdG8gc2hvdyBmcm9tIHRoZSBzdW5kYXkgLSB0aGlzIG1heSBpbmNsdWRlIHNob3dpbmcgc29tZSBkYXRlcyBmcm9tIHRoZSBwcmV2aW91cyBtb250aFxuICAgICAgICBzdGFydC5zZXREYXRlKHN0YXJ0LmdldERhdGUoKSAtIHN0YXJ0LmdldERheSgpKTtcblxuICAgICAgICAvLyB3ZSBhbHNvIHdhbnQgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIHJhbmdlIGVuZHMgb24gYSBzYXR1cmRheVxuICAgICAgICBlbmQuc2V0RGF0ZShlbmQuZ2V0RGF0ZSgpICsgKDYgLSBlbmQuZ2V0RGF5KCkpKTtcblxuICAgICAgICAvLyBjcmVhdGUgYW4gYXJyYXkgb2YgYWxsIHRoZSBkYXlzIHRvIGRpc3BsYXlcbiAgICAgICAgY29uc3QgZGF0ZXM6IERheVZpZXdJdGVtW10gPSBkYXRlUmFuZ2Uoc3RhcnQsIGVuZCkubWFwKGRhdGUgPT4gKHtcbiAgICAgICAgICAgIGRheTogZGF0ZS5nZXREYXRlKCksXG4gICAgICAgICAgICBtb250aDogZGF0ZS5nZXRNb250aCgpLFxuICAgICAgICAgICAgeWVhcjogZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgICAgZGF0ZTogZGF0ZSxcbiAgICAgICAgICAgIGlzVG9kYXk6IHRoaXMuaXNUb2RheShkYXRlKSxcbiAgICAgICAgICAgIGlzQWN0aXZlOiB0aGlzLmlzQWN0aXZlKGRhdGUpLFxuICAgICAgICAgICAgaXNDdXJyZW50TW9udGg6IGRhdGUuZ2V0TW9udGgoKSA9PT0gbW9udGhcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIC8vIHR1cm4gdGhlIGRhdGVzIGludG8gYSBncmlkXG4gICAgICAgIGNvbnN0IGl0ZW1zOiBEYXlWaWV3SXRlbVtdW10gPSBncmlkaWZ5KGRhdGVzLCA3KTtcblxuICAgICAgICB0aGlzLmdyaWQkLm5leHQoaXRlbXMpO1xuXG4gICAgICAgIC8vIGlmIG5vIGl0ZW0gaGFzIHlldCBiZWVuIGZvY3VzZWQgdGhlbiBmb2N1cyB0aGUgZmlyc3QgZGF5IG9mIHRoZSBtb250aFxuICAgICAgICBpZiAoKHRoaXMuX2RhdGVwaWNrZXIubW9kZURpcmVjdGlvbiA9PT0gTW9kZURpcmVjdGlvbi5Ob25lIHx8IHRoaXMuX2RhdGVwaWNrZXIubW9kZURpcmVjdGlvbiA9PT0gTW9kZURpcmVjdGlvbi5EZXNjZW5kKSAmJiB0aGlzLmZvY3VzZWQkLnZhbHVlID09PSBudWxsKSB7XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBzZWxlY3RlZCBpdGVtIGlzIHZpc2libGVcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkRGF5ID0gZGF0ZXMuZmluZChkYXkgPT4gZGF5LmlzQ3VycmVudE1vbnRoICYmIGRheS5pc0FjdGl2ZSk7XG5cbiAgICAgICAgICAgIGlmIChzZWxlY3RlZERheSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXMoc2VsZWN0ZWREYXkuZGF5LCBzZWxlY3RlZERheS5tb250aCwgc2VsZWN0ZWREYXkueWVhcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgLy8gZmluZCB0aGUgZmlyc3QgZGF5IG9mIHRoZSBtb250aFxuICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0ID0gZGF0ZXMuZmluZChkYXRlID0+IGRhdGUuZGF5ID09PSAxKTtcblxuICAgICAgICAgICAgICAgIC8vIGZvY3VzIHRoZSBkYXRlXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRGb2N1cyhmaXJzdC5kYXksIGZpcnN0Lm1vbnRoLCBmaXJzdC55ZWFyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAqIERldGVybWluZSB3aGV0aGVyIG9yIG5vdCBhIHNwZWNpZmljIGRhdGUgaXMgdG9kYXlcbiAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gY2hlY2tcbiAgICovXG4gICAgcHJpdmF0ZSBpc1RvZGF5KGRhdGU6IERhdGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmVEYXlzKG5ldyBEYXRlKCksIGRhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgd2hldGhlciBvciBub3QgYSBzcGVjaWZpYyBkYXRlIGlzIHRoZSBzZWxlY3RlZCBvbmVcbiAgICAgKiBAcGFyYW0gZGF0ZSB0aGUgZGF0ZSB0byBjaGVja1xuICAgICAqL1xuICAgIHByaXZhdGUgaXNBY3RpdmUoZGF0ZTogRGF0ZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gY29tcGFyZURheXModGhpcy5fZGF0ZXBpY2tlci5zZWxlY3RlZCQudmFsdWUsIGRhdGUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBEYXlWaWV3SXRlbSB7XG4gICAgZGF5OiBudW1iZXI7XG4gICAgbW9udGg6IG51bWJlcjtcbiAgICB5ZWFyOiBudW1iZXI7XG4gICAgZGF0ZTogRGF0ZTtcbiAgICBpc1RvZGF5OiBib29sZWFuO1xuICAgIGlzQWN0aXZlOiBib29sZWFuO1xuICAgIGlzQ3VycmVudE1vbnRoOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZvY3VzZWREYXlJdGVtIHtcbiAgICBkYXk6IG51bWJlcjtcbiAgICBtb250aDogbnVtYmVyO1xuICAgIHllYXI6IG51bWJlcjtcbn0iXX0=