import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SliderComponent } from './slider.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [SliderComponent],
    declarations: [SliderComponent]
})
export class SliderModule { }