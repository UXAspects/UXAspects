/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { distinctUntilChanged } from 'rxjs/operators';
import { DateTimePickerConfig } from './date-time-picker.config';
import { dateComparator } from './date-time-picker.utils';
var DateTimePickerService = (function () {
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
        this.showDate$ = new BehaviorSubject(this._config.showDate);
        this.showTime$ = new BehaviorSubject(this._config.showTime);
        this.showTimezone$ = new BehaviorSubject(this._config.showTimezone);
        this.showSeconds$ = new BehaviorSubject(this._config.showSeconds);
        this.showMeridian$ = new BehaviorSubject(this._config.showMeridian);
        this.showSpinners$ = new BehaviorSubject(this._config.showSpinners);
        this.weekdays$ = new BehaviorSubject(this._config.weekdays);
        this.nowBtnText$ = new BehaviorSubject(this._config.nowBtnText);
        this.timezones$ = new BehaviorSubject(this._config.timezones);
        this.header$ = new BehaviorSubject(null);
        this.headerEvent$ = new Subject();
        this.modeDirection = ModeDirection.None;
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
        return this._config.timezones.find(function (timezone) { return timezone.offset === offset; });
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
        { type: Injectable },
    ];
    /** @nocollapse */
    DateTimePickerService.ctorParameters = function () { return [
        { type: DateTimePickerConfig, },
    ]; };
    return DateTimePickerService;
}());
export { DateTimePickerService };
function DateTimePickerService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DateTimePickerService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DateTimePickerService.ctorParameters;
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
/**
 * @record
 */
