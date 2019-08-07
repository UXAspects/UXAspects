import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccordionModule, FloatingActionButtonsModule, HybridModule, IconModule, MenuModule, MenuNavigationModule, PaginationModule, RadioButtonModule, StringFilterModule, TabsetModule, TooltipModule } from '@ux-aspects/ux-aspects';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { ComponentsCheckboxButtonsNg1Component } from './checkbox-buttons-ng1/checkbox-buttons-ng1.component';
import { ComponentsDropdownNg1Component } from './dropdown-ng1/dropdown-ng1.component';
import { ComponentsDropdownsComponent } from './dropdowns/dropdowns.component';
import { ComponentsFloatingActionButtonNg1Component } from './floating-action-button-ng1/floating-action-button-ng1.component';
import { ComponentsFloatingActionButtonComponent } from './floating-action-button/floating-action-button.component';
import { ComponentsGroupedButtonsNg1Component } from './grouped-buttons-ng1/grouped-buttons-ng1.component';
import { ComponentsPaginationNg1Component } from './pagination-ng1/pagination-ng1.component';
import { ComponentsPaginationComponent } from './pagination/pagination.component';
import { ComponentsRadioButtonsNg1Component } from './radio-buttons-ng1/radio-buttons-ng1.component';
import { ComponentsRadioButtonsComponent } from './radio-buttons/radio-buttons.component';
import { ComponentsSingleToggleButtonNg1Component } from './single-toggle-button-ng1/single-toggle-button-ng1.component';
import { ComponentsSplitButtonDropdownsComponent } from './split-button-dropdowns/split-button-dropdowns.component';
import { ComponentsThumbnailNg1Component } from './thumbnail-ng1/thumbnail-ng1.component';
import { ComponentsToggleButtonsNg1Component } from './toggle-buttons-ng1/toggle-buttons-ng1.component';
import { ComponentsToggleButtonsComponent } from './toggle-buttons/toggle-buttons.component';

const SECTIONS = [
    ComponentsToggleButtonsComponent,
    ComponentsRadioButtonsComponent,
    ComponentsPaginationComponent,
    ComponentsDropdownsComponent,
    ComponentsGroupedButtonsNg1Component,
    ComponentsToggleButtonsNg1Component,
    ComponentsFloatingActionButtonComponent,
    ComponentsFloatingActionButtonNg1Component,
    ComponentsPaginationNg1Component,
    ComponentsSingleToggleButtonNg1Component,
    ComponentsCheckboxButtonsNg1Component,
    ComponentsRadioButtonsNg1Component,
    ComponentsDropdownNg1Component,
    ComponentsThumbnailNg1Component,
    ComponentsSplitButtonDropdownsComponent
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
        AccordionModule,
        BsDropdownModule,
        ButtonsModule,
        CommonModule,
        DocumentationComponentsModule,
        FloatingActionButtonsModule,
        FormsModule,
        HybridModule,
        IconModule,
        MenuModule,
        MenuNavigationModule,
        PaginationModule,
        RadioButtonModule,
        RouterModule.forChild(ROUTES),
        StringFilterModule,
        TabsetModule,
        TooltipModule,
        WrappersModule,
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