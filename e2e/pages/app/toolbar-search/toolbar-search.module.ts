import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, ColorServiceModule, IconModule, ToolbarSearchModule, TypeaheadModule } from '@ux-aspects/ux-aspects';
import { ToolbarSearchTypeaheadTestPageComponent } from './toolbar-search-typeahead/toolbar-search-typeahead.testpage.component';
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
        RouterModule.forChild([
            {
                path: '',
                component: ToolbarSearchTestPageComponent
            },
            {
                path: 'toolbar-search-typeahead',
                component: ToolbarSearchTypeaheadTestPageComponent
            }
        ])
    ],
    declarations: [
        ToolbarSearchTestPageComponent,
        ToolbarSearchTypeaheadTestPageComponent
    ],
})
export class ToolbarSearchTestPageModule {

}
