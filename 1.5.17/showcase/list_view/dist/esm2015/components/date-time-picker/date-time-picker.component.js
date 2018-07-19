/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { distinctUntilChanged } from 'rxjs/operators';
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
        this._subscription = new Subscription();
        const /** @type {?} */ valueChange = datepicker.selected$.pipe(distinctUntilChanged(dateComparator))
            .subscribe(date => this.dateChange.emit(date));
        const /** @type {?} */ timezoneChange = datepicker.timezone$.pipe(distinctUntilChanged(timezoneComparator))
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
        this._subscription.unsubscribe();
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
                template: `<div class="calendar-container">

  <ux-date-time-picker-header></ux-date-time-picker-header>

  <ng-container *ngIf="datepicker.showDate$ | async" [ngSwitch]="datepicker.mode$ | async">

      <!-- Display days in the current month -->
      <ux-date-time-picker-day-view *ngSwitchCase="DatePickerMode.Day"></ux-date-time-picker-day-view>

      <!-- Display the months in the current year -->
      <ux-date-time-picker-month-view *ngSwitchCase="DatePickerMode.Month"></ux-date-time-picker-month-view>

      <!-- Display a decade -->
      <ux-date-time-picker-year-view *ngSwitchCase="DatePickerMode.Year"></ux-date-time-picker-year-view>

  </ng-container>

  <!-- Display a Time Picker -->
  <ux-date-time-picker-time-view *ngIf="datepicker.showTime$ | async"></ux-date-time-picker-time-view>

</div>

<button class="now-button" aria-label="Set date to now" (click)="setToNow()">{{ datepicker.nowBtnText$ | async }}</button>`,
                providers: [DateTimePickerService],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
