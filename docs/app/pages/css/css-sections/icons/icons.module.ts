import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SelectModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { CssBasicUsageComponent } from './basic-usage/basic-usage.component';
import { CssFixedWidthComponent } from './fixed-width/fixed-width.component';
import { CssIconButtonsComponent } from './icon-buttons/icon-buttons.component';
import { CssIconColorsComponent } from './icon-colors/icon-colors.component';
import { CssIconSizeComponent } from './icon-size/icon-size.component';
import { CssRotateFlipIconsComponent } from './rotate-flip-icons/rotate-flip-icons.component';
import { CssUxIconsComponent } from './ux-icons/ux-icons.component';
import { CssDocumentationComponent } from './icon-documentation/icon-documentation.component';
import { IconModule, TabsetModule, TooltipModule } from '@ux-aspects/ux-aspects';
import { IconPreviewComponent } from './ux-icons/icon-preview/icon-preview.component';


const SECTIONS = [
    CssUxIconsComponent,
    CssDocumentationComponent,
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
        SelectModule,
        IconModule,
        TooltipModule,
        TabsetModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: [
        SECTIONS,
        IconPreviewComponent
    ],
    entryComponents: SECTIONS
})
export class CssIconsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}