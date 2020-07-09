import {ComponentFactoryResolver, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {
    ColorServiceModule,
    DashboardModule,
    DashboardWidgetsModule,
    IconModule,
    SidePanelModule,
    SparkModule,
    TabsetModule
} from '@ux-aspects/ux-aspects';
import 'chart.js';
import {ChartsModule} from 'ng2-charts';
import {DocumentationComponentsModule} from '../../../../components/components.module';
import {DocumentationCategoryComponent} from '../../../../components/documentation-category/documentation-category.component';
import {DocumentationPage, ResolverService} from '../../../../services/resolver/resolver.service';
import {ComponentsDashboardActionsWidgetComponent} from './dashboard-actions-widget/dashboard-actions-widget.component';
import {ComponentsDashboardTextWidgetComponent} from './dashboard-text-widget/dashboard-text-widget.component';
import {ComponentsDashboardEnumWidgetComponent} from './dashboard-enum-widget/dashboard-enum-widget.component';
import {ComponentsDashboardTableWidgetComponent} from './dashboard-table-widget/dashboard-table-widget.component';

const SECTIONS = [
    ComponentsDashboardActionsWidgetComponent,
    ComponentsDashboardTextWidgetComponent,
    ComponentsDashboardTableWidgetComponent,
    ComponentsDashboardEnumWidgetComponent,
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Dashboard Widgets')
        }
    }
];

@NgModule({
    imports: [
        ChartsModule,
        ColorServiceModule,
        DashboardModule,
        DashboardWidgetsModule,
        SidePanelModule,
        DocumentationComponentsModule,
        IconModule,
        RouterModule.forChild(ROUTES),
        SparkModule,
        TabsetModule,
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
})
export class ComponentsDashboardExtensionsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver, SECTIONS);
    }
}
