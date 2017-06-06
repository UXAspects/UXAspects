import { FocusIfModule } from './../../../../../../src/directives/focus-if/focus-if.module';
import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { ComponentsColorServiceNg1Component } from './color-service-ng1/color-service-ng1.component';
import { ComponentsForceFocusNg1Component } from './force-focus-ng1/force-focus-ng1.component';
import { ComponentsFocusOnShowNg1Component } from './focus-on-show-ng1/focus-on-show-component';
import { ComponentsExpandingContentNg1Component } from './expanding-content-ng1/expanding-content-ng1.component';
import { ComponentsPdfServiceNg1Component } from './pdf-service-ng1/pdf-service-ng1.component';
import { ComponentsSafeTimeoutNg1Component } from './safe-timeout-ng1/safe-timeout-ng1.component';
import { ComponentsSafeIntervalNg1Component } from './safe-interval-ng1/safe-interval-ng1.component';
import { ComponentsTimeAgoServiceNg1Component } from './time-ago-service-ng1/time-ago-service-ng1.component';
import { ComponentsListItemFilterNg1Component } from './list-item-filter-ng1/list-item-filter-ng1.component';
import { ComponentsWindowCommunicationServiceNg1Component } from './window-communication-service-ng1/window-communication-service-ng1.component';
import { WrappersModule } from '../../../../wrappers.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ComponentsFocusIfComponent } from './focus-if/focus-if.component';

const SECTIONS = [
    ComponentsFocusIfComponent,
    ComponentsColorServiceNg1Component,
    ComponentsForceFocusNg1Component,
    ComponentsFocusOnShowNg1Component,
    ComponentsExpandingContentNg1Component,
    ComponentsPdfServiceNg1Component,
    ComponentsSafeTimeoutNg1Component,
    ComponentsSafeIntervalNg1Component,
    ComponentsTimeAgoServiceNg1Component,
    ComponentsListItemFilterNg1Component,
    ComponentsWindowCommunicationServiceNg1Component
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
        WrappersModule,
        TabsModule,
        FocusIfModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
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