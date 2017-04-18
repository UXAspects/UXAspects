import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { ComponentsCollapsiblePanelsNg1Component } from './collapsible-panels-ng1/collapsible-panels-ng1.component';
import { ComponentsItemDisplayPanelNg1Component } from './item-display-panel-ng1/item-display-panel-ng1.component';
import { ComponentsItemDisplayPanelServiceNg1Component } from './item-display-panel-service-ng1/item-display-panel-service-ng1.component';
import { ComponentsModalInsetPanelNg1Component } from './modal-inset-panel-ng1/item-display-panel-ng1.component';
import { ComponentsSideInsetPanelNg1Component } from './side-inset-panel-ng1/side-inset-panel-ng1.component';
import { WrappersModule } from '../../../../wrappers.module';
import { TabsModule } from 'ngx-bootstrap/tabs';

const SECTIONS = [
    ComponentsCollapsiblePanelsNg1Component,
    ComponentsItemDisplayPanelNg1Component,
    ComponentsItemDisplayPanelServiceNg1Component,
    ComponentsModalInsetPanelNg1Component,
    ComponentsSideInsetPanelNg1Component
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: {
                'title': 'Panels',
                'link': 'panels',
                'sections': [
                    {
                        'title': 'Collapsible Panels',
                        'component': 'ComponentsCollapsiblePanelsNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Item Display Panel',
                        'component': 'ComponentsItemDisplayPanelNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Item Display Panel Service',
                        'component': 'ComponentsItemDisplayPanelServiceNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Modal Inset Panel',
                        'component': 'ComponentsModalInsetPanelNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Side Inset Panel',
                        'component': 'ComponentsSideInsetPanelNg1Component',
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
export class ComponentsPanelsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}