export function DateTimePickerTimezone() { }
function DateTimePickerTimezone_tsickle_Closure_declarations() {
    /** @type {?} */
    DateTimePickerTimezone.prototype.name;
    /** @type {?} */
    DateTimePickerTimezone.prototype.offset;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGF0ZS10aW1lLXBpY2tlci9kYXRlLXRpbWUtcGlja2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFdkMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDakUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztJQThCdEQsK0JBQW9CLE9BQTZCO1FBQWpELGlCQVlDO1FBWm1CLFlBQU8sR0FBUCxPQUFPLENBQXNCO3FCQXpCUixJQUFJLGVBQWUsQ0FBaUIsY0FBYyxDQUFDLEdBQUcsQ0FBQztxQkFDakUsSUFBSSxlQUFlLENBQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQzt5QkFDeEQsSUFBSSxlQUFlLENBQXlCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO3lCQUMvQyxJQUFJLGVBQWUsQ0FBTyxJQUFJLElBQUksRUFBRSxDQUFDOztzQkFHdEMsSUFBSSxlQUFlLENBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztxQkFDbkQsSUFBSSxlQUFlLENBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQzt5QkFFMUUsSUFBSSxlQUFlLENBQVUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7eUJBQ25ELElBQUksZUFBZSxDQUFVLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxD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LHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQzFEOzs7OztJQUVELHlDQUFTOzs7O0lBQVQsVUFBVSxNQUFjO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzdCOzs7O0lBRUQsa0RBQWtCOzs7SUFBbEI7UUFDSSxxQkFBTSxNQUFNLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzlDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBMUIsQ0FBMEIsQ0FBQyxDQUFDO0tBQzlFOzs7OztJQUVELDJDQUFXOzs7O0lBQVgsVUFBWSxRQUFnQztRQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUNqQzs7Z0JBN0hKLFVBQVU7Ozs7Z0JBSEYsb0JBQW9COztnQ0FMN0I7O1NBU2EscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERhdGVUaW1lUGlja2VyQ29uZmlnIH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLmNvbmZpZyc7XG5pbXBvcnQgeyBkYXRlQ29tcGFyYXRvciB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci51dGlscyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXRlVGltZVBpY2tlclNlcnZpY2Uge1xuXG4gICAgbW9kZSQ6IEJlaGF2aW9yU3ViamVjdDxEYXRlUGlja2VyTW9kZT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERhdGVQaWNrZXJNb2RlPihEYXRlUGlja2VyTW9kZS5EYXkpO1xuICAgIGRhdGUkOiBCZWhhdmlvclN1YmplY3Q8RGF0ZT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERhdGU+KG5ldyBEYXRlKCkpO1xuICAgIHRpbWV6b25lJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RGF0ZVRpbWVQaWNrZXJUaW1lem9uZT4odGhpcy5nZXRDdXJyZW50VGltZXpvbmUoKSk7XG4gICAgc2VsZWN0ZWQkOiBCZWhhdmlvclN1YmplY3Q8RGF0ZT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERhdGU+KG5ldyBEYXRlKCkpO1xuXG4gICAgLy8gdGhlIG1vbnRoIGFuZCB5ZWFyIHRvIGRpc3BsYXkgaW4gdGhlIHZpZXdwb3J0XG4gICAgbW9udGgkOiBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPihuZXcgRGF0ZSgpLmdldE1vbnRoKCkpO1xuICAgIHllYXIkOiBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPihuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkpO1xuXG4gICAgc2hvd0RhdGUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0aGlzLl9jb25maWcuc2hvd0RhdGUpO1xuICAgIHNob3dUaW1lJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odGhpcy5fY29uZmlnLnNob3dUaW1lKTtcbiAgICBzaG93VGltZXpvbmUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0aGlzLl9jb25maWcuc2hvd1RpbWV6b25lKTtcbiAgICBzaG93U2Vjb25kcyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRoaXMuX2NvbmZpZy5zaG93U2Vjb25kcyk7XG4gICAgc2hvd01lcmlkaWFuJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odGhpcy5fY29uZmlnLnNob3dNZXJpZGlhbik7XG4gICAgc2hvd1NwaW5uZXJzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odGhpcy5fY29uZmlnLnNob3dTcGlubmVycyk7XG4gICAgd2Vla2RheXMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4odGhpcy5fY29uZmlnLndlZWtkYXlzKTtcbiAgICBub3dCdG5UZXh0JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPih0aGlzLl9jb25maWcubm93QnRuVGV4dCk7XG4gICAgdGltZXpvbmVzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RGF0ZVRpbWVQaWNrZXJUaW1lem9uZVtdPih0aGlzLl9jb25maWcudGltZXpvbmVzKTtcblxuICAgIGhlYWRlciQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4obnVsbCk7XG4gICAgaGVhZGVyRXZlbnQkID0gbmV3IFN1YmplY3Q8RGF0ZVBpY2tlckhlYWRlckV2ZW50PigpO1xuICAgIG1vZGVEaXJlY3Rpb246IE1vZGVEaXJlY3Rpb24gPSBNb2RlRGlyZWN0aW9uLk5vbmU7XG5cbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NvbmZpZzogRGF0ZVRpbWVQaWNrZXJDb25maWcpIHtcblxuICAgICAgICAvLyB3aGVuIHRoZSBhY3RpdmUgZGF0ZSBjaGFuZ2VzIHNldCB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGRhdGVcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gdGhpcy5zZWxlY3RlZCQucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZChkYXRlQ29tcGFyYXRvcikpLnN1YnNjcmliZShkYXRlID0+IHtcblxuICAgICAgICAgICAgLy8gdGhlIG1vbnRoIGFuZCB5ZWFyIGRpc3BsYXllZCBpbiB0aGUgdmlld3BvcnQgc2hvdWxkIHJlZmxlY3QgdGhlIG5ld2x5IHNlbGVjdGVkIGl0ZW1zXG4gICAgICAgICAgICB0aGlzLnNldFZpZXdwb3J0TW9udGgoZGF0ZS5nZXRNb250aCgpKTtcbiAgICAgICAgICAgIHRoaXMuc2V0Vmlld3BvcnRZZWFyKGRhdGUuZ2V0RnVsbFllYXIoKSk7XG5cbiAgICAgICAgICAgIC8vIGVtaXQgdGhlIG5ldyBkYXRlIHRvIHRoZSBjb21wb25lbnQgaG9zdFxuICAgICAgICAgICAgdGhpcy5kYXRlJC5uZXh0KGRhdGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgc2V0Vmlld3BvcnRNb250aChtb250aDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmIChtb250aCA8IDApIHtcbiAgICAgICAgICAgIHRoaXMubW9udGgkLm5leHQoMTEpO1xuICAgICAgICAgICAgdGhpcy55ZWFyJC5uZXh0KHRoaXMueWVhciQudmFsdWUgLSAxKTtcbiAgICAgICAgfSBlbHNlIGlmIChtb250aCA+IDExKSB7XG4gICAgICAgICAgICB0aGlzLm1vbnRoJC5uZXh0KDApO1xuICAgICAgICAgICAgdGhpcy55ZWFyJC5uZXh0KHRoaXMueWVhciQudmFsdWUgKyAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubW9udGgkLm5leHQobW9udGgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0Vmlld3BvcnRZZWFyKHllYXI6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnllYXIkLm5leHQoeWVhcik7XG4gICAgfVxuXG4gICAgc2V0RGF0ZShkYXk6IG51bWJlciwgbW9udGg6IG51bWJlciwgeWVhcjogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh0aGlzLnNlbGVjdGVkJC52YWx1ZSk7XG5cbiAgICAgICAgZGF0ZS5zZXREYXRlKGRheSk7XG4gICAgICAgIGRhdGUuc2V0TW9udGgobW9udGgpO1xuICAgICAgICBkYXRlLnNldEZ1bGxZZWFyKHllYXIpO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWQkLm5leHQoZGF0ZSk7XG4gICAgfVxuXG4gICAgc2V0RGF0ZVRvTm93KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGVkJC5uZXh0KG5ldyBEYXRlKCkpO1xuICAgIH1cblxuICAgIHNldFZpZXdwb3J0TW9kZShtb2RlOiBEYXRlUGlja2VyTW9kZSk6IHZvaWQge1xuICAgICAgICB0aGlzLm1vZGUkLm5leHQobW9kZSk7XG4gICAgfVxuXG4gICAgZ29Ub0NoaWxkTW9kZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tb2RlRGlyZWN0aW9uID0gTW9kZURpcmVjdGlvbi5EZXNjZW5kO1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5tb2RlJC52YWx1ZSkge1xuXG4gICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJNb2RlLlllYXI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0Vmlld3BvcnRNb2RlKERhdGVQaWNrZXJNb2RlLk1vbnRoKTtcblxuICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyTW9kZS5Nb250aDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRWaWV3cG9ydE1vZGUoRGF0ZVBpY2tlck1vZGUuRGF5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdvVG9QYXJlbnRNb2RlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1vZGVEaXJlY3Rpb24gPSBNb2RlRGlyZWN0aW9uLkFzY2VuZDtcblxuICAgICAgICBzd2l0Y2ggKHRoaXMubW9kZSQudmFsdWUpIHtcblxuICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyTW9kZS5EYXk6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0Vmlld3BvcnRNb2RlKERhdGVQaWNrZXJNb2RlLk1vbnRoKTtcblxuICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyTW9kZS5Nb250aDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRWaWV3cG9ydE1vZGUoRGF0ZVBpY2tlck1vZGUuWWVhcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnb1RvTmV4dCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5oZWFkZXJFdmVudCQubmV4dChEYXRlUGlja2VySGVhZGVyRXZlbnQuTmV4dCk7XG4gICAgfVxuXG4gICAgZ29Ub1ByZXZpb3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmhlYWRlckV2ZW50JC5uZXh0KERhdGVQaWNrZXJIZWFkZXJFdmVudC5QcmV2aW91cyk7XG4gICAgfVxuXG4gICAgc2V0SGVhZGVyKGhlYWRlcjogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaGVhZGVyJC5uZXh0KGhlYWRlcik7XG4gICAgfVxuXG4gICAgZ2V0Q3VycmVudFRpbWV6b25lKCk6IERhdGVUaW1lUGlja2VyVGltZXpvbmUge1xuICAgICAgICBjb25zdCBvZmZzZXQgPSBuZXcgRGF0ZSgpLmdldFRpbWV6b25lT2Zmc2V0KCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcudGltZXpvbmVzLmZpbmQodGltZXpvbmUgPT4gdGltZXpvbmUub2Zmc2V0ID09PSBvZmZzZXQpO1xuICAgIH1cblxuICAgIHNldFRpbWV6b25lKHRpbWV6b25lOiBEYXRlVGltZVBpY2tlclRpbWV6b25lKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGltZXpvbmUkLm5leHQodGltZXpvbmUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGVudW0gRGF0ZVBpY2tlck1vZGUge1xuICAgIERheSxcbiAgICBNb250aCxcbiAgICBZZWFyXG59XG5cbmV4cG9ydCBlbnVtIE1vZGVEaXJlY3Rpb24ge1xuICAgIE5vbmUsXG4gICAgQXNjZW5kLFxuICAgIERlc2NlbmRcbn1cblxuZXhwb3J0IGVudW0gRGF0ZVBpY2tlckhlYWRlckV2ZW50IHtcbiAgICBQcmV2aW91cyxcbiAgICBOZXh0XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF0ZVRpbWVQaWNrZXJUaW1lem9uZSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIG9mZnNldDogbnVtYmVyO1xufSJdfQ==