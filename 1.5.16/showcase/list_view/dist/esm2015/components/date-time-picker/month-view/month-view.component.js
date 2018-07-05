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
                template: `<div class="calendar" role="grid">
  <div class="calendar-row" *ngFor="let row of monthService.grid$ | async; trackBy: trackRowByFn" role="row">

    <button role="gridcell"
         class="calendar-item"
         *ngFor="let item of row; trackBy: trackMonthByFn"
         [focusIf]="(monthService.focused$ | async)?.month === item.month && (monthService.focused$ | async)?.year === item.year"
         [tabindex]="getTabbable(item) ? 0 : -1"
         [attr.aria-label]="item.name + ' ' + item.year"
         [attr.aria-selected]="item.isActiveMonth"
         [class.active]="item.isActiveMonth"
         [class.current]="item.isCurrentMonth"
         (click)="select(item.month); $event.stopPropagation()"
         (keydown.ArrowLeft)="focusMonth(item, -1); $event.preventDefault()"
         (keydown.ArrowRight)="focusMonth(item, 1); $event.preventDefault()"
         (keydown.ArrowUp)="focusMonth(item, -4); $event.preventDefault()"
         (keydown.ArrowDown)="focusMonth(item, 4); $event.preventDefault()">
         {{ item.name }}
    </button>
  </div>
</div>
`,
                providers: [MonthViewService],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
