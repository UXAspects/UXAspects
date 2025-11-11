import { NgModule } from '@angular/core';
import { AccessibilityModule } from '../accessibility/index';
import { HoverActionContainerDirective } from './hover-action-container.directive';
import { HoverActionDirective } from './hover-action.directive';

const DECLARATIONS = [HoverActionDirective, HoverActionContainerDirective];

@NgModule({
  imports: [AccessibilityModule, ...DECLARATIONS],
  exports: DECLARATIONS,
})
export class HoverActionModule {}
