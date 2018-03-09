import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TimelineModule } from '@ux-aspects/ux-aspects';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { WrappersModule } from '../../../../wrappers/wrappers.module';

import { ComponentsTimelineNg1Component } from './timeline-ng1/timeline-ng1.component';
import { ComponentsTimelineComponent } from './timeline/timeline.component';

const SECTIONS = [
    ComponentsTimelineNg1Component,
    ComponentsTimelineComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Timeline')
        }
    }
];

@NgModule({
    imports: [
        WrappersModule,
        TabsModule,
        CommonModule,
        TimelineModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ComponentsTimelineModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}