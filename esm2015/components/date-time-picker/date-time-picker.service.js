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
export class DateTimePickerService {
    /**
     * @param {?} _config
     */
    constructor(_config) {
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
        this._subscription = this.selected$.pipe(distinctUntilChanged(dateComparator)).subscribe(date => {
            // the month and year displayed in the viewport should reflect the newly selected items
            this.setViewportMonth(date.getMonth());
            this.setViewportYear(date.getFullYear());
            // emit the new date to the component host
            this.date$.next(date);
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * @param {?} month
     * @return {?}
     */
    setViewportMonth(month) {
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
    }
    /**
     * @param {?} year
     * @return {?}
     */
    setViewportYear(year) {
        this.year$.next(year);
    }
    /**
     * @param {?} day
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    setDate(day, month, year) {
        const /** @type {?} */ date = new Date(this.selected$.value);
        date.setDate(day);
        date.setMonth(month);
        date.setFullYear(year);
        this.selected$.next(date);
    }
    /**
     * @return {?}
     */
    setDateToNow() {
        this.selected$.next(new Date());
    }
    /**
     * @param {?} mode
     * @return {?}
     */
    setViewportMode(mode) {
        this.mode$.next(mode);
    }
    /**
     * @return {?}
     */
    goToChildMode() {
        this.modeDirection = ModeDirection.Descend;
        switch (this.mode$.value) {
            case DatePickerMode.Year:
                return this.setViewportMode(DatePickerMode.Month);
            case DatePickerMode.Month:
                return this.setViewportMode(DatePickerMode.Day);
        }
    }
    /**
     * @return {?}
     */
    goToParentMode() {
        this.modeDirection = ModeDirection.Ascend;
        switch (this.mode$.value) {
            case DatePickerMode.Day:
                return this.setViewportMode(DatePickerMode.Month);
            case DatePickerMode.Month:
                return this.setViewportMode(DatePickerMode.Year);
        }
    }
    /**
     * @return {?}
     */
    goToNext() {
        this.headerEvent$.next(DatePickerHeaderEvent.Next);
    }
    /**
     * @return {?}
     */
    goToPrevious() {
        this.headerEvent$.next(DatePickerHeaderEvent.Previous);
    }
    /**
     * @param {?} header
     * @return {?}
     */
    setHeader(header) {
        this.header$.next(header);
    }
    /**
     * @return {?}
     */
    getCurrentTimezone() {
        const /** @type {?} */ offset = new Date().getTimezoneOffset();
        const /** @type {?} */ zones = this._config ? this._config.timezones : timezones;
        return zones.find(timezone => timezone.offset === offset);
    }
    /**
     * @param {?} timezone
     * @return {?}
     */
    setTimezone(timezone) {
        this.timezone$.next(timezone);
    }
}
DateTimePickerService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DateTimePickerService.ctorParameters = () => [
    { type: DateTimePickerConfig, decorators: [{ type: Optional }] }
];
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
const DatePickerMode = {
    Day: 0,
    Month: 1,
    Year: 2,
};
export { DatePickerMode };
DatePickerMode[DatePickerMode.Day] = "Day";
DatePickerMode[DatePickerMode.Month] = "Month";
DatePickerMode[DatePickerMode.Year] = "Year";
/** @enum {number} */
const ModeDirection = {
    None: 0,
    Ascend: 1,
    Descend: 2,
};
export { ModeDirection };
ModeDirection[ModeDirection.None] = "None";
ModeDirection[ModeDirection.Ascend] = "Ascend";
ModeDirection[ModeDirection.Descend] = "Descend";
/** @enum {number} */
const DatePickerHeaderEvent = {
    Previous: 0,
    Next: 1,
};
export { DatePickerHeaderEvent };
DatePickerHeaderEvent[DatePickerHeaderEvent.Previous] = "Previous";
DatePickerHeaderEvent[DatePickerHeaderEvent.Next] = "Next";

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGF0ZS10aW1lLXBpY2tlci9kYXRlLXRpbWUtcGlja2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXZDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBMEIsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBR2pJLE1BQU07Ozs7SUE4QkYsWUFBZ0MsT0FBNkI7UUFBN0IsWUFBTyxHQUFQLE9BQU8sQ0FBc0I7cUJBNUJwQixJQUFJLGVBQWUsQ0FBaUIsY0FBYyxDQUFDLEdBQUcsQ0FBQztxQkFDakUsSUFBSSxlQUFlLENBQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQzt5QkFDeEQsSUFBSSxlQUFlLENBQXlCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO3lCQUMvQyxJQUFJLGVBQWUsQ0FBTyxJQUFJLElBQUksRUFBRSxDQUFDOztzQkFHdEMsSUFBSSxlQUFlLENBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztxQkFDbkQsSUFBSSxlQUFlLENBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQzt5QkFFMUUsSUFBSSxlQUFlLENBQVUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENB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LE1BQU0sS0FBSyxNQUFNLENBQUMsQ0FBQztLQUM3RDs7Ozs7SUFFRCxXQUFXLENBQUMsUUFBZ0M7UUFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDakM7OztZQWpJSixVQUFVOzs7O1lBSEYsb0JBQW9CLHVCQWtDWixRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEYXRlVGltZVBpY2tlckNvbmZpZyB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci5jb25maWcnO1xuaW1wb3J0IHsgZGF0ZUNvbXBhcmF0b3IsIHdlZWtkYXlzU2hvcnQsIHRpbWV6b25lcywgRGF0ZVRpbWVQaWNrZXJUaW1lem9uZSwgbW9udGhzLCBtb250aHNTaG9ydCB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci51dGlscyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXRlVGltZVBpY2tlclNlcnZpY2Uge1xuXG4gICAgbW9kZSQ6IEJlaGF2aW9yU3ViamVjdDxEYXRlUGlja2VyTW9kZT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERhdGVQaWNrZXJNb2RlPihEYXRlUGlja2VyTW9kZS5EYXkpO1xuICAgIGRhdGUkOiBCZWhhdmlvclN1YmplY3Q8RGF0ZT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERhdGU+KG5ldyBEYXRlKCkpO1xuICAgIHRpbWV6b25lJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RGF0ZVRpbWVQaWNrZXJUaW1lem9uZT4odGhpcy5nZXRDdXJyZW50VGltZXpvbmUoKSk7XG4gICAgc2VsZWN0ZWQkOiBCZWhhdmlvclN1YmplY3Q8RGF0ZT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERhdGU+KG5ldyBEYXRlKCkpO1xuXG4gICAgLy8gdGhlIG1vbnRoIGFuZCB5ZWFyIHRvIGRpc3BsYXkgaW4gdGhlIHZpZXdwb3J0XG4gICAgbW9udGgkOiBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPihuZXcgRGF0ZSgpLmdldE1vbnRoKCkpO1xuICAgIHllYXIkOiBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPihuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkpO1xuXG4gICAgc2hvd0RhdGUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0aGlzLl9jb25maWcgPyB0aGlzLl9jb25maWcuc2hvd0RhdGUgOiB0cnVlKTtcbiAgICBzaG93VGltZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRoaXMuX2NvbmZpZyA/IHRoaXMuX2NvbmZpZy5zaG93VGltZSA6IHRydWUpO1xuICAgIHNob3dUaW1lem9uZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRoaXMuX2NvbmZpZyA/IHRoaXMuX2NvbmZpZy5zaG93VGltZXpvbmUgOiB0cnVlKTtcbiAgICBzaG93U2Vjb25kcyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRoaXMuX2NvbmZpZyA/IHRoaXMuX2NvbmZpZy5zaG93U2Vjb25kcyA6IGZhbHNlKTtcbiAgICBzaG93TWVyaWRpYW4kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0aGlzLl9jb25maWcgPyB0aGlzLl9jb25maWcuc2hvd01lcmlkaWFuIDogdHJ1ZSk7XG4gICAgc2hvd1NwaW5uZXJzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odGhpcy5fY29uZmlnID8gdGhpcy5fY29uZmlnLnNob3dTcGlubmVycyA6IHRydWUpO1xuICAgIHdlZWtkYXlzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KHRoaXMuX2NvbmZpZyA/IHRoaXMuX2NvbmZpZy53ZWVrZGF5cyA6IHdlZWtkYXlzU2hvcnQpO1xuICAgIG5vd0J0blRleHQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KHRoaXMuX2NvbmZpZyA/IHRoaXMuX2NvbmZpZy5ub3dCdG5UZXh0IDogJ1RvZGF5Jyk7XG4gICAgdGltZXpvbmVzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RGF0ZVRpbWVQaWNrZXJUaW1lem9uZVtdPih0aGlzLl9jb25maWcgPyB0aGlzLl9jb25maWcudGltZXpvbmVzIDogdGltZXpvbmVzKTtcblxuICAgIGhlYWRlciQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4obnVsbCk7XG4gICAgaGVhZGVyRXZlbnQkID0gbmV3IFN1YmplY3Q8RGF0ZVBpY2tlckhlYWRlckV2ZW50PigpO1xuICAgIG1vZGVEaXJlY3Rpb246IE1vZGVEaXJlY3Rpb24gPSBNb2RlRGlyZWN0aW9uLk5vbmU7XG5cbiAgICBtb250aHM6IHN0cmluZ1tdID0gdGhpcy5fY29uZmlnID8gdGhpcy5fY29uZmlnLm1vbnRocyA6IG1vbnRocztcbiAgICBtb250aHNTaG9ydDogc3RyaW5nW10gPSB0aGlzLl9jb25maWcgPyB0aGlzLl9jb25maWcubW9udGhzU2hvcnQgOiBtb250aHNTaG9ydDtcblxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgcHJpdmF0ZSBfY29uZmlnOiBEYXRlVGltZVBpY2tlckNvbmZpZykge1xuXG4gICAgICAgIC8vIHdoZW4gdGhlIGFjdGl2ZSBkYXRlIGNoYW5nZXMgc2V0IHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgZGF0ZVxuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSB0aGlzLnNlbGVjdGVkJC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKGRhdGVDb21wYXJhdG9yKSkuc3Vic2NyaWJlKGRhdGUgPT4ge1xuXG4gICAgICAgICAgICAvLyB0aGUgbW9udGggYW5kIHllYXIgZGlzcGxheWVkIGluIHRoZSB2aWV3cG9ydCBzaG91bGQgcmVmbGVjdCB0aGUgbmV3bHkgc2VsZWN0ZWQgaXRlbXNcbiAgICAgICAgICAgIHRoaXMuc2V0Vmlld3BvcnRNb250aChkYXRlLmdldE1vbnRoKCkpO1xuICAgICAgICAgICAgdGhpcy5zZXRWaWV3cG9ydFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpKTtcblxuICAgICAgICAgICAgLy8gZW1pdCB0aGUgbmV3IGRhdGUgdG8gdGhlIGNvbXBvbmVudCBob3N0XG4gICAgICAgICAgICB0aGlzLmRhdGUkLm5leHQoZGF0ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBzZXRWaWV3cG9ydE1vbnRoKG1vbnRoOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKG1vbnRoIDwgMCkge1xuICAgICAgICAgICAgdGhpcy5tb250aCQubmV4dCgxMSk7XG4gICAgICAgICAgICB0aGlzLnllYXIkLm5leHQodGhpcy55ZWFyJC52YWx1ZSAtIDEpO1xuICAgICAgICB9IGVsc2UgaWYgKG1vbnRoID4gMTEpIHtcbiAgICAgICAgICAgIHRoaXMubW9udGgkLm5leHQoMCk7XG4gICAgICAgICAgICB0aGlzLnllYXIkLm5leHQodGhpcy55ZWFyJC52YWx1ZSArIDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tb250aCQubmV4dChtb250aCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRWaWV3cG9ydFllYXIoeWVhcjogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMueWVhciQubmV4dCh5ZWFyKTtcbiAgICB9XG5cbiAgICBzZXREYXRlKGRheTogbnVtYmVyLCBtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHRoaXMuc2VsZWN0ZWQkLnZhbHVlKTtcblxuICAgICAgICBkYXRlLnNldERhdGUoZGF5KTtcbiAgICAgICAgZGF0ZS5zZXRNb250aChtb250aCk7XG4gICAgICAgIGRhdGUuc2V0RnVsbFllYXIoeWVhcik7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZCQubmV4dChkYXRlKTtcbiAgICB9XG5cbiAgICBzZXREYXRlVG9Ob3coKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQkLm5leHQobmV3IERhdGUoKSk7XG4gICAgfVxuXG4gICAgc2V0Vmlld3BvcnRNb2RlKG1vZGU6IERhdGVQaWNrZXJNb2RlKTogdm9pZCB7XG4gICAgICAgIHRoaXMubW9kZSQubmV4dChtb2RlKTtcbiAgICB9XG5cbiAgICBnb1RvQ2hpbGRNb2RlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1vZGVEaXJlY3Rpb24gPSBNb2RlRGlyZWN0aW9uLkRlc2NlbmQ7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLm1vZGUkLnZhbHVlKSB7XG5cbiAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlck1vZGUuWWVhcjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRWaWV3cG9ydE1vZGUoRGF0ZVBpY2tlck1vZGUuTW9udGgpO1xuXG4gICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJNb2RlLk1vbnRoOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFZpZXdwb3J0TW9kZShEYXRlUGlja2VyTW9kZS5EYXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ29Ub1BhcmVudE1vZGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubW9kZURpcmVjdGlvbiA9IE1vZGVEaXJlY3Rpb24uQXNjZW5kO1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5tb2RlJC52YWx1ZSkge1xuXG4gICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJNb2RlLkRheTpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRWaWV3cG9ydE1vZGUoRGF0ZVBpY2tlck1vZGUuTW9udGgpO1xuXG4gICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJNb2RlLk1vbnRoOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFZpZXdwb3J0TW9kZShEYXRlUGlja2VyTW9kZS5ZZWFyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdvVG9OZXh0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmhlYWRlckV2ZW50JC5uZXh0KERhdGVQaWNrZXJIZWFkZXJFdmVudC5OZXh0KTtcbiAgICB9XG5cbiAgICBnb1RvUHJldmlvdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaGVhZGVyRXZlbnQkLm5leHQoRGF0ZVBpY2tlckhlYWRlckV2ZW50LlByZXZpb3VzKTtcbiAgICB9XG5cbiAgICBzZXRIZWFkZXIoaGVhZGVyOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5oZWFkZXIkLm5leHQoaGVhZGVyKTtcbiAgICB9XG5cbiAgICBnZXRDdXJyZW50VGltZXpvbmUoKTogRGF0ZVRpbWVQaWNrZXJUaW1lem9uZSB7XG4gICAgICAgIGNvbnN0IG9mZnNldCA9IG5ldyBEYXRlKCkuZ2V0VGltZXpvbmVPZmZzZXQoKTtcbiAgICAgICAgY29uc3Qgem9uZXMgPSB0aGlzLl9jb25maWcgPyB0aGlzLl9jb25maWcudGltZXpvbmVzIDogdGltZXpvbmVzO1xuICAgICAgICByZXR1cm4gem9uZXMuZmluZCh0aW1lem9uZSA9PiB0aW1lem9uZS5vZmZzZXQgPT09IG9mZnNldCk7XG4gICAgfVxuXG4gICAgc2V0VGltZXpvbmUodGltZXpvbmU6IERhdGVUaW1lUGlja2VyVGltZXpvbmUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50aW1lem9uZSQubmV4dCh0aW1lem9uZSk7XG4gICAgfVxufVxuXG5leHBvcnQgZW51bSBEYXRlUGlja2VyTW9kZSB7XG4gICAgRGF5LFxuICAgIE1vbnRoLFxuICAgIFllYXJcbn1cblxuZXhwb3J0IGVudW0gTW9kZURpcmVjdGlvbiB7XG4gICAgTm9uZSxcbiAgICBBc2NlbmQsXG4gICAgRGVzY2VuZFxufVxuXG5leHBvcnQgZW51bSBEYXRlUGlja2VySGVhZGVyRXZlbnQge1xuICAgIFByZXZpb3VzLFxuICAgIE5leHRcbn0iXX0=