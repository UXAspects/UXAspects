import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { CssTablesComponent } from './tables/tables.component';
import { CssCardsComponent } from './cards/cards.component';

const SECTIONS = [
    CssTablesComponent,
    CssCardsComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: {
                title: 'Tables',
                link: 'tables',
                sections: [
                    {
                        title: 'Tables',
                        component: 'CssTablesComponent'
                    },
                    {
                        title: 'Cards',
                        component: 'CssCardsComponent'
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
export class CssTablesModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}