import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardModule } from '@ux-aspects/ux-aspects';
import { DashboardTestPageComponent } from './dashboard.testpage.component';



@NgModule({
    imports: [
        DashboardModule,
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
