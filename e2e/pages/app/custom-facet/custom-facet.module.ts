import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FacetsModule, CheckboxModule, AccessibilityModule } from '@ux-aspects/ux-aspects';
import { CustomFacetTestPageComponent } from './custom-facet.testpage.component';
import { SampleCustomFacetComponent } from './facet-component.testpage.component';

@NgModule({
  imports: [
    CommonModule,
    FacetsModule,
    CheckboxModule,
    AccessibilityModule,
    RouterModule.forChild([
      {
        path: '',
        component: CustomFacetTestPageComponent,
      },
    ]),
  ],
  declarations: [CustomFacetTestPageComponent, SampleCustomFacetComponent],
})
export class CustomFacetTestPageModule {}
