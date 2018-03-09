import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ComponentsDashboardComponent } from './dashboard/dashboard.component';
import { SparkModule, ColorServiceModule, DashboardModule } from '@ux-aspects/ux-aspects';
import { ChartsModule } from 'ng2-charts';
import 'chart.js';

const SECTIONS = [
    ComponentsDashboardComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Dashboard')
        }
    }
];

@NgModule({
    imports: [
        TabsModule,
        DashboardModule,
        SparkModule,
        ChartsModule,
        ColorServiceModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ComponentsDashboardModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}