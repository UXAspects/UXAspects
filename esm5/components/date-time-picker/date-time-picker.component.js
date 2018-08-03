/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { distinctUntilChanged } from 'rxjs/operators';
import { DatePickerMode, DateTimePickerService } from './date-time-picker.service';
import { dateComparator, timezoneComparator } from './date-time-picker.utils';
var DateTimePickerComponent = /** @class */ (function () {
    function DateTimePickerComponent(datepicker) {
        var _this = this;
        this.datepicker = datepicker;
        this.dateChange = new EventEmitter();
        this.timezoneChange = new EventEmitter();
        // expose enum to view
        this.DatePickerMode = DatePickerMode;
        this._subscription = new Subscription();
        var /** @type {?} */ valueChange = datepicker.selected$.pipe(distinctUntilChanged(dateComparator))
            .subscribe(function (date) { return _this.dateChange.emit(date); });
        var /** @type {?} */ timezoneChange = datepicker.timezone$.pipe(distinctUntilChanged(timezoneComparator))
            .subscribe(function (timezone) { return _this.timezoneChange.emit(timezone); });
    }
    Object.defineProperty(DateTimePickerComponent.prototype, "showDate", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.datepicker.showDate$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "showTime", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.datepicker.showTime$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "showTimezone", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.datepicker.showTimezone$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "showSeconds", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.datepicker.showSeconds$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "showMeridian", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.datepicker.showMeridian$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "showSpinners", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.datepicker.showSpinners$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "weekdays", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.datepicker.weekdays$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "nowBtnText", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.datepicker.nowBtnText$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "timezones", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.datepicker.timezones$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "date", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!dateComparator(value, this.datepicker.selected$.value)) {
                this.datepicker.selected$.next(new Date(value));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "timezone", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.datepicker.timezone$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DateTimePickerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * Change the date to the current date and time
     */
    /**
     * Change the date to the current date and time
     * @return {?}
     */
    DateTimePickerComponent.prototype.setToNow = /**
     * Change the date to the current date and time
     * @return {?}
     */
    function () {
        // set the date to the current moment
        this.datepicker.setDateToNow();
    };
    DateTimePickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-date-time-picker',
                    template: "<div class=\"calendar-container\">\n\n  <ux-date-time-picker-header></ux-date-time-picker-header>\n\n  <ng-container *ngIf=\"datepicker.showDate$ | async\" [ngSwitch]=\"datepicker.mode$ | async\">\n\n      <!-- Display days in the current month -->\n      <ux-date-time-picker-day-view *ngSwitchCase=\"DatePickerMode.Day\"></ux-date-time-picker-day-view>\n\n      <!-- Display the months in the current year -->\n      <ux-date-time-picker-month-view *ngSwitchCase=\"DatePickerMode.Month\"></ux-date-time-picker-month-view>\n\n      <!-- Display a decade -->\n      <ux-date-time-picker-year-view *ngSwitchCase=\"DatePickerMode.Year\"></ux-date-time-picker-year-view>\n\n  </ng-container>\n\n  <!-- Display a Time Picker -->\n  <ux-date-time-picker-time-view *ngIf=\"datepicker.showTime$ | async\"></ux-date-time-picker-time-view>\n\n</div>\n\n<button class=\"now-button\" aria-label=\"Set date to now\" (click)=\"setToNow()\">{{ datepicker.nowBtnText$ | async }}</button>",
                    providers: [DateTimePickerService],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    DateTimePickerComponent.ctorParameters = function () { return [
        { type: DateTimePickerService }
    ]; };
    DateTimePickerComponent.propDecorators = {
        showDate: [{ type: Input }],
        showTime: [{ type: Input }],
        showTimezone: [{ type: Input }],
        showSeconds: [{ type: Input }],
        showMeridian: [{ type: Input }],
        showSpinners: [{ type: Input }],
        weekdays: [{ type: Input }],
        nowBtnText: [{ type: Input }],
        timezones: [{ type: Input }],
        dateChange: [{ type: Output }],
        timezoneChange: [{ type: Output }],
        date: [{ type: Input }],
        timezone: [{ type: Input }]
    };
    return DateTimePickerComponent;
}());
export { DateTimePickerComponent };
function DateTimePickerComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DateTimePickerComponent.prototype._timezone;
    /** @type {?} */
    DateTimePickerComponent.prototype.dateChange;
    /** @type {?} */
    DateTimePickerComponent.prototype.timezoneChange;
    /** @type {?} */
    DateTimePickerComponent.prototype.DatePickerMode;
    /** @type {?} */
    DateTimePickerComponent.prototype._subscription;
    /** @type {?} */
    DateTimePickerComponent.prototype.datepicker;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL2RhdGUtdGltZS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsY0FBYyxFQUFFLHFCQUFxQixFQUEwQixNQUFNLDRCQUE0QixDQUFDO0FBQzNHLE9BQU8sRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7SUFxRTVFLGlDQUFtQixVQUFpQztRQUFwRCxpQkFNQztRQU5rQixlQUFVLEdBQVYsVUFBVSxDQUF1QjswQkFwQlQsSUFBSSxZQUFZLEVBQVE7OEJBQ0YsSUFBSSxZQUFZLEVBQTBCOzs4QkFlMUYsY0FBYzs2QkFFUCxJQUFJLFlBQVksRUFBRTtRQUd4QyxxQkFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDaEYsU0FBUyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQTFCLENBQTBCLENBQUMsQ0FBQztRQUVqRCxxQkFBTSxjQUFjLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsQ0FBQzthQUN2RixTQUFTLENBQUMsVUFBQyxRQUFnQyxJ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MkJBSUwsS0FBSzs2QkFJTCxLQUFLOzRCQUlMLEtBQUs7NkJBS0wsTUFBTTtpQ0FDTixNQUFNO3VCQUVOLEtBQUs7MkJBT0wsS0FBSzs7a0NBL0RSOztTQVlhLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERhdGVQaWNrZXJNb2RlLCBEYXRlVGltZVBpY2tlclNlcnZpY2UsIERhdGVUaW1lUGlja2VyVGltZXpvbmUgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXIuc2VydmljZSc7XG5pbXBvcnQgeyBkYXRlQ29tcGFyYXRvciwgdGltZXpvbmVDb21wYXJhdG9yIH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLnV0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndXgtZGF0ZS10aW1lLXBpY2tlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9kYXRlLXRpbWUtcGlja2VyLmNvbXBvbmVudC5odG1sJyxcbiAgcHJvdmlkZXJzOiBbRGF0ZVRpbWVQaWNrZXJTZXJ2aWNlXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVRpbWVQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIHByaXZhdGUgX3RpbWV6b25lOiBEYXRlVGltZVBpY2tlclRpbWV6b25lO1xuXG4gIEBJbnB1dCgpIHNldCBzaG93RGF0ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuZGF0ZXBpY2tlci5zaG93RGF0ZSQubmV4dCh2YWx1ZSk7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgc2hvd1RpbWUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmRhdGVwaWNrZXIuc2hvd1RpbWUkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IHNob3dUaW1lem9uZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuZGF0ZXBpY2tlci5zaG93VGltZXpvbmUkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IHNob3dTZWNvbmRzKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5kYXRlcGlja2VyLnNob3dTZWNvbmRzJC5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBzaG93TWVyaWRpYW4odmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmRhdGVwaWNrZXIuc2hvd01lcmlkaWFuJC5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBzaG93U3Bpbm5lcnModmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmRhdGVwaWNrZXIuc2hvd1NwaW5uZXJzJC5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCB3ZWVrZGF5cyh2YWx1ZTogc3RyaW5nW10pIHtcbiAgICB0aGlzLmRhdGVwaWNrZXIud2Vla2RheXMkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IG5vd0J0blRleHQodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuZGF0ZXBpY2tlci5ub3dCdG5UZXh0JC5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCB0aW1lem9uZXModmFsdWU6IERhdGVUaW1lUGlja2VyVGltZXpvbmVbXSkge1xuICAgIHRoaXMuZGF0ZXBpY2tlci50aW1lem9uZXMkLm5leHQodmFsdWUpO1xuICB9XG5cblxuICBAT3V0cHV0KCkgZGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPERhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxEYXRlPigpO1xuICBAT3V0cHV0KCkgdGltZXpvbmVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEYXRlVGltZVBpY2tlclRpbWV6b25lPiA9IG5ldyBFdmVudEVtaXR0ZXI8RGF0ZVRpbWVQaWNrZXJUaW1lem9uZT4oKTtcblxuICBASW5wdXQoKVxuICBzZXQgZGF0ZSh2YWx1ZTogRGF0ZSkge1xuICAgIGlmICghZGF0ZUNvbXBhcmF0b3IodmFsdWUsIHRoaXMuZGF0ZXBpY2tlci5zZWxlY3RlZCQudmFsdWUpKSB7XG4gICAgICB0aGlzLmRhdGVwaWNrZXIuc2VsZWN0ZWQkLm5leHQobmV3IERhdGUodmFsdWUpKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgdGltZXpvbmUodmFsdWU6IERhdGVUaW1lUGlja2VyVGltZXpvbmUpIHtcbiAgICB0aGlzLmRhdGVwaWNrZXIudGltZXpvbmUkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgLy8gZXhwb3NlIGVudW0gdG8gdmlld1xuICBEYXRlUGlja2VyTW9kZSA9IERhdGVQaWNrZXJNb2RlO1xuXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZGF0ZXBpY2tlcjogRGF0ZVRpbWVQaWNrZXJTZXJ2aWNlKSB7XG4gICAgY29uc3QgdmFsdWVDaGFuZ2UgPSBkYXRlcGlja2VyLnNlbGVjdGVkJC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKGRhdGVDb21wYXJhdG9yKSlcbiAgICAgIC5zdWJzY3JpYmUoZGF0ZSA9PiB0aGlzLmRhdGVDaGFuZ2UuZW1pdChkYXRlKSk7XG5cbiAgICBjb25zdCB0aW1lem9uZUNoYW5nZSA9IGRhdGVwaWNrZXIudGltZXpvbmUkLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQodGltZXpvbmVDb21wYXJhdG9yKSlcbiAgICAgIC5zdWJzY3JpYmUoKHRpbWV6b25lOiBEYXRlVGltZVBpY2tlclRpbWV6b25lKSA9PiB0aGlzLnRpbWV6b25lQ2hhbmdlLmVtaXQodGltZXpvbmUpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZSB0aGUgZGF0ZSB0byB0aGUgY3VycmVudCBkYXRlIGFuZCB0aW1lXG4gICAqL1xuICBzZXRUb05vdygpOiB2b2lkIHtcblxuICAgIC8vIHNldCB0aGUgZGF0ZSB0byB0aGUgY3VycmVudCBtb21lbnRcbiAgICB0aGlzLmRhdGVwaWNrZXIuc2V0RGF0ZVRvTm93KCk7XG4gIH1cbn0iXX0=