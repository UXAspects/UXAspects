import { CheckboxModule, InfiniteScrollModule, NumberPickerModule, VirtualScrollModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import {
    DocumentationCategoryComponent
} from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { ComponentsCustomScrollbarNg1Component } from './custom-scrollbar-ng1/custom-scrollbar-ng1.component';
import {
    ComponentsInfiniteScrollLoadMoreNg1Component
} from './infinite-scroll-load-more-ng1/infinite-scroll-load-more-ng1.component';
import { ComponentsInfiniteScrollNg1Component } from './infinite-scroll-ng1/infinite-scroll-ng1.component';
import { ComponentsInfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';
import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ComponentsVirtualScrollComponent } from './virtual-scroll/virtual-scroll.component';

const SECTIONS = [
    ComponentsCustomScrollbarNg1Component,
    ComponentsInfiniteScrollComponent,
    ComponentsInfiniteScrollNg1Component,
    ComponentsInfiniteScrollLoadMoreNg1Component,
    ComponentsVirtualScrollComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Scrollbar')
        }
    }
];

@NgModule({
    imports: [
        AccordionModule.forRoot(),
        CheckboxModule,
        CommonModule,
        DocumentationComponentsModule,
        FormsModule,
        InfiniteScrollModule,
        RouterModule.forChild(ROUTES),
        TabsModule,
        NumberPickerModule,
        VirtualScrollModule,
        WrappersModule
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