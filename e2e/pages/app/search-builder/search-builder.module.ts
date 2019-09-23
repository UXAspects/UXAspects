import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchBuilderModule, AccessibilityModule } from '@ux-aspects/ux-aspects';

import { SearchBuilderTestPageComponent } from './search-builder.testpage.component';

@NgModule({
    imports: [
        CommonModule,
        SearchBuilderModule,
        AccessibilityModule,
        RouterModule.forChild([
            {
                path: '',
                component: SearchBuilderTestPageComponent
            }
        ])
    ],
    declarations: [SearchBuilderTestPageComponent]
})
export class SearchBuilderTestPageModule { }
