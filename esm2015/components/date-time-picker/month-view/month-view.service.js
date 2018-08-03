/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DateTimePickerService, ModeDirection } from '../date-time-picker.service';
import { gridify, monthsShort, range } from '../date-time-picker.utils';
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
                name: monthsShort[month],
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtdmlldy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGF0ZS10aW1lLXBpY2tlci9tb250aC12aWV3L21vbnRoLXZpZXcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFdkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ25GLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBR3hFLE1BQU07Ozs7SUFPRixZQUFvQixXQUFrQztRQUFsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBdUI7cUJBTDlDLElBQUksZUFBZSxDQUFvQixDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUN6QyxJQUFJLGVBQWUsQ0FBbUIsSUFBSSxDQUFDO1FBS2xELElBQUksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDeEY7Ozs7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwQzs7Ozs7O0lBRUQsUUFBUSxDQUFDLEtBQWEsRUFBRSxJQUFZO1FBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzs7UUFHakQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDMUM7Ozs7O0lBRU8sZUFBZSxDQUFDLElBQVk7O1FBR2hDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDOztRQUc1Qyx1QkFBTSxZQUFZLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMzQyx1QkFBTSxXQUFXLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7UUFHN0MsdUJBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoRSx1QkFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDOztRQUdsRSx1QkFBTSxNQUFNLEdBQW9CLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3JELE1BQU0sQ0FBQztnQkFDSCxJQUFJLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQztnQkFDeEIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osSUFBSSxFQUFFLElBQUk7Z0JBQ1YsY0FBYyxFQUFFLElBQUksS0FBSyxXQUFXLElBQUksS0FBSyxLQUFLLFlBQVk7Z0JBQzlELGFBQWEsRUFBRSxJQUFJLEtBQUssVUFBVSxJQUFJLEtBQUssS0FBSyxXQUFXO2FBQzlELENBQUM7U0FDTCxDQUFDLENBQUM7O1FBR0gsdUJBQU0sS0FBSyxHQUFzQixPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDOztRQUdwRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7UUFHdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEtBQUssYUFBYSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDOztZQUczRix1QkFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUVoRSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ2hFOzs7O1lBNURSLFVBQVU7Ozs7WUFIRixxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IERhdGVUaW1lUGlja2VyU2VydmljZSwgTW9kZURpcmVjdGlvbiB9IGZyb20gJy4uL2RhdGUtdGltZS1waWNrZXIuc2VydmljZSc7XG5pbXBvcnQgeyBncmlkaWZ5LCBtb250aHNTaG9ydCwgcmFuZ2UgfSBmcm9tICcuLi9kYXRlLXRpbWUtcGlja2VyLnV0aWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vbnRoVmlld1NlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgZ3JpZCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1vbnRoVmlld0l0ZW1bXVtdPihbW11dKTtcbiAgICBmb2N1c2VkJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Rm9jdXNlZE1vbnRoSXRlbT4obnVsbCk7XG5cbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2RhdGVwaWNrZXI6IERhdGVUaW1lUGlja2VyU2VydmljZSkge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSBfZGF0ZXBpY2tlci55ZWFyJC5zdWJzY3JpYmUoeWVhciA9PiB0aGlzLmNyZWF0ZU1vbnRoR3JpZCh5ZWFyKSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHNldEZvY3VzKG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmZvY3VzZWQkLm5leHQoeyBtb250aDogbW9udGgsIHllYXI6IHllYXIgfSk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSB2aWV3cG9ydCB0byBlbnN1cmUgZm9jdXNlZCBtb250aCBpcyB2aXNpYmxlXG4gICAgICAgIHRoaXMuX2RhdGVwaWNrZXIuc2V0Vmlld3BvcnRZZWFyKHllYXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlTW9udGhHcmlkKHllYXI6IG51bWJlcik6IHZvaWQge1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgaGVhZGVyXG4gICAgICAgIHRoaXMuX2RhdGVwaWNrZXIuc2V0SGVhZGVyKHllYXIudG9TdHJpbmcoKSk7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50IHllYXIgYW5kIG1vbnRoXG4gICAgICAgIGNvbnN0IGN1cnJlbnRNb250aCA9IG5ldyBEYXRlKCkuZ2V0TW9udGgoKTtcbiAgICAgICAgY29uc3QgY3VycmVudFllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgbW9udGhcbiAgICAgICAgY29uc3QgYWN0aXZlTW9udGggPSB0aGlzLl9kYXRlcGlja2VyLnNlbGVjdGVkJC52YWx1ZS5nZXRNb250aCgpO1xuICAgICAgICBjb25zdCBhY3RpdmVZZWFyID0gdGhpcy5fZGF0ZXBpY2tlci5zZWxlY3RlZCQudmFsdWUuZ2V0RnVsbFllYXIoKTtcblxuICAgICAgICAvLyBjcmVhdGUgYSA0eDMgZ3JpZCBvZiBtb250aCBudW1iZXJzXG4gICAgICAgIGNvbnN0IG1vbnRoczogTW9udGhWaWV3SXRlbVtdID0gcmFuZ2UoMCwgMTEpLm1hcChtb250aCA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG5hbWU6IG1vbnRoc1Nob3J0W21vbnRoXSxcbiAgICAgICAgICAgICAgICBtb250aDogbW9udGgsXG4gICAgICAgICAgICAgICAgeWVhcjogeWVhcixcbiAgICAgICAgICAgICAgICBpc0N1cnJlbnRNb250aDogeWVhciA9PT0gY3VycmVudFllYXIgJiYgbW9udGggPT09IGN1cnJlbnRNb250aCxcbiAgICAgICAgICAgICAgICBpc0FjdGl2ZU1vbnRoOiB5ZWFyID09PSBhY3RpdmVZZWFyICYmIG1vbnRoID09PSBhY3RpdmVNb250aFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gbWFwIHRoZXNlIHRvIHRoZSBhcHByb3ByaWF0ZSBmb3JtYXRcbiAgICAgICAgY29uc3QgaXRlbXM6IE1vbnRoVmlld0l0ZW1bXVtdID0gZ3JpZGlmeShtb250aHMsIDQpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgZ3JpZFxuICAgICAgICB0aGlzLmdyaWQkLm5leHQoaXRlbXMpO1xuXG4gICAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIGZvY3VzZWQgbW9udGggc2VsZWN0IHRoZSBmaXJzdCBvbmVcbiAgICAgICAgaWYgKHRoaXMuX2RhdGVwaWNrZXIubW9kZURpcmVjdGlvbiA9PT0gTW9kZURpcmVjdGlvbi5EZXNjZW5kICYmIHRoaXMuZm9jdXNlZCQudmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHNlbGVjdGVkIG1vbnRoIGlzIGluIHZpZXdcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkTW9udGggPSBtb250aHMuZmluZChtb250aCA9PiBtb250aC5pc0FjdGl2ZU1vbnRoKTtcblxuICAgICAgICAgICAgdGhpcy5zZXRGb2N1cyhzZWxlY3RlZE1vbnRoID8gc2VsZWN0ZWRNb250aC5tb250aCA6IDAsIHllYXIpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1vbnRoVmlld0l0ZW0ge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBtb250aDogbnVtYmVyO1xuICAgIHllYXI6IG51bWJlcjtcbiAgICBpc0N1cnJlbnRNb250aDogYm9vbGVhbjtcbiAgICBpc0FjdGl2ZU1vbnRoOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZvY3VzZWRNb250aEl0ZW0ge1xuICAgIG1vbnRoOiBudW1iZXI7XG4gICAgeWVhcjogbnVtYmVyO1xufSJdfQ==