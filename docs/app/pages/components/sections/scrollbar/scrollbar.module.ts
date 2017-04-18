import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { ComponentsCustomScrollbarNg1Component } from './custom-scrollbar-ng1/custom-scrollbar-ng1.component';
import { ComponentsInfiniteScrollNg1Component } from './infinite-scroll-ng1/infinite-scroll-ng1.component';
import { ComponentsInfiniteScrollLoadMoreNg1Component } from './infinite-scroll-load-more-ng1/infinite-scroll-load-more-ng1.component';
import { WrappersModule } from '../../../../wrappers.module';
import { TabsModule } from 'ngx-bootstrap/tabs';

const SECTIONS = [
    ComponentsCustomScrollbarNg1Component,
    ComponentsInfiniteScrollNg1Component,
    ComponentsInfiniteScrollLoadMoreNg1Component
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: {
                'title': 'Scrollbar',
                'link': 'scrollbar',
                'sections': [
                    {
                        'title': 'Custom Scrollbar',
                        'component': 'ComponentsCustomScrollbarNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Infinite Scroll',
                        'component': 'ComponentsInfiniteScrollNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Infinite Scroll with Load More Button',
                        'component': 'ComponentsInfiniteScrollLoadMoreNg1Component',
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
export class ComponentsScrollbarModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}