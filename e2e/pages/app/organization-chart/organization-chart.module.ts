import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, HierarchyBarModule, IconModule, MenuModule, OrganizationChartModule } from '@ux-aspects/ux-aspects';
import { OrganizationChartTestPageComponent } from './organization-chart.testpage.component';

@NgModule({
    imports: [
        IconModule,
        AccessibilityModule,
        OrganizationChartModule,
        HierarchyBarModule,
        MenuModule.forChild({ animate: false }),
        RouterModule.forChild([
            {
                path: '',
                component: OrganizationChartTestPageComponent,
            }
        ])
    ],
    declarations: [
        OrganizationChartTestPageComponent,
    ]
})
export class OrganizationChartTestPageModule { }
