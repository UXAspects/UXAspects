import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, SliderModule } from '@ux-aspects/ux-aspects';
import { SlidersPersistentCalloutTestPageComponent } from './persistent-callout/sliders-persistent-callout.component';
import { SlidersTestPageComponent } from './sliders.testpage.component';

@NgModule({
    imports: [
        FormsModule,
        SliderModule,
        AccessibilityModule,
        RouterModule.forChild([
            {
                path: '',
                component: SlidersTestPageComponent
            },
            {
                path: 'persistent-callout',
                component: SlidersPersistentCalloutTestPageComponent
            }
        ])
    ],
    declarations: [
        SlidersTestPageComponent,
        SlidersPersistentCalloutTestPageComponent
    ]
})
export class SlidersTestPageModule { }
