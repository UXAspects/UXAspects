import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconModule, NumberPickerModule } from '@ux-aspects/ux-aspects';
import { NumberPickerTestPageComponent } from './number-picker.testpage.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NumberPickerModule,
        IconModule,
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
