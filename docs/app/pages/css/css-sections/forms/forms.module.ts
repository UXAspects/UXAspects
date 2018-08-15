import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CheckboxModule } from '../../../../../../src/index';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { CssBasicFormComponent } from './basic-form/basic-form.component';
import { CssFormValidationFieldByFieldComponent } from './form-validation-field-by-field/form-validation-field-by-field.component';
import { CssFormValidationOnSubmitComponent } from './form-validation-on-submit/form-validation-on-submit.component';
import { CssHorizontalFormComponent } from './horizontal-form/horizontal-form.component';
import { CssInlineFormComponent } from './inline-form/inline-form.component';


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