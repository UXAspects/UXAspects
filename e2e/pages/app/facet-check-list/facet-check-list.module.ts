import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FacetsModule } from '@ux-aspects/ux-aspects';

import { FacetCheckListTestPageComponent } from './facet-check-list.testpage.component';

@NgModule({
    imports: [
        CommonModule,
        FacetsModule,
        RouterModule.forChild([
            {
                path: '',
                component: FacetCheckListTestPageComponent
            }
        ])
    ],
    declarations: [FacetCheckListTestPageComponent]
})
export class FacetCheckListTestPageModule { }
