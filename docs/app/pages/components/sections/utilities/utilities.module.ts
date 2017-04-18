import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService } from '../../../../services/resolver/resolver.service';
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

const SECTIONS = [
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
            category: {
                'title': 'Utilities',
                'link': 'utilities',
                'sections': [
                    {
                        'title': 'Color Service',
                        'component': 'ComponentsColorServiceNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Force Focus',
                        'component': 'ComponentsForceFocusNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Focus On Show',
                        'component': 'ComponentsFocusOnShowNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Expanding Content',
                        'component': 'ComponentsExpandingContentNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'PDF Service',
                        'component': 'ComponentsPdfServiceNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Safe Timeout',
                        'component': 'ComponentsSafeTimeoutNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Safe Interval',
                        'component': 'ComponentsSafeIntervalNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Time Ago Service',
                        'component': 'ComponentsTimeAgoServiceNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'List Item Filter',
                        'component': 'ComponentsListItemFilterNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Window Communication Service',
                        'component': 'ComponentsWindowCommunicationServiceNg1Component',
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
export class ComponentsUtilitiesModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}