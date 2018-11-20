import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { DashboardModule, SparkModule } from '@ux-aspects/ux-aspects';

import { DashboardTestPageComponent } from './dashboard.testpage.component';


@NgModule({
    imports: [
        DashboardModule,
        SparkModule,
        ChartsModule,
        RouterModule.forChild([
            {
                path: '',
                component: DashboardTestPageComponent
            }
        ])
    ],
    declarations: [DashboardTestPageComponent]
})
export class DashboardTestPageModule { }
