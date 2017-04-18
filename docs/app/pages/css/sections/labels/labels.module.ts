import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { CssStaticTextComponent } from './static-text/static-text.component';
import { CssLabelsComponent } from './labels/labels.component';

const SECTIONS = [
    CssLabelsComponent,
    CssStaticTextComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: {
                title: 'Labels',
                link: 'labels',
                sections: [
                    {
                        title: 'Labels',
                        component: 'CssLabelsComponent'
                    },
                    {
                        title: 'Static Text',
                        component: 'CssStaticTextComponent'
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
export class CssLabelsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}