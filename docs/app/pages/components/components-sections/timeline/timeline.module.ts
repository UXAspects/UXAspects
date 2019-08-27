import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconModule, TabsetModule, TimelineModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
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
        CommonModule,
        DocumentationComponentsModule,
        IconModule,
        RouterModule.forChild(ROUTES),
        TabsetModule,
        TimelineModule,
        WrappersModule,
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