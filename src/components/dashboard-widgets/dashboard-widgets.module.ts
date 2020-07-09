import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardModule } from '../dashboard';
import { DashboardActionsWidgetComponent } from './dashboard-actions-widget/dashboard-actions-widget.component';
import { DashboardTextWidgetComponent } from './dashboard-text-widget/dashboard-text-widget.component';
import { DashboardTableWidgetComponent } from './dashboard-table-widget/dashboard-table-widget.component';
import { DashboardEnumWidgetComponent } from './dashboard-enum-widget/dashboard-enum-widget.component';
import { IconModule } from '../icon';
import { SidePanelModule } from '../side-panel';
import { FixedHeaderTableModule } from '../../directives/fixed-header-table';

const DECLARATIONS = [
    DashboardActionsWidgetComponent,
    DashboardTextWidgetComponent,
    DashboardTableWidgetComponent,
    DashboardEnumWidgetComponent
];

@NgModule({
    imports: [
        A11yModule,
        CommonModule,
        DashboardModule,
        SidePanelModule,
        IconModule,
        FixedHeaderTableModule
    ],
    exports: DECLARATIONS,
    declarations: DECLARATIONS,
})
export class DashboardWidgetsModule { }
