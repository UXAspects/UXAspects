import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SliderModule, AccessibilityModule } from '@ux-aspects/ux-aspects';

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
            }
        ])
    ],
    declarations: [SlidersTestPageComponent]
})
export class SlidersTestPageModule { }
