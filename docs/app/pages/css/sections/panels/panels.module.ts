import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { CssBasicPanelComponent } from './basic-panel/basic-panel.component';
import { CssEboxPanelComponent } from './ebox-panel/ebox-panel.component';

const SECTIONS = [
    CssBasicPanelComponent,
    CssEboxPanelComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: {
                title: 'Panels',
                link: 'panels',
                sections: [
                    {
                        title: 'Basic Panel',
                        component: 'CssBasicPanelComponent'
                    },
                    {
                        title: 'EBox Panel',
                        component: 'CssEboxPanelComponent'
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
export class CssPanelsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}