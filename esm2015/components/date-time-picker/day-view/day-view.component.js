/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DatePickerHeaderEvent, DateTimePickerService } from '../date-time-picker.service';
import { DayViewService } from './day-view.service';
export class DayViewComponent {
    /**
     * @param {?} datePicker
     * @param {?} dayService
     */
    constructor(datePicker, dayService) {
        this.datePicker = datePicker;
        this.dayService = dayService;
        this._subscription = datePicker.headerEvent$
            .subscribe(event => event === DatePickerHeaderEvent.Next ? this.next() : this.previous());
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * Navigate to the previous page of dates
     * @return {?}
     */
    previous() {
        this.datePicker.setViewportMonth(this.datePicker.month$.value - 1);
    }
    /**
     * Navigate to the next page of dates
     * @return {?}
     */
    next() {
        this.datePicker.setViewportMonth(this.datePicker.month$.value + 1);
    }
    /**
     * Select a particular date
     * @param {?} date the date to select
     * @return {?}
     */
    select(date) {
        // update the current date object
        this.datePicker.setDate(date.getDate(), date.getMonth(), date.getFullYear());
        // focus the newly selected date
        this.dayService.setFocus(date.getDate(), date.getMonth(), date.getFullYear());
    }
    /**
     * @param {?} index
     * @return {?}
     */
    trackWeekByFn(index) {
        return index;
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    trackDayByFn(index, item) {
        return `${item.day} ${item.month} ${item.year}`;
    }
    /**
     * @param {?} item
     * @param {?} dayOffset
     * @return {?}
     */
    focusDate(item, dayOffset) {
        // determine the date of the day
        const /** @type {?} */ target = new Date(item.date.setDate(item.date.getDate() + dayOffset));
        // identify which date should be focused
        this.dayService.setFocus(target.getDate(), target.getMonth(), target.getFullYear());
    }
    /**
     * @param {?} item
     * @return {?}
     */
    getTabbable(item) {
        const /** @type {?} */ focused = this.dayService.focused$.value;
        const /** @type {?} */ grid = this.dayService.grid$.value;
        // if there is a focused month check if this is it
        if (focused) {
            // check if the focused day is visible
            const /** @type {?} */ isFocusedDayVisible = !!grid.find(row => !!row.find(_item => _item.day === focused.day && _item.month === focused.month && _item.year === focused.year));
            if (isFocusedDayVisible) {
                return focused.day === item.day && focused.month === item.month && focused.year === item.year;
            }
        }
        // if there is no focusable day then check if there is a selected day
        const /** @type {?} */ isSelectedDayVisible = !!grid.find(row => !!row.find(day => day.isActive));
        if (isSelectedDayVisible) {
            return item.isActive;
        }
        // otherwise make the first day tabbable
        return item.day === 1;
    }
}
DayViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-date-time-picker-day-view',
                template: `<table class="calendar">
    <thead>
        <tr>
            <th *ngFor="let day of datePicker.weekdays$ | async" class="weekday" [attr.aria-label]="day">{{ day }}</th>
        </tr>
    </thead>

    <tbody role="grid">
        <tr role="row" *ngFor="let row of dayService.grid$ | async; trackBy: trackWeekByFn">

            <td *ngFor="let item of row; trackBy: trackDayByFn" class="date-cell" role="gridcell">

                <button class="date-button"
                        [focusIf]="(dayService.focused$ | async)?.day === item.day && (dayService.focused$ | async)?.month === item.month && (dayService.focused$ | async)?.year === item.year"
                        [attr.aria-label]="item.date | date"
                        [attr.aria-selected]="item.isActive"
                        [attr.aria-hidden]="!item.isCurrentMonth"
                        [class.current]="item.isToday"
                        [class.active]="item.isActive"
                        [class.preview]="!item.isCurrentMonth"
                        [tabindex]="getTabbable(item) ? 0 : -1"
                        (click)="select(item.date); $event.stopPropagation()"
                        (keydown.ArrowLeft)="focusDate(item, -1); $event.preventDefault()"
                        (keydown.ArrowRight)="focusDate(item, 1); $event.preventDefault()"
                        (keydown.ArrowUp)="focusDate(item, -7); $event.preventDefault()"
                        (keydown.ArrowDown)="focusDate(item, 7); $event.preventDefault()">

                    {{ item.date.getDate() }}
                </button>

            </td>
        </tr>
    </tbody>
</table>`,
                providers: [DayViewService],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
DayViewComponent.ctorParameters = () => [
    { type: DateTimePickerService, },
    { type: DayViewService, },
];
function DayViewComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DayViewComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DayViewComponent.ctorParameters;
    /** @type {?} */
    DayViewComponent.prototype._subscription;
    /** @type {?} */
    DayViewComponent.prototype.datePicker;
    /** @type {?} */
    DayViewComponent.prototype.dayService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF5LXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGF0ZS10aW1lLXBpY2tlci9kYXktdmlldy9kYXktdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFFOUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDM0YsT0FBTyxFQUFlLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBeUNqRSxNQUFNOzs7OztJQUlKLFlBQW1CLFVBQWlDLEVBQVMsVUFBMEI7UUFBcEUsZUFBVSxHQUFWLFVBQVUsQ0FBdUI7UUFBUyxlQUFVLEdBQVYsVUFBVSxDQUFnQjtRQUNyRixJQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyxZQUFZO2FBQ3pDLFNBQVMsQ0FBQyxLQUFLLElBQUksS0FBSyxLQUFLLHFCQUFxQixDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7S0FDN0Y7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNsQzs7Ozs7SUFLRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDcEU7Ozs7O0lBS0QsSUFBSTtRQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ3BFOzs7Ozs7SUFNRCxNQUFNLENBQUMs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c0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBEYXRlUGlja2VySGVhZGVyRXZlbnQsIERhdGVUaW1lUGlja2VyU2VydmljZSB9IGZyb20gJy4uL2RhdGUtdGltZS1waWNrZXIuc2VydmljZSc7XG5pbXBvcnQgeyBEYXlWaWV3SXRlbSwgRGF5Vmlld1NlcnZpY2UgfSBmcm9tICcuL2RheS12aWV3LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd1eC1kYXRlLXRpbWUtcGlja2VyLWRheS12aWV3JyxcbiAgdGVtcGxhdGU6IGA8dGFibGUgY2xhc3M9XCJjYWxlbmRhclwiPlxuICAgIDx0aGVhZD5cbiAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRoICpuZ0Zvcj1cImxldCBkYXkgb2YgZGF0ZVBpY2tlci53ZWVrZGF5cyQgfCBhc3luY1wiIGNsYXNzPVwid2Vla2RheVwiIFthdHRyLmFyaWEtbGFiZWxdPVwiZGF5XCI+e3sgZGF5IH19PC90aD5cbiAgICAgICAgPC90cj5cbiAgICA8L3RoZWFkPlxuXG4gICAgPHRib2R5IHJvbGU9XCJncmlkXCI+XG4gICAgICAgIDx0ciByb2xlPVwicm93XCIgKm5nRm9yPVwibGV0IHJvdyBvZiBkYXlTZXJ2aWNlLmdyaWQkIHwgYXN5bmM7IHRyYWNrQnk6IHRyYWNrV2Vla0J5Rm5cIj5cblxuICAgICAgICAgICAgPHRkICpuZ0Zvcj1cImxldCBpdGVtIG9mIHJvdzsgdHJhY2tCeTogdHJhY2tEYXlCeUZuXCIgY2xhc3M9XCJkYXRlLWNlbGxcIiByb2xlPVwiZ3JpZGNlbGxcIj5cblxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkYXRlLWJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbZm9jdXNJZl09XCIoZGF5U2VydmljZS5mb2N1c2VkJCB8IGFzeW5jKT8uZGF5ID09PSBpdGVtLmRheSAmJiAoZGF5U2VydmljZS5mb2N1c2VkJCB8IGFzeW5jKT8ubW9udGggPT09IGl0ZW0ubW9udGggJiYgKGRheVNlcnZpY2UuZm9jdXNlZCQgfCBhc3luYyk/LnllYXIgPT09IGl0ZW0ueWVhclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIml0ZW0uZGF0ZSB8IGRhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJpdGVtLmlzQWN0aXZlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtaGlkZGVuXT1cIiFpdGVtLmlzQ3VycmVudE1vbnRoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzcy5jdXJyZW50XT1cIml0ZW0uaXNUb2RheVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cIml0ZW0uaXNBY3RpdmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLnByZXZpZXddPVwiIWl0ZW0uaXNDdXJyZW50TW9udGhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW3RhYmluZGV4XT1cImdldFRhYmJhYmxlKGl0ZW0pID8gMCA6IC0xXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3QoaXRlbS5kYXRlKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duLkFycm93TGVmdCk9XCJmb2N1c0RhdGUoaXRlbSwgLTEpOyAkZXZlbnQucHJldmVudERlZmF1bHQoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bi5BcnJvd1JpZ2h0KT1cImZvY3VzRGF0ZShpdGVtLCAxKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24uQXJyb3dVcCk9XCJmb2N1c0RhdGUoaXRlbSwgLTcpOyAkZXZlbnQucHJldmVudERlZmF1bHQoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bi5BcnJvd0Rvd24pPVwiZm9jdXNEYXRlKGl0ZW0sIDcpOyAkZXZlbnQucHJldmVudERlZmF1bHQoKVwiPlxuXG4gICAgICAgICAgICAgICAgICAgIHt7IGl0ZW0uZGF0ZS5nZXREYXRlKCkgfX1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgPC90cj5cbiAgICA8L3Rib2R5PlxuPC90YWJsZT5gLFxuICBwcm92aWRlcnM6IFtEYXlWaWV3U2VydmljZV0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIERheVZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkYXRlUGlja2VyOiBEYXRlVGltZVBpY2tlclNlcnZpY2UsIHB1YmxpYyBkYXlTZXJ2aWNlOiBEYXlWaWV3U2VydmljZSkge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IGRhdGVQaWNrZXIuaGVhZGVyRXZlbnQkXG4gICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IGV2ZW50ID09PSBEYXRlUGlja2VySGVhZGVyRXZlbnQuTmV4dCA/IHRoaXMubmV4dCgpIDogdGhpcy5wcmV2aW91cygpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5hdmlnYXRlIHRvIHRoZSBwcmV2aW91cyBwYWdlIG9mIGRhdGVzXG4gICAqL1xuICBwcmV2aW91cygpOiB2b2lkIHtcbiAgICB0aGlzLmRhdGVQaWNrZXIuc2V0Vmlld3BvcnRNb250aCh0aGlzLmRhdGVQaWNrZXIubW9udGgkLnZhbHVlIC0gMSk7XG4gIH1cblxuICAvKipcbiAgICogTmF2aWdhdGUgdG8gdGhlIG5leHQgcGFnZSBvZiBkYXRlc1xuICAgKi9cbiAgbmV4dCgpOiB2b2lkIHtcbiAgICB0aGlzLmRhdGVQaWNrZXIuc2V0Vmlld3BvcnRNb250aCh0aGlzLmRhdGVQaWNrZXIubW9udGgkLnZhbHVlICsgMSk7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IGEgcGFydGljdWxhciBkYXRlXG4gICAqIEBwYXJhbSBkYXRlIHRoZSBkYXRlIHRvIHNlbGVjdFxuICAgKi9cbiAgc2VsZWN0KGRhdGU6IERhdGUpOiB2b2lkIHtcbiAgICAvLyB1cGRhdGUgdGhlIGN1cnJlbnQgZGF0ZSBvYmplY3RcbiAgICB0aGlzLmRhdGVQaWNrZXIuc2V0RGF0ZShkYXRlLmdldERhdGUoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldEZ1bGxZZWFyKCkpO1xuXG4gICAgLy8gZm9jdXMgdGhlIG5ld2x5IHNlbGVjdGVkIGRhdGVcbiAgICB0aGlzLmRheVNlcnZpY2Uuc2V0Rm9jdXMoZGF0ZS5nZXREYXRlKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXRGdWxsWWVhcigpKTtcbiAgfVxuXG4gIHRyYWNrV2Vla0J5Rm4oaW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG5cbiAgdHJhY2tEYXlCeUZuKGluZGV4OiBudW1iZXIsIGl0ZW06IERheVZpZXdJdGVtKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7IGl0ZW0uZGF5IH0gJHsgaXRlbS5tb250aCB9ICR7IGl0ZW0ueWVhciB9YDtcbiAgfVxuXG4gIGZvY3VzRGF0ZShpdGVtOiBEYXlWaWV3SXRlbSwgZGF5T2Zmc2V0OiBudW1iZXIpOiB2b2lkIHtcblxuICAgIC8vIGRldGVybWluZSB0aGUgZGF0ZSBvZiB0aGUgZGF5XG4gICAgY29uc3QgdGFyZ2V0ID0gbmV3IERhdGUoaXRlbS5kYXRlLnNldERhdGUoaXRlbS5kYXRlLmdldERhdGUoKSArIGRheU9mZnNldCkpO1xuXG4gICAgLy8gaWRlbnRpZnkgd2hpY2ggZGF0ZSBzaG91bGQgYmUgZm9jdXNlZFxuICAgIHRoaXMuZGF5U2VydmljZS5zZXRGb2N1cyh0YXJnZXQuZ2V0RGF0ZSgpLCB0YXJnZXQuZ2V0TW9udGgoKSwgdGFyZ2V0LmdldEZ1bGxZZWFyKCkpO1xuICB9XG5cbiAgZ2V0VGFiYmFibGUoaXRlbTogRGF5Vmlld0l0ZW0pOiBib29sZWFuIHtcbiAgICBjb25zdCBmb2N1c2VkID0gdGhpcy5kYXlTZXJ2aWNlLmZvY3VzZWQkLnZhbHVlO1xuICAgIGNvbnN0IGdyaWQgPSB0aGlzLmRheVNlcnZpY2UuZ3JpZCQudmFsdWU7XG5cbiAgICAvLyBpZiB0aGVyZSBpcyBhIGZvY3VzZWQgbW9udGggY2hlY2sgaWYgdGhpcyBpcyBpdFxuICAgIGlmIChmb2N1c2VkKSB7XG5cbiAgICAgIC8vIGNoZWNrIGlmIHRoZSBmb2N1c2VkIGRheSBpcyB2aXNpYmxlXG4gICAgICBjb25zdCBpc0ZvY3VzZWREYXlWaXNpYmxlID0gISFncmlkLmZpbmQocm93ID0+ICEhcm93LmZpbmQoX2l0ZW0gPT4gX2l0ZW0uZGF5ID09PSBmb2N1c2VkLmRheSAmJiBfaXRlbS5tb250aCA9PT0gZm9jdXNlZC5tb250aCAmJiBfaXRlbS55ZWFyID09PSBmb2N1c2VkLnllYXIpKTtcblxuICAgICAgaWYgKGlzRm9jdXNlZERheVZpc2libGUpIHtcbiAgICAgICAgcmV0dXJuIGZvY3VzZWQuZGF5ID09PSBpdGVtLmRheSAmJiBmb2N1c2VkLm1vbnRoID09PSBpdGVtLm1vbnRoICYmIGZvY3VzZWQueWVhciA9PT0gaXRlbS55ZWFyO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGlmIHRoZXJlIGlzIG5vIGZvY3VzYWJsZSBkYXkgdGhlbiBjaGVjayBpZiB0aGVyZSBpcyBhIHNlbGVjdGVkIGRheVxuICAgIGNvbnN0IGlzU2VsZWN0ZWREYXlWaXNpYmxlID0gISFncmlkLmZpbmQocm93ID0+ICEhcm93LmZpbmQoZGF5ID0+IGRheS5pc0FjdGl2ZSkpO1xuXG4gICAgaWYgKGlzU2VsZWN0ZWREYXlWaXNpYmxlKSB7XG4gICAgICAgIHJldHVybiBpdGVtLmlzQWN0aXZlO1xuICAgIH1cblxuICAgIC8vIG90aGVyd2lzZSBtYWtlIHRoZSBmaXJzdCBkYXkgdGFiYmFibGVcbiAgICByZXR1cm4gaXRlbS5kYXkgPT09IDE7XG4gIH1cblxufSJdfQ==