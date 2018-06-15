import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpinButtonModule } from '../spin-button/index';
import { TimeFormatPipe } from './time-format.pipe';
import { TimePickerComponent } from './time-picker.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SpinButtonModule
    ],
    exports: [TimePickerComponent],
    declarations: [TimePickerComponent, TimeFormatPipe],
})
export class TimePickerModule { }