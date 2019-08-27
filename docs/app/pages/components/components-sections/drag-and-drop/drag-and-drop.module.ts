import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, ColorServiceModule, FocusIfModule, IconModule, MenuNavigationModule, ReorderableModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { ChartsModule } from 'ng2-charts';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { ComponentsDragAndDropCardsComponent } from './drag-and-drop-cards/drag-and-drop-cards.component';
import { ComponentsDraggableCardsListViewNg1Component } from './draggable-cards-list-view-ng1/draggable-cards-list-view-ng1.component';
import { ComponentsDraggableCardsNg1Component } from './draggable-cards-ng1/draggable-cards-ng1.component';
import { ComponentsDraggableCardsComponent } from './draggable-cards/draggable-cards.component';
import { ComponentsDraggablePanelsNg1Component } from './draggable-panels-ng1/draggable-panels-ng1.component';
import { ComponentsDraggablePanelsViewsNg1Component } from './draggable-panels-views-ng1/draggable-panels-views-ng1.component';


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
        A11yModule,
        AccessibilityModule,
        BsDropdownModule,
        ButtonsModule,
        ChartsModule,
        ColorServiceModule,
        CommonModule,
        DocumentationComponentsModule,
        FocusIfModule,
        FormsModule,
        IconModule,
        MenuNavigationModule,
        ReorderableModule,
        RouterModule.forChild(ROUTES),
        TabsetModule,
        WrappersModule,
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