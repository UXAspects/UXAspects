import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DateFormatterPipeModule } from '../../pipes/date-formatter/index';
import { DateTimePickerModule } from '../date-time-picker/index';
import { IconModule } from '../icon/index';
import { DateRangePickerComponent } from './date-range-picker.component';
import { DateRangePickerDirective } from './date-range-picker.directive';

@NgModule({
  imports: [CommonModule, DateTimePickerModule, IconModule, DateFormatterPipeModule],
  declarations: [DateRangePickerComponent, DateRangePickerDirective],
  exports: [DateRangePickerComponent],
})
export class DateRangePickerModule {}
