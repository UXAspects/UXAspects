import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, AccordionModule, CheckboxModule, FixedHeaderTableModule, InfiniteScrollModule, NumberPickerModule, TabsetModule, VirtualScrollModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ComponentsInfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';
import { ComponentsVirtualForComponent } from './virtual-for/virtual-for.component';
import { ComponentsVirtualScrollComponent } from './virtual-scroll/virtual-scroll.component';

const SECTIONS = [
    ComponentsInfiniteScrollComponent,
    ComponentsVirtualScrollComponent,
    ComponentsVirtualForComponent
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
        A11yModule,
        AccessibilityModule,
        AccordionModule,
        CheckboxModule,
        CommonModule,
        DocumentationComponentsModule,
        FixedHeaderTableModule,
        FormsModule,
        InfiniteScrollModule,
        NumberPickerModule,
        RouterModule.forChild(ROUTES),
        TabsetModule,
        VirtualScrollModule,
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
})
export class ComponentsScrollbarModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver, SECTIONS);
    }
}
