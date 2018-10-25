/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DateTimePickerService, ModeDirection } from '../date-time-picker.service';
import { gridify, range } from '../date-time-picker.utils';
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
        var _this = this;
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
                name: _this._datepicker.monthsShort[month],
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtdmlldy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGF0ZS10aW1lLXBpY2tlci9tb250aC12aWV3L21vbnRoLXZpZXcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFdkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ25GLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0lBVXZELDBCQUFvQixXQUFrQztRQUF0RCxpQkFFQztRQUZtQixnQkFBVyxHQUFYLFdBQVcsQ0FBdUI7cUJBTDlDLElBQUksZUFBZSxDQUFvQixDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUN6QyxJQUFJLGVBQWUsQ0FBbUIsSUFBSSxDQUFDO1FBS2xELElBQUksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUExQixDQUEwQixDQUFDLENBQUM7S0FDeEY7Ozs7SUFFRCxzQ0FBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BDOzs7Ozs7SUFFRCxtQ0FBUTs7Ozs7SUFBUixVQUFTLEtBQWEsRUFBRSxJQUFZO1FBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzs7UUFHakQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDMUM7Ozs7O0lBRU8sMENBQWU7Ozs7Y0FBQyxJQUFZOzs7UUFHaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7O1FBRzVDLHFCQUFNLFlBQVksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzNDLHFCQUFNLFdBQVcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDOztRQUc3QyxxQkFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hFLHFCQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7O1FBR2xFLHFCQUFNLE1BQU0sR0FBb0IsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxLQUFLO1lBQ2xELE1BQU0sQ0FBQztnQkFDSCxJQUFJLEVBQUUsS0FBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO2dCQUN6QyxLQUFLLEVBQUUsS0FBSztnQkFDWixJQUFJLEVBQUUsSUFBSTtnQkFDVixjQUFjLEVBQUUsSUFBSSxLQUFLLFdBQVcsSUFBSSxLQUFLLEtBQUssWUFBWTtnQkFDOUQsYUFBYSxFQUFFLElBQUksS0FBSyxVQUFVLElBQUksS0FBSyxLQUFLLFdBQVc7YUFDOUQsQ0FBQztTQUNMLENBQUMsQ0FBQzs7UUFHSCxxQkFBTSxLQUFLLEdBQXNCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7O1FBR3BELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOztRQUd2QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsS0FBSyxhQUFhLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7O1lBRzNGLHFCQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLGFBQWEsRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDO1lBRWhFLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDaEU7OztnQkE1RFIsVUFBVTs7OztnQkFIRixxQkFBcUI7OzJCQUg5Qjs7U0FPYSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IERhdGVUaW1lUGlja2VyU2VydmljZSwgTW9kZURpcmVjdGlvbiB9IGZyb20gJy4uL2RhdGUtdGltZS1waWNrZXIuc2VydmljZSc7XG5pbXBvcnQgeyBncmlkaWZ5LCByYW5nZSB9IGZyb20gJy4uL2RhdGUtdGltZS1waWNrZXIudXRpbHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9udGhWaWV3U2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBncmlkJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TW9udGhWaWV3SXRlbVtdW10+KFtbXV0pO1xuICAgIGZvY3VzZWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxGb2N1c2VkTW9udGhJdGVtPihudWxsKTtcblxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZGF0ZXBpY2tlcjogRGF0ZVRpbWVQaWNrZXJTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IF9kYXRlcGlja2VyLnllYXIkLnN1YnNjcmliZSh5ZWFyID0+IHRoaXMuY3JlYXRlTW9udGhHcmlkKHllYXIpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgc2V0Rm9jdXMobW9udGg6IG51bWJlciwgeWVhcjogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCQubmV4dCh7IG1vbnRoOiBtb250aCwgeWVhcjogeWVhciB9KTtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIHZpZXdwb3J0IHRvIGVuc3VyZSBmb2N1c2VkIG1vbnRoIGlzIHZpc2libGVcbiAgICAgICAgdGhpcy5fZGF0ZXBpY2tlci5zZXRWaWV3cG9ydFllYXIoeWVhcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVNb250aEdyaWQoeWVhcjogbnVtYmVyKTogdm9pZCB7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBoZWFkZXJcbiAgICAgICAgdGhpcy5fZGF0ZXBpY2tlci5zZXRIZWFkZXIoeWVhci50b1N0cmluZygpKTtcblxuICAgICAgICAvLyBnZXQgdGhlIGN1cnJlbnQgeWVhciBhbmQgbW9udGhcbiAgICAgICAgY29uc3QgY3VycmVudE1vbnRoID0gbmV3IERhdGUoKS5nZXRNb250aCgpO1xuICAgICAgICBjb25zdCBjdXJyZW50WWVhciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcblxuICAgICAgICAvLyBnZXQgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBtb250aFxuICAgICAgICBjb25zdCBhY3RpdmVNb250aCA9IHRoaXMuX2RhdGVwaWNrZXIuc2VsZWN0ZWQkLnZhbHVlLmdldE1vbnRoKCk7XG4gICAgICAgIGNvbnN0IGFjdGl2ZVllYXIgPSB0aGlzLl9kYXRlcGlja2VyLnNlbGVjdGVkJC52YWx1ZS5nZXRGdWxsWWVhcigpO1xuXG4gICAgICAgIC8vIGNyZWF0ZSBhIDR4MyBncmlkIG9mIG1vbnRoIG51bWJlcnNcbiAgICAgICAgY29uc3QgbW9udGhzOiBNb250aFZpZXdJdGVtW10gPSByYW5nZSgwLCAxMSkubWFwKG1vbnRoID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbmFtZTogdGhpcy5fZGF0ZXBpY2tlci5tb250aHNTaG9ydFttb250aF0sXG4gICAgICAgICAgICAgICAgbW9udGg6IG1vbnRoLFxuICAgICAgICAgICAgICAgIHllYXI6IHllYXIsXG4gICAgICAgICAgICAgICAgaXNDdXJyZW50TW9udGg6IHllYXIgPT09IGN1cnJlbnRZZWFyICYmIG1vbnRoID09PSBjdXJyZW50TW9udGgsXG4gICAgICAgICAgICAgICAgaXNBY3RpdmVNb250aDogeWVhciA9PT0gYWN0aXZlWWVhciAmJiBtb250aCA9PT0gYWN0aXZlTW9udGhcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIG1hcCB0aGVzZSB0byB0aGUgYXBwcm9wcmlhdGUgZm9ybWF0XG4gICAgICAgIGNvbnN0IGl0ZW1zOiBNb250aFZpZXdJdGVtW11bXSA9IGdyaWRpZnkobW9udGhzLCA0KTtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIGdyaWRcbiAgICAgICAgdGhpcy5ncmlkJC5uZXh0KGl0ZW1zKTtcblxuICAgICAgICAvLyBpZiB0aGVyZSBpcyBubyBmb2N1c2VkIG1vbnRoIHNlbGVjdCB0aGUgZmlyc3Qgb25lXG4gICAgICAgIGlmICh0aGlzLl9kYXRlcGlja2VyLm1vZGVEaXJlY3Rpb24gPT09IE1vZGVEaXJlY3Rpb24uRGVzY2VuZCAmJiB0aGlzLmZvY3VzZWQkLnZhbHVlID09PSBudWxsKSB7XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBzZWxlY3RlZCBtb250aCBpcyBpbiB2aWV3XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZE1vbnRoID0gbW9udGhzLmZpbmQobW9udGggPT4gbW9udGguaXNBY3RpdmVNb250aCk7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXMoc2VsZWN0ZWRNb250aCA/IHNlbGVjdGVkTW9udGgubW9udGggOiAwLCB5ZWFyKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBNb250aFZpZXdJdGVtIHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgbW9udGg6IG51bWJlcjtcbiAgICB5ZWFyOiBudW1iZXI7XG4gICAgaXNDdXJyZW50TW9udGg6IGJvb2xlYW47XG4gICAgaXNBY3RpdmVNb250aDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGb2N1c2VkTW9udGhJdGVtIHtcbiAgICBtb250aDogbnVtYmVyO1xuICAgIHllYXI6IG51bWJlcjtcbn0iXX0=