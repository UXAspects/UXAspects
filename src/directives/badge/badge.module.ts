import { NgModule } from '@angular/core';
import { AccessibilityModule } from '../accessibility/index';
import { ColorServiceModule } from './../../services/color/color.module';
import { BadgeDirective } from './badge.directive';

@NgModule({
  imports: [ColorServiceModule, AccessibilityModule, BadgeDirective],
  exports: [BadgeDirective],
})
export class BadgeModule {}
