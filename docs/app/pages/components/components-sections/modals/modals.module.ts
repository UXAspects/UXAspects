import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabsetModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { ComponentsMarqueeModalNg1Component } from './marquee-modal-ng1/marquee-modal-ng1.component';
import { ComponentsModalNg1Component } from './modal-ng1/modal-ng1.component';
import { ComponentsSideModalNg1Component } from './side-modal-ng1/side-modal-ng1.component';
import { ComponentsSquareModalNg1Component } from './square-modal-ng1/square-modal-ng1.component';


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
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Modals')
        }
    }
];

@NgModule({
    imports: [
        WrappersModule,
        TabsetModule,
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