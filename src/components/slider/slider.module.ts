import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { DragModule } from '../../directives/drag/index';
import { ColorServiceModule } from '../../services/color/index';
import { SliderComponent } from './slider.component';


@NgModule({
    imports: [
        AccessibilityModule,
        CommonModule,
        ColorServiceModule,
        DragModule
    ],
    exports: [
        SliderComponent
    ],
    declarations: [
        SliderComponent
    ]
})
export class SliderModule { }