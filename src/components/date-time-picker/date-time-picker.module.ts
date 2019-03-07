import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { FocusIfModule } from '../../directives/focus-if/index';
import { SpinButtonModule } from '../spin-button/index';
import { TimePickerModule } from '../time-picker/index';
import { DateTimePickerComponent } from './date-time-picker.component';
import { DateTimePickerConfig } from './date-time-picker.config';
import { DayViewComponent } from './day-view/day-view.component';
import { HeaderComponent } from './header/header.component';
import { MonthViewComponent } from './month-view/month-view.component';
import { WeekDaySortPipe } from './pipes/weekday-sort.pipe';
import { TimeViewComponent } from './time-view/time-view.component';
import { YearViewComponent } from './year-view/year-view.component';

@NgModule({
    imports: [
        A11yModule,
        AccessibilityModule,
        CommonModule,
        FormsModule,
        TimePickerModule,
        SpinButtonModule,
        FocusIfModule
    ],
    exports: [DateTimePickerComponent],
    declarations: [
        DateTimePickerComponent,
        HeaderComponent,
        DayViewComponent,
        MonthViewComponent,
        YearViewComponent,
        TimeViewComponent,
        WeekDaySortPipe
    ]
})
export class DateTimePickerModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DateTimePickerModule,
            providers: [
                DateTimePickerConfig
            ]
        };
    }
}
