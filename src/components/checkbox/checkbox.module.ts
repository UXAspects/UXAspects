import { NgModule } from '@angular/core';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { CheckboxComponent } from './checkbox.component';

@NgModule({
  imports: [AccessibilityModule, CheckboxComponent],
  exports: [CheckboxComponent],
})
export class CheckboxModule {}
