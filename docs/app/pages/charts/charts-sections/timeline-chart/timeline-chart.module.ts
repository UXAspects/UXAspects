import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColorServiceModule, HybridModule, TabsetModule, TimelineChartModule } from '@ux-aspects/ux-aspects';
import { ChartsModule } from 'ng2-charts';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { ChartsTimelineChartNg1Component } from './timeline-chart-ng1/timeline-chart-ng1.component';
import { ChartsTimelineChartComponent } from './timeline-chart/timeline-chart.component';

const SECTIONS = [
    ChartsTimelineChartNg1Component,
    ChartsTimelineChartComponent
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
        ChartsModule,
        ColorServiceModule,
        DocumentationComponentsModule,
        HybridModule,
        RouterModule.forChild(ROUTES),
        TabsetModule,
        TimelineChartModule,
        WrappersModule,
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
