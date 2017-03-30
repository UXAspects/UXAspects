import { NgModule } from '@angular/core';

import { FlippableCardComponent, FlippableCardBackDirective, FlippableCardFrontDirective } from './flippable-card.component';

@NgModule({
    exports: [FlippableCardComponent, FlippableCardBackDirective, FlippableCardFrontDirective],
    declarations: [FlippableCardComponent, FlippableCardBackDirective, FlippableCardFrontDirective]
})
export class FlippableCardModule { }
