import { NgModule } from '@angular/core';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { FlippableCardBackDirective, FlippableCardComponent, FlippableCardFrontDirective } from './flippable-card.component';


@NgModule({
    imports: [
        AccessibilityModule
    ],
    exports: [
        FlippableCardComponent,
        FlippableCardBackDirective,
        FlippableCardFrontDirective
    ],
    declarations: [
        FlippableCardComponent,
        FlippableCardBackDirective,
        FlippableCardFrontDirective
    ]
})
export class FlippableCardModule { }
