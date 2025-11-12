import { NgModule } from '@angular/core';
import { DateFormatterPipe } from './date-formatter.pipe';

@NgModule({
  imports: [DateFormatterPipe],
  exports: [DateFormatterPipe],
})
export class DateFormatterPipeModule {}
