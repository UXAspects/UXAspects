import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColorServiceModule, TabsetModule, TimelineChartModule } from '@ux-aspects/ux-aspects';
import { ChartsModule } from 'ng2-charts';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ChartsTimelineChartComponent } from './timeline-chart/timeline-chart.component';

const SECTIONS = [
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
        RouterModule.forChild(ROUTES),
        TabsetModule,
        TimelineChartModule,
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
