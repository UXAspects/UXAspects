import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FacetsModule } from '@ux-aspects/ux-aspects';

import { FacetTypeaheadListPageComponent } from './facet-typeahead-list.testpage.component';

@NgModule({
    imports: [
        FacetsModule,
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
