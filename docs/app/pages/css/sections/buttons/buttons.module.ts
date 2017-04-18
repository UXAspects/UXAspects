import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { CssSplitButtonDropdownsComponent } from './split-button-dropdowns/split-button-dropdowns.component';
import { CssButtonDropdownsComponent } from './button-dropdowns/button-dropdowns.component';
import { CssCircularIconButtonsComponent } from './circular-icon-buttons/circular-icon-buttons.component';
import { CssColoredButtonsComponent } from './colored-buttons/colored-buttons.component';
import { CssHyperlinksComponent } from './hyperlinks/hyperlinks.component';
import { CssLinkButtonsComponent } from './link-buttons/link-buttons.component';
import { CssButtonsSizeVariationsComponent } from './size-variations/size-variations.component';

const SECTIONS = [
    CssButtonDropdownsComponent,
    CssCircularIconButtonsComponent,
    CssColoredButtonsComponent,
    CssHyperlinksComponent,
    CssLinkButtonsComponent,
    CssButtonsSizeVariationsComponent,
    CssSplitButtonDropdownsComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: {
                title: 'Buttons',
                link: 'buttons',
                sections: [
                    {
                        title: 'Colored Buttons',
                        component: 'CssColoredButtonsComponent'
                    },
                    {
                        title: 'Link Buttons',
                        component: 'CssLinkButtonsComponent'
                    },
                    {
                        title: 'Size Variations',
                        component: 'CssButtonsSizeVariationsComponent'
                    },
                    {
                        title: 'Circular Icon Buttons',
                        component: 'CssCircularIconButtonsComponent'
                    },
                    {
                        title: 'Hyperlinks',
                        component: 'CssHyperlinksComponent'
                    },
                    {
                        title: 'Button Dropdowns',
                        component: 'CssButtonDropdownsComponent'
                    },
                    {
                        title: 'Split Button Dropdowns',
                        component: 'CssSplitButtonDropdownsComponent'
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
export class CssButtonsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}
