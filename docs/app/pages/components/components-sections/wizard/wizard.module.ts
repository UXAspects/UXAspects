import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AccordionModule, CheckboxModule, MarqueeWizardModule, RadioButtonModule, WizardModule } from '../../../../../../src/index';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { ComponentsMarqueeWizardNg1Component } from './marquee-wizard-ng1/marquee-wizard-ng1.component';
import { ComponentsMarqueeWizardComponent } from './marquee-wizard/marquee-wizard.component';
import { ComponentsVerticalWizardNg1Component } from './vertical-wizard-ng1/vertical-wizard-ng1.component';
import { ComponentsWizardNg1Component } from './wizard-ng1/wizard-ng1.component';
import { ComponentsWizardValidationNg1Component } from './wizard-validation-ng1/wizard-validation-ng1.component';
import { ComponentsWizardComponent } from './wizard/wizard.component';

const SECTIONS = [
    ComponentsWizardComponent,
    ComponentsWizardNg1Component,
    ComponentsWizardValidationNg1Component,
    ComponentsVerticalWizardNg1Component,
    ComponentsMarqueeWizardNg1Component,
    ComponentsMarqueeWizardComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Wizard')
        }
    }
];

@NgModule({
    imports: [
        CommonModule,
        WrappersModule,
        TabsModule.forRoot(),
        AccordionModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES),
        RadioButtonModule,
        CheckboxModule,
        MarqueeWizardModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),
        WizardModule
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ComponentsWizardModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}