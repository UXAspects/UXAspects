import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { differenceBetweenDates } from '../date-time-picker/date-time-picker.utils';
import { DateRangeService } from './date-range.service';

@Component({
    selector: 'ux-date-range-picker',
    templateUrl: './date-range-picker.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DateRangeService]
})
export class DateRangePickerComponent {

    /** Define the start date */
    @Input() set start(start: Date) {
        this.rangeService.start = start;
    }

    /** Define the end date */
    @Input() set end(end: Date) {
        this.rangeService.end = end;
    }

    /** Specifiy the weekday headers */
    @Input() weekdays: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    /** Emit when the start date changes */
    @Output() startChange = new EventEmitter<Date>(true);

    /** Emit when the end date changes */
    @Output() endChange = new EventEmitter<Date>(true);

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

    clear(): void {
        this.rangeService.clear();
    }

}
