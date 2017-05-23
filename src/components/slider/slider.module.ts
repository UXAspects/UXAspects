import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ColorServiceModule } from '../../services/color/index';

import { SliderComponent } from './slider.component';

@NgModule({
    imports: [
        CommonModule,
        ColorServiceModule
    ],
    exports: [SliderComponent],
    declarations: [SliderComponent]
})
export class SliderModule { }