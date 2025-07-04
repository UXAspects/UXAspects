import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FacetsModule, AccessibilityModule } from '@ux-aspects/ux-aspects';
import { FacetCheckListTestPageComponent } from './facet-check-list.testpage.component';

@NgModule({
  imports: [
    CommonModule,
    FacetsModule,
    AccessibilityModule,
    RouterModule.forChild([
      {
        path: '',
        component: FacetCheckListTestPageComponent,
      },
    ]),
  ],
  declarations: [FacetCheckListTestPageComponent],
})
export class FacetCheckListTestPageModule {}
