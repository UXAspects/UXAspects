import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, AccordionModule, CheckboxModule, IconModule, NumberPickerModule, RadioButtonModule, ResizeModule, SelectModule } from '@ux-aspects/ux-aspects';
import { SelectFormsTestPageComponent } from './forms/select-forms.testpage.component';
import { SelectTestPageComponent } from './standard/select.testpage.component';

@NgModule({
    imports: [
        AccordionModule,
        CheckboxModule,
        CommonModule,
        RadioButtonModule,
        SelectModule,
        NumberPickerModule,
        AccessibilityModule,
        FormsModule,
        IconModule,
        ResizeModule,
        RouterModule.forChild([
            {
                path: '',
                component: SelectTestPageComponent
            },
            {
                path: 'forms',
                component: SelectFormsTestPageComponent
            }
        ])
    ],
    declarations: [
        SelectTestPageComponent,
        SelectFormsTestPageComponent
    ]
})
export class SelectTestPageModule { }
