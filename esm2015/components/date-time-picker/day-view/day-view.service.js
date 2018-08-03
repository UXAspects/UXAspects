/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { DateTimePickerService, ModeDirection } from '../date-time-picker.service';
import { compareDays, dateRange, gridify, months } from '../date-time-picker.utils';
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
        this._datepicker.setHeader(months[month] + ' ' + year);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF5LXZpZXcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvZGF5LXZpZXcvZGF5LXZpZXcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzlELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxhQUFhLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNuRixPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFHcEYsTUFBTTs7OztJQU9GLFlBQW9CLFdBQWtDO1FBQWxDLGdCQUFXLEdBQVgsV0FBVyxDQUF1QjtxQkFMOUMsSUFBSSxlQUFlLENBQWtCLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQ3ZDLElBQUksZUFBZSxDQUFpQixJQUFJLENBQUM7UUFLaEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDO2FBQ3BFLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQ3RFOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEM7Ozs7Ozs7SUFFRCxRQUFRLENBQUMsR0FBVyxFQUFFLEtBQWEsRUFBRSxJQUFZO1FBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFB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SUFPRyxPQUFPLENBQUMsSUFBVTtRQUN0QixNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7Ozs7Ozs7SUFPakMsUUFBUSxDQUFDLElBQVU7UUFDdkIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7Ozs7WUF6RmxFLFVBQVU7Ozs7WUFIRixxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QgfSBmcm9tICdyeGpzL29ic2VydmFibGUvY29tYmluZUxhdGVzdCc7XG5pbXBvcnQgeyBEYXRlVGltZVBpY2tlclNlcnZpY2UsIE1vZGVEaXJlY3Rpb24gfSBmcm9tICcuLi9kYXRlLXRpbWUtcGlja2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgY29tcGFyZURheXMsIGRhdGVSYW5nZSwgZ3JpZGlmeSwgbW9udGhzIH0gZnJvbSAnLi4vZGF0ZS10aW1lLXBpY2tlci51dGlscyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXlWaWV3U2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBncmlkJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RGF5Vmlld0l0ZW1bXVtdPihbW11dKTtcbiAgICBmb2N1c2VkJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Rm9jdXNlZERheUl0ZW0+KG51bGwpO1xuXG4gICAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9kYXRlcGlja2VyOiBEYXRlVGltZVBpY2tlclNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gY29tYmluZUxhdGVzdChfZGF0ZXBpY2tlci5tb250aCQsIF9kYXRlcGlja2VyLnllYXIkKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoW21vbnRoLCB5ZWFyXSkgPT4gdGhpcy5jcmVhdGVEYXlHcmlkKG1vbnRoLCB5ZWFyKSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHNldEZvY3VzKGRheTogbnVtYmVyLCBtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkJC5uZXh0KHsgZGF5OiBkYXksIG1vbnRoOiBtb250aCwgeWVhcjogeWVhciB9KTtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIGRhdGUgcGlja2VyIHRvIHNob3cgdGhlIHJlcXVpcmVkIG1vbnRoIGFuZCB5ZWFyXG4gICAgICAgIHRoaXMuX2RhdGVwaWNrZXIuc2V0Vmlld3BvcnRNb250aChtb250aCk7XG4gICAgICAgIHRoaXMuX2RhdGVwaWNrZXIuc2V0Vmlld3BvcnRZZWFyKHllYXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlRGF5R3JpZChtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpOiB2b2lkIHtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIGhlYWRlclxuICAgICAgICB0aGlzLl9kYXRlcGlja2VyLnNldEhlYWRlcihtb250aHNbbW9udGhdICsgJyAnICsgeWVhcik7XG5cbiAgICAgICAgLy8gZmluZCB0aGUgbG93ZXIgYW5kIHVwcGVyIGJvdW5kYXJpZXNcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgMSk7XG4gICAgICAgIGNvbnN0IGVuZCA9IG5ldyBEYXRlKHllYXIsIG1vbnRoICsgMSwgMCk7XG5cbiAgICAgICAgLy8gd2UgYWx3YXlzIHdhbnQgdG8gc2hvdyBmcm9tIHRoZSBzdW5kYXkgLSB0aGlzIG1heSBpbmNsdWRlIHNob3dpbmcgc29tZSBkYXRlcyBmcm9tIHRoZSBwcmV2aW91cyBtb250aFxuICAgICAgICBzdGFydC5zZXREYXRlKHN0YXJ0LmdldERhdGUoKSAtIHN0YXJ0LmdldERheSgpKTtcblxuICAgICAgICAvLyB3ZSBhbHNvIHdhbnQgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIHJhbmdlIGVuZHMgb24gYSBzYXR1cmRheVxuICAgICAgICBlbmQuc2V0RGF0ZShlbmQuZ2V0RGF0ZSgpICsgKDYgLSBlbmQuZ2V0RGF5KCkpKTtcblxuICAgICAgICAvLyBjcmVhdGUgYW4gYXJyYXkgb2YgYWxsIHRoZSBkYXlzIHRvIGRpc3BsYXlcbiAgICAgICAgY29uc3QgZGF0ZXM6IERheVZpZXdJdGVtW10gPSBkYXRlUmFuZ2Uoc3RhcnQsIGVuZCkubWFwKGRhdGUgPT4gKHtcbiAgICAgICAgICAgIGRheTogZGF0ZS5nZXREYXRlKCksXG4gICAgICAgICAgICBtb250aDogZGF0ZS5nZXRNb250aCgpLFxuICAgICAgICAgICAgeWVhcjogZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgICAgZGF0ZTogZGF0ZSxcbiAgICAgICAgICAgIGlzVG9kYXk6IHRoaXMuaXNUb2RheShkYXRlKSxcbiAgICAgICAgICAgIGlzQWN0aXZlOiB0aGlzLmlzQWN0aXZlKGRhdGUpLFxuICAgICAgICAgICAgaXNDdXJyZW50TW9udGg6IGRhdGUuZ2V0TW9udGgoKSA9PT0gbW9udGhcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIC8vIHR1cm4gdGhlIGRhdGVzIGludG8gYSBncmlkXG4gICAgICAgIGNvbnN0IGl0ZW1zOiBEYXlWaWV3SXRlbVtdW10gPSBncmlkaWZ5KGRhdGVzLCA3KTtcblxuICAgICAgICB0aGlzLmdyaWQkLm5leHQoaXRlbXMpO1xuXG4gICAgICAgIC8vIGlmIG5vIGl0ZW0gaGFzIHlldCBiZWVuIGZvY3VzZWQgdGhlbiBmb2N1cyB0aGUgZmlyc3QgZGF5IG9mIHRoZSBtb250aFxuICAgICAgICBpZiAoKHRoaXMuX2RhdGVwaWNrZXIubW9kZURpcmVjdGlvbiA9PT0gTW9kZURpcmVjdGlvbi5Ob25lIHx8IHRoaXMuX2RhdGVwaWNrZXIubW9kZURpcmVjdGlvbiA9PT0gTW9kZURpcmVjdGlvbi5EZXNjZW5kKSAmJiB0aGlzLmZvY3VzZWQkLnZhbHVlID09PSBudWxsKSB7XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBzZWxlY3RlZCBpdGVtIGlzIHZpc2libGVcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkRGF5ID0gZGF0ZXMuZmluZChkYXkgPT4gZGF5LmlzQ3VycmVudE1vbnRoICYmIGRheS5pc0FjdGl2ZSk7XG5cbiAgICAgICAgICAgIGlmIChzZWxlY3RlZERheSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXMoc2VsZWN0ZWREYXkuZGF5LCBzZWxlY3RlZERheS5tb250aCwgc2VsZWN0ZWREYXkueWVhcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgLy8gZmluZCB0aGUgZmlyc3QgZGF5IG9mIHRoZSBtb250aFxuICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0ID0gZGF0ZXMuZmluZChkYXRlID0+IGRhdGUuZGF5ID09PSAxKTtcbiAgICBcbiAgICAgICAgICAgICAgICAvLyBmb2N1cyB0aGUgZGF0ZVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXMoZmlyc3QuZGF5LCBmaXJzdC5tb250aCwgZmlyc3QueWVhcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgKiBEZXRlcm1pbmUgd2hldGhlciBvciBub3QgYSBzcGVjaWZpYyBkYXRlIGlzIHRvZGF5XG4gICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGNoZWNrXG4gICAqL1xuICAgIHByaXZhdGUgaXNUb2RheShkYXRlOiBEYXRlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBjb21wYXJlRGF5cyhuZXcgRGF0ZSgpLCBkYXRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IGEgc3BlY2lmaWMgZGF0ZSBpcyB0aGUgc2VsZWN0ZWQgb25lXG4gICAgICogQHBhcmFtIGRhdGUgdGhlIGRhdGUgdG8gY2hlY2tcbiAgICAgKi9cbiAgICBwcml2YXRlIGlzQWN0aXZlKGRhdGU6IERhdGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmVEYXlzKHRoaXMuX2RhdGVwaWNrZXIuc2VsZWN0ZWQkLnZhbHVlLCBkYXRlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF5Vmlld0l0ZW0ge1xuICAgIGRheTogbnVtYmVyO1xuICAgIG1vbnRoOiBudW1iZXI7XG4gICAgeWVhcjogbnVtYmVyO1xuICAgIGRhdGU6IERhdGU7XG4gICAgaXNUb2RheTogYm9vbGVhbjtcbiAgICBpc0FjdGl2ZTogYm9vbGVhbjtcbiAgICBpc0N1cnJlbnRNb250aDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGb2N1c2VkRGF5SXRlbSB7XG4gICAgZGF5OiBudW1iZXI7XG4gICAgbW9udGg6IG51bWJlcjtcbiAgICB5ZWFyOiBudW1iZXI7XG59Il19