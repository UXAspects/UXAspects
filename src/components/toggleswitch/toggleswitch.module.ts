import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { ToggleSwitchComponent } from './toggleswitch.component';

@NgModule({
  imports: [AccessibilityModule, FormsModule, ToggleSwitchComponent],
  exports: [ToggleSwitchComponent],
})
export class ToggleSwitchModule {}
