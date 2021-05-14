import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, AccordionModule, CheckboxModule, IconModule, NumberPickerModule, RadioButtonModule, ResizeModule, SelectModule } from '@ux-aspects/ux-aspects';
import { SelectCustomHeadingTestPageComponent } from './custom-heading/select-custom-heading.testpage.component';
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
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: SelectTestPageComponent
            },
            {
                path: 'forms',
                component: SelectFormsTestPageComponent
            },
            {
                path: 'custom-heading',
                component: SelectCustomHeadingTestPageComponent
            }
        ])
    ],
    declarations: [
        SelectTestPageComponent,
        SelectFormsTestPageComponent,
        SelectCustomHeadingTestPageComponent
    ]
})

export class SelectTestPageModule { }
