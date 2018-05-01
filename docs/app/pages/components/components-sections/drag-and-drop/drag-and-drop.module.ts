import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ReorderableModule } from '../../../../../../src';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { WrappersModule } from '../../../../wrappers/wrappers.module';

import { ComponentsDraggableCardsListViewNg1Component } from './draggable-cards-list-view-ng1/draggable-cards-list-view-ng1.component';
import { ComponentsDraggableCardsNg1Component } from './draggable-cards-ng1/draggable-cards-ng1.component';
import { ComponentsDraggableCardsComponent } from './draggable-cards/draggable-cards.component';
import { ComponentsDraggablePanelsNg1Component } from './draggable-panels-ng1/draggable-panels-ng1.component';
import { ComponentsDraggablePanelsViewsNg1Component } from './draggable-panels-views-ng1/draggable-panels-views-ng1.component';
import { ComponentsDragAndDropCardsComponent } from './drag-and-drop-cards/drag-and-drop-cards.component';

const SECTIONS = [
    ComponentsDraggableCardsNg1Component,
    ComponentsDraggableCardsListViewNg1Component,
    ComponentsDraggableCardsComponent,
    ComponentsDraggablePanelsNg1Component,
    ComponentsDraggablePanelsViewsNg1Component,
    ComponentsDragAndDropCardsComponent,
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Drag & Drop')
        }
    }
];

@NgModule({
    imports: [
        CommonModule,
        ReorderableModule,
        WrappersModule,
        ChartsModule,
        TabsModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ComponentsDragAndDropModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}