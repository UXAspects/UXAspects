import { NgModule } from '@angular/core';
import { AccessibilityModule } from '../accessibility/index';
import { ColorServiceModule } from './../../services/color/color.module';
import { BadgeDirective } from './badge.directive';

@NgModule({
  imports: [ColorServiceModule, AccessibilityModule],
  exports: [BadgeDirective],
  declarations: [BadgeDirective],
})
export class BadgeModule {}
