import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ColorServiceModule, IconModule, ToolbarSearchModule, AccessibilityModule,  TypeaheadModule } from '@ux-aspects/ux-aspects';
import { ToolbarSearchTestPageComponent } from './toolbar-search.testpage.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TypeaheadModule,
        ReactiveFormsModule,
        ToolbarSearchModule,
        ColorServiceModule,
        AccessibilityModule,
        IconModule,
        RouterModule.forChild([{
            path: '',
            component: ToolbarSearchTestPageComponent
        }])
    ],
    declarations: [ToolbarSearchTestPageComponent],
})
export class ToolbarSearchTestPageModule {

}
