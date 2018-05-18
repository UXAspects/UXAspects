import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimeFormatPipe } from './time-format.pipe';
import { TimePickerComponent } from './time-picker.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [TimePickerComponent],
    declarations: [TimePickerComponent, TimeFormatPipe],
})
export class TimePickerModule { }