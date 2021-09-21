import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, IconModule, NumberPickerModule } from '@ux-aspects/ux-aspects';
import { NumberPickerTestPageComponent } from './number-picker.testpage.component';
import { NumberPickerReadOnlyTestPageComponent } from './readonly/number-picker-read-only.testpage.component';
import { NumberPickerUpdateOnTestPageComponent } from './updateOn/number-picker-update-on.testpage.component';

const ROUTES = [
    {
        path: '',
        component: NumberPickerTestPageComponent,
    },
    {
        path: 'updateOn',
        component: NumberPickerUpdateOnTestPageComponent,
    },
    {
        path: 'readonly',
        component: NumberPickerReadOnlyTestPageComponent,
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
        NumberPickerUpdateOnTestPageComponent,
        NumberPickerReadOnlyTestPageComponent
    ]
})
export class NumberPickerTestPageModule { }
