import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DateTimePickerModule } from '../date-time-picker/index';
import { DateRangePickerComponent } from './date-range-picker.component';
import { DateRangePickerDirective } from './date-range-picker.directive';

@NgModule({
  imports: [
    CommonModule,
    DateTimePickerModule
  ],
  declarations: [
    DateRangePickerComponent,
    DateRangePickerDirective
  ],
  exports: [
    DateRangePickerComponent
  ]
})
export class DateRangePickerModule { }
