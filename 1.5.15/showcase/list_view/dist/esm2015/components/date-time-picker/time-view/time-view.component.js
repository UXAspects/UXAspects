/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DateTimePickerService } from '../date-time-picker.service';
export class TimeViewComponent {
    /**
     * @param {?} datepicker
     */
    constructor(datepicker) {
        this.datepicker = datepicker;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    selectTimezone(name) {
        const /** @type {?} */ timezones = this.datepicker.timezones$.value;
        // find matching timezone
        const /** @type {?} */ timezone = timezones.find(_timezone => _timezone.name === name);
        if (timezone) {
            this.datepicker.setTimezone(timezone);
        }
    }
    /**
     * @return {?}
     */
    incrementTimezone() {
        const /** @type {?} */ timezone = this.datepicker.timezone$.value;
        const /** @type {?} */ timezones = this.datepicker.timezones$.value;
        const /** @type {?} */ currentZone = timezones.findIndex(zone => zone.name === timezone.name && zone.offset === timezone.offset);
        // try to get the previous zone
        this.datepicker.setTimezone(timezones[currentZone + 1] ? timezones[currentZone + 1] : timezones[currentZone]);
    }
    /**
     * @return {?}
     */
    decrementTimezone() {
        const /** @type {?} */ timezone = this.datepicker.timezone$.value;
        const /** @type {?} */ timezones = this.datepicker.timezones$.value;
        const /** @type {?} */ currentZone = timezones.findIndex(zone => zone.name === timezone.name && zone.offset === timezone.offset);
        // try to get the previous zone
        this.datepicker.setTimezone(timezones[currentZone - 1] ? timezones[currentZone - 1] : timezones[currentZone]);
    }
}
TimeViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-date-time-picker-time-view',
                template: `<ux-time-picker *ngIf="datepicker.showTime$ | async"
    [value]="datepicker.selected$ | async"
    (valueChange)="datepicker.selected$.next($event)"
    [showSeconds]="datepicker.showSeconds$ | async"
    [showMeridian]="datepicker.showMeridian$ | async"
    [showSpinners]="datepicker.showSpinners$ | async">
</ux-time-picker>

<ng-container *ngIf="datepicker.showTimezone$ | async">

    <div class="time-zone-picker" *ngIf="datepicker.showSpinners$ | async">

        <ux-spin-button
            class="time-zone-spinner"
            [value]="(datepicker.timezone$ | async).name"
            [readOnly]="true"
            (increment)="incrementTimezone()"
            (decrement)="decrementTimezone()"
            inputAriaLabel="Time Zone"
            incrementAriaLabel="Switch to the next time zone"
            decrementAriaLabel="Switch to the previous time zone">
        </ux-spin-button>
    </div>

    <div class="time-zone-picker" *ngIf="!(datepicker.showSpinners$ | async)">

        <select class="form-control time-zone-select"
                tabindex="0"
                [ngModel]="(datepicker.timezone$ | async).name"
                (ngModelChange)="selectTimezone($event)"
                aria-label="Timezone"
                [attr.aria-valuenow]="(datepicker.timezone$ | async).name">

            <option *ngFor="let zone of datepicker.timezones$ | async"
                    [selected]="zone.name === (datepicker.timezone$ | async).name"
                    [value]="zone.name">
                {{ zone?.name }}
            </option>

        </select>
    </div>

</ng-container>
`,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
TimeViewComponent.ctorParameters = () => [
    { type: DateTimePickerService, },
];
function TimeViewComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    TimeViewComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    TimeViewComponent.ctorParameters;
    /** @type {?} */
    TimeViewComponent.prototype.datepicker;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvdGltZS12aWV3L3RpbWUtdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFrRHBFLE1BQU07Ozs7SUFFRixZQUFtQixVQUFpQztRQUFqQyxlQUFVLEdBQVYsVUFBVSxDQUF1QjtLQUFLOzs7OztJQUV6RCxjQUFjLENBQUMsSUFBWTtRQUN2Qix1QkFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDOztRQUduRCx1QkFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQztRQUV0RSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ1gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDekM7S0FDSjs7OztJQUVELGlCQUFpQjtRQUNiLHVCQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDakQsdUJBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUVuRCx1QkFBTSxXQUFXLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztRQUdoSCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7S0FDakg7Ozs7SUFFRCxpQkFBaUI7UUFDYix1QkFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBQ2pELHVCQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFFbkQsdUJBQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7UUFHaEgsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0tBQ2pIOzs7WUFqRkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSwrQkFBK0I7Z0JBQ3pDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQTJDYjtnQkFDRyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNsRDs7OztZQWpEUSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRlVGltZVBpY2tlclNlcnZpY2UgfSBmcm9tICcuLi9kYXRlLXRpbWUtcGlja2VyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWRhdGUtdGltZS1waWNrZXItdGltZS12aWV3JyxcbiAgICB0ZW1wbGF0ZTogYDx1eC10aW1lLXBpY2tlciAqbmdJZj1cImRhdGVwaWNrZXIuc2hvd1RpbWUkIHwgYXN5bmNcIlxuICAgIFt2YWx1ZV09XCJkYXRlcGlja2VyLnNlbGVjdGVkJCB8IGFzeW5jXCJcbiAgICAodmFsdWVDaGFuZ2UpPVwiZGF0ZXBpY2tlci5zZWxlY3RlZCQubmV4dCgkZXZlbnQpXCJcbiAgICBbc2hvd1NlY29uZHNdPVwiZGF0ZXBpY2tlci5zaG93U2Vjb25kcyQgfCBhc3luY1wiXG4gICAgW3Nob3dNZXJpZGlhbl09XCJkYXRlcGlja2VyLnNob3dNZXJpZGlhbiQgfCBhc3luY1wiXG4gICAgW3Nob3dTcGlubmVyc109XCJkYXRlcGlja2VyLnNob3dTcGlubmVycyQgfCBhc3luY1wiPlxuPC91eC10aW1lLXBpY2tlcj5cblxuPG5nLWNvbnRhaW5lciAqbmdJZj1cImRhdGVwaWNrZXIuc2hvd1RpbWV6b25lJCB8IGFzeW5jXCI+XG5cbiAgICA8ZGl2IGNsYXNzPVwidGltZS16b25lLXBpY2tlclwiICpuZ0lmPVwiZGF0ZXBpY2tlci5zaG93U3Bpbm5lcnMkIHwgYXN5bmNcIj5cblxuICAgICAgICA8dXgtc3Bpbi1idXR0b25cbiAgICAgICAgICAgIGNsYXNzPVwidGltZS16b25lLXNwaW5uZXJcIlxuICAgICAgICAgICAgW3ZhbHVlXT1cIihkYXRlcGlja2VyLnRpbWV6b25lJCB8IGFzeW5jKS5uYW1lXCJcbiAgICAgICAgICAgIFtyZWFkT25seV09XCJ0cnVlXCJcbiAgICAgICAgICAgIChpbmNyZW1lbnQpPVwiaW5jcmVtZW50VGltZXpvbmUoKVwiXG4gICAgICAgICAgICAoZGVjcmVtZW50KT1cImRlY3JlbWVudFRpbWV6b25lKClcIlxuICAgICAgICAgICAgaW5wdXRBcmlhTGFiZWw9XCJUaW1lIFpvbmVcIlxuICAgICAgICAgICAgaW5jcmVtZW50QXJpYUxhYmVsPVwiU3dpdGNoIHRvIHRoZSBuZXh0IHRpbWUgem9uZVwiXG4gICAgICAgICAgICBkZWNyZW1lbnRBcmlhTGFiZWw9XCJTd2l0Y2ggdG8gdGhlIHByZXZpb3VzIHRpbWUgem9uZVwiPlxuICAgICAgICA8L3V4LXNwaW4tYnV0dG9uPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInRpbWUtem9uZS1waWNrZXJcIiAqbmdJZj1cIiEoZGF0ZXBpY2tlci5zaG93U3Bpbm5lcnMkIHwgYXN5bmMpXCI+XG5cbiAgICAgICAgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbCB0aW1lLXpvbmUtc2VsZWN0XCJcbiAgICAgICAgICAgICAgICB0YWJpbmRleD1cIjBcIlxuICAgICAgICAgICAgICAgIFtuZ01vZGVsXT1cIihkYXRlcGlja2VyLnRpbWV6b25lJCB8IGFzeW5jKS5uYW1lXCJcbiAgICAgICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJzZWxlY3RUaW1lem9uZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiVGltZXpvbmVcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtdmFsdWVub3ddPVwiKGRhdGVwaWNrZXIudGltZXpvbmUkIHwgYXN5bmMpLm5hbWVcIj5cblxuICAgICAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgem9uZSBvZiBkYXRlcGlja2VyLnRpbWV6b25lcyQgfCBhc3luY1wiXG4gICAgICAgICAgICAgICAgICAgIFtzZWxlY3RlZF09XCJ6b25lLm5hbWUgPT09IChkYXRlcGlja2VyLnRpbWV6b25lJCB8IGFzeW5jKS5uYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgW3ZhbHVlXT1cInpvbmUubmFtZVwiPlxuICAgICAgICAgICAgICAgIHt7IHpvbmU/Lm5hbWUgfX1cbiAgICAgICAgICAgIDwvb3B0aW9uPlxuXG4gICAgICAgIDwvc2VsZWN0PlxuICAgIDwvZGl2PlxuXG48L25nLWNvbnRhaW5lcj5cbmAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgVGltZVZpZXdDb21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGRhdGVwaWNrZXI6IERhdGVUaW1lUGlja2VyU2VydmljZSkgeyB9XG5cbiAgICBzZWxlY3RUaW1lem9uZShuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdGltZXpvbmVzID0gdGhpcy5kYXRlcGlja2VyLnRpbWV6b25lcyQudmFsdWU7XG4gICAgICAgIFxuICAgICAgICAvLyBmaW5kIG1hdGNoaW5nIHRpbWV6b25lXG4gICAgICAgIGNvbnN0IHRpbWV6b25lID0gdGltZXpvbmVzLmZpbmQoX3RpbWV6b25lID0+IF90aW1lem9uZS5uYW1lID09PSBuYW1lKTtcblxuICAgICAgICBpZiAodGltZXpvbmUpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0ZXBpY2tlci5zZXRUaW1lem9uZSh0aW1lem9uZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbmNyZW1lbnRUaW1lem9uZSgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdGltZXpvbmUgPSB0aGlzLmRhdGVwaWNrZXIudGltZXpvbmUkLnZhbHVlO1xuICAgICAgICBjb25zdCB0aW1lem9uZXMgPSB0aGlzLmRhdGVwaWNrZXIudGltZXpvbmVzJC52YWx1ZTtcblxuICAgICAgICBjb25zdCBjdXJyZW50Wm9uZSA9IHRpbWV6b25lcy5maW5kSW5kZXgoem9uZSA9PiB6b25lLm5hbWUgPT09IHRpbWV6b25lLm5hbWUgJiYgem9uZS5vZmZzZXQgPT09IHRpbWV6b25lLm9mZnNldCk7XG5cbiAgICAgICAgLy8gdHJ5IHRvIGdldCB0aGUgcHJldmlvdXMgem9uZVxuICAgICAgICB0aGlzLmRhdGVwaWNrZXIuc2V0VGltZXpvbmUodGltZXpvbmVzW2N1cnJlbnRab25lICsgMV0gPyB0aW1lem9uZXNbY3VycmVudFpvbmUgKyAxXSA6IHRpbWV6b25lc1tjdXJyZW50Wm9uZV0pO1xuICAgIH1cblxuICAgIGRlY3JlbWVudFRpbWV6b25lKCk6IHZvaWQge1xuICAgICAgICBjb25zdCB0aW1lem9uZSA9IHRoaXMuZGF0ZXBpY2tlci50aW1lem9uZSQudmFsdWU7XG4gICAgICAgIGNvbnN0IHRpbWV6b25lcyA9IHRoaXMuZGF0ZXBpY2tlci50aW1lem9uZXMkLnZhbHVlO1xuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRab25lID0gdGltZXpvbmVzLmZpbmRJbmRleCh6b25lID0+IHpvbmUubmFtZSA9PT0gdGltZXpvbmUubmFtZSAmJiB6b25lLm9mZnNldCA9PT0gdGltZXpvbmUub2Zmc2V0KTtcblxuICAgICAgICAvLyB0cnkgdG8gZ2V0IHRoZSBwcmV2aW91cyB6b25lXG4gICAgICAgIHRoaXMuZGF0ZXBpY2tlci5zZXRUaW1lem9uZSh0aW1lem9uZXNbY3VycmVudFpvbmUgLSAxXSA/IHRpbWV6b25lc1tjdXJyZW50Wm9uZSAtIDFdIDogdGltZXpvbmVzW2N1cnJlbnRab25lXSk7XG4gICAgfVxufSJdfQ==