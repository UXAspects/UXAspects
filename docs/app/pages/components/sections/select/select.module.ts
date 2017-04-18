import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { ComponentsSelectNg1Component } from './select-ng1/select-ng1.component';
import { ComponentsSingleSelectTableNg1Component } from './single-select-table-ng1/single-select-table-ng1.component';
import { ComponentsMultipleSelectTableNg1Component } from './multiple-select-table-ng1/multiple-select-table-ng1.component';
import { WrappersModule } from '../../../../wrappers.module';
import { TabsModule } from 'ngx-bootstrap/tabs';

const SECTIONS = [
    ComponentsSelectNg1Component,
    ComponentsSingleSelectTableNg1Component,
    ComponentsMultipleSelectTableNg1Component
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: {
                'title': 'Select',
                'link': 'select',
                'sections': [
                    {
                        'title': 'Select',
                        'component': 'ComponentsSelectNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Single Select Table',
                        'component': 'ComponentsSingleSelectTableNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Multiple Select Table',
                        'component': 'ComponentsMultipleSelectTableNg1Component',
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
export class ComponentsSelectModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}