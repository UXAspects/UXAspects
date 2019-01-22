import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccordionModule, AlertModule, CheckboxModule, NotificationModule, NumberPickerModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { ComponentsAlertStylesNg1Component } from './alert-styles-ng1/alert-styles-ng1.component';
import { ComponentsAlertComponent } from './alert/alert.component';
import { ComponentsDismissableStylesNg1Component } from './dismissable-styles-ng1/dismissable-styles-ng1.component';
import { ComponentsNotificationDropdownNg1Component } from './notification-dropdown-ng1/notification-dropdown-ng1.component';
import { ComponentsNotificationListNg1Component } from './notification-list-ng1/notification-list-ng1.component';
import { ComponentsNotificationsNg1Component } from './notifications-ng1/notifications-ng1.component';
import { ComponentsNotificationsComponent } from './notifications/notifications.component';


const SECTIONS = [
    ComponentsAlertComponent,
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
        A11yModule,
        AccordionModule,
        AlertModule,
        CheckboxModule,
        CommonModule,
        DocumentationComponentsModule,
        FormsModule,
        NotificationModule,
        NumberPickerModule,
        RouterModule.forChild(ROUTES),
        TabsetModule,
        WrappersModule,
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