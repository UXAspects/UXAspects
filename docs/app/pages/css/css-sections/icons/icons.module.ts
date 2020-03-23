import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, IconModule, MenuModule, PopoverModule, SelectModule, TabsetModule, TooltipModule } from '@ux-aspects/ux-aspects';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { CssBasicUsageComponent } from './basic-usage/basic-usage.component';
import { CssFixedWidthComponent } from './fixed-width/fixed-width.component';
import { CssIconButtonsComponent } from './icon-buttons/icon-buttons.component';
import { CssIconColorsComponent } from './icon-colors/icon-colors.component';
import { CssIconSizeComponent } from './icon-size/icon-size.component';
import { CssRotateFlipIconsComponent } from './rotate-flip-icons/rotate-flip-icons.component';
import { IconPreviewComponent } from './ux-icons/icon-preview/icon-preview.component';
import { IconSnippetComponent } from './ux-icons/icon-preview/icon-snippet/icon-snippet.component';
import { CssUxIconsComponent } from './ux-icons/ux-icons.component';


const SECTIONS = [
    CssUxIconsComponent,
    CssBasicUsageComponent,
    CssIconSizeComponent,
    CssFixedWidthComponent,
    CssRotateFlipIconsComponent,
    CssIconButtonsComponent,
    CssIconColorsComponent,
    IconPreviewComponent,
    IconSnippetComponent
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
        AccessibilityModule,
        ButtonsModule,
        CommonModule,
        DocumentationComponentsModule,
        FormsModule,
        IconModule,
        MenuModule,
        PopoverModule,
        RouterModule.forChild(ROUTES),
        SelectModule,
        TabsetModule,
        TooltipModule,
    ],
    exports: SECTIONS,
    declarations: [
        SECTIONS,
        IconPreviewComponent
    ],
})
export class CssIconsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver, SECTIONS);
    }
}
