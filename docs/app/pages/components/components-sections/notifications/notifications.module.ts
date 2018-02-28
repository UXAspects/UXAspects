import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { ComponentsNotificationsComponent } from './notifications/notifications.component';
import { ComponentsNotificationsNg1Component } from './notifications-ng1/notifications-ng1.component';
import { ComponentsNotificationListNg1Component } from './notification-list-ng1/notification-list-ng1.component';
import { ComponentsNotificationDropdownNg1Component } from './notification-dropdown-ng1/notification-dropdown-ng1.component';
import { ComponentsAlertStylesNg1Component } from './alert-styles-ng1/alert-styles-ng1.component';
import { ComponentsDismissableStylesNg1Component } from './dismissable-styles-ng1/dismissable-styles-ng1.component';
import { NotificationModule } from './../../../../../../src/components/notification/notification.module';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NumberPickerModule } from '../../../../../../src/index';

const SECTIONS = [
    ComponentsNotificationsComponent,
    ComponentsNotificationsNg1Component,
    ComponentsNotificationListNg1Component,
    ComponentsNotificationDropdownNg1Component,
    ComponentsAlertStylesNg1Component,
    ComponentsDismissableStylesNg1Component
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Notifications')
        }
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NotificationModule,
        WrappersModule,
        TabsModule,
        AccordionModule.forRoot(),
        NumberPickerModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ComponentsNotificationsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}