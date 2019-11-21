import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, FileSizePipeModule, SankeyChartModule } from '@ux-aspects/ux-aspects';
import { SankeyChartTestPageComponent } from './sankey-chart.testpage.component';

@NgModule({
    imports: [
        AccessibilityModule,
        CommonModule,
        FileSizePipeModule,
        SankeyChartModule,
        RouterModule.forChild([
            {
                path: '',
                component: SankeyChartTestPageComponent
            }
        ])
    ],
    declarations: [SankeyChartTestPageComponent]
})
export class SankeyChartTestPageModule { }
