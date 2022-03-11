import {A11yModule} from '@angular/cdk/a11y';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {DashboardModule} from '../dashboard/index';
import {IconModule} from '../icon/index';
import {SidePanelModule} from '../side-panel/index';
import {FixedHeaderTableModule} from '../../directives/fixed-header-table/index';
import {InputDropdownModule} from '../input-dropdown/index';
import {AccessibilityModule} from '../../directives/accessibility/index';
import {TooltipModule} from '../tooltip/index';
import {FocusIfModule} from '../../directives/focus-if/index';

import {DashboardPredefinedWidgetComponent} from './dashboard-predefined-widget.component';
import {DashboardActionsWidgetComponent} from './dashboard-actions-widget/dashboard-actions-widget.component';
import {DashboardTextWidgetComponent} from './dashboard-text-widget/dashboard-text-widget.component';
import {DashboardTableWidgetComponent} from './dashboard-table-widget/dashboard-table-widget.component';
import {
    DashboardSelectWidgetComponent,
    GetOptionByValuePipe
} from './dashboard-select-widget/dashboard-select-widget.component';


const DECLARATIONS = [
    DashboardPredefinedWidgetComponent,
    DashboardActionsWidgetComponent,
    DashboardTextWidgetComponent,
    DashboardTableWidgetComponent,
    DashboardSelectWidgetComponent,
    GetOptionByValuePipe
];

@NgModule({
    imports: [
        A11yModule,
        CommonModule,
        DashboardModule,
        SidePanelModule,
        IconModule,
        FixedHeaderTableModule,
        InputDropdownModule,
        AccessibilityModule,
        TooltipModule,
        FocusIfModule,
        FormsModule
    ],
    exports: DECLARATIONS,
    declarations: DECLARATIONS,
})
export class DashboardPredefinedWidgetsModule {
}
