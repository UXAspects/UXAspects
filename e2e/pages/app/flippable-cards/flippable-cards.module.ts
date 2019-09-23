import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColorServiceModule, FlippableCardModule, IconModule, SparkModule, AccessibilityModule } from '@ux-aspects/ux-aspects';
import { FlippableCardsTestPageComponent } from './flippable-cards.testpage.component';

@NgModule({
    imports: [
        SparkModule,
        FlippableCardModule,
        ColorServiceModule,
        IconModule,
        AccessibilityModule,
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
