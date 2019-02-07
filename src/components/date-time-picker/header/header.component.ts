import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { HasFocusIndicator, HasFocusIndicatorCtor, mixinFocusIndicator, _HasFocusIndicatorInputs } from '../../../common/index';
import { DatePickerMode, DateTimePickerService } from '../date-time-picker.service';

// Boilerplate for applying mixins.
export class HeaderBase { }

// Add all focus indicator properties to a new base class
export const _HeaderMixinBase: HasFocusIndicatorCtor & typeof HeaderBase = mixinFocusIndicator(HeaderBase);

@Component({
    selector: 'ux-date-time-picker-header',
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    inputs: [..._HasFocusIndicatorInputs]
})
export class HeaderComponent extends _HeaderMixinBase implements HasFocusIndicator {

    canAscend$: Observable<boolean> = this.datepicker.mode$.pipe(map(mode => mode !== DatePickerMode.Year));

    mode$: Observable<string> = this.datepicker.mode$.pipe(map(mode => {
        switch (mode) {
            case DatePickerMode.Day:
                return 'Day';
            case DatePickerMode.Month:
                return 'Month';
            case DatePickerMode.Year:
                return 'Year';
        }
    }));

    headerAria$: Observable<string> = this.datepicker.mode$.pipe(map(mode => {
        switch (mode) {
            case DatePickerMode.Day:
                return 'Switch to show months in the year';
            case DatePickerMode.Month:
                return 'Switch to show years in the decade';
            case DatePickerMode.Year:
                return '';
        }
    }));

    previousAria$: Observable<string> = this.datepicker.mode$.pipe(map(mode => {
        switch (mode) {
            case DatePickerMode.Day:
                return 'Previous month';
            case DatePickerMode.Month:
                return 'Previous year';
            case DatePickerMode.Year:
                return 'Previous decade';
        }
    }));

    nextAria$: Observable<string> = this.datepicker.mode$.pipe(map(mode => {
        switch (mode) {
            case DatePickerMode.Day:
                return 'Next month';
            case DatePickerMode.Month:
                return 'Next year';
            case DatePickerMode.Year:
                return 'Next decade';
        }
    }));

    constructor(public datepicker: DateTimePickerService) {
        super();
    }

    previous(): void {
        this.datepicker.goToPrevious();
    }

    ascend(): void {
        this.datepicker.goToParentMode();
    }

    next(): void {
        this.datepicker.goToNext();
    }
}