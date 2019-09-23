import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FacetsModule, AccessibilityModule } from '@ux-aspects/ux-aspects';

import { FacetTypeaheadListPageComponent } from './facet-typeahead-list.testpage.component';

@NgModule({
    imports: [
        FacetsModule,
        AccessibilityModule,
        RouterModule.forChild([
            {
                path: '',
                component: FacetTypeaheadListPageComponent
            }
        ])
    ],
    declarations: [FacetTypeaheadListPageComponent]
})
export class FacetTypeaheadListPageModule { }
