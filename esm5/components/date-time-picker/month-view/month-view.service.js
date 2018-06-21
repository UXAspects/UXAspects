/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DateTimePickerService, ModeDirection } from '../date-time-picker.service';
import { gridify, monthsShort, range } from '../date-time-picker.utils';
var MonthViewService = (function () {
    function MonthViewService(_datepicker) {
        var _this = this;
        this._datepicker = _datepicker;
        this.grid$ = new BehaviorSubject([[]]);
        this.focused$ = new BehaviorSubject(null);
        this._subscription = _datepicker.year$.subscribe(function (year) { return _this.createMonthGrid(year); });
    }
    /**
     * @return {?}
     */
    MonthViewService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    MonthViewService.prototype.setFocus = /**
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    function (month, year) {
        this.focused$.next({ month: month, year: year });
        // update the viewport to ensure focused month is visible
        this._datepicker.setViewportYear(year);
    };
    /**
     * @param {?} year
     * @return {?}
     */
    MonthViewService.prototype.createMonthGrid = /**
     * @param {?} year
     * @return {?}
     */
    function (year) {
        // update the header
        this._datepicker.setHeader(year.toString());
        // get the current year and month
        var /** @type {?} */ currentMonth = new Date().getMonth();
        var /** @type {?} */ currentYear = new Date().getFullYear();
        // get the currently selected month
        var /** @type {?} */ activeMonth = this._datepicker.selected$.value.getMonth();
        var /** @type {?} */ activeYear = this._datepicker.selected$.value.getFullYear();
        // create a 4x3 grid of month numbers
        var /** @type {?} */ months = range(0, 11).map(function (month) {
            return {
                name: monthsShort[month],
                month: month,
                year: year,
                isCurrentMonth: year === currentYear && month === currentMonth,
                isActiveMonth: year === activeYear && month === activeMonth
            };
        });
        // map these to the appropriate format
        var /** @type {?} */ items = gridify(months, 4);
        // update the grid
        this.grid$.next(items);
        // if there is no focused month select the first one
        if (this._datepicker.modeDirection === ModeDirection.Descend && this.focused$.value === null) {
            // check if the selected month is in view
            var /** @type {?} */ selectedMonth = months.find(function (month) { return month.isActiveMonth; });
            this.setFocus(selectedMonth ? selectedMonth.month : 0, year);
        }
    };
    MonthViewService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MonthViewService.ctorParameters = function () { return [
        { type: DateTimePickerService, },
    ]; };
    return MonthViewService;
}());
export { MonthViewService };
function MonthViewService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MonthViewService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MonthViewService.ctorParameters;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtdmlldy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGF0ZS10aW1lLXBpY2tlci9tb250aC12aWV3L21vbnRoLXZpZXcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFdkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ25GLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLDJCQUEyQixDQUFDOztJQVVwRSwwQkFBb0IsV0FBa0M7UUFBdEQsaUJBRUM7UUFGbUIsZ0JBQVcsR0FBWCxXQUFXLENBQXVCO3FCQUw5QyxJQUFJLGVBQWUsQ0FBb0IsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDekMsSUFBSSxlQUFlLENBQW1CLElBQUksQ0FBQztRQUtsRCxJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFDO0tBQ3hGOzs7O0lBRUQsc0NBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwQzs7Ozs7O0lBRUQsbUNBQVE7Ozs7O0lBQVIsVUFBUyxLQUFhLEVBQUUsSUFBWTtRQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7O1FBR2pELElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzFDOzs7OztJQUVPLDBDQUFlOzs7O2NBQUMsSUFBWTs7UUFHaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7O1FBRzVDLHFCQUFNLFlBQVksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzNDLHFCQUFNLFdBQVcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDOztRQUc3QyxxQkFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hFLHFCQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7O1FBR2xFLHFCQUFNLE1BQU0sR0FBb0IsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxLQUFLO1lBQ2xELE1BQU0sQ0FBQztnQkFDSCxJQUFJLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQztnQkFDeEIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osSUFBSSxFQUFFLElBQUk7Z0JBQ1YsY0FBYyxFQUFFLElBQUksS0FBSyxXQUFXLElBQUksS0FBSyxLQUFLLFlBQVk7Z0JBQzlELGFBQWEsRUFBRSxJQUFJLEtBQUssVUFBVSxJQUFJLEtBQUssS0FBSyxXQUFXO2FBQzlELENBQUM7U0FDTCxDQUFDLENBQUM7O1FBR0gscUJBQU0sS0FBSyxHQUFzQixPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDOztRQUdwRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7UUFHdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEtBQUssYUFBYSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDOztZQUczRixxQkFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxhQUFhLEVBQW5CLENBQW1CLENBQUMsQ0FBQztZQUVoRSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNoRTs7O2dCQTVEUixVQUFVOzs7O2dCQUhGLHFCQUFxQjs7MkJBSDlCOztTQU9hLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgRGF0ZVRpbWVQaWNrZXJTZXJ2aWNlLCBNb2RlRGlyZWN0aW9uIH0gZnJvbSAnLi4vZGF0ZS10aW1lLXBpY2tlci5zZXJ2aWNlJztcbmltcG9ydCB7IGdyaWRpZnksIG1vbnRoc1Nob3J0LCByYW5nZSB9IGZyb20gJy4uL2RhdGUtdGltZS1waWNrZXIudXRpbHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9udGhWaWV3U2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBncmlkJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TW9udGhWaWV3SXRlbVtdW10+KFtbXV0pO1xuICAgIGZvY3VzZWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxGb2N1c2VkTW9udGhJdGVtPihudWxsKTtcblxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZGF0ZXBpY2tlcjogRGF0ZVRpbWVQaWNrZXJTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IF9kYXRlcGlja2VyLnllYXIkLnN1YnNjcmliZSh5ZWFyID0+IHRoaXMuY3JlYXRlTW9udGhHcmlkKHllYXIpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgc2V0Rm9jdXMobW9udGg6IG51bWJlciwgeWVhcjogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCQubmV4dCh7IG1vbnRoOiBtb250aCwgeWVhcjogeWVhciB9KTtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIHZpZXdwb3J0IHRvIGVuc3VyZSBmb2N1c2VkIG1vbnRoIGlzIHZpc2libGVcbiAgICAgICAgdGhpcy5fZGF0ZXBpY2tlci5zZXRWaWV3cG9ydFllYXIoeWVhcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVNb250aEdyaWQoeWVhcjogbnVtYmVyKTogdm9pZCB7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBoZWFkZXJcbiAgICAgICAgdGhpcy5fZGF0ZXBpY2tlci5zZXRIZWFkZXIoeWVhci50b1N0cmluZygpKTtcblxuICAgICAgICAvLyBnZXQgdGhlIGN1cnJlbnQgeWVhciBhbmQgbW9udGhcbiAgICAgICAgY29uc3QgY3VycmVudE1vbnRoID0gbmV3IERhdGUoKS5nZXRNb250aCgpO1xuICAgICAgICBjb25zdCBjdXJyZW50WWVhciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcblxuICAgICAgICAvLyBnZXQgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBtb250aFxuICAgICAgICBjb25zdCBhY3RpdmVNb250aCA9IHRoaXMuX2RhdGVwaWNrZXIuc2VsZWN0ZWQkLnZhbHVlLmdldE1vbnRoKCk7XG4gICAgICAgIGNvbnN0IGFjdGl2ZVllYXIgPSB0aGlzLl9kYXRlcGlja2VyLnNlbGVjdGVkJC52YWx1ZS5nZXRGdWxsWWVhcigpO1xuXG4gICAgICAgIC8vIGNyZWF0ZSBhIDR4MyBncmlkIG9mIG1vbnRoIG51bWJlcnNcbiAgICAgICAgY29uc3QgbW9udGhzOiBNb250aFZpZXdJdGVtW10gPSByYW5nZSgwLCAxMSkubWFwKG1vbnRoID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbmFtZTogbW9udGhzU2hvcnRbbW9udGhdLFxuICAgICAgICAgICAgICAgIG1vbnRoOiBtb250aCxcbiAgICAgICAgICAgICAgICB5ZWFyOiB5ZWFyLFxuICAgICAgICAgICAgICAgIGlzQ3VycmVudE1vbnRoOiB5ZWFyID09PSBjdXJyZW50WWVhciAmJiBtb250aCA9PT0gY3VycmVudE1vbnRoLFxuICAgICAgICAgICAgICAgIGlzQWN0aXZlTW9udGg6IHllYXIgPT09IGFjdGl2ZVllYXIgJiYgbW9udGggPT09IGFjdGl2ZU1vbnRoXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBtYXAgdGhlc2UgdG8gdGhlIGFwcHJvcHJpYXRlIGZvcm1hdFxuICAgICAgICBjb25zdCBpdGVtczogTW9udGhWaWV3SXRlbVtdW10gPSBncmlkaWZ5KG1vbnRocywgNCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBncmlkXG4gICAgICAgIHRoaXMuZ3JpZCQubmV4dChpdGVtcyk7XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgaXMgbm8gZm9jdXNlZCBtb250aCBzZWxlY3QgdGhlIGZpcnN0IG9uZVxuICAgICAgICBpZiAodGhpcy5fZGF0ZXBpY2tlci5tb2RlRGlyZWN0aW9uID09PSBNb2RlRGlyZWN0aW9uLkRlc2NlbmQgJiYgdGhpcy5mb2N1c2VkJC52YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgc2VsZWN0ZWQgbW9udGggaXMgaW4gdmlld1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRNb250aCA9IG1vbnRocy5maW5kKG1vbnRoID0+IG1vbnRoLmlzQWN0aXZlTW9udGgpO1xuXG4gICAgICAgICAgICB0aGlzLnNldEZvY3VzKHNlbGVjdGVkTW9udGggPyBzZWxlY3RlZE1vbnRoLm1vbnRoIDogMCwgeWVhcik7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9udGhWaWV3SXRlbSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIG1vbnRoOiBudW1iZXI7XG4gICAgeWVhcjogbnVtYmVyO1xuICAgIGlzQ3VycmVudE1vbnRoOiBib29sZWFuO1xuICAgIGlzQWN0aXZlTW9udGg6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9jdXNlZE1vbnRoSXRlbSB7XG4gICAgbW9udGg6IG51bWJlcjtcbiAgICB5ZWFyOiBudW1iZXI7XG59Il19