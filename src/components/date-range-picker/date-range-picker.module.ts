import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DateTimePickerModule } from '../date-time-picker/index';
import { IconModule } from '../icon/index';
import { DateRangePickerComponent } from './date-range-picker.component';
import { DateRangePickerDirective } from './date-range-picker.directive';
import { DateLocalizationPipe } from './date-localization.pipe';

@NgModule({
    imports: [
        CommonModule,
        DateTimePickerModule,
        IconModule,
    ],
    declarations: [
        DateRangePickerComponent,
        DateRangePickerDirective,
        DateLocalizationPipe
    ],
    exports: [
        DateRangePickerComponent
    ]
})
export class DateRangePickerModule { }
