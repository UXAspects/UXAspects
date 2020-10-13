import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckboxModule, DashboardModule, IconModule, AccessibilityModule } from '@ux-aspects/ux-aspects';
import { DashboardTestPageComponent } from './dashboard.testpage.component';
import { DashboardLayoutTestPageComponent } from './layout/dashboard-layout.testpage.component';

@NgModule({
    imports: [
        CheckboxModule,
        CommonModule,
        DashboardModule,
        AccessibilityModule,
        IconModule,
        RouterModule.forChild([
            {
                path: '',
                component: DashboardTestPageComponent
            },
            {
                path: 'layout',
                component: DashboardLayoutTestPageComponent
            }
        ])
    ],
    declarations: [
        DashboardTestPageComponent,
        DashboardLayoutTestPageComponent
    ]
})
export class DashboardTestPageModule { }
