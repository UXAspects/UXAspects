import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, AccordionModule, CheckboxModule, IconModule, InputDropdownModule, NumberPickerModule, RadioButtonModule } from '@ux-aspects/ux-aspects';
import { InputDropdownFormsTestPageComponent } from './forms/input-dropdown-forms.testpage.component';
import { InputDropdownTestPageComponent } from './standard/input-dropdown.testpage.component';

@NgModule({
    imports: [
        AccordionModule,
        CheckboxModule,
        CommonModule,
        InputDropdownModule,
        RadioButtonModule,
        NumberPickerModule,
        AccessibilityModule,
        FormsModule,
        IconModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: InputDropdownTestPageComponent
            },
            {
                path: 'forms',
                component: InputDropdownFormsTestPageComponent
            },
        ])
    ],
    declarations: [
        InputDropdownTestPageComponent,
        InputDropdownFormsTestPageComponent
    ]
})
export class InputDropdownTestPageModule { }
