/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { DatePickerMode, DateTimePickerService } from './date-time-picker.service';
import { dateComparator, timezoneComparator } from './date-time-picker.utils';
export class DateTimePickerComponent {
    /**
     * @param {?} datepicker
     */
    constructor(datepicker) {
        this.datepicker = datepicker;
        this.dateChange = new EventEmitter();
        this.timezoneChange = new EventEmitter();
        // expose enum to view
        this.DatePickerMode = DatePickerMode;
        this._onDestroy = new Subject();
        datepicker.selected$.pipe(takeUntil(this._onDestroy), distinctUntilChanged(dateComparator))
            .subscribe(date => this.dateChange.emit(date));
        datepicker.timezone$.pipe(takeUntil(this._onDestroy), distinctUntilChanged(timezoneComparator))
            .subscribe((timezone) => this.timezoneChange.emit(timezone));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showDate(value) {
        this.datepicker.showDate$.next(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showTime(value) {
        this.datepicker.showTime$.next(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showTimezone(value) {
        this.datepicker.showTimezone$.next(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showSeconds(value) {
        this.datepicker.showSeconds$.next(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showMeridian(value) {
        this.datepicker.showMeridian$.next(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showSpinners(value) {
        this.datepicker.showSpinners$.next(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set weekdays(value) {
        this.datepicker.weekdays$.next(value);
    }
    /**
     * @param {?} months
     * @return {?}
     */
    set months(months) {
        this.datepicker.months = months;
    }
    /**
     * @param {?} months
     * @return {?}
     */
    set monthsShort(months) {
        this.datepicker.monthsShort = months;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nowBtnText(value) {
        this.datepicker.nowBtnText$.next(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set timezones(value) {
        this.datepicker.timezones$.next(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set date(value) {
        if (!dateComparator(value, this.datepicker.selected$.value)) {
            this.datepicker.selected$.next(new Date(value));
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set timezone(value) {
        this.datepicker.timezone$.next(value);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * Change the date to the current date and time
     * @return {?}
     */
    setToNow() {
        // set the date to the current moment
        this.datepicker.setDateToNow();
    }
}
DateTimePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-date-time-picker',
                template: "<div class=\"calendar-container\">\n\n  <ux-date-time-picker-header></ux-date-time-picker-header>\n\n  <ng-container *ngIf=\"datepicker.showDate$ | async\" [ngSwitch]=\"datepicker.mode$ | async\">\n\n      <!-- Display days in the current month -->\n      <ux-date-time-picker-day-view *ngSwitchCase=\"DatePickerMode.Day\"></ux-date-time-picker-day-view>\n\n      <!-- Display the months in the current year -->\n      <ux-date-time-picker-month-view *ngSwitchCase=\"DatePickerMode.Month\"></ux-date-time-picker-month-view>\n\n      <!-- Display a decade -->\n      <ux-date-time-picker-year-view *ngSwitchCase=\"DatePickerMode.Year\"></ux-date-time-picker-year-view>\n\n  </ng-container>\n\n  <!-- Display a Time Picker -->\n  <ux-date-time-picker-time-view *ngIf=\"datepicker.showTime$ | async\"></ux-date-time-picker-time-view>\n\n</div>\n\n<button class=\"now-button\" aria-label=\"Set date to now\" (click)=\"setToNow()\">{{ datepicker.nowBtnText$ | async }}</button>",
                providers: [DateTimePickerService],
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
DateTimePickerComponent.ctorParameters = () => [
    { type: DateTimePickerService }
];
DateTimePickerComponent.propDecorators = {
    showDate: [{ type: Input }],
    showTime: [{ type: Input }],
    showTimezone: [{ type: Input }],
    showSeconds: [{ type: Input }],
    showMeridian: [{ type: Input }],
    showSpinners: [{ type: Input }],
    weekdays: [{ type: Input }],
    months: [{ type: Input }],
    monthsShort: [{ type: Input }],
    nowBtnText: [{ type: Input }],
    timezones: [{ type: Input }],
    dateChange: [{ type: Output }],
    timezoneChange: [{ type: Output }],
    date: [{ type: Input }],
    timezone: [{ type: Input }]
};
function DateTimePickerComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DateTimePickerComponent.prototype.dateChange;
    /** @type {?} */
    DateTimePickerComponent.prototype.timezoneChange;
    /** @type {?} */
    DateTimePickerComponent.prototype.DatePickerMode;
    /** @type {?} */
    DateTimePickerComponent.prototype._onDestroy;
    /** @type {?} */
    DateTimePickerComponent.prototype.datepicker;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL2RhdGUtdGltZS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNHLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxjQUFjLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNuRixPQUFPLEVBQUUsY0FBYyxFQUEwQixrQkFBa0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBUXRHLE1BQU07Ozs7SUFrRUosWUFBbUIsVUFBaUM7UUFBakMsZUFBVSxHQUFWLFVBQVUsQ0FBdUI7MEJBcEJULElBQUksWUFBWSxFQUFROzhCQUNGLElBQUksWUFBWSxFQUEwQjs7OEJBZTFGLGNBQWM7MEJBRVYsSUFBSSxPQUFPLEVBQVE7UUFHdEMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUN4RixTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRWpELFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMs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LEtBQUs7MkJBSUwsS0FBSzsyQkFJTCxLQUFLO3VCQUlMLEtBQUs7cUJBSUwsS0FBSzswQkFJTCxLQUFLO3lCQUlMLEtBQUs7d0JBSUwsS0FBSzt5QkFJTCxNQUFNOzZCQUNOLE1BQU07bUJBRU4sS0FBSzt1QkFPTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IERhdGVQaWNrZXJNb2RlLCBEYXRlVGltZVBpY2tlclNlcnZpY2UgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXIuc2VydmljZSc7XG5pbXBvcnQgeyBkYXRlQ29tcGFyYXRvciwgRGF0ZVRpbWVQaWNrZXJUaW1lem9uZSwgdGltZXpvbmVDb21wYXJhdG9yIH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLnV0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndXgtZGF0ZS10aW1lLXBpY2tlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9kYXRlLXRpbWUtcGlja2VyLmNvbXBvbmVudC5odG1sJyxcbiAgcHJvdmlkZXJzOiBbRGF0ZVRpbWVQaWNrZXJTZXJ2aWNlXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVRpbWVQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIHNldCBzaG93RGF0ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuZGF0ZXBpY2tlci5zaG93RGF0ZSQubmV4dCh2YWx1ZSk7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgc2hvd1RpbWUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmRhdGVwaWNrZXIuc2hvd1RpbWUkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IHNob3dUaW1lem9uZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuZGF0ZXBpY2tlci5zaG93VGltZXpvbmUkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IHNob3dTZWNvbmRzKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5kYXRlcGlja2VyLnNob3dTZWNvbmRzJC5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBzaG93TWVyaWRpYW4odmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmRhdGVwaWNrZXIuc2hvd01lcmlkaWFuJC5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBzaG93U3Bpbm5lcnModmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmRhdGVwaWNrZXIuc2hvd1NwaW5uZXJzJC5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCB3ZWVrZGF5cyh2YWx1ZTogc3RyaW5nW10pIHtcbiAgICB0aGlzLmRhdGVwaWNrZXIud2Vla2RheXMkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IG1vbnRocyhtb250aHM6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5kYXRlcGlja2VyLm1vbnRocyA9IG1vbnRocztcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBtb250aHNTaG9ydChtb250aHM6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5kYXRlcGlja2VyLm1vbnRoc1Nob3J0ID0gbW9udGhzO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IG5vd0J0blRleHQodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuZGF0ZXBpY2tlci5ub3dCdG5UZXh0JC5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCB0aW1lem9uZXModmFsdWU6IERhdGVUaW1lUGlja2VyVGltZXpvbmVbXSkge1xuICAgIHRoaXMuZGF0ZXBpY2tlci50aW1lem9uZXMkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgQE91dHB1dCgpIGRhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEYXRlPiA9IG5ldyBFdmVudEVtaXR0ZXI8RGF0ZT4oKTtcbiAgQE91dHB1dCgpIHRpbWV6b25lQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RGF0ZVRpbWVQaWNrZXJUaW1lem9uZT4gPSBuZXcgRXZlbnRFbWl0dGVyPERhdGVUaW1lUGlja2VyVGltZXpvbmU+KCk7XG5cbiAgQElucHV0KClcbiAgc2V0IGRhdGUodmFsdWU6IERhdGUpIHtcbiAgICBpZiAoIWRhdGVDb21wYXJhdG9yKHZhbHVlLCB0aGlzLmRhdGVwaWNrZXIuc2VsZWN0ZWQkLnZhbHVlKSkge1xuICAgICAgdGhpcy5kYXRlcGlja2VyLnNlbGVjdGVkJC5uZXh0KG5ldyBEYXRlKHZhbHVlKSk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IHRpbWV6b25lKHZhbHVlOiBEYXRlVGltZVBpY2tlclRpbWV6b25lKSB7XG4gICAgdGhpcy5kYXRlcGlja2VyLnRpbWV6b25lJC5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIC8vIGV4cG9zZSBlbnVtIHRvIHZpZXdcbiAgRGF0ZVBpY2tlck1vZGUgPSBEYXRlUGlja2VyTW9kZTtcblxuICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkYXRlcGlja2VyOiBEYXRlVGltZVBpY2tlclNlcnZpY2UpIHtcbiAgICBkYXRlcGlja2VyLnNlbGVjdGVkJC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLCBkaXN0aW5jdFVudGlsQ2hhbmdlZChkYXRlQ29tcGFyYXRvcikpXG4gICAgICAuc3Vic2NyaWJlKGRhdGUgPT4gdGhpcy5kYXRlQ2hhbmdlLmVtaXQoZGF0ZSkpO1xuXG4gICAgZGF0ZXBpY2tlci50aW1lem9uZSQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSwgZGlzdGluY3RVbnRpbENoYW5nZWQodGltZXpvbmVDb21wYXJhdG9yKSlcbiAgICAgIC5zdWJzY3JpYmUoKHRpbWV6b25lOiBEYXRlVGltZVBpY2tlclRpbWV6b25lKSA9PiB0aGlzLnRpbWV6b25lQ2hhbmdlLmVtaXQodGltZXpvbmUpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlIHRoZSBkYXRlIHRvIHRoZSBjdXJyZW50IGRhdGUgYW5kIHRpbWVcbiAgICovXG4gIHNldFRvTm93KCk6IHZvaWQge1xuXG4gICAgLy8gc2V0IHRoZSBkYXRlIHRvIHRoZSBjdXJyZW50IG1vbWVudFxuICAgIHRoaXMuZGF0ZXBpY2tlci5zZXREYXRlVG9Ob3coKTtcbiAgfVxufSJdfQ==