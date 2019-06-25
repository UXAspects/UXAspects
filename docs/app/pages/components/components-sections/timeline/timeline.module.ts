import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabsetModule, TimelineModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ComponentsTimelineComponent } from './timeline/timeline.component';


const SECTIONS = [
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
        RouterModule.forChild(ROUTES),
        TabsetModule,
        TimelineModule,
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