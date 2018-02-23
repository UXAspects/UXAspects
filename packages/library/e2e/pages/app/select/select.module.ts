import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { SelectModule, NumberPickerModule, CheckboxModule, RadioButtonModule } from '../../../../dist';

import { SelectTestPageComponent } from './select.testpage.component';

@NgModule({
    imports: [
        AccordionModule.forRoot(),
        CheckboxModule,
        CommonModule,
        RadioButtonModule,
        SelectModule,
        NumberPickerModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: SelectTestPageComponent
            }
        ])
    ],
    declarations: [SelectTestPageComponent]
})
export class SelectTestPageModule { }
