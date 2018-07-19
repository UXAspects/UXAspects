/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DateTimePickerService } from '../date-time-picker.service';
import { YearViewService } from './year-view.service';
var YearViewComponent = (function () {
    function YearViewComponent(_datePicker, yearService) {
        this._datePicker = _datePicker;
        this.yearService = yearService;
    }
    /**
     * @param {?} year
     * @return {?}
     */
    YearViewComponent.prototype.select = /**
     * @param {?} year
     * @return {?}
     */
    function (year) {
        this._datePicker.setViewportYear(year);
        // show the month picker
        this._datePicker.goToChildMode();
    };
    /**
     * @param {?} item
     * @param {?} yearOffset
     * @return {?}
     */
    YearViewComponent.prototype.focusYear = /**
     * @param {?} item
     * @param {?} yearOffset
     * @return {?}
     */
    function (item, yearOffset) {
        this.yearService.setFocus(item.year + yearOffset);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    YearViewComponent.prototype.trackRowByFn = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return index;
    };
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    YearViewComponent.prototype.trackYearByFn = /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    function (index, item) {
        return item.year;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    YearViewComponent.prototype.getTabbable = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var /** @type {?} */ focused = this.yearService.focused$.value;
        var /** @type {?} */ grid = this.yearService.grid$.value;
        // if there is a focused year check if this is it
        if (focused) {
            // check if the focused year is visible
            var /** @type {?} */ isFocusedYearVisible = !!grid.find(function (row) { return !!row.find(function (_item) { return _item.year === focused; }); });
            if (isFocusedYearVisible) {
                return focused === item.year;
            }
        }
        // if there is no focusable year then check if there is a selected year
        var /** @type {?} */ isSelectedYearVisible = !!grid.find(function (row) { return !!row.find(function (year) { return year.isActiveYear; }); });
        if (isSelectedYearVisible) {
            return item.isActiveYear;
        }
        // otherwise make the first month tabbable
        return grid[0][0].year === item.year;
    };
    YearViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-date-time-picker-year-view',
                    template: "<div class=\"calendar\" role=\"grid\">\n  <div class=\"calendar-row\" role=\"row\" *ngFor=\"let row of yearService.grid$ | async; trackBy: trackRowByFn\">\n\n    <button *ngFor=\"let item of row; trackBy: trackYearByFn\"\n         role=\"gridcell\"\n         class=\"calendar-item\"\n         [focusIf]=\"(yearService.focused$ | async) === item.year\"\n         [attr.aria-label]=\"item.year\"\n         [attr.aria-selected]=\"item.isActiveYear\"\n         [class.current]=\"item.isCurrentYear\"\n         [class.active]=\"item.isActiveYear\"\n         (click)=\"select(item.year); $event.stopPropagation()\"\n         (keydown.ArrowLeft)=\"focusYear(item, -1); $event.preventDefault()\"\n         (keydown.ArrowRight)=\"focusYear(item, 1); $event.preventDefault()\"\n         (keydown.ArrowUp)=\"focusYear(item, -4); $event.preventDefault()\"\n         (keydown.ArrowDown)=\"focusYear(item, 4); $event.preventDefault()\"\n         [tabindex]=\"getTabbable(item) ? 0 : -1\">\n         {{ item.year }}\n    </button>\n  </div>\n</div>\n",
                    providers: [YearViewService],
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    YearViewComponent.ctorParameters = function () { return [
        { type: DateTimePickerService, },
        { type: YearViewService, },
    ]; };
    return YearViewComponent;
}());
export { YearViewComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVhci12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIveWVhci12aWV3L3llYXItdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDcEUsT0FBTyxFQUFnQixlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7SUErQmxFLDJCQUFvQixXQUFrQyxFQUFTLFdBQTRCO1FBQXZFLGdCQUFXLEdBQVgsV0FBVyxDQUF1QjtRQUFTLGdCQUFXLEdBQVgsV0FBVyxDQUFpQjtLQUFJOzs7OztJQUUvRixrQ0FBTTs7OztJQUFOLFVBQU8sSUFBWTtRQUNqQixJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7UUFHdkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztLQUNsQzs7Ozs7O0lBRUQscUNBQVM7Ozs7O0lBQVQsVUFBVSxJQUFrQixFQUFFLFVBQWtCO1FBQzlDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLENBQUM7S0FDbkQ7Ozs7O0lBRUQsd0NBQVk7Ozs7SUFBWixVQUFhLEtBQWE7UUFDeEIsTUFBTSxDQUFDLEtBQUssQ0FBQztLQUNkOzs7Ozs7SUFFRCx5Q0FBYTs7Ozs7SUFBYixVQUFjLEtBQWEsRUFBRSxJQUFrQjtRQUM3QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztLQUNsQjs7Ozs7SUFFRCx1Q0FBVzs7OztJQUFYLFVBQVksSUFBa0I7UUFDNUIscUJBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUNoRCxxQkFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDOztRQUcxQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOztZQUdWLHFCQUFNLG9CQUFvQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBdEIsQ0FBc0IsQ0FBQyxFQUEzQyxDQUEyQyxDQUFDLENBQUM7WUFFN0YsRUFBRSxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixNQUFNLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDaEM7U0FDSjs7UUFHRCxxQkFBTSxxQkFBcUIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLFlBQVksRUFBakIsQ0FBaUIsQ0FBQyxFQUFyQyxDQUFxQyxDQUFDLENBQUM7UUFFeEYsRUFBRSxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQzVCOztRQUdELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUM7S0FDeEM7O2dCQTFFQSxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLCtCQUErQjtvQkFDekMsUUFBUSxFQUFFLDZnQ0FxQlg7b0JBQ0MsU0FBUyxFQUFFLENBQUMsZUFBZSxDQUFDO29CQUM1QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7Ozs7Z0JBN0JRLHFCQUFxQjtnQkFDUCxlQUFlOzs0QkFGdEM7O1NBK0JhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGVUaW1lUGlja2VyU2VydmljZSB9IGZyb20gJy4uL2RhdGUtdGltZS1waWNrZXIuc2VydmljZSc7XG5pbXBvcnQgeyBZZWFyVmlld0l0ZW0sIFllYXJWaWV3U2VydmljZSB9IGZyb20gJy4veWVhci12aWV3LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd1eC1kYXRlLXRpbWUtcGlja2VyLXllYXItdmlldycsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImNhbGVuZGFyXCIgcm9sZT1cImdyaWRcIj5cbiAgPGRpdiBjbGFzcz1cImNhbGVuZGFyLXJvd1wiIHJvbGU9XCJyb3dcIiAqbmdGb3I9XCJsZXQgcm93IG9mIHllYXJTZXJ2aWNlLmdyaWQkIHwgYXN5bmM7IHRyYWNrQnk6IHRyYWNrUm93QnlGblwiPlxuXG4gICAgPGJ1dHRvbiAqbmdGb3I9XCJsZXQgaXRlbSBvZiByb3c7IHRyYWNrQnk6IHRyYWNrWWVhckJ5Rm5cIlxuICAgICAgICAgcm9sZT1cImdyaWRjZWxsXCJcbiAgICAgICAgIGNsYXNzPVwiY2FsZW5kYXItaXRlbVwiXG4gICAgICAgICBbZm9jdXNJZl09XCIoeWVhclNlcnZpY2UuZm9jdXNlZCQgfCBhc3luYykgPT09IGl0ZW0ueWVhclwiXG4gICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIml0ZW0ueWVhclwiXG4gICAgICAgICBbYXR0ci5hcmlhLXNlbGVjdGVkXT1cIml0ZW0uaXNBY3RpdmVZZWFyXCJcbiAgICAgICAgIFtjbGFzcy5jdXJyZW50XT1cIml0ZW0uaXNDdXJyZW50WWVhclwiXG4gICAgICAgICBbY2xhc3MuYWN0aXZlXT1cIml0ZW0uaXNBY3RpdmVZZWFyXCJcbiAgICAgICAgIChjbGljayk9XCJzZWxlY3QoaXRlbS55ZWFyKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCJcbiAgICAgICAgIChrZXlkb3duLkFycm93TGVmdCk9XCJmb2N1c1llYXIoaXRlbSwgLTEpOyAkZXZlbnQucHJldmVudERlZmF1bHQoKVwiXG4gICAgICAgICAoa2V5ZG93bi5BcnJvd1JpZ2h0KT1cImZvY3VzWWVhcihpdGVtLCAxKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIlxuICAgICAgICAgKGtleWRvd24uQXJyb3dVcCk9XCJmb2N1c1llYXIoaXRlbSwgLTQpOyAkZXZlbnQucHJldmVudERlZmF1bHQoKVwiXG4gICAgICAgICAoa2V5ZG93bi5BcnJvd0Rvd24pPVwiZm9jdXNZZWFyKGl0ZW0sIDQpOyAkZXZlbnQucHJldmVudERlZmF1bHQoKVwiXG4gICAgICAgICBbdGFiaW5kZXhdPVwiZ2V0VGFiYmFibGUoaXRlbSkgPyAwIDogLTFcIj5cbiAgICAgICAgIHt7IGl0ZW0ueWVhciB9fVxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgcHJvdmlkZXJzOiBbWWVhclZpZXdTZXJ2aWNlXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgWWVhclZpZXdDb21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2RhdGVQaWNrZXI6IERhdGVUaW1lUGlja2VyU2VydmljZSwgcHVibGljIHllYXJTZXJ2aWNlOiBZZWFyVmlld1NlcnZpY2UpIHt9XG5cbiAgc2VsZWN0KHllYXI6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2RhdGVQaWNrZXIuc2V0Vmlld3BvcnRZZWFyKHllYXIpO1xuXG4gICAgLy8gc2hvdyB0aGUgbW9udGggcGlja2VyXG4gICAgdGhpcy5fZGF0ZVBpY2tlci5nb1RvQ2hpbGRNb2RlKCk7XG4gIH1cblxuICBmb2N1c1llYXIoaXRlbTogWWVhclZpZXdJdGVtLCB5ZWFyT2Zmc2V0OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnllYXJTZXJ2aWNlLnNldEZvY3VzKGl0ZW0ueWVhciArIHllYXJPZmZzZXQpO1xuICB9XG5cbiAgdHJhY2tSb3dCeUZuKGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG4gIHRyYWNrWWVhckJ5Rm4oaW5kZXg6IG51bWJlciwgaXRlbTogWWVhclZpZXdJdGVtKTogbnVtYmVyIHtcbiAgICByZXR1cm4gaXRlbS55ZWFyO1xuICB9XG5cbiAgZ2V0VGFiYmFibGUoaXRlbTogWWVhclZpZXdJdGVtKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZm9jdXNlZCA9IHRoaXMueWVhclNlcnZpY2UuZm9jdXNlZCQudmFsdWU7XG4gICAgY29uc3QgZ3JpZCA9IHRoaXMueWVhclNlcnZpY2UuZ3JpZCQudmFsdWU7XG5cbiAgICAvLyBpZiB0aGVyZSBpcyBhIGZvY3VzZWQgeWVhciBjaGVjayBpZiB0aGlzIGlzIGl0XG4gICAgaWYgKGZvY3VzZWQpIHtcblxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgZm9jdXNlZCB5ZWFyIGlzIHZpc2libGVcbiAgICAgICAgY29uc3QgaXNGb2N1c2VkWWVhclZpc2libGUgPSAhIWdyaWQuZmluZChyb3cgPT4gISFyb3cuZmluZChfaXRlbSA9PiBfaXRlbS55ZWFyID09PSBmb2N1c2VkKSk7XG5cbiAgICAgICAgaWYgKGlzRm9jdXNlZFllYXJWaXNpYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gZm9jdXNlZCA9PT0gaXRlbS55ZWFyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gaWYgdGhlcmUgaXMgbm8gZm9jdXNhYmxlIHllYXIgdGhlbiBjaGVjayBpZiB0aGVyZSBpcyBhIHNlbGVjdGVkIHllYXJcbiAgICBjb25zdCBpc1NlbGVjdGVkWWVhclZpc2libGUgPSAhIWdyaWQuZmluZChyb3cgPT4gISFyb3cuZmluZCh5ZWFyID0+IHllYXIuaXNBY3RpdmVZZWFyKSk7XG5cbiAgICBpZiAoaXNTZWxlY3RlZFllYXJWaXNpYmxlKSB7XG4gICAgICAgIHJldHVybiBpdGVtLmlzQWN0aXZlWWVhcjtcbiAgICB9XG5cbiAgICAvLyBvdGhlcndpc2UgbWFrZSB0aGUgZmlyc3QgbW9udGggdGFiYmFibGVcbiAgICByZXR1cm4gZ3JpZFswXVswXS55ZWFyID09PSBpdGVtLnllYXI7XG59XG5cbn1cbiJdfQ==