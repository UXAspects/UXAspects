/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { DatePickerHeaderEvent, DateTimePickerService } from '../date-time-picker.service';
import { gridify, range } from '../date-time-picker.utils';
var YearViewService = (function () {
    function YearViewService(_datepicker) {
        var _this = this;
        this._datepicker = _datepicker;
        this.grid$ = new BehaviorSubject([[]]);
        this.focused$ = new BehaviorSubject(null);
        this._year = new Date().getFullYear();
        this._subscription = new Subscription();
        var /** @type {?} */ year = _datepicker.year$.subscribe(function (_year) { return _this.createYearGrid(_year); });
        var /** @type {?} */ event = _datepicker.headerEvent$
            .subscribe(function (_event) { return _event === DatePickerHeaderEvent.Next ? _this.goToNextDecade() : _this.goToPreviousDecade(); });
        this._subscription.add(year);
        this._subscription.add(event);
    }
    /**
     * @return {?}
     */
    YearViewService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * @param {?} year
     * @return {?}
     */
    YearViewService.prototype.setFocus = /**
     * @param {?} year
     * @return {?}
     */
    function (year) {
        this.focused$.next(year);
        this.createYearGrid(year);
    };
    /**
     * @return {?}
     */
    YearViewService.prototype.goToPreviousDecade = /**
     * @return {?}
     */
    function () {
        this.createYearGrid(this._year - 10);
    };
    /**
     * @return {?}
     */
    YearViewService.prototype.goToNextDecade = /**
     * @return {?}
     */
    function () {
        this.createYearGrid(this._year + 10);
    };
    /**
     * @param {?=} year
     * @return {?}
     */
    YearViewService.prototype.createYearGrid = /**
     * @param {?=} year
     * @return {?}
     */
    function (year) {
        var _this = this;
        if (year === void 0) { year = this._year; }
        this._year = year;
        // get the years to display
        var /** @type {?} */ decade = this.getDecade(year);
        var /** @type {?} */ currentYear = new Date().getFullYear();
        // produce items in the correct format
        var /** @type {?} */ items = decade.range.map(function (_year) {
            return {
                year: _year,
                isCurrentYear: _year === currentYear,
                isActiveYear: _year === _this._datepicker.year$.value
            };
        });
        // update the header text
        this._datepicker.setHeader(decade.start + ' - ' + decade.end);
        // create the grid
        this.grid$.next(gridify(items, 4));
    };
    /**
     * Get the years in the current decade to display
     * @param {?} year
     * @return {?}
     */
    YearViewService.prototype.getDecade = /**
     * Get the years in the current decade to display
     * @param {?} year
     * @return {?}
     */
    function (year) {
        // figure the start and end points
        var /** @type {?} */ start = (year - (year % 10));
        var /** @type {?} */ end = start + 9;
        // create an array containing all the numbers between the start and end points
        return { start: start, end: end, range: range(start, end) };
    };
    YearViewService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    YearViewService.ctorParameters = function () { return [
        { type: DateTimePickerService, },
    ]; };
    return YearViewService;
}());
export { YearViewService };
function YearViewService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    YearViewService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    YearViewService.ctorParameters;
    /** @type {?} */
    YearViewService.prototype.grid$;
    /** @type {?} */
    YearViewService.prototype.focused$;
    /** @type {?} */
    YearViewService.prototype._year;
    /** @type {?} */
    YearViewService.prototype._subscription;
    /** @type {?} */
    YearViewService.prototype._datepicker;
}
/**
 * @record
 */
export function YearRange() { }
function YearRange_tsickle_Closure_declarations() {
    /** @type {?} */
    YearRange.prototype.start;
    /** @type {?} */
    YearRange.prototype.end;
    /** @type {?} */
    YearRange.prototype.range;
}
/**
 * @record
 */
