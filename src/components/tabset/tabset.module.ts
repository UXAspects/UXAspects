import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { TabHeadingDirective } from './tab/tab-heading.directive';
import { TabComponent } from './tab/tab.component';
import { TabsetComponent } from './tabset.component';

@NgModule({
  imports: [
    AccessibilityModule,
    CommonModule,
    RouterModule,
    TabsetComponent,
    TabComponent,
    TabHeadingDirective,
  ],
  exports: [TabsetComponent, TabComponent, TabHeadingDirective],
})
export class TabsetModule {}
