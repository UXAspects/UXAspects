import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, AccordionModule, CheckboxModule, FocusIfModule, MarqueeWizardModule, RadioButtonModule, TabsetModule, WizardModule } from '@ux-aspects/ux-aspects';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ComponentsMarqueeWizardComponent } from './marquee-wizard/marquee-wizard.component';
import { ComponentsWizardComponent } from './wizard/wizard.component';

const SECTIONS = [
    ComponentsWizardComponent,
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
        A11yModule,
        AccessibilityModule,
        AccordionModule,
        CheckboxModule,
        CommonModule,
        DocumentationComponentsModule,
        FocusIfModule,
        MarqueeWizardModule,
        ModalModule,
        RadioButtonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        TabsetModule,
        WizardModule,
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