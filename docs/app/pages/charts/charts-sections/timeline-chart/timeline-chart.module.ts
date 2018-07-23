import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HybridModule } from '../../../../../../src/hybrid/hybrid.module';
import { ColorServiceModule } from '../../../../../../src/services/color/index';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { ChartsTimelineChartNg1Component } from './timeline-chart-ng1/timeline-chart-ng1.component';


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
        RouterModule.forChild(ROUTES),
        ColorServiceModule
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
