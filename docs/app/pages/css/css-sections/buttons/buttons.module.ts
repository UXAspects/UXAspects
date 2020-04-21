import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { CssButtonDropdownsComponent } from './button-dropdowns/button-dropdowns.component';
import { CssCircularIconButtonsComponent } from './circular-icon-buttons/circular-icon-buttons.component';
import { CssColoredButtonsComponent } from './colored-buttons/colored-buttons.component';
import { CssHyperlinksComponent } from './hyperlinks/hyperlinks.component';
import { IconButtonsDocumentationComponent } from './icon-buttons/icon-buttons.component';
import { CssLinkButtonsComponent } from './link-buttons/link-buttons.component';
import { CssButtonsSizeVariationsComponent } from './size-variations/size-variations.component';
import { CssSplitButtonDropdownsComponent } from './split-button-dropdowns/split-button-dropdowns.component';


const SECTIONS = [
    CssButtonDropdownsComponent,
    CssCircularIconButtonsComponent,
    CssColoredButtonsComponent,
    CssHyperlinksComponent,
    CssLinkButtonsComponent,
    CssButtonsSizeVariationsComponent,
    CssSplitButtonDropdownsComponent,
    IconButtonsDocumentationComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Css, 'Buttons')
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
})
export class CssButtonsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver, SECTIONS);
    }
}
