import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { ComponentsNotificationsNg1Component } from './notifications-ng1/notifications-ng1.component';
import { ComponentsNotificationListNg1Component } from './notification-list-ng1/notification-list-ng1.component';
import { ComponentsNotificationDropdownNg1Component } from './notification-dropdown-ng1/notification-dropdown-ng1.component';
import { ComponentsAlertStylesNg1Component } from './alert-styles-ng1/alert-styles-ng1.component';
import { ComponentsDismissableStylesNg1Component } from './dismissable-styles-ng1/dismissable-styles-ng1.component';
import { WrappersModule } from '../../../../wrappers.module';
import { TabsModule } from 'ngx-bootstrap/tabs';

const SECTIONS = [
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
            category: {
                'title': 'Notifications',
                'link': 'notifications',
                'sections': [
                    {
                        'title': 'Notifications',
                        'component': 'ComponentsNotificationsNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Notification List',
                        'component': 'ComponentsNotificationListNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Notification Dropdown',
                        'component': 'ComponentsNotificationDropdownNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Alert Styles',
                        'component': 'ComponentsAlertStylesNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Dismissable Styles',
                        'component': 'ComponentsDismissableStylesNg1Component',
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
export class ComponentsNotificationsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}