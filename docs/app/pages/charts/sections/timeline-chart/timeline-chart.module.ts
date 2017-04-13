import { NgModule, ComponentFactoryResolver } from '@angular/core';

import { ChartsTimelineChartNg1Component } from './timeline-chart-ng1/timeline-chart-ng1.component';
import { ResolverService } from '../../../../services/resolver/resolver.service';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { WrappersModule } from '../../../../wrappers.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { TabsModule } from 'ngx-bootstrap/tabs';

const SECTIONS = [
    ChartsTimelineChartNg1Component
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: {
                title: 'Timeline Chart',
                link: 'timeline-chart',
                sections: [
                    {
                        title: 'Timeline Charts',
                        component: 'ChartsTimelineChartNg1Component',
                        version: 'AngularJS'
                    }
                ]
            }
        }
    }
];

@NgModule({
    imports: [
        TabsModule,
        WrappersModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class TimelineChartModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}