export function YearViewItem() { }
function YearViewItem_tsickle_Closure_declarations() {
    /** @type {?} */
    YearViewItem.prototype.year;
    /** @type {?} */
    YearViewItem.prototype.isCurrentYear;
    /** @type {?} */
    YearViewItem.prototype.isActiveYear;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVhci12aWV3LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL3llYXItdmlldy95ZWFyLXZpZXcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzNGLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0lBWXZELHlCQUFvQixXQUFrQztRQUF0RCxpQkFRQztRQVJtQixnQkFBVyxHQUFYLFdBQVcsQ0FBdUI7cUJBUDlDLElBQUksZUFBZSxDQUFtQixDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUN4QyxJQUFJLGVBQWUsQ0FBUyxJQUFJLENBQUM7cUJBRXBCLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFOzZCQUV4QixJQUFJLFlBQVksRUFBRTtRQUd0QyxxQkFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUExQixDQUEwQixDQUFDLENBQUM7UUFFOUUscUJBQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxZQUFZO2FBQ2pDLFNBQVMsQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sS0FBSyxxQkFBcUIsQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLGNBQWMsRUFBRSxHQUFHLEtBQUksQ0FBQyxrQkFBa0IsRUFBRSxFQUF6RixDQUF5RixDQUFDLENBQUM7UUFFcEgsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDakM7Ozs7SUFFRCxxQ0FBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BDOzs7OztJQUVELGtDQUFROzs7O0lBQVIsVUFBUyxJQUFZO1FBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDN0I7Ozs7SUFFRCw0Q0FBa0I7OztJQUFsQjtRQUNJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQztLQUN4Qzs7OztJQUVELHdDQUFjOzs7SUFBZDtRQUNJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQztLQUN4Qzs7Ozs7SUFFTyx3Q0FBYzs7OztjQUFDLElBQXlCOztRQUF6QixxQkFBQSxFQUFBLE9BQWUsSUFBSSxDQUFDLEtBQUs7UUFFNUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7O1FBR2xCLHFCQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXBDLHFCQUFNLFdBQVcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDOztRQUc3QyxxQkFBTSxLQUFLLEdBQW1CLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSztZQUNoRCxNQUFNLENBQUM7Z0JBQ0gsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsYUFBYSxFQUFFLEtBQUssS0FBSyxXQUFXO2dCQUNwQyxZQUFZLEVBQUUsS0FBSyxLQUFLLEtBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUs7YUFDdkQsQ0FBQztTQUNMLENBQUMsQ0FBQzs7UUFHSCxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7O1FBRzlELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7OztJQU0vQixtQ0FBUzs7Ozs7Y0FBQyxJQUFZOztRQUcxQixxQkFBTSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNuQyxxQkFBTSxHQUFHLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQzs7UUFHdEIsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUM7OztnQkF4RW5FLFVBQVU7Ozs7Z0JBSHFCLHFCQUFxQjs7MEJBSHJEOztTQU9hLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IERhdGVQaWNrZXJIZWFkZXJFdmVudCwgRGF0ZVRpbWVQaWNrZXJTZXJ2aWNlIH0gZnJvbSAnLi4vZGF0ZS10aW1lLXBpY2tlci5zZXJ2aWNlJztcbmltcG9ydCB7IGdyaWRpZnksIHJhbmdlIH0gZnJvbSAnLi4vZGF0ZS10aW1lLXBpY2tlci51dGlscyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBZZWFyVmlld1NlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgZ3JpZCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFllYXJWaWV3SXRlbVtdW10+KFtbXV0pO1xuICAgIGZvY3VzZWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KG51bGwpO1xuXG4gICAgcHJpdmF0ZSBfeWVhcjogbnVtYmVyID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xuXG4gICAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZGF0ZXBpY2tlcjogRGF0ZVRpbWVQaWNrZXJTZXJ2aWNlKSB7XG4gICAgICAgIGNvbnN0IHllYXIgPSBfZGF0ZXBpY2tlci55ZWFyJC5zdWJzY3JpYmUoX3llYXIgPT4gdGhpcy5jcmVhdGVZZWFyR3JpZChfeWVhcikpO1xuXG4gICAgICAgIGNvbnN0IGV2ZW50ID0gX2RhdGVwaWNrZXIuaGVhZGVyRXZlbnQkXG4gICAgICAgICAgICAuc3Vic2NyaWJlKF9ldmVudCA9PiBfZXZlbnQgPT09IERhdGVQaWNrZXJIZWFkZXJFdmVudC5OZXh0ID8gdGhpcy5nb1RvTmV4dERlY2FkZSgpIDogdGhpcy5nb1RvUHJldmlvdXNEZWNhZGUoKSk7XG5cbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLmFkZCh5ZWFyKTtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLmFkZChldmVudCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHNldEZvY3VzKHllYXI6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmZvY3VzZWQkLm5leHQoeWVhcik7XG4gICAgICAgIHRoaXMuY3JlYXRlWWVhckdyaWQoeWVhcik7XG4gICAgfVxuXG4gICAgZ29Ub1ByZXZpb3VzRGVjYWRlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNyZWF0ZVllYXJHcmlkKHRoaXMuX3llYXIgLSAxMCk7XG4gICAgfVxuXG4gICAgZ29Ub05leHREZWNhZGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY3JlYXRlWWVhckdyaWQodGhpcy5feWVhciArIDEwKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVllYXJHcmlkKHllYXI6IG51bWJlciA9IHRoaXMuX3llYXIpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLl95ZWFyID0geWVhcjtcblxuICAgICAgICAvLyBnZXQgdGhlIHllYXJzIHRvIGRpc3BsYXlcbiAgICAgICAgY29uc3QgZGVjYWRlID0gdGhpcy5nZXREZWNhZGUoeWVhcik7XG5cbiAgICAgICAgY29uc3QgY3VycmVudFllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG5cbiAgICAgICAgLy8gcHJvZHVjZSBpdGVtcyBpbiB0aGUgY29ycmVjdCBmb3JtYXRcbiAgICAgICAgY29uc3QgaXRlbXM6IFllYXJWaWV3SXRlbVtdID0gZGVjYWRlLnJhbmdlLm1hcChfeWVhciA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHllYXI6IF95ZWFyLFxuICAgICAgICAgICAgICAgIGlzQ3VycmVudFllYXI6IF95ZWFyID09PSBjdXJyZW50WWVhcixcbiAgICAgICAgICAgICAgICBpc0FjdGl2ZVllYXI6IF95ZWFyID09PSB0aGlzLl9kYXRlcGlja2VyLnllYXIkLnZhbHVlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIGhlYWRlciB0ZXh0XG4gICAgICAgIHRoaXMuX2RhdGVwaWNrZXIuc2V0SGVhZGVyKGRlY2FkZS5zdGFydCArICcgLSAnICsgZGVjYWRlLmVuZCk7XG5cbiAgICAgICAgLy8gY3JlYXRlIHRoZSBncmlkXG4gICAgICAgIHRoaXMuZ3JpZCQubmV4dChncmlkaWZ5KGl0ZW1zLCA0KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB5ZWFycyBpbiB0aGUgY3VycmVudCBkZWNhZGUgdG8gZGlzcGxheVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0RGVjYWRlKHllYXI6IG51bWJlcik6IFllYXJSYW5nZSB7XG5cbiAgICAgICAgLy8gZmlndXJlIHRoZSBzdGFydCBhbmQgZW5kIHBvaW50c1xuICAgICAgICBjb25zdCBzdGFydCA9ICh5ZWFyIC0gKHllYXIgJSAxMCkpO1xuICAgICAgICBjb25zdCBlbmQgPSBzdGFydCArIDk7XG5cbiAgICAgICAgLy8gY3JlYXRlIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIHRoZSBudW1iZXJzIGJldHdlZW4gdGhlIHN0YXJ0IGFuZCBlbmQgcG9pbnRzXG4gICAgICAgIHJldHVybiB7IHN0YXJ0OiBzdGFydCwgZW5kOiBlbmQsIHJhbmdlOiByYW5nZShzdGFydCwgZW5kKSB9O1xuICAgIH1cbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIFllYXJSYW5nZSB7XG4gICAgc3RhcnQ6IG51bWJlcjtcbiAgICBlbmQ6IG51bWJlcjtcbiAgICByYW5nZTogbnVtYmVyW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgWWVhclZpZXdJdGVtIHtcbiAgICB5ZWFyOiBudW1iZXI7XG4gICAgaXNDdXJyZW50WWVhcjogYm9vbGVhbjtcbiAgICBpc0FjdGl2ZVllYXI6IGJvb2xlYW47XG59Il19