import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { DateTimePickerConfig } from './date-time-picker.config';
export declare class DateTimePickerService {
    private _config;
    mode$: BehaviorSubject<DatePickerMode>;
    date$: BehaviorSubject<Date>;
    timezone$: BehaviorSubject<DateTimePickerTimezone>;
    selected$: BehaviorSubject<Date>;
    month$: BehaviorSubject<number>;
    year$: BehaviorSubject<number>;
    showDate$: BehaviorSubject<boolean>;
    showTime$: BehaviorSubject<boolean>;
    showTimezone$: BehaviorSubject<boolean>;
    showSeconds$: BehaviorSubject<boolean>;
    showMeridian$: BehaviorSubject<boolean>;
    showSpinners$: BehaviorSubject<boolean>;
    weekdays$: BehaviorSubject<string[]>;
    nowBtnText$: BehaviorSubject<string>;
    timezones$: BehaviorSubject<DateTimePickerTimezone[]>;
    header$: BehaviorSubject<string>;
    headerEvent$: Subject<DatePickerHeaderEvent>;
    modeDirection: ModeDirection;
    private _subscription;
    constructor(_config: DateTimePickerConfig);
    ngOnDestroy(): void;
    setViewportMonth(month: number): void;
    setViewportYear(year: number): void;
    setDate(day: number, month: number, year: number): void;
    setDateToNow(): void;
    setViewportMode(mode: DatePickerMode): void;
    goToChildMode(): void;
    goToParentMode(): void;
    goToNext(): void;
    goToPrevious(): void;
    setHeader(header: string): void;
    getCurrentTimezone(): DateTimePickerTimezone;
    setTimezone(timezone: DateTimePickerTimezone): void;
}
export declare enum DatePickerMode {
    Day = 0,
    Month = 1,
    Year = 2,
}
export declare enum ModeDirection {
    None = 0,
    Ascend = 1,
    Descend = 2,
}
export declare enum DatePickerHeaderEvent {
    Previous = 0,
    Next = 1,
}
export interface DateTimePickerTimezone {
    name: string;
    offset: number;
}
