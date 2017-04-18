import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { ComponentsWizardNg1Component } from './wizard-ng1/wizard-ng1.component';
import { ComponentsWizardValidationNg1Component } from './wizard-validation-ng1/wizard-validation-ng1.component';
import { ComponentsVerticalWizardNg1Component } from './vertical-wizard-ng1/vertical-wizard-ng1.component';
import { ComponentsMarqueeWizardNg1Component } from './marquee-wizard-ng1/marquee-wizard-ng1.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { WrappersModule } from '../../../../wrappers.module';

const SECTIONS = [
    ComponentsWizardNg1Component,
    ComponentsWizardValidationNg1Component,
    ComponentsVerticalWizardNg1Component,
    ComponentsMarqueeWizardNg1Component
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: {
                'title': 'Wizard',
                'link': 'wizard',
                'sections': [
                    {
                        'title': 'Wizard',
                        'component': 'ComponentsWizardNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Wizard with Validation',
                        'component': 'ComponentsWizardValidationNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Vertical Wizard',
                        'component': 'ComponentsVerticalWizardNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Marquee Wizard',
                        'component': 'ComponentsMarqueeWizardNg1Component',
                        'version': 'AngularJS'
                    }
                ]
            }
        }
    }
];

@NgModule({
    imports: [
        WrappersModule,
        TabsModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
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