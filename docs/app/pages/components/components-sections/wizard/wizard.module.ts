import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AccessibilityModule,
  AccordionModule,
  CheckboxModule,
  FocusIfModule,
  IconModule,
  MarqueeWizardModule,
  RadioButtonModule,
  TabsetModule,
  WizardModule,
  NumberPickerModule,
} from '@ux-aspects/ux-aspects';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ComponentsMarqueeWizardComponent } from './marquee-wizard/marquee-wizard.component';
import { ComponentsWizardComponent } from './wizard/wizard.component';

const SECTIONS = [ComponentsWizardComponent, ComponentsMarqueeWizardComponent];

const ROUTES = [
  {
    path: '**',
    component: DocumentationCategoryComponent,
    data: {
      category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Wizard'),
    },
  },
];

@NgModule({
  imports: [
    A11yModule,
    AccessibilityModule,
    AccordionModule,
    CheckboxModule,
    CommonModule,
    DocumentationComponentsModule,
    FocusIfModule,
    FormsModule,
    IconModule,
    MarqueeWizardModule,
    ModalModule,
    NumberPickerModule,
    RadioButtonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    TabsetModule,
    WizardModule,
    ...SECTIONS,
  ],
  exports: SECTIONS,
})
export class ComponentsWizardModule {
  constructor() {
    const componentFactoryResolver = inject(ComponentFactoryResolver);
    const resolverService = inject(ResolverService);

    resolverService.registerResolver(componentFactoryResolver, SECTIONS);
  }
}
