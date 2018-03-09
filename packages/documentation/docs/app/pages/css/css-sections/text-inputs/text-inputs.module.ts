import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { WrappersModule } from '../../../../wrappers/wrappers.module';

import { CssTextInputsComponent } from './text-inputs/text-inputs.component';
import { CssTextAreaComponent } from './text-area/text-area.component';
import { CssDisabledAreaComponent } from './disabled-inputs/disabled-inputs.component';
import { CssInputErrorComponent } from './input-error/input-error.component';
import { CssInputRequiredComponent } from './input-required/input-required.component';
import { CssInputHeightComponent } from './input-height/input-height.component';
import { CssInputWidthComponent } from './input-width/input-width.component';
import { CssInputGroupsComponent } from './input-groups/input-groups.component';
import { CssFloatLabelsComponent } from './float-labels/float-labels.component';
import { CssButtonAddonsComponent } from './button-addons/button-addons.component';
import { CssInputsHelpTextComponent } from './inputs-help-text/inputs-help-text.component';
import { CssDropdownAddonsComponent } from './dropdown-addons/dropdown-addons.component';
import { CssSegmentedAddonsComponent } from './segmented-addons/segmented-addons.component';

const SECTIONS = [
    CssTextInputsComponent,
    CssTextAreaComponent,
    CssDisabledAreaComponent,
    CssInputErrorComponent,
    CssInputRequiredComponent,
    CssInputHeightComponent,
    CssInputWidthComponent,
    CssInputGroupsComponent,
    CssFloatLabelsComponent,
    CssButtonAddonsComponent,
    CssInputsHelpTextComponent,
    CssDropdownAddonsComponent,
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
        WrappersModule,
        RouterModule.forChild(ROUTES)
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