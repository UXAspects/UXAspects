/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DatePickerHeaderEvent, DateTimePickerService } from '../date-time-picker.service';
import { MonthViewService } from './month-view.service';
export class MonthViewComponent {
    /**
     * @param {?} _datePicker
     * @param {?} monthService
     */
    constructor(_datePicker, monthService) {
        this._datePicker = _datePicker;
        this.monthService = monthService;
        this._subscription = _datePicker.headerEvent$
            .subscribe(event => event === DatePickerHeaderEvent.Next ? this.next() : this.previous());
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * Go to the previous year
     * @return {?}
     */
    previous() {
        this._datePicker.setViewportYear(this._datePicker.year$.value - 1);
    }
    /**
     * Go to the next year
     * @return {?}
     */
    next() {
        this._datePicker.setViewportYear(this._datePicker.year$.value + 1);
    }
    /**
     * Select a month in the calendar
     * @param {?} month the index of the month to select
     * @return {?}
     */
    select(month) {
        this._datePicker.setViewportMonth(month);
        // show the day picker
        this._datePicker.goToChildMode();
    }
    /**
     * @param {?} item
     * @param {?} monthOffset
     * @return {?}
     */
    focusMonth(item, monthOffset) {
        let /** @type {?} */ targetMonth = item.month + monthOffset;
        let /** @type {?} */ targetYear = item.year;
        if (targetMonth < 0) {
            targetMonth += 12;
            targetYear -= 1;
        }
        if (targetMonth >= 12) {
            targetMonth -= 12;
            targetYear += 1;
        }
        this.monthService.setFocus(targetMonth, targetYear);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    trackRowByFn(index) {
        return index;
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    trackMonthByFn(index, item) {
        return `${item.month} ${item.year}`;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    getTabbable(item) {
        const /** @type {?} */ focused = this.monthService.focused$.value;
        const /** @type {?} */ grid = this.monthService.grid$.value;
        // if there is a focused month check if this is it
        if (focused) {
            // check if the focused month is visible
            const /** @type {?} */ isFocusedMonthVisible = !!grid.find(row => !!row.find(_item => _item.month === focused.month && _item.year === focused.year));
            if (isFocusedMonthVisible) {
                return focused.month === item.month && focused.year === item.year;
            }
        }
        // if there is no focusable month then check if there is a selected month
        const /** @type {?} */ isSelectedMonthVisible = !!grid.find(row => !!row.find(month => month.isActiveMonth));
        if (isSelectedMonthVisible) {
            return item.isActiveMonth;
        }
        // otherwise make the first month tabbable
        return item.month === 0;
    }
}
MonthViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-date-time-picker-month-view',
                template: "<div class=\"calendar\" role=\"grid\">\n  <div class=\"calendar-row\" *ngFor=\"let row of monthService.grid$ | async; trackBy: trackRowByFn\" role=\"row\">\n\n    <button role=\"gridcell\"\n         class=\"calendar-item\"\n         *ngFor=\"let item of row; trackBy: trackMonthByFn\"\n         [focusIf]=\"(monthService.focused$ | async)?.month === item.month && (monthService.focused$ | async)?.year === item.year\"\n         [tabindex]=\"getTabbable(item) ? 0 : -1\"\n         [attr.aria-label]=\"item.name + ' ' + item.year\"\n         [attr.aria-selected]=\"item.isActiveMonth\"\n         [class.active]=\"item.isActiveMonth\"\n         [class.current]=\"item.isCurrentMonth\"\n         (click)=\"select(item.month); $event.stopPropagation()\"\n         (keydown.ArrowLeft)=\"focusMonth(item, -1); $event.preventDefault()\"\n         (keydown.ArrowRight)=\"focusMonth(item, 1); $event.preventDefault()\"\n         (keydown.ArrowUp)=\"focusMonth(item, -4); $event.preventDefault()\"\n         (keydown.ArrowDown)=\"focusMonth(item, 4); $event.preventDefault()\">\n         {{ item.name }}\n    </button>\n  </div>\n</div>\n",
                providers: [MonthViewService],
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
MonthViewComponent.ctorParameters = () => [
    { type: DateTimePickerService },
    { type: MonthViewService }
];
function MonthViewComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MonthViewComponent.prototype._subscription;
    /** @type {?} */
    MonthViewComponent.prototype._datePicker;
    /** @type {?} */
    MonthViewComponent.prototype.monthService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL21vbnRoLXZpZXcvbW9udGgtdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFFOUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDM0YsT0FBTyxFQUFpQixnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBUXZFLE1BQU07Ozs7O0lBSUYsWUFBb0IsV0FBa0MsRUFBUyxZQUE4QjtRQUF6RSxnQkFBVyxHQUFYLFdBQVcsQ0FBdUI7UUFBUyxpQkFBWSxHQUFaLFlBQVksQ0FBa0I7UUFDekYsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUMsWUFBWTthQUN4QyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEtBQUsscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0tBQ2pHOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEM7Ozs7O0lBS0QsUUFBUTtRQUNKLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztLQUN0RTs7Ozs7SUFLRCxJQUFJO1FBQ0EsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ3RFOzs7Ozs7SUFNRCxNQUFNLENBQUMsS0FBYTtRQUNoQixJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDOztRQUd6QyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFDO0tBQ3BDOzs7Ozs7SUFFRCxVQUFVLENBQUMsSUFBbUIsRUFBRSxXQUFtQjtRQUMvQyxxQkFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7UUFDM0MscUJBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFM0IsRUFBRSxDQUFDLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsV0FBVyxJQUFJLEVBQUUsQ0FBQztZQUNsQixVQUFVLElBQUksQ0FBQyxDQUFDO1NBQ25CO1FBRUQsRUFBRSxDQUFDLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDcEIsV0FBVyxJQUFJLEVBQUUsQ0FBQztZQUNsQixVQUFVLElBQUksQ0FBQyxDQUFDO1NBQ25CO1FBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQ3ZEOzs7OztJQUVELFlBQVksQ0FBQyxLQUFhO1FBQ3RCLE1BQU0sQ0FBQyxLQUFLLENBQUM7S0FDaEI7Ozs7OztJQUVELGNBQWMsQ0FBQyxLQUFhLEVBQUUsSUFBbUI7UUFDN0MsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDdkM7Ozs7O0lBRUQsV0FBVyxDQUFDLElBQW1CO1FBQzNCLHVCQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFDakQsdUJBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQzs7UUFHM0MsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7WUFHVix1QkFBTSxxQkFBcUIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxPQUFPLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFcEksRUFBRSxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQzthQUNyRTtTQUNKOztRQUdELHVCQUFNLHNCQUFzQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUU1RixFQUFFLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7WUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7U0FDN0I7O1FBR0QsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDO0tBQzNCOzs7WUE3RkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxnQ0FBZ0M7Z0JBQzFDLG1uQ0FBMEM7Z0JBQzFDLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDO2dCQUM3QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNsRDs7OztZQVIrQixxQkFBcUI7WUFDN0IsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBEYXRlUGlja2VySGVhZGVyRXZlbnQsIERhdGVUaW1lUGlja2VyU2VydmljZSB9IGZyb20gJy4uL2RhdGUtdGltZS1waWNrZXIuc2VydmljZSc7XG5pbXBvcnQgeyBNb250aFZpZXdJdGVtLCBNb250aFZpZXdTZXJ2aWNlIH0gZnJvbSAnLi9tb250aC12aWV3LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWRhdGUtdGltZS1waWNrZXItbW9udGgtdmlldycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL21vbnRoLXZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICAgIHByb3ZpZGVyczogW01vbnRoVmlld1NlcnZpY2VdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE1vbnRoVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2RhdGVQaWNrZXI6IERhdGVUaW1lUGlja2VyU2VydmljZSwgcHVibGljIG1vbnRoU2VydmljZTogTW9udGhWaWV3U2VydmljZSkge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSBfZGF0ZVBpY2tlci5oZWFkZXJFdmVudCRcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoZXZlbnQgPT4gZXZlbnQgPT09IERhdGVQaWNrZXJIZWFkZXJFdmVudC5OZXh0ID8gdGhpcy5uZXh0KCkgOiB0aGlzLnByZXZpb3VzKCkpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHbyB0byB0aGUgcHJldmlvdXMgeWVhclxuICAgICAqL1xuICAgIHByZXZpb3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9kYXRlUGlja2VyLnNldFZpZXdwb3J0WWVhcih0aGlzLl9kYXRlUGlja2VyLnllYXIkLnZhbHVlIC0gMSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR28gdG8gdGhlIG5leHQgeWVhclxuICAgICAqL1xuICAgIG5leHQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2RhdGVQaWNrZXIuc2V0Vmlld3BvcnRZZWFyKHRoaXMuX2RhdGVQaWNrZXIueWVhciQudmFsdWUgKyAxKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWxlY3QgYSBtb250aCBpbiB0aGUgY2FsZW5kYXJcbiAgICAgKiBAcGFyYW0gbW9udGggdGhlIGluZGV4IG9mIHRoZSBtb250aCB0byBzZWxlY3RcbiAgICAgKi9cbiAgICBzZWxlY3QobW9udGg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLl9kYXRlUGlja2VyLnNldFZpZXdwb3J0TW9udGgobW9udGgpO1xuXG4gICAgICAgIC8vIHNob3cgdGhlIGRheSBwaWNrZXJcbiAgICAgICAgdGhpcy5fZGF0ZVBpY2tlci5nb1RvQ2hpbGRNb2RlKCk7XG4gICAgfVxuXG4gICAgZm9jdXNNb250aChpdGVtOiBNb250aFZpZXdJdGVtLCBtb250aE9mZnNldDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGxldCB0YXJnZXRNb250aCA9IGl0ZW0ubW9udGggKyBtb250aE9mZnNldDtcbiAgICAgICAgbGV0IHRhcmdldFllYXIgPSBpdGVtLnllYXI7XG5cbiAgICAgICAgaWYgKHRhcmdldE1vbnRoIDwgMCkge1xuICAgICAgICAgICAgdGFyZ2V0TW9udGggKz0gMTI7XG4gICAgICAgICAgICB0YXJnZXRZZWFyIC09IDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGFyZ2V0TW9udGggPj0gMTIpIHtcbiAgICAgICAgICAgIHRhcmdldE1vbnRoIC09IDEyO1xuICAgICAgICAgICAgdGFyZ2V0WWVhciArPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb250aFNlcnZpY2Uuc2V0Rm9jdXModGFyZ2V0TW9udGgsIHRhcmdldFllYXIpO1xuICAgIH1cblxuICAgIHRyYWNrUm93QnlGbihpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cblxuICAgIHRyYWNrTW9udGhCeUZuKGluZGV4OiBudW1iZXIsIGl0ZW06IE1vbnRoVmlld0l0ZW0pOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7aXRlbS5tb250aH0gJHtpdGVtLnllYXJ9YDtcbiAgICB9XG5cbiAgICBnZXRUYWJiYWJsZShpdGVtOiBNb250aFZpZXdJdGVtKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGZvY3VzZWQgPSB0aGlzLm1vbnRoU2VydmljZS5mb2N1c2VkJC52YWx1ZTtcbiAgICAgICAgY29uc3QgZ3JpZCA9IHRoaXMubW9udGhTZXJ2aWNlLmdyaWQkLnZhbHVlO1xuXG4gICAgICAgIC8vIGlmIHRoZXJlIGlzIGEgZm9jdXNlZCBtb250aCBjaGVjayBpZiB0aGlzIGlzIGl0XG4gICAgICAgIGlmIChmb2N1c2VkKSB7XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBmb2N1c2VkIG1vbnRoIGlzIHZpc2libGVcbiAgICAgICAgICAgIGNvbnN0IGlzRm9jdXNlZE1vbnRoVmlzaWJsZSA9ICEhZ3JpZC5maW5kKHJvdyA9PiAhIXJvdy5maW5kKF9pdGVtID0+IF9pdGVtLm1vbnRoID09PSBmb2N1c2VkLm1vbnRoICYmIF9pdGVtLnllYXIgPT09IGZvY3VzZWQueWVhcikpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoaXNGb2N1c2VkTW9udGhWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvY3VzZWQubW9udGggPT09IGl0ZW0ubW9udGggJiYgZm9jdXNlZC55ZWFyID09PSBpdGVtLnllYXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB0aGVyZSBpcyBubyBmb2N1c2FibGUgbW9udGggdGhlbiBjaGVjayBpZiB0aGVyZSBpcyBhIHNlbGVjdGVkIG1vbnRoXG4gICAgICAgIGNvbnN0IGlzU2VsZWN0ZWRNb250aFZpc2libGUgPSAhIWdyaWQuZmluZChyb3cgPT4gISFyb3cuZmluZChtb250aCA9PiBtb250aC5pc0FjdGl2ZU1vbnRoKSk7XG5cbiAgICAgICAgaWYgKGlzU2VsZWN0ZWRNb250aFZpc2libGUpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmlzQWN0aXZlTW9udGg7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvdGhlcndpc2UgbWFrZSB0aGUgZmlyc3QgbW9udGggdGFiYmFibGVcbiAgICAgICAgcmV0dXJuIGl0ZW0ubW9udGggPT09IDA7XG4gICAgfVxufSJdfQ==