import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AccessibilityModule,
  ColorServiceModule,
  FocusIfModule,
  IconModule,
  MenuModule,
  ReorderableModule,
  TabsetModule,
} from '@ux-aspects/ux-aspects';
import { NgChartsModule } from 'ng2-charts';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ComponentsDragAndDropCardsComponent } from './drag-and-drop-cards/drag-and-drop-cards.component';
import { ComponentsDraggableCardsComponent } from './draggable-cards/draggable-cards.component';

const SECTIONS = [ComponentsDraggableCardsComponent, ComponentsDragAndDropCardsComponent];

const ROUTES = [
  {
    path: '**',
    component: DocumentationCategoryComponent,
    data: {
      category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Drag & Drop'),
    },
  },
];

@NgModule({
  imports: [
    A11yModule,
    AccessibilityModule,
    ButtonsModule,
    NgChartsModule,
    ColorServiceModule,
    CommonModule,
    DocumentationComponentsModule,
    FocusIfModule,
    FormsModule,
    IconModule,
    MenuModule,
    ReorderableModule,
    RouterModule.forChild(ROUTES),
    TabsetModule,
    ...SECTIONS,
  ],
  exports: SECTIONS,
})
export class ComponentsDragAndDropModule {
  constructor() {
    const componentFactoryResolver = inject(ComponentFactoryResolver);
    const resolverService = inject(ResolverService);

    resolverService.registerResolver(componentFactoryResolver, SECTIONS);
  }
}
