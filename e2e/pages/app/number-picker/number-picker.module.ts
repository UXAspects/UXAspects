import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, IconModule, NumberPickerModule } from '@ux-aspects/ux-aspects';
import { NumberPickerTestPageComponent } from './number-picker.testpage.component';
import { NumberPickerUpdateOnBlurTestPageComponent } from './updateOnBlur/number-picker-blur.testpage.component';

const ROUTES = [
    {
        path: '',
        component: NumberPickerTestPageComponent,
    },
    {
        path: 'updateOnBlur',
        component: NumberPickerUpdateOnBlurTestPageComponent,
    }
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NumberPickerModule,
        IconModule,
        AccessibilityModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        NumberPickerTestPageComponent,
        NumberPickerUpdateOnBlurTestPageComponent
    ]
})
export class NumberPickerTestPageModule { }
