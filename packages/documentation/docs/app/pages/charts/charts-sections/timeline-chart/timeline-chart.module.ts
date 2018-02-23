import { NgModule, ComponentFactoryResolver } from '@angular/core';

import { ChartsTimelineChartNg1Component } from './timeline-chart-ng1/timeline-chart-ng1.component';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HybridModule } from '../../../../../../src/hybrid/hybrid.module';

const SECTIONS = [
    ChartsTimelineChartNg1Component
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Charts, 'Timeline Chart')
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
export class ChartsTimelineChartModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}
