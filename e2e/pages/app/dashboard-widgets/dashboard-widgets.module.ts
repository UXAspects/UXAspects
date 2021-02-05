import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {
    CheckboxModule,
    DashboardModule,
    DashboardPredefinedWidgetsModule,
    IconModule,
    AccessibilityModule
} from '@ux-aspects/ux-aspects';
import {DashboardWidgetsTestpageComponent} from './dashboard-widgets.testpage.component';

@NgModule({
    imports: [
        CheckboxModule,
        CommonModule,
        DashboardModule,
        DashboardPredefinedWidgetsModule,
        AccessibilityModule,
        IconModule,
        RouterModule.forChild([
            {
                path: '',
                component: DashboardWidgetsTestpageComponent
            }
        ])
    ],
    declarations: [DashboardWidgetsTestpageComponent]
})
export class DashboardWidgetsTestPageModule {
}
