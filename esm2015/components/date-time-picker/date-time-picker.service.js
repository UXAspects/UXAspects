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
        return this._config.timezones.find(timezone => timezone.offset === offset);
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
    { type: DateTimePickerConfig }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGF0ZS10aW1lLXBpY2tlci9kYXRlLXRpbWUtcGlja2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFdkMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDakUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRzFELE1BQU07Ozs7SUEyQkYsWUFBb0IsT0FBNkI7UUFBN0IsWUFBTyxHQUFQLE9BQU8sQ0FBc0I7cUJBekJSLElBQUksZUFBZSxDQUFpQixjQUFjLENBQUMsR0FBRyxDQUFDO3FCQUNqRSxJQUFJLGVBQWUsQ0FBTyxJQUFJLElBQUksRUFBRSxDQUFDO3lCQUN4RCxJQUFJLGVBQWUsQ0FBeUIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7eUJBQy9DLElBQUksZUFBZSxDQUFPLElBQUksSUFBSSxFQUFFLENBQUM7O3NCQUd0QyxJQUFJLGVBQWUsQ0FBUyxJQUFJLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO3FCQUNuRCxJQUFJLGVBQWUsQ0FBUyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO3lCQUUxRSxJQUFJLGVBQWUsQ0FBVSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt5QkFDbkQsSUFBSSxlQUFlLENBQVUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENB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RCxrQkFBa0I7UUFDZCx1QkFBTSxNQUFNLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzlDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDO0tBQzlFOzs7OztJQUVELFdBQVcsQ0FBQyxRQUFnQztRQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUNqQzs7O1lBN0hKLFVBQVU7Ozs7WUFIRixvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGF0ZVRpbWVQaWNrZXJDb25maWcgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXIuY29uZmlnJztcbmltcG9ydCB7IGRhdGVDb21wYXJhdG9yIH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLnV0aWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGVUaW1lUGlja2VyU2VydmljZSB7XG5cbiAgICBtb2RlJDogQmVoYXZpb3JTdWJqZWN0PERhdGVQaWNrZXJNb2RlPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RGF0ZVBpY2tlck1vZGU+KERhdGVQaWNrZXJNb2RlLkRheSk7XG4gICAgZGF0ZSQ6IEJlaGF2aW9yU3ViamVjdDxEYXRlPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RGF0ZT4obmV3IERhdGUoKSk7XG4gICAgdGltZXpvbmUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEYXRlVGltZVBpY2tlclRpbWV6b25lPih0aGlzLmdldEN1cnJlbnRUaW1lem9uZSgpKTtcbiAgICBzZWxlY3RlZCQ6IEJlaGF2aW9yU3ViamVjdDxEYXRlPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RGF0ZT4obmV3IERhdGUoKSk7XG5cbiAgICAvLyB0aGUgbW9udGggYW5kIHllYXIgdG8gZGlzcGxheSBpbiB0aGUgdmlld3BvcnRcbiAgICBtb250aCQ6IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KG5ldyBEYXRlKCkuZ2V0TW9udGgoKSk7XG4gICAgeWVhciQ6IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSk7XG5cbiAgICBzaG93RGF0ZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRoaXMuX2NvbmZpZy5zaG93RGF0ZSk7XG4gICAgc2hvd1RpbWUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0aGlzLl9jb25maWcuc2hvd1RpbWUpO1xuICAgIHNob3dUaW1lem9uZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRoaXMuX2NvbmZpZy5zaG93VGltZXpvbmUpO1xuICAgIHNob3dTZWNvbmRzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odGhpcy5fY29uZmlnLnNob3dTZWNvbmRzKTtcbiAgICBzaG93TWVyaWRpYW4kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0aGlzLl9jb25maWcuc2hvd01lcmlkaWFuKTtcbiAgICBzaG93U3Bpbm5lcnMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0aGlzLl9jb25maWcuc2hvd1NwaW5uZXJzKTtcbiAgICB3ZWVrZGF5cyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPih0aGlzLl9jb25maWcud2Vla2RheXMpO1xuICAgIG5vd0J0blRleHQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KHRoaXMuX2NvbmZpZy5ub3dCdG5UZXh0KTtcbiAgICB0aW1lem9uZXMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEYXRlVGltZVBpY2tlclRpbWV6b25lW10+KHRoaXMuX2NvbmZpZy50aW1lem9uZXMpO1xuXG4gICAgaGVhZGVyJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPihudWxsKTtcbiAgICBoZWFkZXJFdmVudCQgPSBuZXcgU3ViamVjdDxEYXRlUGlja2VySGVhZGVyRXZlbnQ+KCk7XG4gICAgbW9kZURpcmVjdGlvbjogTW9kZURpcmVjdGlvbiA9IE1vZGVEaXJlY3Rpb24uTm9uZTtcblxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfY29uZmlnOiBEYXRlVGltZVBpY2tlckNvbmZpZykge1xuXG4gICAgICAgIC8vIHdoZW4gdGhlIGFjdGl2ZSBkYXRlIGNoYW5nZXMgc2V0IHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgZGF0ZVxuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSB0aGlzLnNlbGVjdGVkJC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKGRhdGVDb21wYXJhdG9yKSkuc3Vic2NyaWJlKGRhdGUgPT4ge1xuXG4gICAgICAgICAgICAvLyB0aGUgbW9udGggYW5kIHllYXIgZGlzcGxheWVkIGluIHRoZSB2aWV3cG9ydCBzaG91bGQgcmVmbGVjdCB0aGUgbmV3bHkgc2VsZWN0ZWQgaXRlbXNcbiAgICAgICAgICAgIHRoaXMuc2V0Vmlld3BvcnRNb250aChkYXRlLmdldE1vbnRoKCkpO1xuICAgICAgICAgICAgdGhpcy5zZXRWaWV3cG9ydFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpKTtcblxuICAgICAgICAgICAgLy8gZW1pdCB0aGUgbmV3IGRhdGUgdG8gdGhlIGNvbXBvbmVudCBob3N0XG4gICAgICAgICAgICB0aGlzLmRhdGUkLm5leHQoZGF0ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBzZXRWaWV3cG9ydE1vbnRoKG1vbnRoOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKG1vbnRoIDwgMCkge1xuICAgICAgICAgICAgdGhpcy5tb250aCQubmV4dCgxMSk7XG4gICAgICAgICAgICB0aGlzLnllYXIkLm5leHQodGhpcy55ZWFyJC52YWx1ZSAtIDEpO1xuICAgICAgICB9IGVsc2UgaWYgKG1vbnRoID4gMTEpIHtcbiAgICAgICAgICAgIHRoaXMubW9udGgkLm5leHQoMCk7XG4gICAgICAgICAgICB0aGlzLnllYXIkLm5leHQodGhpcy55ZWFyJC52YWx1ZSArIDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tb250aCQubmV4dChtb250aCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRWaWV3cG9ydFllYXIoeWVhcjogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMueWVhciQubmV4dCh5ZWFyKTtcbiAgICB9XG5cbiAgICBzZXREYXRlKGRheTogbnVtYmVyLCBtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHRoaXMuc2VsZWN0ZWQkLnZhbHVlKTtcblxuICAgICAgICBkYXRlLnNldERhdGUoZGF5KTtcbiAgICAgICAgZGF0ZS5zZXRNb250aChtb250aCk7XG4gICAgICAgIGRhdGUuc2V0RnVsbFllYXIoeWVhcik7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZCQubmV4dChkYXRlKTtcbiAgICB9XG5cbiAgICBzZXREYXRlVG9Ob3coKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQkLm5leHQobmV3IERhdGUoKSk7XG4gICAgfVxuXG4gICAgc2V0Vmlld3BvcnRNb2RlKG1vZGU6IERhdGVQaWNrZXJNb2RlKTogdm9pZCB7XG4gICAgICAgIHRoaXMubW9kZSQubmV4dChtb2RlKTtcbiAgICB9XG5cbiAgICBnb1RvQ2hpbGRNb2RlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1vZGVEaXJlY3Rpb24gPSBNb2RlRGlyZWN0aW9uLkRlc2NlbmQ7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLm1vZGUkLnZhbHVlKSB7XG5cbiAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlck1vZGUuWWVhcjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRWaWV3cG9ydE1vZGUoRGF0ZVBpY2tlck1vZGUuTW9udGgpO1xuXG4gICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJNb2RlLk1vbnRoOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFZpZXdwb3J0TW9kZShEYXRlUGlja2VyTW9kZS5EYXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ29Ub1BhcmVudE1vZGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubW9kZURpcmVjdGlvbiA9IE1vZGVEaXJlY3Rpb24uQXNjZW5kO1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5tb2RlJC52YWx1ZSkge1xuXG4gICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJNb2RlLkRheTpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRWaWV3cG9ydE1vZGUoRGF0ZVBpY2tlck1vZGUuTW9udGgpO1xuXG4gICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJNb2RlLk1vbnRoOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFZpZXdwb3J0TW9kZShEYXRlUGlja2VyTW9kZS5ZZWFyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdvVG9OZXh0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmhlYWRlckV2ZW50JC5uZXh0KERhdGVQaWNrZXJIZWFkZXJFdmVudC5OZXh0KTtcbiAgICB9XG5cbiAgICBnb1RvUHJldmlvdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaGVhZGVyRXZlbnQkLm5leHQoRGF0ZVBpY2tlckhlYWRlckV2ZW50LlByZXZpb3VzKTtcbiAgICB9XG5cbiAgICBzZXRIZWFkZXIoaGVhZGVyOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5oZWFkZXIkLm5leHQoaGVhZGVyKTtcbiAgICB9XG5cbiAgICBnZXRDdXJyZW50VGltZXpvbmUoKTogRGF0ZVRpbWVQaWNrZXJUaW1lem9uZSB7XG4gICAgICAgIGNvbnN0IG9mZnNldCA9IG5ldyBEYXRlKCkuZ2V0VGltZXpvbmVPZmZzZXQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy50aW1lem9uZXMuZmluZCh0aW1lem9uZSA9PiB0aW1lem9uZS5vZmZzZXQgPT09IG9mZnNldCk7XG4gICAgfVxuXG4gICAgc2V0VGltZXpvbmUodGltZXpvbmU6IERhdGVUaW1lUGlja2VyVGltZXpvbmUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50aW1lem9uZSQubmV4dCh0aW1lem9uZSk7XG4gICAgfVxufVxuXG5leHBvcnQgZW51bSBEYXRlUGlja2VyTW9kZSB7XG4gICAgRGF5LFxuICAgIE1vbnRoLFxuICAgIFllYXJcbn1cblxuZXhwb3J0IGVudW0gTW9kZURpcmVjdGlvbiB7XG4gICAgTm9uZSxcbiAgICBBc2NlbmQsXG4gICAgRGVzY2VuZFxufVxuXG5leHBvcnQgZW51bSBEYXRlUGlja2VySGVhZGVyRXZlbnQge1xuICAgIFByZXZpb3VzLFxuICAgIE5leHRcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEYXRlVGltZVBpY2tlclRpbWV6b25lIHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgb2Zmc2V0OiBudW1iZXI7XG59Il19