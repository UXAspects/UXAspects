import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { CssButtonAddonsComponent } from './button-addons/button-addons.component';
import { CssDisabledAreaComponent } from './disabled-inputs/disabled-inputs.component';
import { CssInputErrorComponent } from './input-error/input-error.component';
import { CssInputGroupsComponent } from './input-groups/input-groups.component';
import { CssInputHeightComponent } from './input-height/input-height.component';
import { CssInputRequiredComponent } from './input-required/input-required.component';
import { CssInputWidthComponent } from './input-width/input-width.component';
import { CssInputsHelpTextComponent } from './inputs-help-text/inputs-help-text.component';
import { CssSegmentedAddonsComponent } from './segmented-addons/segmented-addons.component';
import { CssTextAreaComponent } from './text-area/text-area.component';
import { CssTextInputsComponent } from './text-inputs/text-inputs.component';


const SECTIONS = [
    CssTextInputsComponent,
    CssTextAreaComponent,
    CssDisabledAreaComponent,
    CssInputErrorComponent,
    CssInputRequiredComponent,
    CssInputHeightComponent,
    CssInputWidthComponent,
    CssInputGroupsComponent,
    CssButtonAddonsComponent,
    CssInputsHelpTextComponent,
    CssSegmentedAddonsComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Css, 'Text Inputs')
        }
    }
];

@NgModule({
    imports: [
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES),
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class CssTextInputsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}