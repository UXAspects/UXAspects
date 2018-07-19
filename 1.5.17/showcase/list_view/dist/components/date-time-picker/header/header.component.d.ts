import { Observable } from 'rxjs/Observable';
import { DateTimePickerService } from '../date-time-picker.service';
export declare class HeaderComponent {
    datepicker: DateTimePickerService;
    canAscend$: Observable<boolean>;
    mode$: Observable<string>;
    headerAria$: Observable<string>;
    previousAria$: Observable<string>;
    nextAria$: Observable<string>;
    constructor(datepicker: DateTimePickerService);
    previous(): void;
    ascend(): void;
    next(): void;
}
