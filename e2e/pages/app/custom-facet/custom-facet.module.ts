import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FacetsModule, CheckboxModule } from '@ux-aspects/ux-aspects';

import { CustomFacetTestPageComponent } from './custom-facet.testpage.component';
import { SampleCustomFacetComponent } from './facet-component.testpage.component';

@NgModule({
    imports: [
        CommonModule,
        FacetsModule,
        CheckboxModule,
        RouterModule.forChild([
            {
                path: '',
                component: CustomFacetTestPageComponent
            }
        ])
    ],
    declarations: [
        CustomFacetTestPageComponent,
        SampleCustomFacetComponent
    ]
})
export class CustomFacetTestPageModule { }
