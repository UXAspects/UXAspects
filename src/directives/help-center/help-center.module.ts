import { NgModule } from '@angular/core';
import { HelpCenterItemDirective } from './help-center-item.directive';

@NgModule({
  imports: [HelpCenterItemDirective],
  exports: [HelpCenterItemDirective],
})
export class HelpCenterModule {}
