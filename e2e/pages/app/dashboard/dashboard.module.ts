import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, CheckboxModule, DashboardModule, IconModule } from '@ux-aspects/ux-aspects';
import { DashboardTestPageComponent } from './dashboard.testpage.component';
import { DashboardEightColumnLayoutTestPageComponent } from './eight-column-layout/dashboard-eight-column-layout.testpage.component';
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
            },
            {
                path: 'eight-column-layout',
                component: DashboardEightColumnLayoutTestPageComponent
            }
        ])
    ],
    declarations: [
        DashboardTestPageComponent,
        DashboardLayoutTestPageComponent,
        DashboardEightColumnLayoutTestPageComponent
    ]
})
export class DashboardTestPageModule { }
