import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, IconModule, NumberPickerModule } from '@ux-aspects/ux-aspects';
import { NumberPickerTestPageComponent } from './number-picker.testpage.component';
import { NumberPickerUpdateOnTestPageComponent } from './updateOn/number-picker-update-on.testpage.component';

const ROUTES = [
    {
        path: '',
        component: NumberPickerTestPageComponent,
    },
    {
        path: 'updateOn',
        component: NumberPickerUpdateOnTestPageComponent,
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
        NumberPickerUpdateOnTestPageComponent
    ]
})
export class NumberPickerTestPageModule { }
