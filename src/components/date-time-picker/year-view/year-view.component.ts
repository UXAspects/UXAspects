import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HasFocusIndicator, HasFocusIndicatorCtor, mixinFocusIndicator, _HasFocusIndicatorInputs } from '../../../common/index';
import { DateTimePickerService } from '../date-time-picker.service';
import { YearViewItem, YearViewService } from './year-view.service';


// Boilerplate for applying mixins.
export class YearViewBase { }

// Add all focus indicator properties to a new base class
export const _YearViewMixinBase: HasFocusIndicatorCtor & typeof YearViewBase = mixinFocusIndicator(YearViewBase);

@Component({
    selector: 'ux-date-time-picker-year-view',
    templateUrl: './year-view.component.html',
    providers: [YearViewService],
    inputs: [..._HasFocusIndicatorInputs],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class YearViewComponent extends _YearViewMixinBase implements HasFocusIndicator {

    constructor(private _datePicker: DateTimePickerService, public yearService: YearViewService) {
        super();
    }

    select(year: number): void {
        this._datePicker.setViewportYear(year);

        // show the month picker
        this._datePicker.goToChildMode();
    }

    focusYear(item: YearViewItem, yearOffset: number): void {
        this.yearService.setFocus(item.year + yearOffset);
    }

    trackRowByFn(index: number): number {
        return index;
    }

    trackYearByFn(index: number, item: YearViewItem): number {
        return item.year;
    }

    getTabbable(item: YearViewItem): boolean {
        const focused = this.yearService.focused$.value;
        const grid = this.yearService.grid$.value;

        // if there is a focused year check if this is it
        if (focused) {

            // check if the focused year is visible
            const isFocusedYearVisible = !!grid.find(row => !!row.find(_item => _item.year === focused));

            if (isFocusedYearVisible) {
                return focused === item.year;
            }
        }

        // if there is no focusable year then check if there is a selected year
        const isSelectedYearVisible = !!grid.find(row => !!row.find(year => year.isActiveYear));

        if (isSelectedYearVisible) {
            return item.isActiveYear;
        }

        // otherwise make the first month tabbable
        return grid[0][0].year === item.year;
    }

}
