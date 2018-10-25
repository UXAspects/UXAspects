/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { DateTimePickerService, ModeDirection } from '../date-time-picker.service';
import { compareDays, dateRange, gridify } from '../date-time-picker.utils';
export class DayViewService {
    /**
     * @param {?} _datepicker
     */
    constructor(_datepicker) {
        this._datepicker = _datepicker;
        this.grid$ = new BehaviorSubject([[]]);
        this.focused$ = new BehaviorSubject(null);
        this._subscription = combineLatest(_datepicker.month$, _datepicker.year$)
            .subscribe(([month, year]) => this.createDayGrid(month, year));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * @param {?} day
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    setFocus(day, month, year) {
        this.focused$.next({ day: day, month: month, year: year });
        // update the date picker to show the required month and year
        this._datepicker.setViewportMonth(month);
        this._datepicker.setViewportYear(year);
    }
    /**
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    createDayGrid(month, year) {
        // update the header
        this._datepicker.setHeader(this._datepicker.months[month] + ' ' + year);
        // find the lower and upper boundaries
        const /** @type {?} */ start = new Date(year, month, 1);
        const /** @type {?} */ end = new Date(year, month + 1, 0);
        // we always want to show from the sunday - this may include showing some dates from the previous month
        start.setDate(start.getDate() - start.getDay());
        // we also want to make sure that the range ends on a saturday
        end.setDate(end.getDate() + (6 - end.getDay()));
        // create an array of all the days to display
        const /** @type {?} */ dates = dateRange(start, end).map(date => ({
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
            date: date,
            isToday: this.isToday(date),
            isActive: this.isActive(date),
            isCurrentMonth: date.getMonth() === month
        }));
        // turn the dates into a grid
        const /** @type {?} */ items = gridify(dates, 7);
        this.grid$.next(items);
        // if no item has yet been focused then focus the first day of the month
        if ((this._datepicker.modeDirection === ModeDirection.None || this._datepicker.modeDirection === ModeDirection.Descend) && this.focused$.value === null) {
            // check if the selected item is visible
            const /** @type {?} */ selectedDay = dates.find(day => day.isCurrentMonth && day.isActive);
            if (selectedDay) {
                this.setFocus(selectedDay.day, selectedDay.month, selectedDay.year);
            }
            else {
                // find the first day of the month
                const /** @type {?} */ first = dates.find(date => date.day === 1);
                // focus the date
                this.setFocus(first.day, first.month, first.year);
            }
        }
    }
    /**
     * Determine whether or not a specific date is today
     * @param {?} date The date to check
     * @return {?}
     */
    isToday(date) {
        return compareDays(new Date(), date);
    }
    /**
     * Determines whether or not a specific date is the selected one
     * @param {?} date the date to check
     * @return {?}
     */
    isActive(date) {
        return compareDays(this._datepicker.selected$.value, date);
    }
}
DayViewService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DayViewService.ctorParameters = () => [
    { type: DateTimePickerService }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF5LXZpZXcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvZGF5LXZpZXcvZGF5LXZpZXcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzlELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxhQUFhLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNuRixPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUc1RSxNQUFNOzs7O0lBT0YsWUFBb0IsV0FBa0M7UUFBbEMsZ0JBQVcsR0FBWCxXQUFXLENBQXVCO3FCQUw5QyxJQUFJLGVBQWUsQ0FBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDdkMsSUFBSSxlQUFlLENBQWlCLElBQUksQ0FBQztRQUtoRCxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUM7YUFDcEUsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDdEU7Ozs7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwQzs7Ozs7OztJQUVELFFBQVEsQ0FBQyxHQUFXLEVBQUUsS0FBYSxFQUFFLElBQVk7UUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7O1FBRzNELElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDMUM7Ozs7OztJQUVPLGFBQWEsQ0FBQyxLQUFhLEVBQUUsSUFBWTs7UUFHN0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDOztRQUd4RSx1QkFBTSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2Qyx1QkFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7O1FBR3pDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDOztRQUdoRCxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDOztRQUdoRCx1QkFBTSxLQUFLLEdBQWtCLFNBQVMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM1RCxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNuQixLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUN0QixJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUN4QixJQUFJLEVBQUUsSUFBSTtZQUNWLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUMzQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDN0IsY0FBYyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxLQUFLO1NBQzVDLENBQUMsQ0FBQyxDQUFDOztRQUdKLHVCQUFNLEtBQUssR0FBb0IsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVqRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7UUFHdkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsS0FBSyxhQUFhLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxLQUFLLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDOztZQUd0Six1QkFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRTFFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3ZFO1lBQUMsSUFBSSxDQUFDLENBQUM7O2dCQUdKLHVCQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQzs7Z0JBR2pELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNyRDtTQUVKOzs7Ozs7O0lBT0csT0FBTyxDQUFDLElBQVU7UUFDdEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDOzs7Ozs7O0lBT2pDLFFBQVEsQ0FBQyxJQUFVO1FBQ3ZCLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDOzs7O1lBekZsRSxVQUFVOzs7O1lBSEYscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0IH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL2NvbWJpbmVMYXRlc3QnO1xuaW1wb3J0IHsgRGF0ZVRpbWVQaWNrZXJTZXJ2aWNlLCBNb2RlRGlyZWN0aW9uIH0gZnJvbSAnLi4vZGF0ZS10aW1lLXBpY2tlci5zZXJ2aWNlJztcbmltcG9ydCB7IGNvbXBhcmVEYXlzLCBkYXRlUmFuZ2UsIGdyaWRpZnkgfSBmcm9tICcuLi9kYXRlLXRpbWUtcGlja2VyLnV0aWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERheVZpZXdTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIGdyaWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEYXlWaWV3SXRlbVtdW10+KFtbXV0pO1xuICAgIGZvY3VzZWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxGb2N1c2VkRGF5SXRlbT4obnVsbCk7XG5cbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2RhdGVwaWNrZXI6IERhdGVUaW1lUGlja2VyU2VydmljZSkge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSBjb21iaW5lTGF0ZXN0KF9kYXRlcGlja2VyLm1vbnRoJCwgX2RhdGVwaWNrZXIueWVhciQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChbbW9udGgsIHllYXJdKSA9PiB0aGlzLmNyZWF0ZURheUdyaWQobW9udGgsIHllYXIpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgc2V0Rm9jdXMoZGF5OiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmZvY3VzZWQkLm5leHQoeyBkYXk6IGRheSwgbW9udGg6IG1vbnRoLCB5ZWFyOiB5ZWFyIH0pO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgZGF0ZSBwaWNrZXIgdG8gc2hvdyB0aGUgcmVxdWlyZWQgbW9udGggYW5kIHllYXJcbiAgICAgICAgdGhpcy5fZGF0ZXBpY2tlci5zZXRWaWV3cG9ydE1vbnRoKG1vbnRoKTtcbiAgICAgICAgdGhpcy5fZGF0ZXBpY2tlci5zZXRWaWV3cG9ydFllYXIoeWVhcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVEYXlHcmlkKG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcik6IHZvaWQge1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgaGVhZGVyXG4gICAgICAgIHRoaXMuX2RhdGVwaWNrZXIuc2V0SGVhZGVyKHRoaXMuX2RhdGVwaWNrZXIubW9udGhzW21vbnRoXSArICcgJyArIHllYXIpO1xuXG4gICAgICAgIC8vIGZpbmQgdGhlIGxvd2VyIGFuZCB1cHBlciBib3VuZGFyaWVzXG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUoeWVhciwgbW9udGgsIDEpO1xuICAgICAgICBjb25zdCBlbmQgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCArIDEsIDApO1xuXG4gICAgICAgIC8vIHdlIGFsd2F5cyB3YW50IHRvIHNob3cgZnJvbSB0aGUgc3VuZGF5IC0gdGhpcyBtYXkgaW5jbHVkZSBzaG93aW5nIHNvbWUgZGF0ZXMgZnJvbSB0aGUgcHJldmlvdXMgbW9udGhcbiAgICAgICAgc3RhcnQuc2V0RGF0ZShzdGFydC5nZXREYXRlKCkgLSBzdGFydC5nZXREYXkoKSk7XG5cbiAgICAgICAgLy8gd2UgYWxzbyB3YW50IHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSByYW5nZSBlbmRzIG9uIGEgc2F0dXJkYXlcbiAgICAgICAgZW5kLnNldERhdGUoZW5kLmdldERhdGUoKSArICg2IC0gZW5kLmdldERheSgpKSk7XG5cbiAgICAgICAgLy8gY3JlYXRlIGFuIGFycmF5IG9mIGFsbCB0aGUgZGF5cyB0byBkaXNwbGF5XG4gICAgICAgIGNvbnN0IGRhdGVzOiBEYXlWaWV3SXRlbVtdID0gZGF0ZVJhbmdlKHN0YXJ0LCBlbmQpLm1hcChkYXRlID0+ICh7XG4gICAgICAgICAgICBkYXk6IGRhdGUuZ2V0RGF0ZSgpLFxuICAgICAgICAgICAgbW9udGg6IGRhdGUuZ2V0TW9udGgoKSxcbiAgICAgICAgICAgIHllYXI6IGRhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICAgIGRhdGU6IGRhdGUsXG4gICAgICAgICAgICBpc1RvZGF5OiB0aGlzLmlzVG9kYXkoZGF0ZSksXG4gICAgICAgICAgICBpc0FjdGl2ZTogdGhpcy5pc0FjdGl2ZShkYXRlKSxcbiAgICAgICAgICAgIGlzQ3VycmVudE1vbnRoOiBkYXRlLmdldE1vbnRoKCkgPT09IG1vbnRoXG4gICAgICAgIH0pKTtcblxuICAgICAgICAvLyB0dXJuIHRoZSBkYXRlcyBpbnRvIGEgZ3JpZFxuICAgICAgICBjb25zdCBpdGVtczogRGF5Vmlld0l0ZW1bXVtdID0gZ3JpZGlmeShkYXRlcywgNyk7XG5cbiAgICAgICAgdGhpcy5ncmlkJC5uZXh0KGl0ZW1zKTtcblxuICAgICAgICAvLyBpZiBubyBpdGVtIGhhcyB5ZXQgYmVlbiBmb2N1c2VkIHRoZW4gZm9jdXMgdGhlIGZpcnN0IGRheSBvZiB0aGUgbW9udGhcbiAgICAgICAgaWYgKCh0aGlzLl9kYXRlcGlja2VyLm1vZGVEaXJlY3Rpb24gPT09IE1vZGVEaXJlY3Rpb24uTm9uZSB8fCB0aGlzLl9kYXRlcGlja2VyLm1vZGVEaXJlY3Rpb24gPT09IE1vZGVEaXJlY3Rpb24uRGVzY2VuZCkgJiYgdGhpcy5mb2N1c2VkJC52YWx1ZSA9PT0gbnVsbCkge1xuXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgc2VsZWN0ZWQgaXRlbSBpcyB2aXNpYmxlXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZERheSA9IGRhdGVzLmZpbmQoZGF5ID0+IGRheS5pc0N1cnJlbnRNb250aCAmJiBkYXkuaXNBY3RpdmUpO1xuXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWREYXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEZvY3VzKHNlbGVjdGVkRGF5LmRheSwgc2VsZWN0ZWREYXkubW9udGgsIHNlbGVjdGVkRGF5LnllYXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIC8vIGZpbmQgdGhlIGZpcnN0IGRheSBvZiB0aGUgbW9udGhcbiAgICAgICAgICAgICAgICBjb25zdCBmaXJzdCA9IGRhdGVzLmZpbmQoZGF0ZSA9PiBkYXRlLmRheSA9PT0gMSk7XG5cbiAgICAgICAgICAgICAgICAvLyBmb2N1cyB0aGUgZGF0ZVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXMoZmlyc3QuZGF5LCBmaXJzdC5tb250aCwgZmlyc3QueWVhcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgKiBEZXRlcm1pbmUgd2hldGhlciBvciBub3QgYSBzcGVjaWZpYyBkYXRlIGlzIHRvZGF5XG4gICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGNoZWNrXG4gICAqL1xuICAgIHByaXZhdGUgaXNUb2RheShkYXRlOiBEYXRlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBjb21wYXJlRGF5cyhuZXcgRGF0ZSgpLCBkYXRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IGEgc3BlY2lmaWMgZGF0ZSBpcyB0aGUgc2VsZWN0ZWQgb25lXG4gICAgICogQHBhcmFtIGRhdGUgdGhlIGRhdGUgdG8gY2hlY2tcbiAgICAgKi9cbiAgICBwcml2YXRlIGlzQWN0aXZlKGRhdGU6IERhdGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmVEYXlzKHRoaXMuX2RhdGVwaWNrZXIuc2VsZWN0ZWQkLnZhbHVlLCBkYXRlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF5Vmlld0l0ZW0ge1xuICAgIGRheTogbnVtYmVyO1xuICAgIG1vbnRoOiBudW1iZXI7XG4gICAgeWVhcjogbnVtYmVyO1xuICAgIGRhdGU6IERhdGU7XG4gICAgaXNUb2RheTogYm9vbGVhbjtcbiAgICBpc0FjdGl2ZTogYm9vbGVhbjtcbiAgICBpc0N1cnJlbnRNb250aDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGb2N1c2VkRGF5SXRlbSB7XG4gICAgZGF5OiBudW1iZXI7XG4gICAgbW9udGg6IG51bWJlcjtcbiAgICB5ZWFyOiBudW1iZXI7XG59Il19