MonthViewComponent.ctorParameters = () => [
    { type: DateTimePickerService, },
    { type: MonthViewService, },
];
function MonthViewComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MonthViewComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MonthViewComponent.ctorParameters;
    /** @type {?} */
    MonthViewComponent.prototype._subscription;
    /** @type {?} */
    MonthViewComponent.prototype._datePicker;
    /** @type {?} */
    MonthViewComponent.prototype.monthService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL21vbnRoLXZpZXcvbW9udGgtdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFFOUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDM0YsT0FBTyxFQUFpQixnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBNkJ2RSxNQUFNOzs7OztJQUlGLFlBQW9CLFdBQWtDLEVBQVMsWUFBOEI7UUFBekUsZ0JBQVcsR0FBWCxXQUFXLENBQXVCO1FBQVMsaUJBQVksR0FBWixZQUFZLENBQWtCO1FBQ3pGLElBQUksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDLFlBQVk7YUFDeEMsU0FBUyxDQUFDLEtBQUssSUFBSSxLQUFLLEtBQUsscUJBQXFCLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztLQUNqRzs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BDOzs7OztJQUtELFFBQVE7UUFDSixJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDdEU7Ozs7O0lBS0QsSUFBSTtRQUNBLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztLQUN0RTs7Ozs7O0lBTUQsTUFBTSxDQUFDLEtBQWE7UUFDaEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7UUFHekMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztLQUNwQzs7Ozs7O0lBRUQsVUFBVSxDQUFDLElBQW1CLEVBQUUsV0FBbUI7UUFDL0MscUJBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO1FBQzNDLHFCQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRTNCLEVBQUUsQ0FBQyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLFdBQVcsSUFBSSxFQUFFLENBQUM7WUFDbEIsVUFBVSxJQUFJLENBQUMsQ0FBQztTQUNuQjtRQUVELEVBQUUsQ0FBQyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLFdBQVcsSUFBSSxFQUFFLENBQUM7WUFDbEIsVUFBVSxJQUFJLENBQUMsQ0FBQztTQUNuQjtRQUVELElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUN2RDs7Ozs7SUFFRCxZQUFZLENBQUMsS0FBYTtRQUN0QixNQUFNLENBQUMsS0FBSyxDQUFDO0tBQ2hCOzs7Ozs7SUFFRCxjQUFjLENBQUMsS0FBYSxFQUFFLElBQW1CO1FBQzdDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ3ZDOzs7OztJQUVELFdBQVcsQ0FBQyxJQUFtQjtRQUMzQix1QkFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQ2pELHVCQUFNLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7O1FBRzNDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7O1lBR1YsdUJBQU0scUJBQXFCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxLQUFLLE9BQU8sQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUVwSSxFQUFFLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ3JFO1NBQ0o7O1FBR0QsdUJBQU0sc0JBQXNCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUU1RixFQUFFLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7WUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7U0FDN0I7O1FBR0QsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDO0tBQzNCOzs7WUFsSEosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxnQ0FBZ0M7Z0JBQzFDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBcUJiO2dCQUNHLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDO2dCQUM3QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNsRDs7OztZQTdCK0IscUJBQXFCO1lBQzdCLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgRGF0ZVBpY2tlckhlYWRlckV2ZW50LCBEYXRlVGltZVBpY2tlclNlcnZpY2UgfSBmcm9tICcuLi9kYXRlLXRpbWUtcGlja2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTW9udGhWaWV3SXRlbSwgTW9udGhWaWV3U2VydmljZSB9IGZyb20gJy4vbW9udGgtdmlldy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1kYXRlLXRpbWUtcGlja2VyLW1vbnRoLXZpZXcnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImNhbGVuZGFyXCIgcm9sZT1cImdyaWRcIj5cbiAgPGRpdiBjbGFzcz1cImNhbGVuZGFyLXJvd1wiICpuZ0Zvcj1cImxldCByb3cgb2YgbW9udGhTZXJ2aWNlLmdyaWQkIHwgYXN5bmM7IHRyYWNrQnk6IHRyYWNrUm93QnlGblwiIHJvbGU9XCJyb3dcIj5cblxuICAgIDxidXR0b24gcm9sZT1cImdyaWRjZWxsXCJcbiAgICAgICAgIGNsYXNzPVwiY2FsZW5kYXItaXRlbVwiXG4gICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiByb3c7IHRyYWNrQnk6IHRyYWNrTW9udGhCeUZuXCJcbiAgICAgICAgIFtmb2N1c0lmXT1cIihtb250aFNlcnZpY2UuZm9jdXNlZCQgfCBhc3luYyk/Lm1vbnRoID09PSBpdGVtLm1vbnRoICYmIChtb250aFNlcnZpY2UuZm9jdXNlZCQgfCBhc3luYyk/LnllYXIgPT09IGl0ZW0ueWVhclwiXG4gICAgICAgICBbdGFiaW5kZXhdPVwiZ2V0VGFiYmFibGUoaXRlbSkgPyAwIDogLTFcIlxuICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJpdGVtLm5hbWUgKyAnICcgKyBpdGVtLnllYXJcIlxuICAgICAgICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJpdGVtLmlzQWN0aXZlTW9udGhcIlxuICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJpdGVtLmlzQWN0aXZlTW9udGhcIlxuICAgICAgICAgW2NsYXNzLmN1cnJlbnRdPVwiaXRlbS5pc0N1cnJlbnRNb250aFwiXG4gICAgICAgICAoY2xpY2spPVwic2VsZWN0KGl0ZW0ubW9udGgpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIlxuICAgICAgICAgKGtleWRvd24uQXJyb3dMZWZ0KT1cImZvY3VzTW9udGgoaXRlbSwgLTEpOyAkZXZlbnQucHJldmVudERlZmF1bHQoKVwiXG4gICAgICAgICAoa2V5ZG93bi5BcnJvd1JpZ2h0KT1cImZvY3VzTW9udGgoaXRlbSwgMSk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCJcbiAgICAgICAgIChrZXlkb3duLkFycm93VXApPVwiZm9jdXNNb250aChpdGVtLCAtNCk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCJcbiAgICAgICAgIChrZXlkb3duLkFycm93RG93bik9XCJmb2N1c01vbnRoKGl0ZW0sIDQpOyAkZXZlbnQucHJldmVudERlZmF1bHQoKVwiPlxuICAgICAgICAge3sgaXRlbS5uYW1lIH19XG4gICAgPC9idXR0b24+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICAgIHByb3ZpZGVyczogW01vbnRoVmlld1NlcnZpY2VdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE1vbnRoVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2RhdGVQaWNrZXI6IERhdGVUaW1lUGlja2VyU2VydmljZSwgcHVibGljIG1vbnRoU2VydmljZTogTW9udGhWaWV3U2VydmljZSkge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSBfZGF0ZVBpY2tlci5oZWFkZXJFdmVudCRcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoZXZlbnQgPT4gZXZlbnQgPT09IERhdGVQaWNrZXJIZWFkZXJFdmVudC5OZXh0ID8gdGhpcy5uZXh0KCkgOiB0aGlzLnByZXZpb3VzKCkpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHbyB0byB0aGUgcHJldmlvdXMgeWVhclxuICAgICAqL1xuICAgIHByZXZpb3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9kYXRlUGlja2VyLnNldFZpZXdwb3J0WWVhcih0aGlzLl9kYXRlUGlja2VyLnllYXIkLnZhbHVlIC0gMSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR28gdG8gdGhlIG5leHQgeWVhclxuICAgICAqL1xuICAgIG5leHQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2RhdGVQaWNrZXIuc2V0Vmlld3BvcnRZZWFyKHRoaXMuX2RhdGVQaWNrZXIueWVhciQudmFsdWUgKyAxKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWxlY3QgYSBtb250aCBpbiB0aGUgY2FsZW5kYXJcbiAgICAgKiBAcGFyYW0gbW9udGggdGhlIGluZGV4IG9mIHRoZSBtb250aCB0byBzZWxlY3RcbiAgICAgKi9cbiAgICBzZWxlY3QobW9udGg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLl9kYXRlUGlja2VyLnNldFZpZXdwb3J0TW9udGgobW9udGgpO1xuXG4gICAgICAgIC8vIHNob3cgdGhlIGRheSBwaWNrZXJcbiAgICAgICAgdGhpcy5fZGF0ZVBpY2tlci5nb1RvQ2hpbGRNb2RlKCk7XG4gICAgfVxuXG4gICAgZm9jdXNNb250aChpdGVtOiBNb250aFZpZXdJdGVtLCBtb250aE9mZnNldDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGxldCB0YXJnZXRNb250aCA9IGl0ZW0ubW9udGggKyBtb250aE9mZnNldDtcbiAgICAgICAgbGV0IHRhcmdldFllYXIgPSBpdGVtLnllYXI7XG5cbiAgICAgICAgaWYgKHRhcmdldE1vbnRoIDwgMCkge1xuICAgICAgICAgICAgdGFyZ2V0TW9udGggKz0gMTI7XG4gICAgICAgICAgICB0YXJnZXRZZWFyIC09IDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGFyZ2V0TW9udGggPj0gMTIpIHtcbiAgICAgICAgICAgIHRhcmdldE1vbnRoIC09IDEyO1xuICAgICAgICAgICAgdGFyZ2V0WWVhciArPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb250aFNlcnZpY2Uuc2V0Rm9jdXModGFyZ2V0TW9udGgsIHRhcmdldFllYXIpO1xuICAgIH1cblxuICAgIHRyYWNrUm93QnlGbihpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cblxuICAgIHRyYWNrTW9udGhCeUZuKGluZGV4OiBudW1iZXIsIGl0ZW06IE1vbnRoVmlld0l0ZW0pOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7aXRlbS5tb250aH0gJHtpdGVtLnllYXJ9YDtcbiAgICB9XG5cbiAgICBnZXRUYWJiYWJsZShpdGVtOiBNb250aFZpZXdJdGVtKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGZvY3VzZWQgPSB0aGlzLm1vbnRoU2VydmljZS5mb2N1c2VkJC52YWx1ZTtcbiAgICAgICAgY29uc3QgZ3JpZCA9IHRoaXMubW9udGhTZXJ2aWNlLmdyaWQkLnZhbHVlO1xuXG4gICAgICAgIC8vIGlmIHRoZXJlIGlzIGEgZm9jdXNlZCBtb250aCBjaGVjayBpZiB0aGlzIGlzIGl0XG4gICAgICAgIGlmIChmb2N1c2VkKSB7XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBmb2N1c2VkIG1vbnRoIGlzIHZpc2libGVcbiAgICAgICAgICAgIGNvbnN0IGlzRm9jdXNlZE1vbnRoVmlzaWJsZSA9ICEhZ3JpZC5maW5kKHJvdyA9PiAhIXJvdy5maW5kKF9pdGVtID0+IF9pdGVtLm1vbnRoID09PSBmb2N1c2VkLm1vbnRoICYmIF9pdGVtLnllYXIgPT09IGZvY3VzZWQueWVhcikpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoaXNGb2N1c2VkTW9udGhWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvY3VzZWQubW9udGggPT09IGl0ZW0ubW9udGggJiYgZm9jdXNlZC55ZWFyID09PSBpdGVtLnllYXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB0aGVyZSBpcyBubyBmb2N1c2FibGUgbW9udGggdGhlbiBjaGVjayBpZiB0aGVyZSBpcyBhIHNlbGVjdGVkIG1vbnRoXG4gICAgICAgIGNvbnN0IGlzU2VsZWN0ZWRNb250aFZpc2libGUgPSAhIWdyaWQuZmluZChyb3cgPT4gISFyb3cuZmluZChtb250aCA9PiBtb250aC5pc0FjdGl2ZU1vbnRoKSk7XG5cbiAgICAgICAgaWYgKGlzU2VsZWN0ZWRNb250aFZpc2libGUpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmlzQWN0aXZlTW9udGg7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvdGhlcndpc2UgbWFrZSB0aGUgZmlyc3QgbW9udGggdGFiYmFibGVcbiAgICAgICAgcmV0dXJuIGl0ZW0ubW9udGggPT09IDA7XG4gICAgfVxufSJdfQ==