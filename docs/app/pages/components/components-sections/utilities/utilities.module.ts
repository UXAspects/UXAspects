import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, AccordionModule, CheckboxModule, FocusIfModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { ComponentsColorServiceNg1Component } from './color-service-ng1/color-service-ng1.component';
import { ComponentsColorServiceComponent } from './color-service/color-service.component';
import { ComponentsExpandingContentNg1Component } from './expanding-content-ng1/expanding-content-ng1.component';
import { ComponentsFocusIfComponent } from './focus-if/focus-if.component';
import { ComponentsFocusIndicatorComponent } from './focus-indicator/focus-indicator.component';
import { ComponentsFocusOnShowNg1Component } from './focus-on-show-ng1/focus-on-show-component';
import { ComponentsFocusComponent } from './focus/focus.component';
import { ComponentsForceFocusNg1Component } from './force-focus-ng1/force-focus-ng1.component';
import { ComponentsListItemFilterNg1Component } from './list-item-filter-ng1/list-item-filter-ng1.component';
import { ComponentsPdfServiceNg1Component } from './pdf-service-ng1/pdf-service-ng1.component';
import { ComponentsPersistentDataServiceComponent } from './persistent-data-service/persistent-data-service.component';
import { ComponentsSafeIntervalNg1Component } from './safe-interval-ng1/safe-interval-ng1.component';
import { ComponentsSafeTimeoutNg1Component } from './safe-timeout-ng1/safe-timeout-ng1.component';
import { ComponentsTabbableListComponent } from './tabbable-list/tabbable-list.component';
import { ComponentsTimeAgoServiceNg1Component } from './time-ago-service-ng1/time-ago-service-ng1.component';
import { ComponentsWindowCommunicationServiceNg1Component } from './window-communication-service-ng1/window-communication-service-ng1.component';


const SECTIONS = [
    ComponentsFocusIfComponent,
    ComponentsColorServiceComponent,
    ComponentsColorServiceNg1Component,
    ComponentsForceFocusNg1Component,
    ComponentsFocusOnShowNg1Component,
    ComponentsExpandingContentNg1Component,
    ComponentsPdfServiceNg1Component,
    ComponentsSafeTimeoutNg1Component,
    ComponentsSafeIntervalNg1Component,
    ComponentsTimeAgoServiceNg1Component,
    ComponentsListItemFilterNg1Component,
    ComponentsWindowCommunicationServiceNg1Component,
    ComponentsPersistentDataServiceComponent,
    ComponentsTabbableListComponent,
    ComponentsFocusComponent,
    ComponentsFocusIndicatorComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Utilities')
        }
    }
];

@NgModule({
    imports: [
        AccessibilityModule,
        AccordionModule,
        CheckboxModule,
        CommonModule,
        DocumentationComponentsModule,
        FocusIfModule,
        RouterModule.forChild(ROUTES),
        TabsetModule,
        WrappersModule,
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ComponentsUtilitiesModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}