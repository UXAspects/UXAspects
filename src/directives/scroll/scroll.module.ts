import { NgModule } from '@angular/core';
import { ScrollIntoViewIfDirective } from './scroll-into-view-if.directive';
import { ScrollIntoViewDirective } from './scroll-into-view.directive';

@NgModule({
  imports: [ScrollIntoViewIfDirective, ScrollIntoViewDirective],
  exports: [ScrollIntoViewIfDirective, ScrollIntoViewDirective],
})
export class ScrollModule {}
