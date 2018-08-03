/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DateTimePickerService } from '../date-time-picker.service';
import { YearViewService } from './year-view.service';
var YearViewComponent = /** @class */ (function () {
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
                }] }
    ];
    /** @nocollapse */
    YearViewComponent.ctorParameters = function () { return [
        { type: DateTimePickerService },
        { type: YearViewService }
    ]; };
    return YearViewComponent;
}());
export { YearViewComponent };
function YearViewComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    YearViewComponent.prototype._datePicker;
    /** @type {?} */
    YearViewComponent.prototype.yearService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVhci12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIveWVhci12aWV3L3llYXItdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDcEUsT0FBTyxFQUFnQixlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7SUFVbEUsMkJBQW9CLFdBQWtDLEVBQVMsV0FBNEI7UUFBdkUsZ0JBQVcsR0FBWCxXQUFXLENBQXVCO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQWlCO0tBQUk7Ozs7O0lBRS9GLGtDQUFNOzs7O0lBQU4sVUFBTyxJQUFZO1FBQ2pCLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDOztRQUd2QyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFDO0tBQ2xDOzs7Ozs7SUFFRCxxQ0FBUzs7Ozs7SUFBVCxVQUFVLElBQWtCLEVBQUUsVUFBa0I7UUFDOUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsQ0FBQztLQUNuRDs7Ozs7SUFFRCx3Q0FBWTs7OztJQUFaLFVBQWEsS0FBYTtRQUN4QixNQUFNLENBQUMsS0FBSyxDQUFDO0tBQ2Q7Ozs7OztJQUVELHlDQUFhOzs7OztJQUFiLFVBQWMsS0FBYSxFQUFFLElBQWtCO1FBQzdDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0tBQ2xCOzs7OztJQUVELHVDQUFXOzs7O0lBQVgsVUFBWSxJQUFrQjtRQUM1QixxQkFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQ2hELHFCQUFNLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7O1FBRzFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7O1lBR1YscUJBQU0sb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUF0QixDQUFzQixDQUFDLEVBQTNDLENBQTJDLENBQUMsQ0FBQztZQUU3RixFQUFFLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLE1BQU0sQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQzthQUNoQztTQUNKOztRQUdELHFCQUFNLHFCQUFxQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsWUFBWSxFQUFqQixDQUFpQixDQUFDLEVBQXJDLENBQXFDLENBQUMsQ0FBQztRQUV4RixFQUFFLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7WUFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7U0FDNUI7O1FBR0QsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQztLQUN4Qzs7Z0JBckRBLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsK0JBQStCO29CQUN6Qyx1aENBQXlDO29CQUN6QyxTQUFTLEVBQUUsQ0FBQyxlQUFlLENBQUM7b0JBQzVCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs7OztnQkFSUSxxQkFBcUI7Z0JBQ1AsZUFBZTs7NEJBRnRDOztTQVVhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGVUaW1lUGlja2VyU2VydmljZSB9IGZyb20gJy4uL2RhdGUtdGltZS1waWNrZXIuc2VydmljZSc7XG5pbXBvcnQgeyBZZWFyVmlld0l0ZW0sIFllYXJWaWV3U2VydmljZSB9IGZyb20gJy4veWVhci12aWV3LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd1eC1kYXRlLXRpbWUtcGlja2VyLXllYXItdmlldycsXG4gIHRlbXBsYXRlVXJsOiAnLi95ZWFyLXZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICBwcm92aWRlcnM6IFtZZWFyVmlld1NlcnZpY2VdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBZZWFyVmlld0NvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZGF0ZVBpY2tlcjogRGF0ZVRpbWVQaWNrZXJTZXJ2aWNlLCBwdWJsaWMgeWVhclNlcnZpY2U6IFllYXJWaWV3U2VydmljZSkge31cblxuICBzZWxlY3QoeWVhcjogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fZGF0ZVBpY2tlci5zZXRWaWV3cG9ydFllYXIoeWVhcik7XG5cbiAgICAvLyBzaG93IHRoZSBtb250aCBwaWNrZXJcbiAgICB0aGlzLl9kYXRlUGlja2VyLmdvVG9DaGlsZE1vZGUoKTtcbiAgfVxuXG4gIGZvY3VzWWVhcihpdGVtOiBZZWFyVmlld0l0ZW0sIHllYXJPZmZzZXQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMueWVhclNlcnZpY2Uuc2V0Rm9jdXMoaXRlbS55ZWFyICsgeWVhck9mZnNldCk7XG4gIH1cblxuICB0cmFja1Jvd0J5Rm4oaW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG5cbiAgdHJhY2tZZWFyQnlGbihpbmRleDogbnVtYmVyLCBpdGVtOiBZZWFyVmlld0l0ZW0pOiBudW1iZXIge1xuICAgIHJldHVybiBpdGVtLnllYXI7XG4gIH1cblxuICBnZXRUYWJiYWJsZShpdGVtOiBZZWFyVmlld0l0ZW0pOiBib29sZWFuIHtcbiAgICBjb25zdCBmb2N1c2VkID0gdGhpcy55ZWFyU2VydmljZS5mb2N1c2VkJC52YWx1ZTtcbiAgICBjb25zdCBncmlkID0gdGhpcy55ZWFyU2VydmljZS5ncmlkJC52YWx1ZTtcblxuICAgIC8vIGlmIHRoZXJlIGlzIGEgZm9jdXNlZCB5ZWFyIGNoZWNrIGlmIHRoaXMgaXMgaXRcbiAgICBpZiAoZm9jdXNlZCkge1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSBmb2N1c2VkIHllYXIgaXMgdmlzaWJsZVxuICAgICAgICBjb25zdCBpc0ZvY3VzZWRZZWFyVmlzaWJsZSA9ICEhZ3JpZC5maW5kKHJvdyA9PiAhIXJvdy5maW5kKF9pdGVtID0+IF9pdGVtLnllYXIgPT09IGZvY3VzZWQpKTtcblxuICAgICAgICBpZiAoaXNGb2N1c2VkWWVhclZpc2libGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmb2N1c2VkID09PSBpdGVtLnllYXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpZiB0aGVyZSBpcyBubyBmb2N1c2FibGUgeWVhciB0aGVuIGNoZWNrIGlmIHRoZXJlIGlzIGEgc2VsZWN0ZWQgeWVhclxuICAgIGNvbnN0IGlzU2VsZWN0ZWRZZWFyVmlzaWJsZSA9ICEhZ3JpZC5maW5kKHJvdyA9PiAhIXJvdy5maW5kKHllYXIgPT4geWVhci5pc0FjdGl2ZVllYXIpKTtcblxuICAgIGlmIChpc1NlbGVjdGVkWWVhclZpc2libGUpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0uaXNBY3RpdmVZZWFyO1xuICAgIH1cblxuICAgIC8vIG90aGVyd2lzZSBtYWtlIHRoZSBmaXJzdCBtb250aCB0YWJiYWJsZVxuICAgIHJldHVybiBncmlkWzBdWzBdLnllYXIgPT09IGl0ZW0ueWVhcjtcbn1cblxufVxuIl19