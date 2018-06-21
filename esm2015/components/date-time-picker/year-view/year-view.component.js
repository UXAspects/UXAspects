/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DateTimePickerService } from '../date-time-picker.service';
import { YearViewService } from './year-view.service';
export class YearViewComponent {
    /**
     * @param {?} _datePicker
     * @param {?} yearService
     */
    constructor(_datePicker, yearService) {
        this._datePicker = _datePicker;
        this.yearService = yearService;
    }
    /**
     * @param {?} year
     * @return {?}
     */
    select(year) {
        this._datePicker.setViewportYear(year);
        // show the month picker
        this._datePicker.goToChildMode();
    }
    /**
     * @param {?} item
     * @param {?} yearOffset
     * @return {?}
     */
    focusYear(item, yearOffset) {
        this.yearService.setFocus(item.year + yearOffset);
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
    trackYearByFn(index, item) {
        return item.year;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    getTabbable(item) {
        const /** @type {?} */ focused = this.yearService.focused$.value;
        const /** @type {?} */ grid = this.yearService.grid$.value;
        // if there is a focused year check if this is it
        if (focused) {
            // check if the focused year is visible
            const /** @type {?} */ isFocusedYearVisible = !!grid.find(row => !!row.find(_item => _item.year === focused));
            if (isFocusedYearVisible) {
                return focused === item.year;
            }
        }
        // if there is no focusable year then check if there is a selected year
        const /** @type {?} */ isSelectedYearVisible = !!grid.find(row => !!row.find(year => year.isActiveYear));
        if (isSelectedYearVisible) {
            return item.isActiveYear;
        }
        // otherwise make the first month tabbable
        return grid[0][0].year === item.year;
    }
}
YearViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-date-time-picker-year-view',
                template: `<div class="calendar" role="grid">
  <div class="calendar-row" role="row" *ngFor="let row of yearService.grid$ | async; trackBy: trackRowByFn">

    <button *ngFor="let item of row; trackBy: trackYearByFn"
         role="gridcell"
         class="calendar-item"
         [focusIf]="(yearService.focused$ | async) === item.year"
         [attr.aria-label]="item.year"
         [attr.aria-selected]="item.isActiveYear"
         [class.current]="item.isCurrentYear"
         [class.active]="item.isActiveYear"
         (click)="select(item.year); $event.stopPropagation()"
         (keydown.ArrowLeft)="focusYear(item, -1); $event.preventDefault()"
         (keydown.ArrowRight)="focusYear(item, 1); $event.preventDefault()"
         (keydown.ArrowUp)="focusYear(item, -4); $event.preventDefault()"
         (keydown.ArrowDown)="focusYear(item, 4); $event.preventDefault()"
         [tabindex]="getTabbable(item) ? 0 : -1">
         {{ item.year }}
    </button>
  </div>
</div>
`,
                providers: [YearViewService],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
YearViewComponent.ctorParameters = () => [
    { type: DateTimePickerService, },
    { type: YearViewService, },
];
function YearViewComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    YearViewComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    YearViewComponent.ctorParameters;
    /** @type {?} */
    YearViewComponent.prototype._datePicker;
    /** @type {?} */
    YearViewComponent.prototype.yearService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVhci12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIveWVhci12aWV3L3llYXItdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDcEUsT0FBTyxFQUFnQixlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQTZCcEUsTUFBTTs7Ozs7SUFFSixZQUFvQixXQUFrQyxFQUFTLFdBQTRCO1FBQXZFLGdCQUFXLEdBQVgsV0FBVyxDQUF1QjtRQUFTLGdCQUFXLEdBQVgsV0FBVyxDQUFpQjtLQUFJOzs7OztJQUUvRixNQUFNLENBQUMsSUFBWTtRQUNqQixJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7UUFHdkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztLQUNsQzs7Ozs7O0lBRUQsU0FBUyxDQUFDLElBQWtCLEVBQUUsVUFBa0I7UUFDOUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsQ0FBQztLQUNuRDs7Ozs7SUFFRCxZQUFZLENBQUMsS0FBYTtRQUN4QixNQUFNLENBQUMsS0FBSyxDQUFDO0tBQ2Q7Ozs7OztJQUVELGFBQWEsQ0FBQyxLQUFhLEVBQUUsSUFBa0I7UUFDN0MsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7S0FDbEI7Ozs7O0lBRUQsV0FBVyxDQUFDLElBQWtCO1FBQzVCLHVCQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFDaEQsdUJBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQzs7UUFHMUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7WUFHVix1QkFBTSxvQkFBb0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztZQUU3RixFQUFFLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLE1BQU0sQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQzthQUNoQztTQUNKOztRQUdELHVCQUFNLHFCQUFxQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFFeEYsRUFBRSxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQzVCOztRQUdELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUM7S0FDeEM7OztZQTFFQSxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLCtCQUErQjtnQkFDekMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FxQlg7Z0JBQ0MsU0FBUyxFQUFFLENBQUMsZUFBZSxDQUFDO2dCQUM1QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7OztZQTdCUSxxQkFBcUI7WUFDUCxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZVRpbWVQaWNrZXJTZXJ2aWNlIH0gZnJvbSAnLi4vZGF0ZS10aW1lLXBpY2tlci5zZXJ2aWNlJztcbmltcG9ydCB7IFllYXJWaWV3SXRlbSwgWWVhclZpZXdTZXJ2aWNlIH0gZnJvbSAnLi95ZWFyLXZpZXcuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3V4LWRhdGUtdGltZS1waWNrZXIteWVhci12aWV3JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiY2FsZW5kYXJcIiByb2xlPVwiZ3JpZFwiPlxuICA8ZGl2IGNsYXNzPVwiY2FsZW5kYXItcm93XCIgcm9sZT1cInJvd1wiICpuZ0Zvcj1cImxldCByb3cgb2YgeWVhclNlcnZpY2UuZ3JpZCQgfCBhc3luYzsgdHJhY2tCeTogdHJhY2tSb3dCeUZuXCI+XG5cbiAgICA8YnV0dG9uICpuZ0Zvcj1cImxldCBpdGVtIG9mIHJvdzsgdHJhY2tCeTogdHJhY2tZZWFyQnlGblwiXG4gICAgICAgICByb2xlPVwiZ3JpZGNlbGxcIlxuICAgICAgICAgY2xhc3M9XCJjYWxlbmRhci1pdGVtXCJcbiAgICAgICAgIFtmb2N1c0lmXT1cIih5ZWFyU2VydmljZS5mb2N1c2VkJCB8IGFzeW5jKSA9PT0gaXRlbS55ZWFyXCJcbiAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiaXRlbS55ZWFyXCJcbiAgICAgICAgIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwiaXRlbS5pc0FjdGl2ZVllYXJcIlxuICAgICAgICAgW2NsYXNzLmN1cnJlbnRdPVwiaXRlbS5pc0N1cnJlbnRZZWFyXCJcbiAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaXRlbS5pc0FjdGl2ZVllYXJcIlxuICAgICAgICAgKGNsaWNrKT1cInNlbGVjdChpdGVtLnllYXIpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIlxuICAgICAgICAgKGtleWRvd24uQXJyb3dMZWZ0KT1cImZvY3VzWWVhcihpdGVtLCAtMSk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCJcbiAgICAgICAgIChrZXlkb3duLkFycm93UmlnaHQpPVwiZm9jdXNZZWFyKGl0ZW0sIDEpOyAkZXZlbnQucHJldmVudERlZmF1bHQoKVwiXG4gICAgICAgICAoa2V5ZG93bi5BcnJvd1VwKT1cImZvY3VzWWVhcihpdGVtLCAtNCk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCJcbiAgICAgICAgIChrZXlkb3duLkFycm93RG93bik9XCJmb2N1c1llYXIoaXRlbSwgNCk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCJcbiAgICAgICAgIFt0YWJpbmRleF09XCJnZXRUYWJiYWJsZShpdGVtKSA/IDAgOiAtMVwiPlxuICAgICAgICAge3sgaXRlbS55ZWFyIH19XG4gICAgPC9idXR0b24+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBwcm92aWRlcnM6IFtZZWFyVmlld1NlcnZpY2VdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBZZWFyVmlld0NvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZGF0ZVBpY2tlcjogRGF0ZVRpbWVQaWNrZXJTZXJ2aWNlLCBwdWJsaWMgeWVhclNlcnZpY2U6IFllYXJWaWV3U2VydmljZSkge31cblxuICBzZWxlY3QoeWVhcjogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fZGF0ZVBpY2tlci5zZXRWaWV3cG9ydFllYXIoeWVhcik7XG5cbiAgICAvLyBzaG93IHRoZSBtb250aCBwaWNrZXJcbiAgICB0aGlzLl9kYXRlUGlja2VyLmdvVG9DaGlsZE1vZGUoKTtcbiAgfVxuXG4gIGZvY3VzWWVhcihpdGVtOiBZZWFyVmlld0l0ZW0sIHllYXJPZmZzZXQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMueWVhclNlcnZpY2Uuc2V0Rm9jdXMoaXRlbS55ZWFyICsgeWVhck9mZnNldCk7XG4gIH1cblxuICB0cmFja1Jvd0J5Rm4oaW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG5cbiAgdHJhY2tZZWFyQnlGbihpbmRleDogbnVtYmVyLCBpdGVtOiBZZWFyVmlld0l0ZW0pOiBudW1iZXIge1xuICAgIHJldHVybiBpdGVtLnllYXI7XG4gIH1cblxuICBnZXRUYWJiYWJsZShpdGVtOiBZZWFyVmlld0l0ZW0pOiBib29sZWFuIHtcbiAgICBjb25zdCBmb2N1c2VkID0gdGhpcy55ZWFyU2VydmljZS5mb2N1c2VkJC52YWx1ZTtcbiAgICBjb25zdCBncmlkID0gdGhpcy55ZWFyU2VydmljZS5ncmlkJC52YWx1ZTtcblxuICAgIC8vIGlmIHRoZXJlIGlzIGEgZm9jdXNlZCB5ZWFyIGNoZWNrIGlmIHRoaXMgaXMgaXRcbiAgICBpZiAoZm9jdXNlZCkge1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSBmb2N1c2VkIHllYXIgaXMgdmlzaWJsZVxuICAgICAgICBjb25zdCBpc0ZvY3VzZWRZZWFyVmlzaWJsZSA9ICEhZ3JpZC5maW5kKHJvdyA9PiAhIXJvdy5maW5kKF9pdGVtID0+IF9pdGVtLnllYXIgPT09IGZvY3VzZWQpKTtcblxuICAgICAgICBpZiAoaXNGb2N1c2VkWWVhclZpc2libGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmb2N1c2VkID09PSBpdGVtLnllYXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpZiB0aGVyZSBpcyBubyBmb2N1c2FibGUgeWVhciB0aGVuIGNoZWNrIGlmIHRoZXJlIGlzIGEgc2VsZWN0ZWQgeWVhclxuICAgIGNvbnN0IGlzU2VsZWN0ZWRZZWFyVmlzaWJsZSA9ICEhZ3JpZC5maW5kKHJvdyA9PiAhIXJvdy5maW5kKHllYXIgPT4geWVhci5pc0FjdGl2ZVllYXIpKTtcblxuICAgIGlmIChpc1NlbGVjdGVkWWVhclZpc2libGUpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0uaXNBY3RpdmVZZWFyO1xuICAgIH1cblxuICAgIC8vIG90aGVyd2lzZSBtYWtlIHRoZSBmaXJzdCBtb250aCB0YWJiYWJsZVxuICAgIHJldHVybiBncmlkWzBdWzBdLnllYXIgPT09IGl0ZW0ueWVhcjtcbn1cblxufVxuIl19