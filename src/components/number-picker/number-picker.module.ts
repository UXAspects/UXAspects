import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconModule } from '../icon/index';
import { NumberPickerComponent } from './number-picker.component';

@NgModule({
    imports: [
        CommonModule,
        IconModule,
        FormsModule
    ],
    exports: [NumberPickerComponent],
    declarations: [NumberPickerComponent]
})
export class NumberPickerModule { }
