import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { ComponentsThumbnailNg1Component } from './thumbnail-ng1/thumbnail-ng1.component';
import { ComponentsDropdownNg1Component } from './dropdown-ng1/dropdown-ng1.component';
import { ComponentsRadioButtonsNg1Component } from './radio-buttons-ng1/radio-buttons-ng1.component';
import { ComponentsCheckboxButtonsNg1Component } from './checkbox-buttons-ng1/checkbox-buttons-ng1.component';
import { ComponentsSingleToggleButtonNg1Component } from './single-toggle-button-ng1/single-toggle-button-ng1.component';
import { ComponentsPaginationNg1Component } from './pagination-ng1/pagination-ng1.component';
import { ComponentsFloatingActionButtonNg1Component } from './floating-action-button-ng1/floating-action-button-ng1.component';
import { ComponentsToggleButtonsNg1Component } from './toggle-buttons-ng1/toggle-buttons-ng1.component';
import { ComponentsGroupedButtonsNg1Component } from './grouped-buttons-ng1/grouped-buttons-ng1.component';
import { WrappersModule } from '../../../../wrappers.module';
import { TabsModule } from 'ngx-bootstrap/tabs';

const SECTIONS = [
    ComponentsGroupedButtonsNg1Component,
    ComponentsToggleButtonsNg1Component,
    ComponentsFloatingActionButtonNg1Component,
    ComponentsPaginationNg1Component,
    ComponentsSingleToggleButtonNg1Component,
    ComponentsCheckboxButtonsNg1Component,
    ComponentsRadioButtonsNg1Component,
    ComponentsDropdownNg1Component,
    ComponentsThumbnailNg1Component
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: {
                'title': 'Buttons',
                'link': 'buttons',
                'sections': [
                    {
                        'title': 'Grouped Buttons',
                        'component': 'ComponentsGroupedButtonsNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Toggle Buttons',
                        'component': 'ComponentsToggleButtonsNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Floating Action Button',
                        'component': 'ComponentsFloatingActionButtonNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Pagination',
                        'component': 'ComponentsPaginationNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Single Toggle Button',
                        'component': 'ComponentsSingleToggleButtonNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Checkbox Buttons',
                        'component': 'ComponentsCheckboxButtonsNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Radio Buttons',
                        'component': 'ComponentsRadioButtonsNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Dropdown',
                        'component': 'ComponentsDropdownNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Thumbnail',
                        'component': 'ComponentsThumbnailNg1Component',
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
export class ComponentsButtonsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}