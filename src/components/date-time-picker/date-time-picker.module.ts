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

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TimePickerModule,
        SpinButtonModule
    ],
    exports: [DateTimePickerComponent],
    declarations: [DateTimePickerComponent, HeaderComponent, DayViewComponent, MonthViewComponent, YearViewComponent, TimeViewComponent],
    providers: [
        DateTimePickerConfig
    ]
})
export class DateTimePickerModule { }
