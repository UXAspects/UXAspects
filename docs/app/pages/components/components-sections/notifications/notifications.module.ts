import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AccordionModule,
  AlertModule,
  BadgeModule,
  CheckboxModule,
  IconModule,
  NotificationModule,
  NumberPickerModule,
  RadioButtonModule,
  TabsetModule,
} from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ComponentsAlertComponent } from './alert/alert.component';
import { ComponentsBadgeComponent } from './badge/badge.component';
import { ComponentsNotificationsComponent } from './notifications/notifications.component';

const SECTIONS = [
  ComponentsAlertComponent,
  ComponentsBadgeComponent,
  ComponentsNotificationsComponent,
];

const ROUTES = [
  {
    path: '**',
    component: DocumentationCategoryComponent,
    data: {
      category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Notifications'),
    },
  },
];

@NgModule({
  imports: [
    A11yModule,
    AccordionModule,
    AlertModule,
    BadgeModule,
    CheckboxModule,
    CommonModule,
    DocumentationComponentsModule,
    FormsModule,
    IconModule,
    NotificationModule,
    NumberPickerModule,
    RadioButtonModule,
    RouterModule.forChild(ROUTES),
    TabsetModule,
    ...SECTIONS,
  ],
  exports: SECTIONS,
})
export class ComponentsNotificationsModule {
  constructor() {
    const componentFactoryResolver = inject(ComponentFactoryResolver);
    const resolverService = inject(ResolverService);

    resolverService.registerResolver(componentFactoryResolver, SECTIONS);
  }
}
