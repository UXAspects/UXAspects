import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { FormsModule } from '@angular/forms';
import { TagInputModule, TypeaheadModule, CheckboxModule, NumberPickerModule, RadioButtonModule } from '../../../../dist';

import { TagsTestPageComponent } from './tags.testpage.component';

@NgModule({
    imports: [
        FormsModule,
        AccordionModule.forRoot(),
        TypeaheadModule,
        CommonModule,
        CheckboxModule,
        RadioButtonModule,
        NumberPickerModule,
        TagInputModule,
        RouterModule.forChild([
            {
                path: '',
                component: TagsTestPageComponent
            }
        ])
    ],
    declarations: [TagsTestPageComponent]
})
export class TagsTestPageModule { }
