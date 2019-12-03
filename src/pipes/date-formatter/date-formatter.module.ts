import { NgModule } from '@angular/core';

import { DateFormatterPipe } from './date-formatter.pipe';

@NgModule({
    exports: [DateFormatterPipe],
    declarations: [DateFormatterPipe]
})
export class DateFormatterPipeModule { }
