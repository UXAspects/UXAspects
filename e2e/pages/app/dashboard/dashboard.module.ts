import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckboxModule, DashboardModule } from '@ux-aspects/ux-aspects';
import { DashboardTestPageComponent } from './dashboard.testpage.component';
import { CommonModule } from '@angular/common';



@NgModule({
    imports: [
        CheckboxModule,
        CommonModule,
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
