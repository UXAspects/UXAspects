import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, AccordionModule, CheckboxModule, IconModule, InputDropdownModule, NumberPickerModule, RadioButtonModule, ResizeModule, SelectModule } from '@ux-aspects/ux-aspects';
import { InputDropdownTestPageComponent } from './input-dropdown.testpage.component';

@NgModule({
    imports: [
        AccordionModule,
        CheckboxModule,
        CommonModule,
        AccordionModule,
        InputDropdownModule,
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
                component: InputDropdownTestPageComponent
            },
        ])
    ],
    declarations: [
        InputDropdownTestPageComponent,
    ]
})
export class InputDropdownTestPageModule { }
