import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, CheckboxModule, DashboardModule, IconModule } from '@ux-aspects/ux-aspects';
import { CanMoveLayoutTestPageComponent } from './can-move-layout/can-move-layout.testpage.component';
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
            },
            {
                path: 'canmove',
                component: CanMoveLayoutTestPageComponent
            }
        ])
    ],
    declarations: [
        DashboardTestPageComponent,
        DashboardLayoutTestPageComponent,
        CanMoveLayoutTestPageComponent
    ]
})
export class DashboardTestPageModule { }
