import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HierarchyBarModule, AccessibilityModule, RadioButtonModule } from '@ux-aspects/ux-aspects';
import { HierarchyBarTestPageComponent } from './hierarchy-bar.testpage.component';

@NgModule({
  imports: [
    CommonModule,
    HierarchyBarModule,
    AccessibilityModule,
    RouterModule.forChild([
      {
        path: '',
        component: HierarchyBarTestPageComponent,
      },
    ]),
    RadioButtonModule,
    FormsModule,
  ],
  declarations: [HierarchyBarTestPageComponent],
})
export class HierarchyBarTestPageModule {}
