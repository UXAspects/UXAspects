import { NgModule } from '@angular/core';
import { AccessibilityModule } from '../../directives/accessibility/index';
import {
  FlippableCardBackDirective,
  FlippableCardComponent,
  FlippableCardFrontDirective,
} from './flippable-card.component';

@NgModule({
  imports: [
    AccessibilityModule,
    FlippableCardComponent,
    FlippableCardBackDirective,
    FlippableCardFrontDirective,
  ],
  exports: [FlippableCardComponent, FlippableCardBackDirective, FlippableCardFrontDirective],
})
export class FlippableCardModule {}
