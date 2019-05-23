import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { ResizeModule } from '../../directives/resize/index';
import { ColorServiceModule } from '../../services/color/index';
import { TooltipModule } from '../tooltip/index';
import { SankeyNodeDirective } from './sankey-chart-node.directive';
import { SankeyChartComponent } from './sankey-chart.component';

@NgModule({
    declarations: [
        SankeyChartComponent,
        SankeyNodeDirective
    ],
    imports: [
        AccessibilityModule,
        CommonModule,
        ResizeModule,
        TooltipModule,
        ColorServiceModule
    ],
    exports: [
        SankeyChartComponent
    ]
})
export class SankeyChartModule { }
