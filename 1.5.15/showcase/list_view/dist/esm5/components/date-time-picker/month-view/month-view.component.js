/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DatePickerHeaderEvent, DateTimePickerService } from '../date-time-picker.service';
import { MonthViewService } from './month-view.service';
var MonthViewComponent = (function () {
    function MonthViewComponent(_datePicker, monthService) {
        var _this = this;
        this._datePicker = _datePicker;
        this.monthService = monthService;
        this._subscription = _datePicker.headerEvent$
            .subscribe(function (event) { return event === DatePickerHeaderEvent.Next ? _this.next() : _this.previous(); });
    }
    /**
     * @return {?}
     */
    MonthViewComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * Go to the previous year
     */
    /**
     * Go to the previous year
     * @return {?}
     */
    MonthViewComponent.prototype.previous = /**
     * Go to the previous year
     * @return {?}
     */
    function () {
        this._datePicker.setViewportYear(this._datePicker.year$.value - 1);
    };
    /**
     * Go to the next year
     */
    /**
     * Go to the next year
     * @return {?}
     */
    MonthViewComponent.prototype.next = /**
     * Go to the next year
     * @return {?}
     */
    function () {
        this._datePicker.setViewportYear(this._datePicker.year$.value + 1);
    };
    /**
     * Select a month in the calendar
     * @param month the index of the month to select
     */
    /**
     * Select a month in the calendar
     * @param {?} month the index of the month to select
     * @return {?}
     */
    MonthViewComponent.prototype.select = /**
     * Select a month in the calendar
     * @param {?} month the index of the month to select
     * @return {?}
     */
    function (month) {
        this._datePicker.setViewportMonth(month);
        // show the day picker
        this._datePicker.goToChildMode();
    };
    /**
     * @param {?} item
     * @param {?} monthOffset
     * @return {?}
     */
    MonthViewComponent.prototype.focusMonth = /**
     * @param {?} item
     * @param {?} monthOffset
     * @return {?}
     */
    function (item, monthOffset) {
        var /** @type {?} */ targetMonth = item.month + monthOffset;
        var /** @type {?} */ targetYear = item.year;
        if (targetMonth < 0) {
            targetMonth += 12;
            targetYear -= 1;
        }
        if (targetMonth >= 12) {
            targetMonth -= 12;
            targetYear += 1;
        }
        this.monthService.setFocus(targetMonth, targetYear);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    MonthViewComponent.prototype.trackRowByFn = /**
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
    MonthViewComponent.prototype.trackMonthByFn = /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    function (index, item) {
        return item.month + " " + item.year;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    MonthViewComponent.prototype.getTabbable = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var /** @type {?} */ focused = this.monthService.focused$.value;
        var /** @type {?} */ grid = this.monthService.grid$.value;
        // if there is a focused month check if this is it
        if (focused) {
            // check if the focused month is visible
            var /** @type {?} */ isFocusedMonthVisible = !!grid.find(function (row) { return !!row.find(function (_item) { return _item.month === focused.month && _item.year === focused.year; }); });
            if (isFocusedMonthVisible) {
                return focused.month === item.month && focused.year === item.year;
            }
        }
        // if there is no focusable month then check if there is a selected month
        var /** @type {?} */ isSelectedMonthVisible = !!grid.find(function (row) { return !!row.find(function (month) { return month.isActiveMonth; }); });
        if (isSelectedMonthVisible) {
            return item.isActiveMonth;
        }
        // otherwise make the first month tabbable
        return item.month === 0;
    };
    MonthViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-date-time-picker-month-view',
                    template: "<div class=\"calendar\" role=\"grid\">\n  <div class=\"calendar-row\" *ngFor=\"let row of monthService.grid$ | async; trackBy: trackRowByFn\" role=\"row\">\n\n    <button role=\"gridcell\"\n         class=\"calendar-item\"\n         *ngFor=\"let item of row; trackBy: trackMonthByFn\"\n         [focusIf]=\"(monthService.focused$ | async)?.month === item.month && (monthService.focused$ | async)?.year === item.year\"\n         [tabindex]=\"getTabbable(item) ? 0 : -1\"\n         [attr.aria-label]=\"item.name + ' ' + item.year\"\n         [attr.aria-selected]=\"item.isActiveMonth\"\n         [class.active]=\"item.isActiveMonth\"\n         [class.current]=\"item.isCurrentMonth\"\n         (click)=\"select(item.month); $event.stopPropagation()\"\n         (keydown.ArrowLeft)=\"focusMonth(item, -1); $event.preventDefault()\"\n         (keydown.ArrowRight)=\"focusMonth(item, 1); $event.preventDefault()\"\n         (keydown.ArrowUp)=\"focusMonth(item, -4); $event.preventDefault()\"\n         (keydown.ArrowDown)=\"focusMonth(item, 4); $event.preventDefault()\">\n         {{ item.name }}\n    </button>\n  </div>\n</div>\n",
                    providers: [MonthViewService],
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    MonthViewComponent.ctorParameters = function () { return [
        { type: DateTimePickerService, },
        { type: MonthViewService, },
    ]; };
    return MonthViewComponent;
}());
export { MonthViewComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL21vbnRoLXZpZXcvbW9udGgtdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFFOUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDM0YsT0FBTyxFQUFpQixnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDOztJQWlDbkUsNEJBQW9CLFdBQWtDLEVBQVMsWUFBOEI7UUFBN0YsaUJBR0M7UUFIbUIsZ0JBQVcsR0FBWCxXQUFXLENBQXVCO1FBQVMsaUJBQVksR0FBWixZQUFZLENBQWtCO1FBQ3pGLElBQUksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDLFlBQVk7YUFDeEMsU0FBUyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxLQUFLLHFCQUFxQixDQUFDLElBQUksR0FBRyxLQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsS0FBSSxDQUFDLFFBQVEsRUFBRSxFQUFwRSxDQUFvRSxDQUFDLENBQUM7S0FDakc7Ozs7SUFFRCx3Q0FBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gscUNBQVE7Ozs7SUFBUjtRQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztLQUN0RTtJQUVEOztPQUVHOzs7OztJQUNILGlDQUFJOzs7O0lBQUo7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJ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Q0FBQztvQkFDN0IsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2xEOzs7O2dCQTdCK0IscUJBQXFCO2dCQUM3QixnQkFBZ0I7OzZCQUh4Qzs7U0FnQ2Esa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBEYXRlUGlja2VySGVhZGVyRXZlbnQsIERhdGVUaW1lUGlja2VyU2VydmljZSB9IGZyb20gJy4uL2RhdGUtdGltZS1waWNrZXIuc2VydmljZSc7XG5pbXBvcnQgeyBNb250aFZpZXdJdGVtLCBNb250aFZpZXdTZXJ2aWNlIH0gZnJvbSAnLi9tb250aC12aWV3LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWRhdGUtdGltZS1waWNrZXItbW9udGgtdmlldycsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiY2FsZW5kYXJcIiByb2xlPVwiZ3JpZFwiPlxuICA8ZGl2IGNsYXNzPVwiY2FsZW5kYXItcm93XCIgKm5nRm9yPVwibGV0IHJvdyBvZiBtb250aFNlcnZpY2UuZ3JpZCQgfCBhc3luYzsgdHJhY2tCeTogdHJhY2tSb3dCeUZuXCIgcm9sZT1cInJvd1wiPlxuXG4gICAgPGJ1dHRvbiByb2xlPVwiZ3JpZGNlbGxcIlxuICAgICAgICAgY2xhc3M9XCJjYWxlbmRhci1pdGVtXCJcbiAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIHJvdzsgdHJhY2tCeTogdHJhY2tNb250aEJ5Rm5cIlxuICAgICAgICAgW2ZvY3VzSWZdPVwiKG1vbnRoU2VydmljZS5mb2N1c2VkJCB8IGFzeW5jKT8ubW9udGggPT09IGl0ZW0ubW9udGggJiYgKG1vbnRoU2VydmljZS5mb2N1c2VkJCB8IGFzeW5jKT8ueWVhciA9PT0gaXRlbS55ZWFyXCJcbiAgICAgICAgIFt0YWJpbmRleF09XCJnZXRUYWJiYWJsZShpdGVtKSA/IDAgOiAtMVwiXG4gICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIml0ZW0ubmFtZSArICcgJyArIGl0ZW0ueWVhclwiXG4gICAgICAgICBbYXR0ci5hcmlhLXNlbGVjdGVkXT1cIml0ZW0uaXNBY3RpdmVNb250aFwiXG4gICAgICAgICBbY2xhc3MuYWN0aXZlXT1cIml0ZW0uaXNBY3RpdmVNb250aFwiXG4gICAgICAgICBbY2xhc3MuY3VycmVudF09XCJpdGVtLmlzQ3VycmVudE1vbnRoXCJcbiAgICAgICAgIChjbGljayk9XCJzZWxlY3QoaXRlbS5tb250aCk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiXG4gICAgICAgICAoa2V5ZG93bi5BcnJvd0xlZnQpPVwiZm9jdXNNb250aChpdGVtLCAtMSk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCJcbiAgICAgICAgIChrZXlkb3duLkFycm93UmlnaHQpPVwiZm9jdXNNb250aChpdGVtLCAxKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIlxuICAgICAgICAgKGtleWRvd24uQXJyb3dVcCk9XCJmb2N1c01vbnRoKGl0ZW0sIC00KTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIlxuICAgICAgICAgKGtleWRvd24uQXJyb3dEb3duKT1cImZvY3VzTW9udGgoaXRlbSwgNCk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCI+XG4gICAgICAgICB7eyBpdGVtLm5hbWUgfX1cbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gICAgcHJvdmlkZXJzOiBbTW9udGhWaWV3U2VydmljZV0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTW9udGhWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZGF0ZVBpY2tlcjogRGF0ZVRpbWVQaWNrZXJTZXJ2aWNlLCBwdWJsaWMgbW9udGhTZXJ2aWNlOiBNb250aFZpZXdTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IF9kYXRlUGlja2VyLmhlYWRlckV2ZW50JFxuICAgICAgICAgICAgLnN1YnNjcmliZShldmVudCA9PiBldmVudCA9PT0gRGF0ZVBpY2tlckhlYWRlckV2ZW50Lk5leHQgPyB0aGlzLm5leHQoKSA6IHRoaXMucHJldmlvdXMoKSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdvIHRvIHRoZSBwcmV2aW91cyB5ZWFyXG4gICAgICovXG4gICAgcHJldmlvdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2RhdGVQaWNrZXIuc2V0Vmlld3BvcnRZZWFyKHRoaXMuX2RhdGVQaWNrZXIueWVhciQudmFsdWUgLSAxKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHbyB0byB0aGUgbmV4dCB5ZWFyXG4gICAgICovXG4gICAgbmV4dCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZGF0ZVBpY2tlci5zZXRWaWV3cG9ydFllYXIodGhpcy5fZGF0ZVBpY2tlci55ZWFyJC52YWx1ZSArIDEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbGVjdCBhIG1vbnRoIGluIHRoZSBjYWxlbmRhclxuICAgICAqIEBwYXJhbSBtb250aCB0aGUgaW5kZXggb2YgdGhlIG1vbnRoIHRvIHNlbGVjdFxuICAgICAqL1xuICAgIHNlbGVjdChtb250aDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2RhdGVQaWNrZXIuc2V0Vmlld3BvcnRNb250aChtb250aCk7XG5cbiAgICAgICAgLy8gc2hvdyB0aGUgZGF5IHBpY2tlclxuICAgICAgICB0aGlzLl9kYXRlUGlja2VyLmdvVG9DaGlsZE1vZGUoKTtcbiAgICB9XG5cbiAgICBmb2N1c01vbnRoKGl0ZW06IE1vbnRoVmlld0l0ZW0sIG1vbnRoT2Zmc2V0OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgbGV0IHRhcmdldE1vbnRoID0gaXRlbS5tb250aCArIG1vbnRoT2Zmc2V0O1xuICAgICAgICBsZXQgdGFyZ2V0WWVhciA9IGl0ZW0ueWVhcjtcblxuICAgICAgICBpZiAodGFyZ2V0TW9udGggPCAwKSB7XG4gICAgICAgICAgICB0YXJnZXRNb250aCArPSAxMjtcbiAgICAgICAgICAgIHRhcmdldFllYXIgLT0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0YXJnZXRNb250aCA+PSAxMikge1xuICAgICAgICAgICAgdGFyZ2V0TW9udGggLT0gMTI7XG4gICAgICAgICAgICB0YXJnZXRZZWFyICs9IDE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1vbnRoU2VydmljZS5zZXRGb2N1cyh0YXJnZXRNb250aCwgdGFyZ2V0WWVhcik7XG4gICAgfVxuXG4gICAgdHJhY2tSb3dCeUZuKGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuXG4gICAgdHJhY2tNb250aEJ5Rm4oaW5kZXg6IG51bWJlciwgaXRlbTogTW9udGhWaWV3SXRlbSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHtpdGVtLm1vbnRofSAke2l0ZW0ueWVhcn1gO1xuICAgIH1cblxuICAgIGdldFRhYmJhYmxlKGl0ZW06IE1vbnRoVmlld0l0ZW0pOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgZm9jdXNlZCA9IHRoaXMubW9udGhTZXJ2aWNlLmZvY3VzZWQkLnZhbHVlO1xuICAgICAgICBjb25zdCBncmlkID0gdGhpcy5tb250aFNlcnZpY2UuZ3JpZCQudmFsdWU7XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgaXMgYSBmb2N1c2VkIG1vbnRoIGNoZWNrIGlmIHRoaXMgaXMgaXRcbiAgICAgICAgaWYgKGZvY3VzZWQpIHtcblxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGZvY3VzZWQgbW9udGggaXMgdmlzaWJsZVxuICAgICAgICAgICAgY29uc3QgaXNGb2N1c2VkTW9udGhWaXNpYmxlID0gISFncmlkLmZpbmQocm93ID0+ICEhcm93LmZpbmQoX2l0ZW0gPT4gX2l0ZW0ubW9udGggPT09IGZvY3VzZWQubW9udGggJiYgX2l0ZW0ueWVhciA9PT0gZm9jdXNlZC55ZWFyKSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChpc0ZvY3VzZWRNb250aFZpc2libGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9jdXNlZC5tb250aCA9PT0gaXRlbS5tb250aCAmJiBmb2N1c2VkLnllYXIgPT09IGl0ZW0ueWVhcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIGZvY3VzYWJsZSBtb250aCB0aGVuIGNoZWNrIGlmIHRoZXJlIGlzIGEgc2VsZWN0ZWQgbW9udGhcbiAgICAgICAgY29uc3QgaXNTZWxlY3RlZE1vbnRoVmlzaWJsZSA9ICEhZ3JpZC5maW5kKHJvdyA9PiAhIXJvdy5maW5kKG1vbnRoID0+IG1vbnRoLmlzQWN0aXZlTW9udGgpKTtcblxuICAgICAgICBpZiAoaXNTZWxlY3RlZE1vbnRoVmlzaWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaXNBY3RpdmVNb250aDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG90aGVyd2lzZSBtYWtlIHRoZSBmaXJzdCBtb250aCB0YWJiYWJsZVxuICAgICAgICByZXR1cm4gaXRlbS5tb250aCA9PT0gMDtcbiAgICB9XG59Il19