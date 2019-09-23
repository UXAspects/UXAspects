import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ResizeModule } from '../../directives/resize/index';
import { ColorServiceModule } from '../../services/color/index';
import { TooltipModule } from '../tooltip/index';
import { NestedDonutChartComponent } from './nested-donut-chart.component';

@NgModule({
    imports: [
        CommonModule,
        ColorServiceModule,
        TooltipModule,
        ResizeModule
    ],
    declarations: [
        NestedDonutChartComponent
    ],
    exports: [
        NestedDonutChartComponent
    ]
})
export class NestedDonutChartModule { }
