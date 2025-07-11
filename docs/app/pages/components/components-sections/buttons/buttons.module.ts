import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AccordionModule,
  FloatingActionButtonsModule,
  IconModule,
  MenuModule,
  PaginationModule,
  RadioButtonModule,
  StringFilterModule,
  TabsetModule,
  ToggleSwitchModule,
  TooltipModule,
} from '@ux-aspects/ux-aspects';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ComponentsDropdownsComponent } from './dropdowns/dropdowns.component';
import { ComponentsFloatingActionButtonComponent } from './floating-action-button/floating-action-button.component';
import { ComponentsPaginationComponent } from './pagination/pagination.component';
import { ComponentsRadioButtonsComponent } from './radio-buttons/radio-buttons.component';
import { ComponentsSplitButtonDropdownsComponent } from './split-button-dropdowns/split-button-dropdowns.component';
import { ComponentsToggleButtonsComponent } from './toggle-buttons/toggle-buttons.component';

const SECTIONS = [
  ComponentsToggleButtonsComponent,
  ComponentsRadioButtonsComponent,
  ComponentsPaginationComponent,
  ComponentsDropdownsComponent,
  ComponentsFloatingActionButtonComponent,
  ComponentsSplitButtonDropdownsComponent,
];

const ROUTES = [
  {
    path: '**',
    component: DocumentationCategoryComponent,
    data: {
      category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Buttons'),
    },
  },
];

@NgModule({
  imports: [
    AccordionModule,
    ButtonsModule,
    CommonModule,
    DocumentationComponentsModule,
    FloatingActionButtonsModule,
    FormsModule,
    IconModule,
    MenuModule,
    PaginationModule,
    RadioButtonModule,
    RouterModule.forChild(ROUTES),
    StringFilterModule,
    TabsetModule,
    TooltipModule,
    ToggleSwitchModule,
    ...SECTIONS,
  ],
  exports: SECTIONS,
})
export class ComponentsButtonsModule {
  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    resolverService: ResolverService
  ) {
    resolverService.registerResolver(componentFactoryResolver, SECTIONS);
  }
}
