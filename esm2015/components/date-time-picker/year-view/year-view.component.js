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
                template: "<div class=\"calendar\" role=\"grid\">\n  <div class=\"calendar-row\" role=\"row\" *ngFor=\"let row of yearService.grid$ | async; trackBy: trackRowByFn\">\n\n    <button *ngFor=\"let item of row; trackBy: trackYearByFn\"\n         role=\"gridcell\"\n         class=\"calendar-item\"\n         [focusIf]=\"(yearService.focused$ | async) === item.year\"\n         [attr.aria-label]=\"item.year\"\n         [attr.aria-selected]=\"item.isActiveYear\"\n         [class.current]=\"item.isCurrentYear\"\n         [class.active]=\"item.isActiveYear\"\n         (click)=\"select(item.year); $event.stopPropagation()\"\n         (keydown.ArrowLeft)=\"focusYear(item, -1); $event.preventDefault()\"\n         (keydown.ArrowRight)=\"focusYear(item, 1); $event.preventDefault()\"\n         (keydown.ArrowUp)=\"focusYear(item, -4); $event.preventDefault()\"\n         (keydown.ArrowDown)=\"focusYear(item, 4); $event.preventDefault()\"\n         [tabindex]=\"getTabbable(item) ? 0 : -1\">\n         {{ item.year }}\n    </button>\n  </div>\n</div>\n",
                providers: [YearViewService],
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
YearViewComponent.ctorParameters = () => [
    { type: DateTimePickerService },
    { type: YearViewService }
];
function YearViewComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    YearViewComponent.prototype._datePicker;
    /** @type {?} */
    YearViewComponent.prototype.yearService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVhci12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIveWVhci12aWV3L3llYXItdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDcEUsT0FBTyxFQUFnQixlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQVFwRSxNQUFNOzs7OztJQUVKLFlBQW9CLFdBQWtDLEVBQVMsV0FBNEI7UUFBdkUsZ0JBQVcsR0FBWCxXQUFXLENBQXVCO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQWlCO0tBQUk7Ozs7O0lBRS9GLE1BQU0sQ0FBQyxJQUFZO1FBQ2pCLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDOztRQUd2QyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFDO0tBQ2xDOzs7Ozs7SUFFRCxTQUFTLENBQUMsSUFBa0IsRUFBRSxVQUFrQjtRQUM5QyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxDQUFDO0tBQ25EOzs7OztJQUVELFlBQVksQ0FBQyxLQUFhO1FBQ3hCLE1BQU0sQ0FBQyxLQUFLLENBQUM7S0FDZDs7Ozs7O0lBRUQsYUFBYSxDQUFDLEtBQWEsRUFBRSxJQUFrQjtRQUM3QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztLQUNsQjs7Ozs7SUFFRCxXQUFXLENBQUMsSUFBa0I7UUFDNUIsdUJBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUNoRCx1QkFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDOztRQUcxQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOztZQUdWLHVCQUFNLG9CQUFvQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFFN0YsRUFBRSxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixNQUFNLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDaEM7U0FDSjs7UUFHRCx1QkFBTSxxQkFBcUIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFFeEYsRUFBRSxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQzVCOztRQUdELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUM7S0FDeEM7OztZQXJEQSxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLCtCQUErQjtnQkFDekMsdWhDQUF5QztnQkFDekMsU0FBUyxFQUFFLENBQUMsZUFBZSxDQUFDO2dCQUM1QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7OztZQVJRLHFCQUFxQjtZQUNQLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRlVGltZVBpY2tlclNlcnZpY2UgfSBmcm9tICcuLi9kYXRlLXRpbWUtcGlja2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgWWVhclZpZXdJdGVtLCBZZWFyVmlld1NlcnZpY2UgfSBmcm9tICcuL3llYXItdmlldy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndXgtZGF0ZS10aW1lLXBpY2tlci15ZWFyLXZpZXcnLFxuICB0ZW1wbGF0ZVVybDogJy4veWVhci12aWV3LmNvbXBvbmVudC5odG1sJyxcbiAgcHJvdmlkZXJzOiBbWWVhclZpZXdTZXJ2aWNlXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgWWVhclZpZXdDb21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2RhdGVQaWNrZXI6IERhdGVUaW1lUGlja2VyU2VydmljZSwgcHVibGljIHllYXJTZXJ2aWNlOiBZZWFyVmlld1NlcnZpY2UpIHt9XG5cbiAgc2VsZWN0KHllYXI6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2RhdGVQaWNrZXIuc2V0Vmlld3BvcnRZZWFyKHllYXIpO1xuXG4gICAgLy8gc2hvdyB0aGUgbW9udGggcGlja2VyXG4gICAgdGhpcy5fZGF0ZVBpY2tlci5nb1RvQ2hpbGRNb2RlKCk7XG4gIH1cblxuICBmb2N1c1llYXIoaXRlbTogWWVhclZpZXdJdGVtLCB5ZWFyT2Zmc2V0OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnllYXJTZXJ2aWNlLnNldEZvY3VzKGl0ZW0ueWVhciArIHllYXJPZmZzZXQpO1xuICB9XG5cbiAgdHJhY2tSb3dCeUZuKGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG4gIHRyYWNrWWVhckJ5Rm4oaW5kZXg6IG51bWJlciwgaXRlbTogWWVhclZpZXdJdGVtKTogbnVtYmVyIHtcbiAgICByZXR1cm4gaXRlbS55ZWFyO1xuICB9XG5cbiAgZ2V0VGFiYmFibGUoaXRlbTogWWVhclZpZXdJdGVtKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZm9jdXNlZCA9IHRoaXMueWVhclNlcnZpY2UuZm9jdXNlZCQudmFsdWU7XG4gICAgY29uc3QgZ3JpZCA9IHRoaXMueWVhclNlcnZpY2UuZ3JpZCQudmFsdWU7XG5cbiAgICAvLyBpZiB0aGVyZSBpcyBhIGZvY3VzZWQgeWVhciBjaGVjayBpZiB0aGlzIGlzIGl0XG4gICAgaWYgKGZvY3VzZWQpIHtcblxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgZm9jdXNlZCB5ZWFyIGlzIHZpc2libGVcbiAgICAgICAgY29uc3QgaXNGb2N1c2VkWWVhclZpc2libGUgPSAhIWdyaWQuZmluZChyb3cgPT4gISFyb3cuZmluZChfaXRlbSA9PiBfaXRlbS55ZWFyID09PSBmb2N1c2VkKSk7XG5cbiAgICAgICAgaWYgKGlzRm9jdXNlZFllYXJWaXNpYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gZm9jdXNlZCA9PT0gaXRlbS55ZWFyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gaWYgdGhlcmUgaXMgbm8gZm9jdXNhYmxlIHllYXIgdGhlbiBjaGVjayBpZiB0aGVyZSBpcyBhIHNlbGVjdGVkIHllYXJcbiAgICBjb25zdCBpc1NlbGVjdGVkWWVhclZpc2libGUgPSAhIWdyaWQuZmluZChyb3cgPT4gISFyb3cuZmluZCh5ZWFyID0+IHllYXIuaXNBY3RpdmVZZWFyKSk7XG5cbiAgICBpZiAoaXNTZWxlY3RlZFllYXJWaXNpYmxlKSB7XG4gICAgICAgIHJldHVybiBpdGVtLmlzQWN0aXZlWWVhcjtcbiAgICB9XG5cbiAgICAvLyBvdGhlcndpc2UgbWFrZSB0aGUgZmlyc3QgbW9udGggdGFiYmFibGVcbiAgICByZXR1cm4gZ3JpZFswXVswXS55ZWFyID09PSBpdGVtLnllYXI7XG59XG5cbn1cbiJdfQ==