import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CssIconColorsComponent } from './icon-colors/icon-colors.component';
import { CssIconButtonsComponent } from './icon-buttons/icon-buttons.component';
import { CssRotateFlipIconsComponent } from './rotate-flip-icons/rotate-flip-icons.component';
import { CssFixedWidthComponent } from './fixed-width/fixed-width.component';
import { CssIconSizeComponent } from './icon-size/icon-size.component';
import { CssBasicUsageComponent } from './basic-usage/basic-usage.component';
import { CssUxIconsComponent } from './ux-icons/ux-icons.component';

const SECTIONS = [
    CssUxIconsComponent,
    CssBasicUsageComponent,
    CssIconSizeComponent,
    CssFixedWidthComponent,
    CssRotateFlipIconsComponent,
    CssIconButtonsComponent,
    CssIconColorsComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Css, 'Icons')
        }
    }
];

@NgModule({
    imports: [
        DocumentationComponentsModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class CssIconsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}