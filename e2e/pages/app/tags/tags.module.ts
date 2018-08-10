import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TagInputModule, TypeaheadModule, CheckboxModule, NumberPickerModule, RadioButtonModule, AccordionModule } from '../../../../dist';

import { TagsTestPageComponent } from './tags.testpage.component';

@NgModule({
    imports: [
        FormsModule,
        AccordionModule,
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
