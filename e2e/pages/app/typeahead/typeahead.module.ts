import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RadioButtonModule, TypeaheadModule, AccessibilityModule } from '@ux-aspects/ux-aspects';
import { TypeaheadTestPageComponent } from './typeahead.testpage.component';


@NgModule({
    imports: [
        FormsModule,
        TypeaheadModule,
        CommonModule,
        RadioButtonModule,
        AccessibilityModule,
        RouterModule.forChild([
            {
                path: '',
                component: TypeaheadTestPageComponent
            }
        ])
    ],
    declarations: [TypeaheadTestPageComponent]
})
export class TypeaheadTestPageModule { }