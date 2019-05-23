import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { ResizeModule } from '../../directives/resize/index';
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
        TooltipModule
    ],
    exports: [
        SankeyChartComponent
    ]
})
export class SankeyChartModule { }
