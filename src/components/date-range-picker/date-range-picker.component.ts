import { WeekDay } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DateTimePickerTimezone, differenceBetweenDates, timezones as defaultTimezones } from '../date-time-picker/date-time-picker.utils';
import { DateRangeService } from './date-range.service';

@Component({
    selector: 'ux-date-range-picker',
    templateUrl: './date-range-picker.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DateRangeService]
})
export class DateRangePickerComponent {

    /** The selected start date to be displayed in the component. */
    @Input() set start(start: Date) {
        this.rangeService.start = start;
    }

    /** The selected end date to be displayed in the component. */
    @Input() set end(end: Date) {
        this.rangeService.end = end;
    }

    /** Defines whether or not the time picker should allow the user to choose a timezone. */
    @Input() showTimezone: boolean;

    /** Defines whether or not the time picker should allow the user to specify seconds. */
    @Input() showSeconds: boolean = false;

    /** Defines whether or not the time picker should show an AM/PM button, or time should be represented in 24hr format instead. */
    @Input() showMeridian: boolean = true;

    /** Defines whether or not the time picker should allow the user to select the time using spinners. */
    @Input() showSpinners: boolean = true;

    /** If defined will override the weekday names displayed. */
    @Input() weekdays: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    /** Defines the names of the months. */
    @Input() months: string[];

    /** Defines the short names of each month. */
    @Input() monthsShort: string[];

    /** Defines the labels to show in the meridian (AM/PM) selector. */
    @Input() meridians: string[];

    /** Defines the text to be displayed in the button used to set the selected time to the current time. */
    @Input() nowBtnText: string;

    /** Specify whether or not the show now button should be visible */
    @Input() showNowBtn: boolean = false;

    /** Defines whether or not the time picker should be visible. */
    @Input() set showTime(showTime: boolean) {
        this.rangeService.showTime = showTime;
    }

    get showTime(): boolean {
        return this.rangeService.showTime;
    }

    /**
     * Defines the list of available timezones. The `DateTimePickerTimezone` interface specifies that each timezone should
     * be an object with a `name` property that represents the timezone, eg. `GMT+2`, and an `offset` property that represents
     * the number of minutes relative to GMT the timezone is.
     */
    @Input() timezones: DateTimePickerTimezone[] = defaultTimezones;

    /** Will set the selected start timezone. */
    @Input() startTimezone: DateTimePickerTimezone = this.getCurrentTimezone();

    /** Will set the selected end timezone. */
    @Input() endTimezone: DateTimePickerTimezone = this.getCurrentTimezone();

    /** Defines the day of the week that should appear in the first column. `WeekDay` is an enumeration available in `@angular/common`. */
    @Input() startOfWeek: WeekDay = WeekDay.Sunday;

    /** Emit when the start date changes */
    @Output() startChange = new EventEmitter<Date>(true);

    /** Emit when the end date changes */
    @Output() endChange = new EventEmitter<Date>(true);

    /** Emit when the start timezone changes. */
    @Output() startTimezoneChange: EventEmitter<DateTimePickerTimezone> = new EventEmitter<DateTimePickerTimezone>();

    /** Emit when the end timezone changes. */
    @Output() endTimezoneChange: EventEmitter<DateTimePickerTimezone> = new EventEmitter<DateTimePickerTimezone>();

    /** Calculate the number of days between the start and end date */
    get _duration(): number | null {
        if (this.rangeService.start && this.rangeService.end) {
            return differenceBetweenDates(this.rangeService.start, this.rangeService.end);
        }

        if (this.rangeService.start && !this.rangeService.end && this.rangeService.hover) {
            return this.rangeService.start.getTime() <= this.rangeService.hover.getTime() ? differenceBetweenDates(this.rangeService.start, this.rangeService.hover) : null;
        }

        // if we only have one selected date and have a hover date
        if (this.rangeService.end && !this.rangeService.start && this.rangeService.hover) {
            return this.rangeService.end.getTime() >= this.rangeService.hover.getTime() ? differenceBetweenDates(this.rangeService.end, this.rangeService.hover) : null;
        }
    }

    constructor(public rangeService: DateRangeService) { }

    /** Clear the selected date range */
    clear(): void {
        this.rangeService.clear();
    }

    /** Get the timezome based on the machine timezone */
    private getCurrentTimezone(): DateTimePickerTimezone {
        return this.timezones.find(timezone => timezone.offset === new Date().getTimezoneOffset());
    }

}
