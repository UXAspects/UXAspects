import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AccordionModule,
  CheckboxModule,
  ColorPickerModule,
  ColorServiceModule,
  IconModule,
  MenuModule,
  NumberPickerModule,
  RadioButtonModule,
  TabsetModule,
} from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ComponentsColorPickerComponent } from './color-picker/color-picker.component';

const SECTIONS = [ComponentsColorPickerComponent];

const ROUTES = [
  {
    path: '**',
    component: DocumentationCategoryComponent,
    data: {
      category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Color'),
    },
  },
];

@NgModule({
  imports: [
    AccordionModule,
    CheckboxModule,
    ColorServiceModule,
    ColorPickerModule,
    CommonModule,
    DocumentationComponentsModule,
    FormsModule,
    IconModule,
    NumberPickerModule,
    MenuModule,
    RadioButtonModule,
    RouterModule.forChild(ROUTES),
    TabsetModule,
    SECTIONS,
  ],
  exports: [SECTIONS],
})
export class ComponentsColorModule {
  constructor() {
    const componentFactoryResolver = inject(ComponentFactoryResolver);
    const resolverService = inject(ResolverService);

    resolverService.registerResolver(componentFactoryResolver, SECTIONS);
  }
}
