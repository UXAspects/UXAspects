import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonsModule, PaginationModule } from 'ngx-bootstrap';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { ComponentsThumbnailNg1Component } from './thumbnail-ng1/thumbnail-ng1.component';
import { ComponentsDropdownNg1Component } from './dropdown-ng1/dropdown-ng1.component';
import { ComponentsPaginationComponent } from './pagination/pagination.component';

import { ComponentsRadioButtonsNg1Component } from './radio-buttons-ng1/radio-buttons-ng1.component';
import { ComponentsCheckboxButtonsNg1Component } from './checkbox-buttons-ng1/checkbox-buttons-ng1.component';
import { ComponentsSingleToggleButtonNg1Component } from './single-toggle-button-ng1/single-toggle-button-ng1.component';
import { ComponentsPaginationNg1Component } from './pagination-ng1/pagination-ng1.component';
import { ComponentsFloatingActionButtonNg1Component } from './floating-action-button-ng1/floating-action-button-ng1.component';
import { ComponentsToggleButtonsNg1Component } from './toggle-buttons-ng1/toggle-buttons-ng1.component';
import { ComponentsGroupedButtonsNg1Component } from './grouped-buttons-ng1/grouped-buttons-ng1.component';
import { ComponentsToggleButtonsComponent } from './toggle-buttons/toggle-buttons.component';
import { ComponentsRadioButtonsComponent } from './radio-buttons/radio-buttons.component';
import { WrappersModule } from '../../../../wrappers.module';
import { TabsModule } from 'ngx-bootstrap/tabs';

const SECTIONS = [
    ComponentsToggleButtonsComponent,
    ComponentsRadioButtonsComponent,
    ComponentsPaginationComponent,
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
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Buttons')
        }
    }
];

@NgModule({
    imports: [
        WrappersModule,
        TabsModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES),
        FormsModule,
        ButtonsModule.forRoot(),
        PaginationModule.forRoot()
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