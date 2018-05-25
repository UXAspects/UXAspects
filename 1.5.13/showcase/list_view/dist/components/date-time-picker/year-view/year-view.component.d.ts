import { DateTimePickerService } from '../date-time-picker.service';
import { YearViewService, YearViewItem } from './year-view.service';
export declare class YearViewComponent {
    private _datePicker;
    yearService: YearViewService;
    constructor(_datePicker: DateTimePickerService, yearService: YearViewService);
    select(year: number): void;
    focusYear(item: YearViewItem, yearOffset: number): void;
    trackRowByFn(index: number): number;
    trackYearByFn(index: number, item: YearViewItem): number;
    getTabbable(item: YearViewItem): boolean;
}
