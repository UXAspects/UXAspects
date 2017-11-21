import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { CheckboxModule } from '../../../../../../src/index';
import { WrappersModule } from '../../../../wrappers/wrappers.module';

import { CssFormValidationOnSubmitComponent } from './form-validation-on-submit/form-validation-on-submit.component';
import { CssFormValidationFieldByFieldComponent } from './form-validation-field-by-field/form-validation-field-by-field.component';
import { CssInlineFormComponent } from './inline-form/inline-form.component';
import { CssHorizontalFormComponent } from './horizontal-form/horizontal-form.component';
import { CssBasicFormComponent } from './basic-form/basic-form.component';

const SECTIONS = [
    CssBasicFormComponent,
    CssHorizontalFormComponent,
    CssInlineFormComponent,
    CssFormValidationFieldByFieldComponent,
    CssFormValidationOnSubmitComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Css, 'Forms')
        }
    }
];

@NgModule({
    imports: [
        CheckboxModule,
        WrappersModule,
        DocumentationComponentsModule,
        TabsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class CssFormsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}