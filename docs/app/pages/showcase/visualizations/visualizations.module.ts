import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AccessibilityModule, FileSizePipeModule, HierarchyBarModule, IconModule, NavigationModule, OrganizationChartModule, PageHeaderModule, PartitionMapModule, PopoverModule, SankeyChartModule, ToolbarSearchModule, TypeaheadModule } from '@ux-aspects/ux-aspects';
import { OrganizationChartShowcaseComponent } from './organization-chart/organization-chart.component';
import { TypeaheadHighlight } from './organization-chart/typeahead-highlight.pipe';
import { PartitionMapShowcaseComponent } from './partition-map/partition-map.component';
import { SankeyChartShowcaseComponent } from './sankey-chart/sankey-chart.component';
import { VisualizationsComponent } from './visualizations.component';

const routes: Routes = [
    {
        path: '',
        component: VisualizationsComponent,
        children: [
            { path: 'organization-chart', component: OrganizationChartShowcaseComponent, data: { title: 'Organization Chart', navigation: false } },
            { path: 'partition-map', component: PartitionMapShowcaseComponent, data: { title: 'Partition Map', navigation: false } },
            { path: 'sankey-chart', component: SankeyChartShowcaseComponent, data: { title: 'Sankey Chart', navigation: false } },
            { path: '', pathMatch: 'full', redirectTo: 'organization-chart' }
       ]
    }
];

@NgModule({
    declarations: [
        OrganizationChartShowcaseComponent,
        PartitionMapShowcaseComponent,
        SankeyChartShowcaseComponent,
        TypeaheadHighlight,
        VisualizationsComponent,
    ],
    imports: [
        AccessibilityModule,
        CommonModule,
        FileSizePipeModule,
        FormsModule,
        HierarchyBarModule,
        IconModule,
        NavigationModule,
        OrganizationChartModule,
        PartitionMapModule,
        PopoverModule,
        RouterModule.forChild(routes),
        SankeyChartModule,
        ToolbarSearchModule,
        TypeaheadModule,
        PageHeaderModule,
    ],
})
export class VisualizationsModule { }