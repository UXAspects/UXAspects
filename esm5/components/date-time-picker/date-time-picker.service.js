/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { distinctUntilChanged } from 'rxjs/operators';
import { DateTimePickerConfig } from './date-time-picker.config';
import { dateComparator, weekdaysShort, timezones, months, monthsShort } from './date-time-picker.utils';
var DateTimePickerService = /** @class */ (function () {
    function DateTimePickerService(_config) {
        var _this = this;
        this._config = _config;
        this.mode$ = new BehaviorSubject(DatePickerMode.Day);
        this.date$ = new BehaviorSubject(new Date());
        this.timezone$ = new BehaviorSubject(this.getCurrentTimezone());
        this.selected$ = new BehaviorSubject(new Date());
        // the month and year to display in the viewport
        this.month$ = new BehaviorSubject(new Date().getMonth());
        this.year$ = new BehaviorSubject(new Date().getFullYear());
        this.showDate$ = new BehaviorSubject(this._config ? this._config.showDate : true);
        this.showTime$ = new BehaviorSubject(this._config ? this._config.showTime : true);
        this.showTimezone$ = new BehaviorSubject(this._config ? this._config.showTimezone : true);
        this.showSeconds$ = new BehaviorSubject(this._config ? this._config.showSeconds : false);
        this.showMeridian$ = new BehaviorSubject(this._config ? this._config.showMeridian : true);
        this.showSpinners$ = new BehaviorSubject(this._config ? this._config.showSpinners : true);
        this.weekdays$ = new BehaviorSubject(this._config ? this._config.weekdays : weekdaysShort);
        this.nowBtnText$ = new BehaviorSubject(this._config ? this._config.nowBtnText : 'Today');
        this.timezones$ = new BehaviorSubject(this._config ? this._config.timezones : timezones);
        this.header$ = new BehaviorSubject(null);
        this.headerEvent$ = new Subject();
        this.modeDirection = ModeDirection.None;
        this.months = this._config ? this._config.months : months;
        this.monthsShort = this._config ? this._config.monthsShort : monthsShort;
        // when the active date changes set the currently selected date
        this._subscription = this.selected$.pipe(distinctUntilChanged(dateComparator)).subscribe(function (date) {
            // the month and year displayed in the viewport should reflect the newly selected items
            // the month and year displayed in the viewport should reflect the newly selected items
            _this.setViewportMonth(date.getMonth());
            _this.setViewportYear(date.getFullYear());
            // emit the new date to the component host
            // emit the new date to the component host
            _this.date$.next(date);
        });
    }
    /**
     * @return {?}
     */
    DateTimePickerService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * @param {?} month
     * @return {?}
     */
    DateTimePickerService.prototype.setViewportMonth = /**
     * @param {?} month
     * @return {?}
     */
    function (month) {
        if (month < 0) {
            this.month$.next(11);
            this.year$.next(this.year$.value - 1);
        }
        else if (month > 11) {
            this.month$.next(0);
            this.year$.next(this.year$.value + 1);
        }
        else {
            this.month$.next(month);
        }
    };
    /**
     * @param {?} year
     * @return {?}
     */
    DateTimePickerService.prototype.setViewportYear = /**
     * @param {?} year
     * @return {?}
     */
    function (year) {
        this.year$.next(year);
    };
    /**
     * @param {?} day
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    DateTimePickerService.prototype.setDate = /**
     * @param {?} day
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    function (day, month, year) {
        var /** @type {?} */ date = new Date(this.selected$.value);
        date.setDate(day);
        date.setMonth(month);
        date.setFullYear(year);
        this.selected$.next(date);
    };
    /**
     * @return {?}
     */
    DateTimePickerService.prototype.setDateToNow = /**
     * @return {?}
     */
    function () {
        this.selected$.next(new Date());
    };
    /**
     * @param {?} mode
     * @return {?}
     */
    DateTimePickerService.prototype.setViewportMode = /**
     * @param {?} mode
     * @return {?}
     */
    function (mode) {
        this.mode$.next(mode);
    };
    /**
     * @return {?}
     */
    DateTimePickerService.prototype.goToChildMode = /**
     * @return {?}
     */
    function () {
        this.modeDirection = ModeDirection.Descend;
        switch (this.mode$.value) {
            case DatePickerMode.Year:
                return this.setViewportMode(DatePickerMode.Month);
            case DatePickerMode.Month:
                return this.setViewportMode(DatePickerMode.Day);
        }
    };
    /**
     * @return {?}
     */
    DateTimePickerService.prototype.goToParentMode = /**
     * @return {?}
     */
    function () {
        this.modeDirection = ModeDirection.Ascend;
        switch (this.mode$.value) {
            case DatePickerMode.Day:
                return this.setViewportMode(DatePickerMode.Month);
            case DatePickerMode.Month:
                return this.setViewportMode(DatePickerMode.Year);
        }
    };
    /**
     * @return {?}
     */
    DateTimePickerService.prototype.goToNext = /**
     * @return {?}
     */
    function () {
        this.headerEvent$.next(DatePickerHeaderEvent.Next);
    };
    /**
     * @return {?}
     */
    DateTimePickerService.prototype.goToPrevious = /**
     * @return {?}
     */
    function () {
        this.headerEvent$.next(DatePickerHeaderEvent.Previous);
    };
    /**
     * @param {?} header
     * @return {?}
     */
    DateTimePickerService.prototype.setHeader = /**
     * @param {?} header
     * @return {?}
     */
    function (header) {
        this.header$.next(header);
    };
    /**
     * @return {?}
     */
    DateTimePickerService.prototype.getCurrentTimezone = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ offset = new Date().getTimezoneOffset();
        var /** @type {?} */ zones = this._config ? this._config.timezones : timezones;
        return zones.find(function (timezone) { return timezone.offset === offset; });
    };
    /**
     * @param {?} timezone
     * @return {?}
     */
    DateTimePickerService.prototype.setTimezone = /**
     * @param {?} timezone
     * @return {?}
     */
    function (timezone) {
        this.timezone$.next(timezone);
    };
    DateTimePickerService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DateTimePickerService.ctorParameters = function () { return [
        { type: DateTimePickerConfig, decorators: [{ type: Optional }] }
    ]; };
    return DateTimePickerService;
}());
export { DateTimePickerService };
function DateTimePickerService_tsickle_Closure_declarations() {
    /** @type {?} */
    DateTimePickerService.prototype.mode$;
    /** @type {?} */
    DateTimePickerService.prototype.date$;
    /** @type {?} */
    DateTimePickerService.prototype.timezone$;
    /** @type {?} */
    DateTimePickerService.prototype.selected$;
    /** @type {?} */
    DateTimePickerService.prototype.month$;
    /** @type {?} */
    DateTimePickerService.prototype.year$;
    /** @type {?} */
    DateTimePickerService.prototype.showDate$;
    /** @type {?} */
    DateTimePickerService.prototype.showTime$;
    /** @type {?} */
    DateTimePickerService.prototype.showTimezone$;
    /** @type {?} */
    DateTimePickerService.prototype.showSeconds$;
    /** @type {?} */
    DateTimePickerService.prototype.showMeridian$;
    /** @type {?} */
    DateTimePickerService.prototype.showSpinners$;
    /** @type {?} */
    DateTimePickerService.prototype.weekdays$;
    /** @type {?} */
    DateTimePickerService.prototype.nowBtnText$;
    /** @type {?} */
    DateTimePickerService.prototype.timezones$;
    /** @type {?} */
    DateTimePickerService.prototype.header$;
    /** @type {?} */
    DateTimePickerService.prototype.headerEvent$;
    /** @type {?} */
    DateTimePickerService.prototype.modeDirection;
    /** @type {?} */
    DateTimePickerService.prototype.months;
    /** @type {?} */
    DateTimePickerService.prototype.monthsShort;
    /** @type {?} */
    DateTimePickerService.prototype._subscription;
    /** @type {?} */
    DateTimePickerService.prototype._config;
}
/** @enum {number} */
var DatePickerMode = {
    Day: 0,
    Month: 1,
    Year: 2,
};
export { DatePickerMode };
DatePickerMode[DatePickerMode.Day] = "Day";
DatePickerMode[DatePickerMode.Month] = "Month";
DatePickerMode[DatePickerMode.Year] = "Year";
/** @enum {number} */
var ModeDirection = {
    None: 0,
    Ascend: 1,
    Descend: 2,
};
export { ModeDirection };
ModeDirection[ModeDirection.None] = "None";
ModeDirection[ModeDirection.Ascend] = "Ascend";
ModeDirection[ModeDirection.Descend] = "Descend";
/** @enum {number} */
var DatePickerHeaderEvent = {
    Previous: 0,
    Next: 1,
};
export { DatePickerHeaderEvent };
DatePickerHeaderEvent[DatePickerHeaderEvent.Previous] = "Previous";
DatePickerHeaderEvent[DatePickerHeaderEvent.Next] = "Next";

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGF0ZS10aW1lLXBpY2tlci9kYXRlLXRpbWUtcGlja2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXZDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBMEIsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztJQWlDN0gsK0JBQWdDLE9BQTZCO1FBQTdELGlCQVlDO1FBWitCLFlBQU8sR0FBUCxPQUFPLENBQXNCO3FCQTVCcEIsSUFBSSxlQUFlLENBQWlCLGNBQWMsQ0FBQyxHQUFHLENBQUM7cUJBQ2pFLElBQUksZUFBZSxDQUFPLElBQUksSUFBSSxFQUFFLENBQUM7eUJBQ3hELElBQUksZUFBZSxDQUF5QixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzt5QkFDL0MsSUFBSSxlQUFlLENBQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQzs7c0JBR3RDLElBQUksZUFBZSxDQUFTLElBQUksSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7cUJBQ25ELElBQUksZUFBZSxDQUFTLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7eUJBRTFFLElBQUksZUFBZSxDQUFVLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7eUJBQ3pFLElBQUksZUFBZSxDQUFVLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7NkJBQ3JFLElBQUksZUFBZSxDQUFVLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7NEJBQzlFLElBQUksZUFBZSxDQUFVLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7NkJBQzVFLElBQUksZUFBZSxDQUFVLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7NkJBQzdFLElBQUksZUFBZSxDQUFVLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7eUJBQ2pGLElBQUksZUFBZSxDQUFXLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7MkJBQ2pGLElBQUksZUFBZSxDQUFTLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7MEJBQzlFLElBQUksZUFBZSxDQUEyQixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO3VCQUVuRyxJQUFJLGVBQWUsQ0FBUyxJQUFJLENBQUM7NEJBQzVCLElBQUksT0FBTyxFQUF5Qjs2QkFDcEIsYUFBYSxDQUFDLElBQUk7c0JBRTlCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNOzJCQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVzs7UUFPekUsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUk7O1lBR3pGLEFBREEsdUZBQXVGO1lBQ3ZGLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUN2QyxLQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDOztZQUd6QyxBQURBLDBDQUEwQztZQUMxQyxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6QixDQUFDLENBQUM7S0FDTjs7OztJQUVELDJDQUFXOzs7SUFBWDtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEM7Ozs7O0lBRUQsZ0RBQWdCOzs7O0lBQWhCLFVBQWlCLEtBQWE7UUFDMUIsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDWixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztTQUN6QztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztTQUN6QztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDM0I7S0FDSjs7Ozs7SUFFRCwrQ0FBZTs7OztJQUFmLFVBQWdCLElBQVk7UUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDekI7Ozs7Ozs7SUFFRCx1Q0FBTzs7Ozs7O0lBQVAsVUFBUSxHQUFXLEVBQUUsS0FBYSxFQUFFLElBQVk7UUFDNUMscUJBQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDN0I7Ozs7SUFFRCw0Q0FBWTs7O0lBQVo7UUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7S0FDbkM7Ozs7O0lBRUQsK0NBQWU7Ozs7SUFBZixVQUFnQixJQUFvQjtRQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN6Qjs7OztJQUVELDZDQUFhOzs7SUFBYjtRQUNJLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQztRQUUzQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFFdkIsS0FBSyxjQUFjLENBQUMsSUFBSTtnQkFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXRELEtBQUssY0FBYyxDQUFDLEtBQUs7Z0JBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN2RDtLQUNKOzs7O0lBRUQsOENBQWM7OztJQUFkO1FBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBRTFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUV2QixLQUFLLGNBQWMsQ0FBQyxHQUFHO2dCQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFdEQsS0FBSyxjQUFjLENBQUMsS0FBSztnQkFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hEO0tBQ0o7Ozs7SUFFRCx3Q0FBUTs7O0lBQVI7UUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN0RDs7OztJQUVELDRDQUFZOzs7SUFBWjtRQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQzFEOzs7OztJQUVELHlDQUFTOzs7O0lBQVQsVUFBVSxNQUFjO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzdCOzs7O0lBRUQsa0RBQWtCOzs7SUFBbEI7UUFDSSxxQkFBTSxNQUFNLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzlDLHFCQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ2hFLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLE1BQU0sS0FBSyxNQUFNLEVBQTFCLENBQTBCLENBQUMsQ0FBQztLQUM3RDs7Ozs7SUFFRCwyQ0FBVzs7OztJQUFYLFVBQVksUUFBZ0M7UUFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDakM7O2dCQWpJSixVQUFVOzs7O2dCQUhGLG9CQUFvQix1QkFrQ1osUUFBUTs7Z0NBdkN6Qjs7U0FTYSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERhdGVUaW1lUGlja2VyQ29uZmlnIH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLmNvbmZpZyc7XG5pbXBvcnQgeyBkYXRlQ29tcGFyYXRvciwgd2Vla2RheXNTaG9ydCwgdGltZXpvbmVzLCBEYXRlVGltZVBpY2tlclRpbWV6b25lLCBtb250aHMsIG1vbnRoc1Nob3J0IH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLnV0aWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGVUaW1lUGlja2VyU2VydmljZSB7XG5cbiAgICBtb2RlJDogQmVoYXZpb3JTdWJqZWN0PERhdGVQaWNrZXJNb2RlPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RGF0ZVBpY2tlck1vZGU+KERhdGVQaWNrZXJNb2RlLkRheSk7XG4gICAgZGF0ZSQ6IEJlaGF2aW9yU3ViamVjdDxEYXRlPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RGF0ZT4obmV3IERhdGUoKSk7XG4gICAgdGltZXpvbmUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEYXRlVGltZVBpY2tlclRpbWV6b25lPih0aGlzLmdldEN1cnJlbnRUaW1lem9uZSgpKTtcbiAgICBzZWxlY3RlZCQ6IEJlaGF2aW9yU3ViamVjdDxEYXRlPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RGF0ZT4obmV3IERhdGUoKSk7XG5cbiAgICAvLyB0aGUgbW9udGggYW5kIHllYXIgdG8gZGlzcGxheSBpbiB0aGUgdmlld3BvcnRcbiAgICBtb250aCQ6IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KG5ldyBEYXRlKCkuZ2V0TW9udGgoKSk7XG4gICAgeWVhciQ6IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSk7XG5cbiAgICBzaG93RGF0ZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRoaXMuX2NvbmZpZyA/IHRoaXMuX2NvbmZpZy5zaG93RGF0ZSA6IHRydWUpO1xuICAgIHNob3dUaW1lJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odGhpcy5fY29uZmlnID8gdGhpcy5fY29uZmlnLnNob3dUaW1lIDogdHJ1ZSk7XG4gICAgc2hvd1RpbWV6b25lJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odGhpcy5fY29uZmlnID8gdGhpcy5fY29uZmlnLnNob3dUaW1lem9uZSA6IHRydWUpO1xuICAgIHNob3dTZWNvbmRzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odGhpcy5fY29uZmlnID8gdGhpcy5fY29uZmlnLnNob3dTZWNvbmRzIDogZmFsc2UpO1xuICAgIHNob3dNZXJpZGlhbiQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRoaXMuX2NvbmZpZyA/IHRoaXMuX2NvbmZpZy5zaG93TWVyaWRpYW4gOiB0cnVlKTtcbiAgICBzaG93U3Bpbm5lcnMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0aGlzLl9jb25maWcgPyB0aGlzLl9jb25maWcuc2hvd1NwaW5uZXJzIDogdHJ1ZSk7XG4gICAgd2Vla2RheXMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4odGhpcy5fY29uZmlnID8gdGhpcy5fY29uZmlnLndlZWtkYXlzIDogd2Vla2RheXNTaG9ydCk7XG4gICAgbm93QnRuVGV4dCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4odGhpcy5fY29uZmlnID8gdGhpcy5fY29uZmlnLm5vd0J0blRleHQgOiAnVG9kYXknKTtcbiAgICB0aW1lem9uZXMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEYXRlVGltZVBpY2tlclRpbWV6b25lW10+KHRoaXMuX2NvbmZpZyA/IHRoaXMuX2NvbmZpZy50aW1lem9uZXMgOiB0aW1lem9uZXMpO1xuXG4gICAgaGVhZGVyJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPihudWxsKTtcbiAgICBoZWFkZXJFdmVudCQgPSBuZXcgU3ViamVjdDxEYXRlUGlja2VySGVhZGVyRXZlbnQ+KCk7XG4gICAgbW9kZURpcmVjdGlvbjogTW9kZURpcmVjdGlvbiA9IE1vZGVEaXJlY3Rpb24uTm9uZTtcblxuICAgIG1vbnRoczogc3RyaW5nW10gPSB0aGlzLl9jb25maWcgPyB0aGlzLl9jb25maWcubW9udGhzIDogbW9udGhzO1xuICAgIG1vbnRoc1Nob3J0OiBzdHJpbmdbXSA9IHRoaXMuX2NvbmZpZyA/IHRoaXMuX2NvbmZpZy5tb250aHNTaG9ydCA6IG1vbnRoc1Nob3J0O1xuXG4gICAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBwcml2YXRlIF9jb25maWc6IERhdGVUaW1lUGlja2VyQ29uZmlnKSB7XG5cbiAgICAgICAgLy8gd2hlbiB0aGUgYWN0aXZlIGRhdGUgY2hhbmdlcyBzZXQgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBkYXRlXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IHRoaXMuc2VsZWN0ZWQkLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoZGF0ZUNvbXBhcmF0b3IpKS5zdWJzY3JpYmUoZGF0ZSA9PiB7XG5cbiAgICAgICAgICAgIC8vIHRoZSBtb250aCBhbmQgeWVhciBkaXNwbGF5ZWQgaW4gdGhlIHZpZXdwb3J0IHNob3VsZCByZWZsZWN0IHRoZSBuZXdseSBzZWxlY3RlZCBpdGVtc1xuICAgICAgICAgICAgdGhpcy5zZXRWaWV3cG9ydE1vbnRoKGRhdGUuZ2V0TW9udGgoKSk7XG4gICAgICAgICAgICB0aGlzLnNldFZpZXdwb3J0WWVhcihkYXRlLmdldEZ1bGxZZWFyKCkpO1xuXG4gICAgICAgICAgICAvLyBlbWl0IHRoZSBuZXcgZGF0ZSB0byB0aGUgY29tcG9uZW50IGhvc3RcbiAgICAgICAgICAgIHRoaXMuZGF0ZSQubmV4dChkYXRlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHNldFZpZXdwb3J0TW9udGgobW9udGg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAobW9udGggPCAwKSB7XG4gICAgICAgICAgICB0aGlzLm1vbnRoJC5uZXh0KDExKTtcbiAgICAgICAgICAgIHRoaXMueWVhciQubmV4dCh0aGlzLnllYXIkLnZhbHVlIC0gMSk7XG4gICAgICAgIH0gZWxzZSBpZiAobW9udGggPiAxMSkge1xuICAgICAgICAgICAgdGhpcy5tb250aCQubmV4dCgwKTtcbiAgICAgICAgICAgIHRoaXMueWVhciQubmV4dCh0aGlzLnllYXIkLnZhbHVlICsgMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1vbnRoJC5uZXh0KG1vbnRoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFZpZXdwb3J0WWVhcih5ZWFyOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy55ZWFyJC5uZXh0KHllYXIpO1xuICAgIH1cblxuICAgIHNldERhdGUoZGF5OiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUodGhpcy5zZWxlY3RlZCQudmFsdWUpO1xuXG4gICAgICAgIGRhdGUuc2V0RGF0ZShkYXkpO1xuICAgICAgICBkYXRlLnNldE1vbnRoKG1vbnRoKTtcbiAgICAgICAgZGF0ZS5zZXRGdWxsWWVhcih5ZWFyKTtcblxuICAgICAgICB0aGlzLnNlbGVjdGVkJC5uZXh0KGRhdGUpO1xuICAgIH1cblxuICAgIHNldERhdGVUb05vdygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCQubmV4dChuZXcgRGF0ZSgpKTtcbiAgICB9XG5cbiAgICBzZXRWaWV3cG9ydE1vZGUobW9kZTogRGF0ZVBpY2tlck1vZGUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tb2RlJC5uZXh0KG1vZGUpO1xuICAgIH1cblxuICAgIGdvVG9DaGlsZE1vZGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubW9kZURpcmVjdGlvbiA9IE1vZGVEaXJlY3Rpb24uRGVzY2VuZDtcblxuICAgICAgICBzd2l0Y2ggKHRoaXMubW9kZSQudmFsdWUpIHtcblxuICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyTW9kZS5ZZWFyOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFZpZXdwb3J0TW9kZShEYXRlUGlja2VyTW9kZS5Nb250aCk7XG5cbiAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlck1vZGUuTW9udGg6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0Vmlld3BvcnRNb2RlKERhdGVQaWNrZXJNb2RlLkRheSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnb1RvUGFyZW50TW9kZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tb2RlRGlyZWN0aW9uID0gTW9kZURpcmVjdGlvbi5Bc2NlbmQ7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLm1vZGUkLnZhbHVlKSB7XG5cbiAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlck1vZGUuRGF5OlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFZpZXdwb3J0TW9kZShEYXRlUGlja2VyTW9kZS5Nb250aCk7XG5cbiAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlck1vZGUuTW9udGg6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0Vmlld3BvcnRNb2RlKERhdGVQaWNrZXJNb2RlLlllYXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ29Ub05leHQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaGVhZGVyRXZlbnQkLm5leHQoRGF0ZVBpY2tlckhlYWRlckV2ZW50Lk5leHQpO1xuICAgIH1cblxuICAgIGdvVG9QcmV2aW91cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5oZWFkZXJFdmVudCQubmV4dChEYXRlUGlja2VySGVhZGVyRXZlbnQuUHJldmlvdXMpO1xuICAgIH1cblxuICAgIHNldEhlYWRlcihoZWFkZXI6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmhlYWRlciQubmV4dChoZWFkZXIpO1xuICAgIH1cblxuICAgIGdldEN1cnJlbnRUaW1lem9uZSgpOiBEYXRlVGltZVBpY2tlclRpbWV6b25lIHtcbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gbmV3IERhdGUoKS5nZXRUaW1lem9uZU9mZnNldCgpO1xuICAgICAgICBjb25zdCB6b25lcyA9IHRoaXMuX2NvbmZpZyA/IHRoaXMuX2NvbmZpZy50aW1lem9uZXMgOiB0aW1lem9uZXM7XG4gICAgICAgIHJldHVybiB6b25lcy5maW5kKHRpbWV6b25lID0+IHRpbWV6b25lLm9mZnNldCA9PT0gb2Zmc2V0KTtcbiAgICB9XG5cbiAgICBzZXRUaW1lem9uZSh0aW1lem9uZTogRGF0ZVRpbWVQaWNrZXJUaW1lem9uZSk6IHZvaWQge1xuICAgICAgICB0aGlzLnRpbWV6b25lJC5uZXh0KHRpbWV6b25lKTtcbiAgICB9XG59XG5cbmV4cG9ydCBlbnVtIERhdGVQaWNrZXJNb2RlIHtcbiAgICBEYXksXG4gICAgTW9udGgsXG4gICAgWWVhclxufVxuXG5leHBvcnQgZW51bSBNb2RlRGlyZWN0aW9uIHtcbiAgICBOb25lLFxuICAgIEFzY2VuZCxcbiAgICBEZXNjZW5kXG59XG5cbmV4cG9ydCBlbnVtIERhdGVQaWNrZXJIZWFkZXJFdmVudCB7XG4gICAgUHJldmlvdXMsXG4gICAgTmV4dFxufSJdfQ==