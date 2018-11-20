import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NumberPickerModule } from '@ux-aspects/ux-aspects';

import { NumberPickerTestPageComponent } from './number-picker.testpage.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NumberPickerModule,
        RouterModule.forChild([
            {
                path: '',
                component: NumberPickerTestPageComponent
            }
        ])
    ],
    declarations: [NumberPickerTestPageComponent]
})
export class NumberPickerTestPageModule { }
