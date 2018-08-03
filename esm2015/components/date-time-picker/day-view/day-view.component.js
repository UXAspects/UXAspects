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
                template: "<table class=\"calendar\">\n    <thead>\n        <tr>\n            <th *ngFor=\"let day of datePicker.weekdays$ | async\" class=\"weekday\" [attr.aria-label]=\"day\">{{ day }}</th>\n        </tr>\n    </thead>\n\n    <tbody role=\"grid\">\n        <tr role=\"row\" *ngFor=\"let row of dayService.grid$ | async; trackBy: trackWeekByFn\">\n\n            <td *ngFor=\"let item of row; trackBy: trackDayByFn\" class=\"date-cell\" role=\"gridcell\">\n\n                <button class=\"date-button\"\n                        [focusIf]=\"(dayService.focused$ | async)?.day === item.day && (dayService.focused$ | async)?.month === item.month && (dayService.focused$ | async)?.year === item.year\"\n                        [attr.aria-label]=\"item.date | date\"\n                        [attr.aria-selected]=\"item.isActive\"\n                        [attr.aria-hidden]=\"!item.isCurrentMonth\"\n                        [class.current]=\"item.isToday\"\n                        [class.active]=\"item.isActive\"\n                        [class.preview]=\"!item.isCurrentMonth\"\n                        [tabindex]=\"getTabbable(item) ? 0 : -1\"\n                        (click)=\"select(item.date); $event.stopPropagation()\"\n                        (keydown.ArrowLeft)=\"focusDate(item, -1); $event.preventDefault()\"\n                        (keydown.ArrowRight)=\"focusDate(item, 1); $event.preventDefault()\"\n                        (keydown.ArrowUp)=\"focusDate(item, -7); $event.preventDefault()\"\n                        (keydown.ArrowDown)=\"focusDate(item, 7); $event.preventDefault()\">\n\n                    {{ item.date.getDate() }}\n                </button>\n\n            </td>\n        </tr>\n    </tbody>\n</table>",
                providers: [DayViewService],
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
DayViewComponent.ctorParameters = () => [
    { type: DateTimePickerService },
    { type: DayViewService }
];
function DayViewComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DayViewComponent.prototype._subscription;
    /** @type {?} */
    DayViewComponent.prototype.datePicker;
    /** @type {?} */
    DayViewComponent.prototype.dayService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF5LXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGF0ZS10aW1lLXBpY2tlci9kYXktdmlldy9kYXktdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFFOUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDM0YsT0FBTyxFQUFlLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBUWpFLE1BQU07Ozs7O0lBSUosWUFBbUIsVUFBaUMsRUFBUyxVQUEwQjtRQUFwRSxlQUFVLEdBQVYsVUFBVSxDQUF1QjtRQUFTLGVBQVUsR0FBVixVQUFVLENBQWdCO1FBQ3JGLElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLFlBQVk7YUFDekMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxLQUFLLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztLQUM3Rjs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ2xDOzs7OztJQUtELFFBQVE7UUFDTixJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztLQUNwRTs7Ozs7SUFLRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENB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K0IscUJBQXFCO1lBQy9CLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IERhdGVQaWNrZXJIZWFkZXJFdmVudCwgRGF0ZVRpbWVQaWNrZXJTZXJ2aWNlIH0gZnJvbSAnLi4vZGF0ZS10aW1lLXBpY2tlci5zZXJ2aWNlJztcbmltcG9ydCB7IERheVZpZXdJdGVtLCBEYXlWaWV3U2VydmljZSB9IGZyb20gJy4vZGF5LXZpZXcuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3V4LWRhdGUtdGltZS1waWNrZXItZGF5LXZpZXcnLFxuICB0ZW1wbGF0ZVVybDogJy4vZGF5LXZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICBwcm92aWRlcnM6IFtEYXlWaWV3U2VydmljZV0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIERheVZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkYXRlUGlja2VyOiBEYXRlVGltZVBpY2tlclNlcnZpY2UsIHB1YmxpYyBkYXlTZXJ2aWNlOiBEYXlWaWV3U2VydmljZSkge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IGRhdGVQaWNrZXIuaGVhZGVyRXZlbnQkXG4gICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IGV2ZW50ID09PSBEYXRlUGlja2VySGVhZGVyRXZlbnQuTmV4dCA/IHRoaXMubmV4dCgpIDogdGhpcy5wcmV2aW91cygpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5hdmlnYXRlIHRvIHRoZSBwcmV2aW91cyBwYWdlIG9mIGRhdGVzXG4gICAqL1xuICBwcmV2aW91cygpOiB2b2lkIHtcbiAgICB0aGlzLmRhdGVQaWNrZXIuc2V0Vmlld3BvcnRNb250aCh0aGlzLmRhdGVQaWNrZXIubW9udGgkLnZhbHVlIC0gMSk7XG4gIH1cblxuICAvKipcbiAgICogTmF2aWdhdGUgdG8gdGhlIG5leHQgcGFnZSBvZiBkYXRlc1xuICAgKi9cbiAgbmV4dCgpOiB2b2lkIHtcbiAgICB0aGlzLmRhdGVQaWNrZXIuc2V0Vmlld3BvcnRNb250aCh0aGlzLmRhdGVQaWNrZXIubW9udGgkLnZhbHVlICsgMSk7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IGEgcGFydGljdWxhciBkYXRlXG4gICAqIEBwYXJhbSBkYXRlIHRoZSBkYXRlIHRvIHNlbGVjdFxuICAgKi9cbiAgc2VsZWN0KGRhdGU6IERhdGUpOiB2b2lkIHtcbiAgICAvLyB1cGRhdGUgdGhlIGN1cnJlbnQgZGF0ZSBvYmplY3RcbiAgICB0aGlzLmRhdGVQaWNrZXIuc2V0RGF0ZShkYXRlLmdldERhdGUoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldEZ1bGxZZWFyKCkpO1xuXG4gICAgLy8gZm9jdXMgdGhlIG5ld2x5IHNlbGVjdGVkIGRhdGVcbiAgICB0aGlzLmRheVNlcnZpY2Uuc2V0Rm9jdXMoZGF0ZS5nZXREYXRlKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXRGdWxsWWVhcigpKTtcbiAgfVxuXG4gIHRyYWNrV2Vla0J5Rm4oaW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG5cbiAgdHJhY2tEYXlCeUZuKGluZGV4OiBudW1iZXIsIGl0ZW06IERheVZpZXdJdGVtKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7IGl0ZW0uZGF5IH0gJHsgaXRlbS5tb250aCB9ICR7IGl0ZW0ueWVhciB9YDtcbiAgfVxuXG4gIGZvY3VzRGF0ZShpdGVtOiBEYXlWaWV3SXRlbSwgZGF5T2Zmc2V0OiBudW1iZXIpOiB2b2lkIHtcblxuICAgIC8vIGRldGVybWluZSB0aGUgZGF0ZSBvZiB0aGUgZGF5XG4gICAgY29uc3QgdGFyZ2V0ID0gbmV3IERhdGUoaXRlbS5kYXRlLnNldERhdGUoaXRlbS5kYXRlLmdldERhdGUoKSArIGRheU9mZnNldCkpO1xuXG4gICAgLy8gaWRlbnRpZnkgd2hpY2ggZGF0ZSBzaG91bGQgYmUgZm9jdXNlZFxuICAgIHRoaXMuZGF5U2VydmljZS5zZXRGb2N1cyh0YXJnZXQuZ2V0RGF0ZSgpLCB0YXJnZXQuZ2V0TW9udGgoKSwgdGFyZ2V0LmdldEZ1bGxZZWFyKCkpO1xuICB9XG5cbiAgZ2V0VGFiYmFibGUoaXRlbTogRGF5Vmlld0l0ZW0pOiBib29sZWFuIHtcbiAgICBjb25zdCBmb2N1c2VkID0gdGhpcy5kYXlTZXJ2aWNlLmZvY3VzZWQkLnZhbHVlO1xuICAgIGNvbnN0IGdyaWQgPSB0aGlzLmRheVNlcnZpY2UuZ3JpZCQudmFsdWU7XG5cbiAgICAvLyBpZiB0aGVyZSBpcyBhIGZvY3VzZWQgbW9udGggY2hlY2sgaWYgdGhpcyBpcyBpdFxuICAgIGlmIChmb2N1c2VkKSB7XG5cbiAgICAgIC8vIGNoZWNrIGlmIHRoZSBmb2N1c2VkIGRheSBpcyB2aXNpYmxlXG4gICAgICBjb25zdCBpc0ZvY3VzZWREYXlWaXNpYmxlID0gISFncmlkLmZpbmQocm93ID0+ICEhcm93LmZpbmQoX2l0ZW0gPT4gX2l0ZW0uZGF5ID09PSBmb2N1c2VkLmRheSAmJiBfaXRlbS5tb250aCA9PT0gZm9jdXNlZC5tb250aCAmJiBfaXRlbS55ZWFyID09PSBmb2N1c2VkLnllYXIpKTtcblxuICAgICAgaWYgKGlzRm9jdXNlZERheVZpc2libGUpIHtcbiAgICAgICAgcmV0dXJuIGZvY3VzZWQuZGF5ID09PSBpdGVtLmRheSAmJiBmb2N1c2VkLm1vbnRoID09PSBpdGVtLm1vbnRoICYmIGZvY3VzZWQueWVhciA9PT0gaXRlbS55ZWFyO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGlmIHRoZXJlIGlzIG5vIGZvY3VzYWJsZSBkYXkgdGhlbiBjaGVjayBpZiB0aGVyZSBpcyBhIHNlbGVjdGVkIGRheVxuICAgIGNvbnN0IGlzU2VsZWN0ZWREYXlWaXNpYmxlID0gISFncmlkLmZpbmQocm93ID0+ICEhcm93LmZpbmQoZGF5ID0+IGRheS5pc0FjdGl2ZSkpO1xuXG4gICAgaWYgKGlzU2VsZWN0ZWREYXlWaXNpYmxlKSB7XG4gICAgICAgIHJldHVybiBpdGVtLmlzQWN0aXZlO1xuICAgIH1cblxuICAgIC8vIG90aGVyd2lzZSBtYWtlIHRoZSBmaXJzdCBkYXkgdGFiYmFibGVcbiAgICByZXR1cm4gaXRlbS5kYXkgPT09IDE7XG4gIH1cblxufSJdfQ==