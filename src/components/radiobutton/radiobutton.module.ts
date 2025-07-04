import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { RadioButtonGroupDirective } from './radio-button-group/radio-button-group.directive';
import { RadioButtonComponent } from './radiobutton.component';

@NgModule({
  imports: [AccessibilityModule, FormsModule],
  exports: [RadioButtonComponent, RadioButtonGroupDirective],
  declarations: [RadioButtonComponent, RadioButtonGroupDirective],
})
export class RadioButtonModule {}
