import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChartsPartitionMapNg1Component } from './partition-map-ng1/partition-map-ng1.component';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

const SECTIONS = [
    ChartsPartitionMapNg1Component
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Charts, 'Partition Map')
        }
    }
];

@NgModule({
    imports: [
        TabsModule,
        WrappersModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ChartsPartitionMapModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}
