/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DateTimePickerService, ModeDirection } from '../date-time-picker.service';
import { gridify, range } from '../date-time-picker.utils';
export class MonthViewService {
    /**
     * @param {?} _datepicker
     */
    constructor(_datepicker) {
        this._datepicker = _datepicker;
        this.grid$ = new BehaviorSubject([[]]);
        this.focused$ = new BehaviorSubject(null);
        this._subscription = _datepicker.year$.subscribe(year => this.createMonthGrid(year));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    setFocus(month, year) {
        this.focused$.next({ month: month, year: year });
        // update the viewport to ensure focused month is visible
        this._datepicker.setViewportYear(year);
    }
    /**
     * @param {?} year
     * @return {?}
     */
    createMonthGrid(year) {
        // update the header
        this._datepicker.setHeader(year.toString());
        // get the current year and month
        const /** @type {?} */ currentMonth = new Date().getMonth();
        const /** @type {?} */ currentYear = new Date().getFullYear();
        // get the currently selected month
        const /** @type {?} */ activeMonth = this._datepicker.selected$.value.getMonth();
        const /** @type {?} */ activeYear = this._datepicker.selected$.value.getFullYear();
        // create a 4x3 grid of month numbers
        const /** @type {?} */ months = range(0, 11).map(month => {
            return {
                name: this._datepicker.monthsShort[month],
                month: month,
                year: year,
                isCurrentMonth: year === currentYear && month === currentMonth,
                isActiveMonth: year === activeYear && month === activeMonth
            };
        });
        // map these to the appropriate format
        const /** @type {?} */ items = gridify(months, 4);
        // update the grid
        this.grid$.next(items);
        // if there is no focused month select the first one
        if (this._datepicker.modeDirection === ModeDirection.Descend && this.focused$.value === null) {
            // check if the selected month is in view
            const /** @type {?} */ selectedMonth = months.find(month => month.isActiveMonth);
            this.setFocus(selectedMonth ? selectedMonth.month : 0, year);
        }
    }
}
MonthViewService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MonthViewService.ctorParameters = () => [
    { type: DateTimePickerService }
];
function MonthViewService_tsickle_Closure_declarations() {
    /** @type {?} */
    MonthViewService.prototype.grid$;
    /** @type {?} */
    MonthViewService.prototype.focused$;
    /** @type {?} */
    MonthViewService.prototype._subscription;
    /** @type {?} */
    MonthViewService.prototype._datepicker;
}
/**
 * @record
 */
export function MonthViewItem() { }
function MonthViewItem_tsickle_Closure_declarations() {
    /** @type {?} */
    MonthViewItem.prototype.name;
    /** @type {?} */
    MonthViewItem.prototype.month;
    /** @type {?} */
    MonthViewItem.prototype.year;
    /** @type {?} */
    MonthViewItem.prototype.isCurrentMonth;
    /** @type {?} */
    MonthViewItem.prototype.isActiveMonth;
}
/**
 * @record
 */
export function FocusedMonthItem() { }
function FocusedMonthItem_tsickle_Closure_declarations() {
    /** @type {?} */
    FocusedMonthItem.prototype.month;
    /** @type {?} */
    FocusedMonthItem.prototype.year;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtdmlldy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGF0ZS10aW1lLXBpY2tlci9tb250aC12aWV3L21vbnRoLXZpZXcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFdkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ25GLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFHM0QsTUFBTTs7OztJQU9GLFlBQW9CLFdBQWtDO1FBQWxDLGdCQUFXLEdBQVgsV0FBVyxDQUF1QjtxQkFMOUMsSUFBSSxlQUFlLENBQW9CLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQ3pDLElBQUksZUFBZSxDQUFtQixJQUFJLENBQUM7UUFLbEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUN4Rjs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BDOzs7Ozs7SUFFRCxRQUFRLENBQUMsS0FBYSxFQUFFLElBQVk7UUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDOztRQUdqRCxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMxQzs7Ozs7SUFFTyxlQUFlLENBQUMsSUFBWTs7UUFHaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7O1FBRzVDLHVCQUFNLFlBQVksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzNDLHVCQUFNLFdBQVcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDOztRQUc3Qyx1QkFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hFLHVCQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7O1FBR2xFLHVCQUFNLE1BQU0sR0FBb0IsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDckQsTUFBTSxDQUFDO2dCQUNILElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7Z0JBQ3pDLEtBQUssRUFBRSxLQUFLO2dCQUNaLElBQUksRUFBRSxJQUFJO2dCQUNWLGNBQWMsRUFBRSxJQUFJLEtBQUssV0FBVyxJQUFJLEtBQUssS0FBSyxZQUFZO2dCQUM5RCxhQUFhLEVBQUUsSUFBSSxLQUFLLFVBQVUsSUFBSSxLQUFLLEtBQUssV0FBVzthQUM5RCxDQUFDO1NBQ0wsQ0FBQyxDQUFDOztRQUdILHVCQUFNLEtBQUssR0FBc0IsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQzs7UUFHcEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7O1FBR3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxLQUFLLGFBQWEsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQzs7WUFHM0YsdUJBQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFaEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNoRTs7OztZQTVEUixVQUFVOzs7O1lBSEYscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBEYXRlVGltZVBpY2tlclNlcnZpY2UsIE1vZGVEaXJlY3Rpb24gfSBmcm9tICcuLi9kYXRlLXRpbWUtcGlja2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgZ3JpZGlmeSwgcmFuZ2UgfSBmcm9tICcuLi9kYXRlLXRpbWUtcGlja2VyLnV0aWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vbnRoVmlld1NlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgZ3JpZCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1vbnRoVmlld0l0ZW1bXVtdPihbW11dKTtcbiAgICBmb2N1c2VkJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Rm9jdXNlZE1vbnRoSXRlbT4obnVsbCk7XG5cbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2RhdGVwaWNrZXI6IERhdGVUaW1lUGlja2VyU2VydmljZSkge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSBfZGF0ZXBpY2tlci55ZWFyJC5zdWJzY3JpYmUoeWVhciA9PiB0aGlzLmNyZWF0ZU1vbnRoR3JpZCh5ZWFyKSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHNldEZvY3VzKG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmZvY3VzZWQkLm5leHQoeyBtb250aDogbW9udGgsIHllYXI6IHllYXIgfSk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSB2aWV3cG9ydCB0byBlbnN1cmUgZm9jdXNlZCBtb250aCBpcyB2aXNpYmxlXG4gICAgICAgIHRoaXMuX2RhdGVwaWNrZXIuc2V0Vmlld3BvcnRZZWFyKHllYXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlTW9udGhHcmlkKHllYXI6IG51bWJlcik6IHZvaWQge1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgaGVhZGVyXG4gICAgICAgIHRoaXMuX2RhdGVwaWNrZXIuc2V0SGVhZGVyKHllYXIudG9TdHJpbmcoKSk7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50IHllYXIgYW5kIG1vbnRoXG4gICAgICAgIGNvbnN0IGN1cnJlbnRNb250aCA9IG5ldyBEYXRlKCkuZ2V0TW9udGgoKTtcbiAgICAgICAgY29uc3QgY3VycmVudFllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgbW9udGhcbiAgICAgICAgY29uc3QgYWN0aXZlTW9udGggPSB0aGlzLl9kYXRlcGlja2VyLnNlbGVjdGVkJC52YWx1ZS5nZXRNb250aCgpO1xuICAgICAgICBjb25zdCBhY3RpdmVZZWFyID0gdGhpcy5fZGF0ZXBpY2tlci5zZWxlY3RlZCQudmFsdWUuZ2V0RnVsbFllYXIoKTtcblxuICAgICAgICAvLyBjcmVhdGUgYSA0eDMgZ3JpZCBvZiBtb250aCBudW1iZXJzXG4gICAgICAgIGNvbnN0IG1vbnRoczogTW9udGhWaWV3SXRlbVtdID0gcmFuZ2UoMCwgMTEpLm1hcChtb250aCA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMuX2RhdGVwaWNrZXIubW9udGhzU2hvcnRbbW9udGhdLFxuICAgICAgICAgICAgICAgIG1vbnRoOiBtb250aCxcbiAgICAgICAgICAgICAgICB5ZWFyOiB5ZWFyLFxuICAgICAgICAgICAgICAgIGlzQ3VycmVudE1vbnRoOiB5ZWFyID09PSBjdXJyZW50WWVhciAmJiBtb250aCA9PT0gY3VycmVudE1vbnRoLFxuICAgICAgICAgICAgICAgIGlzQWN0aXZlTW9udGg6IHllYXIgPT09IGFjdGl2ZVllYXIgJiYgbW9udGggPT09IGFjdGl2ZU1vbnRoXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBtYXAgdGhlc2UgdG8gdGhlIGFwcHJvcHJpYXRlIGZvcm1hdFxuICAgICAgICBjb25zdCBpdGVtczogTW9udGhWaWV3SXRlbVtdW10gPSBncmlkaWZ5KG1vbnRocywgNCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBncmlkXG4gICAgICAgIHRoaXMuZ3JpZCQubmV4dChpdGVtcyk7XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgaXMgbm8gZm9jdXNlZCBtb250aCBzZWxlY3QgdGhlIGZpcnN0IG9uZVxuICAgICAgICBpZiAodGhpcy5fZGF0ZXBpY2tlci5tb2RlRGlyZWN0aW9uID09PSBNb2RlRGlyZWN0aW9uLkRlc2NlbmQgJiYgdGhpcy5mb2N1c2VkJC52YWx1ZSA9PT0gbnVsbCkge1xuXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgc2VsZWN0ZWQgbW9udGggaXMgaW4gdmlld1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRNb250aCA9IG1vbnRocy5maW5kKG1vbnRoID0+IG1vbnRoLmlzQWN0aXZlTW9udGgpO1xuXG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKHNlbGVjdGVkTW9udGggPyBzZWxlY3RlZE1vbnRoLm1vbnRoIDogMCwgeWVhcik7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9udGhWaWV3SXRlbSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIG1vbnRoOiBudW1iZXI7XG4gICAgeWVhcjogbnVtYmVyO1xuICAgIGlzQ3VycmVudE1vbnRoOiBib29sZWFuO1xuICAgIGlzQWN0aXZlTW9udGg6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9jdXNlZE1vbnRoSXRlbSB7XG4gICAgbW9udGg6IG51bWJlcjtcbiAgICB5ZWFyOiBudW1iZXI7XG59Il19