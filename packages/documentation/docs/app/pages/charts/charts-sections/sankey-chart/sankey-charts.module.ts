import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HybridModule } from '@ux-aspects/ux-aspects';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { ChartsSankeyChartNg1Component } from './sankey-chart-ng1/sankey-chart-ng1.component';

const SECTIONS = [
    ChartsSankeyChartNg1Component
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Charts, 'Sankey Chart')
        }
    }
];

@NgModule({
    imports: [
        TabsModule,
        WrappersModule,
        HybridModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ChartsSankeyChartModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}
