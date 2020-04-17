import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColorServiceModule, DashboardModule, IconModule, SparkModule, TabsetModule } from '@ux-aspects/ux-aspects';
import 'chart.js';
import { ChartsModule } from 'ng2-charts';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ComponentsDashboardComponent } from './dashboard/dashboard.component';

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
        ChartsModule,
        ColorServiceModule,
        DashboardModule,
        DocumentationComponentsModule,
        IconModule,
        RouterModule.forChild(ROUTES),
        SparkModule,
        TabsetModule,
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
})
export class ComponentsDashboardModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver, SECTIONS);
    }
}
