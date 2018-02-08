import { CommonModule } from '@angular/common';
import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';

import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { ComponentsWizardNg1Component } from './wizard-ng1/wizard-ng1.component';
import { ComponentsWizardValidationNg1Component } from './wizard-validation-ng1/wizard-validation-ng1.component';
import { ComponentsVerticalWizardNg1Component } from './vertical-wizard-ng1/vertical-wizard-ng1.component';
import { ComponentsMarqueeWizardNg1Component } from './marquee-wizard-ng1/marquee-wizard-ng1.component';
import { ComponentsMarqueeWizardComponent } from './marquee-wizard/marquee-wizard.component';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { ComponentsWizardComponent } from './wizard/wizard.component';
import { WizardModule, RadioButtonModule, MarqueeWizardModule, CheckboxModule } from '../../../../../../src/index';

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
        TabsModule,
        AccordionModule.forRoot(),
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