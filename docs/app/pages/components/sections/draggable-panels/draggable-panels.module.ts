import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { ComponentsDraggablePanelsNg1Component } from './draggable-panels-ng1/draggable-panels-ng1.component';
import { ComponentsDraggablePanelsViewsNg1Component } from './draggable-panels-views-ng1/draggable-panels-views-ng1.component';
import { WrappersModule } from '../../../../wrappers.module';
import { TabsModule } from 'ngx-bootstrap/tabs';

const SECTIONS = [
    ComponentsDraggablePanelsNg1Component,
    ComponentsDraggablePanelsViewsNg1Component
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: {
                'title': 'Draggable Panels',
                'link': 'draggable-panels',
                'sections': [
                    {
                        'title': 'Draggable Panels',
                        'component': 'ComponentsDraggablePanelsNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Draggable Panels with Different Views',
                        'component': 'ComponentsDraggablePanelsViewsNg1Component',
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
export class ComponentsDraggablePanelsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}