import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CheckboxModule, RadioButtonModule, SelectionModule, AccordionModule } from '../../../../dist';
import { SelectionTestPageComponent } from './selection.testpage.component';

@NgModule({
    imports: [
        AccordionModule,
        CheckboxModule,
        CommonModule,
        RadioButtonModule,
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
