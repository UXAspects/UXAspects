import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { ComponentsModalNg1Component } from './modal-ng1/modal-ng1.component';
import { ComponentsSquareModalNg1Component } from './square-modal-ng1/square-modal-ng1.component';
import { ComponentsMarqueeModalNg1Component } from './marquee-modal-ng1/marquee-modal-ng1.component';
import { ComponentsSideModalNg1Component } from './side-modal-ng1/side-modal-ng1.component';
import { WrappersModule } from '../../../../wrappers.module';
import { TabsModule } from 'ngx-bootstrap/tabs';

const SECTIONS = [
    ComponentsModalNg1Component,
    ComponentsSquareModalNg1Component,
    ComponentsMarqueeModalNg1Component,
    ComponentsSideModalNg1Component
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: {
                'title': 'Modals',
                'link': 'modals',
                'sections': [
                    {
                        'title': 'Modal',
                        'component': 'ComponentsModalNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Square Modal',
                        'component': 'ComponentsSquareModalNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Marquee Modal',
                        'component': 'ComponentsMarqueeModalNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Side Modal',
                        'component': 'ComponentsSideModalNg1Component',
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
export class ComponentsModalsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}