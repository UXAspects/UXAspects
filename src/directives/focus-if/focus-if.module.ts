import { NgModule } from '@angular/core';
import { FocusIfDirective } from './focus-if.directive';

@NgModule({
  imports: [FocusIfDirective],
  exports: [FocusIfDirective],
})
export class FocusIfModule {}
