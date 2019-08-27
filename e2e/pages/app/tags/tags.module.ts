import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccordionModule, CheckboxModule, IconModule, NumberPickerModule, RadioButtonModule, TagInputModule, TypeaheadModule } from '@ux-aspects/ux-aspects';
import { TagsTestPageComponent } from './tags.testpage.component';


@NgModule({
    imports: [
        FormsModule,
        AccordionModule,
        TypeaheadModule,
        CommonModule,
        CheckboxModule,
        IconModule,
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
