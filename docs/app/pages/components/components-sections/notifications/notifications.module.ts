import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccordionModule, AlertModule, CheckboxModule, ColorPickerModule, NotificationModule, NumberPickerModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ComponentsAlertComponent } from './alert/alert.component';
import { ComponentsNotificationsComponent } from './notifications/notifications.component';


const SECTIONS = [
    ComponentsAlertComponent,
    ComponentsNotificationsComponent,
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
        BsDropdownModule,
        CheckboxModule,
        ColorPickerModule,
        CommonModule,
        DocumentationComponentsModule,
        FormsModule,
        NotificationModule,
        NumberPickerModule,
        RouterModule.forChild(ROUTES),
        TabsetModule,
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