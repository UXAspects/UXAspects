import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NumberPickerComponent } from './number-picker.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [NumberPickerComponent],
    declarations: [NumberPickerComponent]
})
export class NumberPickerModule { }
