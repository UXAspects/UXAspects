import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpinButtonModule } from '../spin-button/index';
import { TimePickerModule } from '../time-picker/index';
import { DateTimePickerComponent } from './date-time-picker.component';
import { DateTimePickerConfig } from './date-time-picker.config';
import { DayViewComponent } from './day-view/day-view.component';
import { HeaderComponent } from './header/header.component';
import { MonthViewComponent } from './month-view/month-view.component';
import { TimeViewComponent } from './time-view/time-view.component';
import { YearViewComponent } from './year-view/year-view.component';
import { FocusIfModule } from '../../directives/focus-if/index';
import { ModuleWithProviders } from '@angular/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TimePickerModule,
        SpinButtonModule,
        FocusIfModule
    ],
    exports: [DateTimePickerComponent],
    declarations: [DateTimePickerComponent, HeaderComponent, DayViewComponent, MonthViewComponent, YearViewComponent, TimeViewComponent]
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
