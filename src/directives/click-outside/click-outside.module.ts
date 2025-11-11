import { NgModule } from '@angular/core';
import { ClickOutsideDirective } from './click-outside.directive';

@NgModule({
  imports: [ClickOutsideDirective],
  exports: [ClickOutsideDirective],
})
export class ClickOutsideModule {}
