import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { CssColoredButtonsComponent } from './colored-buttons/colored-buttons.component';
import { CssHyperlinksComponent } from './hyperlinks/hyperlinks.component';
import { IconButtonsDocumentationComponent } from './icon-buttons/icon-buttons.component';
import { CssLinkButtonsComponent } from './link-buttons/link-buttons.component';
import { CssButtonsSizeVariationsComponent } from './size-variations/size-variations.component';

const SECTIONS = [
    CssColoredButtonsComponent,
    CssHyperlinksComponent,
    CssLinkButtonsComponent,
    CssButtonsSizeVariationsComponent,
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
        CommonModule,
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
