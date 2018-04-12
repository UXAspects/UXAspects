import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DatePickerMode } from './date-time-picker.component';
import 'rxjs/add/operator/distinctUntilChanged';
export declare class DateTimePickerService {
    date: BehaviorSubject<Date>;
    activeDate: BehaviorSubject<Date>;
    mode: BehaviorSubject<DatePickerMode>;
    month: BehaviorSubject<number>;
    year: BehaviorSubject<number>;
    constructor();
}