DateTimePickerComponent.ctorParameters = () => [
    { type: DateTimePickerService, },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL2RhdGUtdGltZS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsY0FBYyxFQUFFLHFCQUFxQixFQUEwQixNQUFNLDRCQUE0QixDQUFDO0FBQzNHLE9BQU8sRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQThCOUUsTUFBTTs7OztJQTZESixZQUFtQixVQUFpQztRQUFqQyxlQUFVLEdBQVYsVUFBVSxDQUF1QjswQkFwQlQsSUFBSSxZQUFZLEVBQVE7OEJBQ0YsSUFBSSxZQUFZLEVBQTBCOzs4QkFlMUYsY0FBYzs2QkFFUCxJQUFJLFlBQVksRUFBRTtRQUd4Qyx1QkFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDaEYsU0FBUyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRWpELHVCQUFNLGNBQWMsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2FBQ3ZGLFNBQVMsQ0FBQyxDQUFDLFFBQWdDLEtBQUssSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztLQUN4Rjs7Ozs7UUEvRFksUUFBUSxDQUFDLEtBQWM7UUFDbEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7UUFHM0IsUUFBUSxDQUFDLEtBQWM7UUFDbEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7UUFHM0IsWUFBWSxDQUFDLEtBQWM7UUFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7UUFHL0IsV0FBVyxDQUFDLEtBQWM7UUFDckMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7UUFHOUIsWUFBWSxDQUFDLEtBQWM7UUFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7UUFHL0IsWUFBWSxDQUFDLEtBQWM7UUFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7UUFHL0IsUUFBUSxDQUFDLEtBQWU7UUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7UUFHM0IsVUFBVSxDQUFDLEtBQWE7UUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7UUFHN0IsU0FBUyxDQUFDLEtBQStCO1FBQ3BELElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7O1FBUXJDLElBQUksQ0FBQyxLQUFXO1FBQ2xCLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDakQ7Ozs7OztRQUlDLFFBQVEsQ0FBQyxLQUE2QjtRQUN4QyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7O0lBZ0J4QyxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNsQzs7Ozs7SUFLRCxRQUFROztRQUdOLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDaEM7OztZQTVHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzJIQXNCK0c7Z0JBQ3pILFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDO2dCQUNsQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7OztZQTlCd0IscUJBQXFCOzs7eUJBbUMzQyxLQUFLO3lCQUlMLEtBQUs7NkJBSUwsS0FBSzs0QkFJTCxLQUFLOzZCQUlMLEtBQUs7NkJBSUwsS0FBSzt5QkFJTCxLQUFLOzJCQUlMLEtBQUs7MEJBSUwsS0FBSzsyQkFLTCxNQUFNOytCQUNOLE1BQU07cUJBRU4sS0FBSzt5QkFPTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGF0ZVBpY2tlck1vZGUsIERhdGVUaW1lUGlja2VyU2VydmljZSwgRGF0ZVRpbWVQaWNrZXJUaW1lem9uZSB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci5zZXJ2aWNlJztcbmltcG9ydCB7IGRhdGVDb21wYXJhdG9yLCB0aW1lem9uZUNvbXBhcmF0b3IgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXIudXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd1eC1kYXRlLXRpbWUtcGlja2VyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiY2FsZW5kYXItY29udGFpbmVyXCI+XG5cbiAgPHV4LWRhdGUtdGltZS1waWNrZXItaGVhZGVyPjwvdXgtZGF0ZS10aW1lLXBpY2tlci1oZWFkZXI+XG5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImRhdGVwaWNrZXIuc2hvd0RhdGUkIHwgYXN5bmNcIiBbbmdTd2l0Y2hdPVwiZGF0ZXBpY2tlci5tb2RlJCB8IGFzeW5jXCI+XG5cbiAgICAgIDwhLS0gRGlzcGxheSBkYXlzIGluIHRoZSBjdXJyZW50IG1vbnRoIC0tPlxuICAgICAgPHV4LWRhdGUtdGltZS1waWNrZXItZGF5LXZpZXcgKm5nU3dpdGNoQ2FzZT1cIkRhdGVQaWNrZXJNb2RlLkRheVwiPjwvdXgtZGF0ZS10aW1lLXBpY2tlci1kYXktdmlldz5cblxuICAgICAgPCEtLSBEaXNwbGF5IHRoZSBtb250aHMgaW4gdGhlIGN1cnJlbnQgeWVhciAtLT5cbiAgICAgIDx1eC1kYXRlLXRpbWUtcGlja2VyLW1vbnRoLXZpZXcgKm5nU3dpdGNoQ2FzZT1cIkRhdGVQaWNrZXJNb2RlLk1vbnRoXCI+PC91eC1kYXRlLXRpbWUtcGlja2VyLW1vbnRoLXZpZXc+XG5cbiAgICAgIDwhLS0gRGlzcGxheSBhIGRlY2FkZSAtLT5cbiAgICAgIDx1eC1kYXRlLXRpbWUtcGlja2VyLXllYXItdmlldyAqbmdTd2l0Y2hDYXNlPVwiRGF0ZVBpY2tlck1vZGUuWWVhclwiPjwvdXgtZGF0ZS10aW1lLXBpY2tlci15ZWFyLXZpZXc+XG5cbiAgPC9uZy1jb250YWluZXI+XG5cbiAgPCEtLSBEaXNwbGF5IGEgVGltZSBQaWNrZXIgLS0+XG4gIDx1eC1kYXRlLXRpbWUtcGlja2VyLXRpbWUtdmlldyAqbmdJZj1cImRhdGVwaWNrZXIuc2hvd1RpbWUkIHwgYXN5bmNcIj48L3V4LWRhdGUtdGltZS1waWNrZXItdGltZS12aWV3PlxuXG48L2Rpdj5cblxuPGJ1dHRvbiBjbGFzcz1cIm5vdy1idXR0b25cIiBhcmlhLWxhYmVsPVwiU2V0IGRhdGUgdG8gbm93XCIgKGNsaWNrKT1cInNldFRvTm93KClcIj57eyBkYXRlcGlja2VyLm5vd0J0blRleHQkIHwgYXN5bmMgfX08L2J1dHRvbj5gLFxuICBwcm92aWRlcnM6IFtEYXRlVGltZVBpY2tlclNlcnZpY2VdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBEYXRlVGltZVBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgcHJpdmF0ZSBfdGltZXpvbmU6IERhdGVUaW1lUGlja2VyVGltZXpvbmU7XG5cbiAgQElucHV0KCkgc2V0IHNob3dEYXRlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5kYXRlcGlja2VyLnNob3dEYXRlJC5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBzaG93VGltZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuZGF0ZXBpY2tlci5zaG93VGltZSQubmV4dCh2YWx1ZSk7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgc2hvd1RpbWV6b25lKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5kYXRlcGlja2VyLnNob3dUaW1lem9uZSQubmV4dCh2YWx1ZSk7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgc2hvd1NlY29uZHModmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmRhdGVwaWNrZXIuc2hvd1NlY29uZHMkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IHNob3dNZXJpZGlhbih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuZGF0ZXBpY2tlci5zaG93TWVyaWRpYW4kLm5leHQodmFsdWUpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IHNob3dTcGlubmVycyh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuZGF0ZXBpY2tlci5zaG93U3Bpbm5lcnMkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IHdlZWtkYXlzKHZhbHVlOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuZGF0ZXBpY2tlci53ZWVrZGF5cyQubmV4dCh2YWx1ZSk7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgbm93QnRuVGV4dCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5kYXRlcGlja2VyLm5vd0J0blRleHQkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IHRpbWV6b25lcyh2YWx1ZTogRGF0ZVRpbWVQaWNrZXJUaW1lem9uZVtdKSB7XG4gICAgdGhpcy5kYXRlcGlja2VyLnRpbWV6b25lcyQubmV4dCh2YWx1ZSk7XG4gIH1cblxuXG4gIEBPdXRwdXQoKSBkYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyPERhdGU+KCk7XG4gIEBPdXRwdXQoKSB0aW1lem9uZUNoYW5nZTogRXZlbnRFbWl0dGVyPERhdGVUaW1lUGlja2VyVGltZXpvbmU+ID0gbmV3IEV2ZW50RW1pdHRlcjxEYXRlVGltZVBpY2tlclRpbWV6b25lPigpO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBkYXRlKHZhbHVlOiBEYXRlKSB7XG4gICAgaWYgKCFkYXRlQ29tcGFyYXRvcih2YWx1ZSwgdGhpcy5kYXRlcGlja2VyLnNlbGVjdGVkJC52YWx1ZSkpIHtcbiAgICAgIHRoaXMuZGF0ZXBpY2tlci5zZWxlY3RlZCQubmV4dChuZXcgRGF0ZSh2YWx1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCB0aW1lem9uZSh2YWx1ZTogRGF0ZVRpbWVQaWNrZXJUaW1lem9uZSkge1xuICAgIHRoaXMuZGF0ZXBpY2tlci50aW1lem9uZSQubmV4dCh2YWx1ZSk7XG4gIH1cblxuICAvLyBleHBvc2UgZW51bSB0byB2aWV3XG4gIERhdGVQaWNrZXJNb2RlID0gRGF0ZVBpY2tlck1vZGU7XG5cbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkYXRlcGlja2VyOiBEYXRlVGltZVBpY2tlclNlcnZpY2UpIHtcbiAgICBjb25zdCB2YWx1ZUNoYW5nZSA9IGRhdGVwaWNrZXIuc2VsZWN0ZWQkLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoZGF0ZUNvbXBhcmF0b3IpKVxuICAgICAgLnN1YnNjcmliZShkYXRlID0+IHRoaXMuZGF0ZUNoYW5nZS5lbWl0KGRhdGUpKTtcblxuICAgIGNvbnN0IHRpbWV6b25lQ2hhbmdlID0gZGF0ZXBpY2tlci50aW1lem9uZSQucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCh0aW1lem9uZUNvbXBhcmF0b3IpKVxuICAgICAgLnN1YnNjcmliZSgodGltZXpvbmU6IERhdGVUaW1lUGlja2VyVGltZXpvbmUpID0+IHRoaXMudGltZXpvbmVDaGFuZ2UuZW1pdCh0aW1lem9uZSkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlIHRoZSBkYXRlIHRvIHRoZSBjdXJyZW50IGRhdGUgYW5kIHRpbWVcbiAgICovXG4gIHNldFRvTm93KCk6IHZvaWQge1xuXG4gICAgLy8gc2V0IHRoZSBkYXRlIHRvIHRoZSBjdXJyZW50IG1vbWVudFxuICAgIHRoaXMuZGF0ZXBpY2tlci5zZXREYXRlVG9Ob3coKTtcbiAgfVxufSJdfQ==