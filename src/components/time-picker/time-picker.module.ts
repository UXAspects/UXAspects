import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { SpinButtonModule } from '../spin-button/index';
import { TimePickerComponent } from './time-picker.component';

@NgModule({
    imports: [
        AccessibilityModule,
        CommonModule,
        FormsModule,
        SpinButtonModule
    ],
    exports: [TimePickerComponent],
    declarations: [TimePickerComponent],
})
export class TimePickerModule { }