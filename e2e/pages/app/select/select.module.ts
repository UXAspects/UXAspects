import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccordionModule, CheckboxModule, NumberPickerModule, RadioButtonModule, ResizeModule, SelectModule, AccessibilityModule } from '@ux-aspects/ux-aspects';
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
