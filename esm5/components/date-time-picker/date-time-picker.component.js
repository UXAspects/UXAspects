/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
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
        this._onDestroy = new Subject();
        datepicker.selected$.pipe(takeUntil(this._onDestroy), distinctUntilChanged(dateComparator))
            .subscribe(function (date) { return _this.dateChange.emit(date); });
        datepicker.timezone$.pipe(takeUntil(this._onDestroy), distinctUntilChanged(timezoneComparator))
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
    Object.defineProperty(DateTimePickerComponent.prototype, "months", {
        set: /**
         * @param {?} months
         * @return {?}
         */
        function (months) {
            this.datepicker.months = months;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "monthsShort", {
        set: /**
         * @param {?} months
         * @return {?}
         */
        function (months) {
            this.datepicker.monthsShort = months;
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
        this._onDestroy.next();
        this._onDestroy.complete();
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
        months: [{ type: Input }],
        monthsShort: [{ type: Input }],
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL2RhdGUtdGltZS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNHLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxjQUFjLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNuRixPQUFPLEVBQUUsY0FBYyxFQUEwQixrQkFBa0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztJQTBFcEcsaUNBQW1CLFVBQWlDO1FBQXBELGlCQU1DO1FBTmtCLGVBQVUsR0FBVixVQUFVLENBQXVCOzBCQXBCVCxJQUFJLFlBQVksRUFBUTs4QkFDRixJQUFJLFlBQVksRUFBMEI7OzhCQWUxRixjQUFjOzBCQUVWLElBQUksT0FBTyxFQUFRO1FBR3RDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDeEYsU0FBUyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQTFCLENBQTBCLENBQUMsQ0FBQztRQUVqRCxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLG9CQUFvQixDQUFD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SUFDSCwwQ0FBUTs7OztJQUFSOztRQUdFLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDaEM7O2dCQTVGRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsdzlCQUFnRDtvQkFDaEQsU0FBUyxFQUFFLENBQUMscUJBQXFCLENBQUM7b0JBQ2xDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs7OztnQkFSd0IscUJBQXFCOzs7MkJBVzNDLEtBQUs7MkJBSUwsS0FBSzsrQkFJTCxLQUFLOzhCQUlMLEtBQUs7K0JBSUwsS0FBSzsrQkFJTCxLQUFLOzJCQUlMLEtBQUs7eUJBSUwsS0FBSzs4QkFJTCxLQUFLOzZCQUlMLEtBQUs7NEJBSUwsS0FBSzs2QkFJTCxNQUFNO2lDQUNOLE1BQU07dUJBRU4sS0FBSzsyQkFPTCxLQUFLOztrQ0FwRVI7O1NBWWEsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IERhdGVQaWNrZXJNb2RlLCBEYXRlVGltZVBpY2tlclNlcnZpY2UgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXIuc2VydmljZSc7XG5pbXBvcnQgeyBkYXRlQ29tcGFyYXRvciwgRGF0ZVRpbWVQaWNrZXJUaW1lem9uZSwgdGltZXpvbmVDb21wYXJhdG9yIH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLnV0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndXgtZGF0ZS10aW1lLXBpY2tlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9kYXRlLXRpbWUtcGlja2VyLmNvbXBvbmVudC5odG1sJyxcbiAgcHJvdmlkZXJzOiBbRGF0ZVRpbWVQaWNrZXJTZXJ2aWNlXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVRpbWVQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIHNldCBzaG93RGF0ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuZGF0ZXBpY2tlci5zaG93RGF0ZSQubmV4dCh2YWx1ZSk7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgc2hvd1RpbWUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmRhdGVwaWNrZXIuc2hvd1RpbWUkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IHNob3dUaW1lem9uZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuZGF0ZXBpY2tlci5zaG93VGltZXpvbmUkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IHNob3dTZWNvbmRzKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5kYXRlcGlja2VyLnNob3dTZWNvbmRzJC5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBzaG93TWVyaWRpYW4odmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmRhdGVwaWNrZXIuc2hvd01lcmlkaWFuJC5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBzaG93U3Bpbm5lcnModmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmRhdGVwaWNrZXIuc2hvd1NwaW5uZXJzJC5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCB3ZWVrZGF5cyh2YWx1ZTogc3RyaW5nW10pIHtcbiAgICB0aGlzLmRhdGVwaWNrZXIud2Vla2RheXMkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IG1vbnRocyhtb250aHM6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5kYXRlcGlja2VyLm1vbnRocyA9IG1vbnRocztcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBtb250aHNTaG9ydChtb250aHM6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5kYXRlcGlja2VyLm1vbnRoc1Nob3J0ID0gbW9udGhzO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IG5vd0J0blRleHQodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuZGF0ZXBpY2tlci5ub3dCdG5UZXh0JC5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCB0aW1lem9uZXModmFsdWU6IERhdGVUaW1lUGlja2VyVGltZXpvbmVbXSkge1xuICAgIHRoaXMuZGF0ZXBpY2tlci50aW1lem9uZXMkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgQE91dHB1dCgpIGRhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEYXRlPiA9IG5ldyBFdmVudEVtaXR0ZXI8RGF0ZT4oKTtcbiAgQE91dHB1dCgpIHRpbWV6b25lQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RGF0ZVRpbWVQaWNrZXJUaW1lem9uZT4gPSBuZXcgRXZlbnRFbWl0dGVyPERhdGVUaW1lUGlja2VyVGltZXpvbmU+KCk7XG5cbiAgQElucHV0KClcbiAgc2V0IGRhdGUodmFsdWU6IERhdGUpIHtcbiAgICBpZiAoIWRhdGVDb21wYXJhdG9yKHZhbHVlLCB0aGlzLmRhdGVwaWNrZXIuc2VsZWN0ZWQkLnZhbHVlKSkge1xuICAgICAgdGhpcy5kYXRlcGlja2VyLnNlbGVjdGVkJC5uZXh0KG5ldyBEYXRlKHZhbHVlKSk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IHRpbWV6b25lKHZhbHVlOiBEYXRlVGltZVBpY2tlclRpbWV6b25lKSB7XG4gICAgdGhpcy5kYXRlcGlja2VyLnRpbWV6b25lJC5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIC8vIGV4cG9zZSBlbnVtIHRvIHZpZXdcbiAgRGF0ZVBpY2tlck1vZGUgPSBEYXRlUGlja2VyTW9kZTtcblxuICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkYXRlcGlja2VyOiBEYXRlVGltZVBpY2tlclNlcnZpY2UpIHtcbiAgICBkYXRlcGlja2VyLnNlbGVjdGVkJC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLCBkaXN0aW5jdFVudGlsQ2hhbmdlZChkYXRlQ29tcGFyYXRvcikpXG4gICAgICAuc3Vic2NyaWJlKGRhdGUgPT4gdGhpcy5kYXRlQ2hhbmdlLmVtaXQoZGF0ZSkpO1xuXG4gICAgZGF0ZXBpY2tlci50aW1lem9uZSQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSwgZGlzdGluY3RVbnRpbENoYW5nZWQodGltZXpvbmVDb21wYXJhdG9yKSlcbiAgICAgIC5zdWJzY3JpYmUoKHRpbWV6b25lOiBEYXRlVGltZVBpY2tlclRpbWV6b25lKSA9PiB0aGlzLnRpbWV6b25lQ2hhbmdlLmVtaXQodGltZXpvbmUpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlIHRoZSBkYXRlIHRvIHRoZSBjdXJyZW50IGRhdGUgYW5kIHRpbWVcbiAgICovXG4gIHNldFRvTm93KCk6IHZvaWQge1xuXG4gICAgLy8gc2V0IHRoZSBkYXRlIHRvIHRoZSBjdXJyZW50IG1vbWVudFxuICAgIHRoaXMuZGF0ZXBpY2tlci5zZXREYXRlVG9Ob3coKTtcbiAgfVxufSJdfQ==