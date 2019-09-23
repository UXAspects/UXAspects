import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckboxModule, DashboardModule, IconModule, AccessibilityModule } from '@ux-aspects/ux-aspects';
import { DashboardTestPageComponent } from './dashboard.testpage.component';

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
            }
        ])
    ],
    declarations: [DashboardTestPageComponent]
})
export class DashboardTestPageModule { }
