import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessibilityModule } from '@ux-aspects/ux-aspects';
import { AngularSplitModule } from 'angular-split';
import { SplitterTestPageComponent } from './splitter.testpage.component';

@NgModule({
  imports: [
    AngularSplitModule,
    AccessibilityModule,
    RouterModule.forChild([
      {
        path: '',
        component: SplitterTestPageComponent,
      },
    ]),
  ],
  declarations: [SplitterTestPageComponent],
})
export class SplitterTestPageModule {}
