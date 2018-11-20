import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FacetsModule } from '@ux-aspects/ux-aspects';

import { FacetContainerTestPageComponent } from './facet-container.testpage.component';

@NgModule({
    imports: [
        FacetsModule,
        RouterModule.forChild([
            {
                path: '',
                component: FacetContainerTestPageComponent
            }
        ])
    ],
    declarations: [FacetContainerTestPageComponent]
})
export class FacetContainerTestPageModule { }
