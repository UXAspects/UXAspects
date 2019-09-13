import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FacetsModule, AccessibilityModule } from '@ux-aspects/ux-aspects';

import { FacetContainerTestPageComponent } from './facet-container.testpage.component';

@NgModule({
    imports: [
        FacetsModule,
        AccessibilityModule,
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
