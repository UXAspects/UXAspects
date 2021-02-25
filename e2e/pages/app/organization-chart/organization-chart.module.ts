import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, CheckboxModule, IconModule, OrganizationChartModule } from '@ux-aspects/ux-aspects';
import { OrganizationChartTestPageComponent } from './organization-chart.testpage.component';

@NgModule({
    imports: [
        IconModule,
        AccessibilityModule,
        CheckboxModule,
        OrganizationChartModule,
        RouterModule.forChild([
            {
                path: '',
                component: OrganizationChartTestPageComponent,
            },
        ]),
    ],
    declarations: [OrganizationChartTestPageComponent],
})
export class OrganizationChartTestPageModule {}
