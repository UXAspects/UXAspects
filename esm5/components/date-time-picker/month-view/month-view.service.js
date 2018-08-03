/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DateTimePickerService, ModeDirection } from '../date-time-picker.service';
import { gridify, monthsShort, range } from '../date-time-picker.utils';
var MonthViewService = /** @class */ (function () {
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
        { type: Injectable }
    ];
    /** @nocollapse */
    MonthViewService.ctorParameters = function () { return [
        { type: DateTimePickerService }
    ]; };
    return MonthViewService;
}());
export { MonthViewService };
function MonthViewService_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtdmlldy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGF0ZS10aW1lLXBpY2tlci9tb250aC12aWV3L21vbnRoLXZpZXcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFdkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ25GLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLDJCQUEyQixDQUFDOztJQVVwRSwwQkFBb0IsV0FBa0M7UUFBdEQsaUJBRUM7UUFGbUIsZ0JBQVcsR0FBWCxXQUFXLENBQXVCO3FCQUw5QyxJQUFJLGVBQWUsQ0FBb0IsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDekMsSUFBSSxlQUFlLENBQW1CLElBQUksQ0FBQztRQUtsRCxJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFDO0tBQ3hGOzs7O0lBRUQsc0NBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwQzs7Ozs7O0lBRUQsbUNBQVE7Ozs7O0lBQVIsVUFBUyxLQUFhLEVBQUUsSUFBWTtRQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7O1FBR2pELElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzFDOzs7OztJQUVPLDBDQUFlOzs7O2NBQUMsSUFBWTs7UUFHaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7O1FBRzVDLHFCQUFNLFlBQVksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzNDLHFCQUFNLFdBQVcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDOztRQUc3QyxxQkFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hFLHFCQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7O1FBR2xFLHFCQUFNLE1BQU0sR0FBb0IsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxLQUFLO1lBQ2xELE1BQU0sQ0FBQztnQkFDSCxJQUFJLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQztnQkFDeEIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osSUFBSSxFQUFFLElBQUk7Z0JBQ1YsY0FBYyxFQUFFLElBQUksS0FBSyxXQUFXLElBQUksS0FBSyxLQUFLLFlBQVk7Z0JBQzlELGFBQWEsRUFBRSxJQUFJLEtBQUssVUFBVSxJQUFJLEtBQUssS0FBSyxXQUFXO2FBQzlELENBQUM7U0FDTCxDQUFDLENBQUM7O1FBR0gscUJBQU0sS0FBSyxHQUFzQixPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDOztRQUdwRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7UUFHdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEtBQUssYUFBYSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDOztZQUczRixxQkFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxhQUFhLEVBQW5CLENBQW1CLENBQUMsQ0FBQztZQUVoRSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ2hFOzs7Z0JBNURSLFVBQVU7Ozs7Z0JBSEYscUJBQXFCOzsyQkFIOUI7O1NBT2EsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBEYXRlVGltZVBpY2tlclNlcnZpY2UsIE1vZGVEaXJlY3Rpb24gfSBmcm9tICcuLi9kYXRlLXRpbWUtcGlja2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgZ3JpZGlmeSwgbW9udGhzU2hvcnQsIHJhbmdlIH0gZnJvbSAnLi4vZGF0ZS10aW1lLXBpY2tlci51dGlscyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNb250aFZpZXdTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIGdyaWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNb250aFZpZXdJdGVtW11bXT4oW1tdXSk7XG4gICAgZm9jdXNlZCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEZvY3VzZWRNb250aEl0ZW0+KG51bGwpO1xuXG4gICAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9kYXRlcGlja2VyOiBEYXRlVGltZVBpY2tlclNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gX2RhdGVwaWNrZXIueWVhciQuc3Vic2NyaWJlKHllYXIgPT4gdGhpcy5jcmVhdGVNb250aEdyaWQoeWVhcikpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBzZXRGb2N1cyhtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkJC5uZXh0KHsgbW9udGg6IG1vbnRoLCB5ZWFyOiB5ZWFyIH0pO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgdmlld3BvcnQgdG8gZW5zdXJlIGZvY3VzZWQgbW9udGggaXMgdmlzaWJsZVxuICAgICAgICB0aGlzLl9kYXRlcGlja2VyLnNldFZpZXdwb3J0WWVhcih5ZWFyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZU1vbnRoR3JpZCh5ZWFyOiBudW1iZXIpOiB2b2lkIHtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIGhlYWRlclxuICAgICAgICB0aGlzLl9kYXRlcGlja2VyLnNldEhlYWRlcih5ZWFyLnRvU3RyaW5nKCkpO1xuXG4gICAgICAgIC8vIGdldCB0aGUgY3VycmVudCB5ZWFyIGFuZCBtb250aFxuICAgICAgICBjb25zdCBjdXJyZW50TW9udGggPSBuZXcgRGF0ZSgpLmdldE1vbnRoKCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRZZWFyID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xuXG4gICAgICAgIC8vIGdldCB0aGUgY3VycmVudGx5IHNlbGVjdGVkIG1vbnRoXG4gICAgICAgIGNvbnN0IGFjdGl2ZU1vbnRoID0gdGhpcy5fZGF0ZXBpY2tlci5zZWxlY3RlZCQudmFsdWUuZ2V0TW9udGgoKTtcbiAgICAgICAgY29uc3QgYWN0aXZlWWVhciA9IHRoaXMuX2RhdGVwaWNrZXIuc2VsZWN0ZWQkLnZhbHVlLmdldEZ1bGxZZWFyKCk7XG5cbiAgICAgICAgLy8gY3JlYXRlIGEgNHgzIGdyaWQgb2YgbW9udGggbnVtYmVyc1xuICAgICAgICBjb25zdCBtb250aHM6IE1vbnRoVmlld0l0ZW1bXSA9IHJhbmdlKDAsIDExKS5tYXAobW9udGggPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBtb250aHNTaG9ydFttb250aF0sXG4gICAgICAgICAgICAgICAgbW9udGg6IG1vbnRoLFxuICAgICAgICAgICAgICAgIHllYXI6IHllYXIsXG4gICAgICAgICAgICAgICAgaXNDdXJyZW50TW9udGg6IHllYXIgPT09IGN1cnJlbnRZZWFyICYmIG1vbnRoID09PSBjdXJyZW50TW9udGgsXG4gICAgICAgICAgICAgICAgaXNBY3RpdmVNb250aDogeWVhciA9PT0gYWN0aXZlWWVhciAmJiBtb250aCA9PT0gYWN0aXZlTW9udGhcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIG1hcCB0aGVzZSB0byB0aGUgYXBwcm9wcmlhdGUgZm9ybWF0XG4gICAgICAgIGNvbnN0IGl0ZW1zOiBNb250aFZpZXdJdGVtW11bXSA9IGdyaWRpZnkobW9udGhzLCA0KTtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIGdyaWRcbiAgICAgICAgdGhpcy5ncmlkJC5uZXh0KGl0ZW1zKTtcblxuICAgICAgICAvLyBpZiB0aGVyZSBpcyBubyBmb2N1c2VkIG1vbnRoIHNlbGVjdCB0aGUgZmlyc3Qgb25lXG4gICAgICAgIGlmICh0aGlzLl9kYXRlcGlja2VyLm1vZGVEaXJlY3Rpb24gPT09IE1vZGVEaXJlY3Rpb24uRGVzY2VuZCAmJiB0aGlzLmZvY3VzZWQkLnZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBzZWxlY3RlZCBtb250aCBpcyBpbiB2aWV3XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZE1vbnRoID0gbW9udGhzLmZpbmQobW9udGggPT4gbW9udGguaXNBY3RpdmVNb250aCk7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXMoc2VsZWN0ZWRNb250aCA/IHNlbGVjdGVkTW9udGgubW9udGggOiAwLCB5ZWFyKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBNb250aFZpZXdJdGVtIHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgbW9udGg6IG51bWJlcjtcbiAgICB5ZWFyOiBudW1iZXI7XG4gICAgaXNDdXJyZW50TW9udGg6IGJvb2xlYW47XG4gICAgaXNBY3RpdmVNb250aDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGb2N1c2VkTW9udGhJdGVtIHtcbiAgICBtb250aDogbnVtYmVyO1xuICAgIHllYXI6IG51bWJlcjtcbn0iXX0=