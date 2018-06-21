/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { distinctUntilChanged } from 'rxjs/operators';
import { DatePickerMode, DateTimePickerService } from './date-time-picker.service';
import { dateComparator, timezoneComparator } from './date-time-picker.utils';
var DateTimePickerComponent = (function () {
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
                },] },
    ];
    /** @nocollapse */
    DateTimePickerComponent.ctorParameters = function () { return [
        { type: DateTimePickerService, },
    ]; };
    DateTimePickerComponent.propDecorators = {
        "showDate": [{ type: Input },],
        "showTime": [{ type: Input },],
        "showTimezone": [{ type: Input },],
        "showSeconds": [{ type: Input },],
        "showMeridian": [{ type: Input },],
        "showSpinners": [{ type: Input },],
        "weekdays": [{ type: Input },],
        "nowBtnText": [{ type: Input },],
        "timezones": [{ type: Input },],
        "dateChange": [{ type: Output },],
        "timezoneChange": [{ type: Output },],
        "date": [{ type: Input },],
        "timezone": [{ type: Input },],
    };
    return DateTimePickerComponent;
}());
export { DateTimePickerComponent };
function DateTimePickerComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DateTimePickerComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DateTimePickerComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    DateTimePickerComponent.propDecorators;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL2RhdGUtdGltZS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsY0FBYyxFQUFFLHFCQUFxQixFQUEwQixNQUFNLDRCQUE0QixDQUFDO0FBQzNHLE9BQU8sRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7SUEyRjVFLGlDQUFtQixVQUFpQztRQUFwRCxpQkFNQztRQU5rQixlQUFVLEdBQVYsVUFBVSxDQUF1QjswQkFwQlQsSUFBSSxZQUFZLEVBQVE7OEJBQ0YsSUFBSSxZQUFZLEVBQTBCOzs4QkFlMUYsY0FBYzs2QkFFUCxJQUFJLFlBQVksRUFBRTtRQUd4QyxxQkFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDaEYsU0FBUyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQTFCLENBQTBCLENBQUMsQ0FBQztRQUVqRCxxQkFBTSxjQUFjLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsQ0FBQzthQUN2RixTQUFTLENBQUMsVUFBQyxRQUFnQyxJQUFLLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQWxDLENBQWtDLENBQUMsQ0FBQztLQUN4RjswQkEvRFksNkNBQVE7Ozs7O2tCQUFDLEtBQWM7WUFDbEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7OzswQkFHM0IsNkNBQVE7Ozs7O2tCQUFDLEtBQWM7WUFDbEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7OzswQkFHM0IsaURBQVk7Ozs7O2tCQUFDLEtBQWM7WUFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7OzswQkFHL0IsZ0RBQVc7Ozs7O2tCQUFDLEtBQWM7WUFDckMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7OzswQkFHOUIsaURBQVk7Ozs7O2tCQUFDLEtBQWM7WUFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7OzswQkFHL0IsaURBQVk7Ozs7O2tCQUFDLEtBQWM7WUFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7OzswQkFHL0IsNkNBQVE7Ozs7O2tCQUFDLEtBQWU7WUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7OzswQkFHM0IsK0NBQVU7Ozs7O2tCQUFDLEtBQWE7WUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7OzswQkFHN0IsOENBQVM7Ozs7O2tCQUFDLEtBQStCO1lBQ3BELElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7MEJBUXJDLHlDQUFJOzs7OztrQkFBQyxLQUFXO1lBQ2xCLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVELElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ2pEOzs7OzswQkFJQyw2Q0FBUTs7Ozs7a0JBQUMsS0FBNkI7WUFDeEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7OztJQWdCeEMsNkNBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNsQztJQUVEOztPQUVHOzs7OztJQUNILDBDQUFROzs7O0lBQVI7O1FBR0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUNoQzs7Z0JBNUdGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUUsODhCQXNCK0c7b0JBQ3pILFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDO29CQUNsQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7Ozs7Z0JBOUJ3QixxQkFBcUI7Ozs2QkFtQzNDLEtBQUs7NkJBSUwsS0FBSztpQ0FJTCxLQUFLO2dDQUlMLEtBQUs7aUNBSUwsS0FBSztpQ0FJTCxLQUFLOzZCQUlMLEtBQUs7K0JBSUwsS0FBSzs4QkFJTCxLQUFLOytCQUtMLE1BQU07bUNBQ04sTUFBTTt5QkFFTixLQUFLOzZCQU9MLEtBQUs7O2tDQXJGUjs7U0FrQ2EsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGF0ZVBpY2tlck1vZGUsIERhdGVUaW1lUGlja2VyU2VydmljZSwgRGF0ZVRpbWVQaWNrZXJUaW1lem9uZSB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci5zZXJ2aWNlJztcbmltcG9ydCB7IGRhdGVDb21wYXJhdG9yLCB0aW1lem9uZUNvbXBhcmF0b3IgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXIudXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd1eC1kYXRlLXRpbWUtcGlja2VyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiY2FsZW5kYXItY29udGFpbmVyXCI+XG5cbiAgPHV4LWRhdGUtdGltZS1waWNrZXItaGVhZGVyPjwvdXgtZGF0ZS10aW1lLXBpY2tlci1oZWFkZXI+XG5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImRhdGVwaWNrZXIuc2hvd0RhdGUkIHwgYXN5bmNcIiBbbmdTd2l0Y2hdPVwiZGF0ZXBpY2tlci5tb2RlJCB8IGFzeW5jXCI+XG5cbiAgICAgIDwhLS0gRGlzcGxheSBkYXlzIGluIHRoZSBjdXJyZW50IG1vbnRoIC0tPlxuICAgICAgPHV4LWRhdGUtdGltZS1waWNrZXItZGF5LXZpZXcgKm5nU3dpdGNoQ2FzZT1cIkRhdGVQaWNrZXJNb2RlLkRheVwiPjwvdXgtZGF0ZS10aW1lLXBpY2tlci1kYXktdmlldz5cblxuICAgICAgPCEtLSBEaXNwbGF5IHRoZSBtb250aHMgaW4gdGhlIGN1cnJlbnQgeWVhciAtLT5cbiAgICAgIDx1eC1kYXRlLXRpbWUtcGlja2VyLW1vbnRoLXZpZXcgKm5nU3dpdGNoQ2FzZT1cIkRhdGVQaWNrZXJNb2RlLk1vbnRoXCI+PC91eC1kYXRlLXRpbWUtcGlja2VyLW1vbnRoLXZpZXc+XG5cbiAgICAgIDwhLS0gRGlzcGxheSBhIGRlY2FkZSAtLT5cbiAgICAgIDx1eC1kYXRlLXRpbWUtcGlja2VyLXllYXItdmlldyAqbmdTd2l0Y2hDYXNlPVwiRGF0ZVBpY2tlck1vZGUuWWVhclwiPjwvdXgtZGF0ZS10aW1lLXBpY2tlci15ZWFyLXZpZXc+XG5cbiAgPC9uZy1jb250YWluZXI+XG5cbiAgPCEtLSBEaXNwbGF5IGEgVGltZSBQaWNrZXIgLS0+XG4gIDx1eC1kYXRlLXRpbWUtcGlja2VyLXRpbWUtdmlldyAqbmdJZj1cImRhdGVwaWNrZXIuc2hvd1RpbWUkIHwgYXN5bmNcIj48L3V4LWRhdGUtdGltZS1waWNrZXItdGltZS12aWV3PlxuXG48L2Rpdj5cblxuPGJ1dHRvbiBjbGFzcz1cIm5vdy1idXR0b25cIiBhcmlhLWxhYmVsPVwiU2V0IGRhdGUgdG8gbm93XCIgKGNsaWNrKT1cInNldFRvTm93KClcIj57eyBkYXRlcGlja2VyLm5vd0J0blRleHQkIHwgYXN5bmMgfX08L2J1dHRvbj5gLFxuICBwcm92aWRlcnM6IFtEYXRlVGltZVBpY2tlclNlcnZpY2VdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBEYXRlVGltZVBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgcHJpdmF0ZSBfdGltZXpvbmU6IERhdGVUaW1lUGlja2VyVGltZXpvbmU7XG5cbiAgQElucHV0KCkgc2V0IHNob3dEYXRlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5kYXRlcGlja2VyLnNob3dEYXRlJC5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBzaG93VGltZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuZGF0ZXBpY2tlci5zaG93VGltZSQubmV4dCh2YWx1ZSk7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgc2hvd1RpbWV6b25lKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5kYXRlcGlja2VyLnNob3dUaW1lem9uZSQubmV4dCh2YWx1ZSk7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgc2hvd1NlY29uZHModmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmRhdGVwaWNrZXIuc2hvd1NlY29uZHMkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IHNob3dNZXJpZGlhbih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuZGF0ZXBpY2tlci5zaG93TWVyaWRpYW4kLm5leHQodmFsdWUpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IHNob3dTcGlubmVycyh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuZGF0ZXBpY2tlci5zaG93U3Bpbm5lcnMkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IHdlZWtkYXlzKHZhbHVlOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuZGF0ZXBpY2tlci53ZWVrZGF5cyQubmV4dCh2YWx1ZSk7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgbm93QnRuVGV4dCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5kYXRlcGlja2VyLm5vd0J0blRleHQkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IHRpbWV6b25lcyh2YWx1ZTogRGF0ZVRpbWVQaWNrZXJUaW1lem9uZVtdKSB7XG4gICAgdGhpcy5kYXRlcGlja2VyLnRpbWV6b25lcyQubmV4dCh2YWx1ZSk7XG4gIH1cblxuXG4gIEBPdXRwdXQoKSBkYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyPERhdGU+KCk7XG4gIEBPdXRwdXQoKSB0aW1lem9uZUNoYW5nZTogRXZlbnRFbWl0dGVyPERhdGVUaW1lUGlja2VyVGltZXpvbmU+ID0gbmV3IEV2ZW50RW1pdHRlcjxEYXRlVGltZVBpY2tlclRpbWV6b25lPigpO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBkYXRlKHZhbHVlOiBEYXRlKSB7XG4gICAgaWYgKCFkYXRlQ29tcGFyYXRvcih2YWx1ZSwgdGhpcy5kYXRlcGlja2VyLnNlbGVjdGVkJC52YWx1ZSkpIHtcbiAgICAgIHRoaXMuZGF0ZXBpY2tlci5zZWxlY3RlZCQubmV4dChuZXcgRGF0ZSh2YWx1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCB0aW1lem9uZSh2YWx1ZTogRGF0ZVRpbWVQaWNrZXJUaW1lem9uZSkge1xuICAgIHRoaXMuZGF0ZXBpY2tlci50aW1lem9uZSQubmV4dCh2YWx1ZSk7XG4gIH1cblxuICAvLyBleHBvc2UgZW51bSB0byB2aWV3XG4gIERhdGVQaWNrZXJNb2RlID0gRGF0ZVBpY2tlck1vZGU7XG5cbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkYXRlcGlja2VyOiBEYXRlVGltZVBpY2tlclNlcnZpY2UpIHtcbiAgICBjb25zdCB2YWx1ZUNoYW5nZSA9IGRhdGVwaWNrZXIuc2VsZWN0ZWQkLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoZGF0ZUNvbXBhcmF0b3IpKVxuICAgICAgLnN1YnNjcmliZShkYXRlID0+IHRoaXMuZGF0ZUNoYW5nZS5lbWl0KGRhdGUpKTtcblxuICAgIGNvbnN0IHRpbWV6b25lQ2hhbmdlID0gZGF0ZXBpY2tlci50aW1lem9uZSQucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCh0aW1lem9uZUNvbXBhcmF0b3IpKVxuICAgICAgLnN1YnNjcmliZSgodGltZXpvbmU6IERhdGVUaW1lUGlja2VyVGltZXpvbmUpID0+IHRoaXMudGltZXpvbmVDaGFuZ2UuZW1pdCh0aW1lem9uZSkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlIHRoZSBkYXRlIHRvIHRoZSBjdXJyZW50IGRhdGUgYW5kIHRpbWVcbiAgICovXG4gIHNldFRvTm93KCk6IHZvaWQge1xuXG4gICAgLy8gc2V0IHRoZSBkYXRlIHRvIHRoZSBjdXJyZW50IG1vbWVudFxuICAgIHRoaXMuZGF0ZXBpY2tlci5zZXREYXRlVG9Ob3coKTtcbiAgfVxufSJdfQ==