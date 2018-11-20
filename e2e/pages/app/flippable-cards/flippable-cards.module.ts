import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlippableCardModule, SparkModule, ColorServiceModule } from '@ux-aspects/ux-aspects';

import { FlippableCardsTestPageComponent } from './flippable-cards.testpage.component';

@NgModule({
    imports: [
        SparkModule,
        FlippableCardModule,
        ColorServiceModule,
        RouterModule.forChild([
            {
                path: '',
                component: FlippableCardsTestPageComponent
            }
        ])
    ],
    declarations: [FlippableCardsTestPageComponent]
})
export class FlippableCardsTestPageModule { }
