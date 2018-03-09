import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ColorServiceModule } from '../../services/color/index';

import { SliderComponent } from './slider.component';
import { DragModule } from '../../directives/drag/index';

@NgModule({
    imports: [
        CommonModule,
        ColorServiceModule,
        DragModule
    ],
    exports: [SliderComponent],
    declarations: [SliderComponent]
})
export class SliderModule { }