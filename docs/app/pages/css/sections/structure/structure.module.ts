import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { CssHtmlHeadComponent } from './html-head/html-head.component';
import { CssHtmlBodyComponent } from './html-body/html-body.component';
import { CssScrollToTopButtonComponent } from './scroll-to-top-button/scroll-to-top-button.component';

const SECTIONS = [
    CssHtmlHeadComponent,
    CssHtmlBodyComponent,
    CssScrollToTopButtonComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: {
                title: 'Structure',
                link: 'structure',
                sections: [
                    {
                        title: 'HTML Head',
                        component: 'CssHtmlHeadComponent'
                    },
                    {
                        title: 'HTML Body',
                        component: 'CssHtmlBodyComponent'
                    },
                    {
                        title: 'Scroll To Top Button',
                        component: 'CssScrollToTopButtonComponent'
                    }
                ]
            }
        }
    }
];

@NgModule({
    imports: [
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class CssStructureModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}