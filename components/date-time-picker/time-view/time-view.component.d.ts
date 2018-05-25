import { DateTimePickerService } from '../date-time-picker.service';
export declare class TimeViewComponent {
    datepicker: DateTimePickerService;
    constructor(datepicker: DateTimePickerService);
    selectTimezone(name: string): void;
    incrementTimezone(): void;
    decrementTimezone(): void;
}
