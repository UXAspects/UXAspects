import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CheckboxModule, RadioButtonModule, SelectionModule, AccordionModule, AccessibilityModule } from '@ux-aspects/ux-aspects';
import { SelectionTestPageComponent } from './selection.testpage.component';

@NgModule({
    imports: [
        AccordionModule,
        CheckboxModule,
        CommonModule,
        RadioButtonModule,
        AccessibilityModule,
        FormsModule,
        SelectionModule,
        RouterModule.forChild([
            {
                path: '',
                component: SelectionTestPageComponent
            }
        ])
    ],
    declarations: [SelectionTestPageComponent]
})
export class SelectionTestPageModule { }
