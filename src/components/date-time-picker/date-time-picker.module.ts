import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { DateTimePickerComponent } from './date-time-picker.component';
import { DateTimePickerConfig } from './date-time-picker.config';
import { DateTimePickerDayViewComponent } from './day-view/day-view.component';
import { DateTimePickerHeaderComponent } from './header/header.component';
import { DateTimePickerMonthViewComponent } from './month-view/month-view.component';
import { DateTimePickerTimeViewComponent } from './time-view/time-view.component';
import { DateTimePickerYearViewComponent } from './year-view/year-view.component';


const DECLARATIONS = [
    DateTimePickerComponent,
    DateTimePickerDayViewComponent,
    DateTimePickerMonthViewComponent,
    DateTimePickerYearViewComponent,
    DateTimePickerTimeViewComponent,
    DateTimePickerHeaderComponent
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TimepickerModule.forRoot(),
        ButtonsModule.forRoot()
    ],
    exports: DECLARATIONS,
    declarations: DECLARATIONS,
    providers: [
        DateTimePickerConfig
    ]
})
export class DateTimePickerModule { }
