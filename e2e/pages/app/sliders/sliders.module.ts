import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SliderModule } from '../../../../dist';

import { SlidersTestPageComponent } from './sliders.testpage.component';

@NgModule({
    imports: [
        FormsModule,
        SliderModule,
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
