import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { ComponentsDraggableCardsNg1Component } from './draggable-cards-ng1/draggable-cards-ng1.component';
import { ComponentsDraggableCardsListViewNg1Component } from './draggable-cards-list-view-ng1/draggable-cards-list-view-ng1.component';
import { WrappersModule } from '../../../../wrappers.module';
import { TabsModule } from 'ngx-bootstrap/tabs';

const SECTIONS = [
ComponentsDraggableCardsNg1Component,
ComponentsDraggableCardsListViewNg1Component
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: {
                'title': 'Draggable Cards',
                'link': 'draggable-cards',
                'sections': [
                    {
                        'title': 'Draggable Cards',
                        'component': 'ComponentsDraggableCardsNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Draggable Cards - List View Example',
                        'component': 'ComponentsDraggableCardsListViewNg1Component',
                        'version': 'AngularJS'
                    }
                ]
            }
        }
    }
];

@NgModule({
    imports: [
        WrappersModule,
        TabsModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ComponentsDraggableCardsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}