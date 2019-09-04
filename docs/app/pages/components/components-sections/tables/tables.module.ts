import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, AccordionModule, CheckboxModule, ColumnSortingModule, FilterModule, FixedHeaderTableModule, HoverActionModule, IconModule, LayoutSwitcherModule, MenuNavigationModule, RadioButtonModule, ReorderableModule, SelectionModule, SliderModule, SparkModule, TableModule, TabsetModule, TooltipModule } from '@ux-aspects/ux-aspects';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ComponentsColumnPickerComponent } from './column-picker/column-picker.component';
import { ComponentsColumnResizingComponent } from './column-resizing/column-resizing.component';
import { ComponentsColumnSortingComponent } from './column-sorting/column-sorting.component';
import { ComponentsCustomFiltersComponent } from './custom-filters-component/custom-filters.component';
import { SampleFilterCustomComponent } from './custom-filters-component/sample/sample-filter.component';
import { ComponentsFiltersComponent } from './filters/filters.component';
import { ComponentsFixedHeaderTableComponent } from './fixed-header-table/fixed-header-table.component';
import { ComponentsHoverActionsComponent } from './hover-actions/hover-actions.component';
import { ComponentsLayoutSwitchingComponent } from './layout-switching/layout-switching.component';
import { ComponentsReorderableTableComponent } from './reorderable-table/reorderable-table.component';
import { ComponentsSelectionComponent } from './selection/selection.component';
import { ComponentsSortingComponent } from './sorting/sorting.component';


const SECTIONS = [
    ComponentsColumnSortingComponent,
    ComponentsFiltersComponent,
    ComponentsCustomFiltersComponent,
    ComponentsReorderableTableComponent,
    SampleFilterCustomComponent,
    ComponentsLayoutSwitchingComponent,
    ComponentsHoverActionsComponent,
    ComponentsFixedHeaderTableComponent,
    ComponentsSelectionComponent,
    ComponentsSortingComponent,
    ComponentsColumnResizingComponent,
    ComponentsColumnPickerComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Tables')
        }
    }
];

@NgModule({
    imports: [
        A11yModule,
        AccessibilityModule,
        AccordionModule,
        BsDropdownModule,
        ButtonsModule,
        CheckboxModule,
        ColumnSortingModule,
        CommonModule,
        DocumentationComponentsModule,
        FilterModule,
        FixedHeaderTableModule,
        FormsModule,
        HoverActionModule,
        IconModule,
        LayoutSwitcherModule,
        MenuNavigationModule,
        RadioButtonModule,
        ReorderableModule,
        RouterModule.forChild(ROUTES),
        SelectionModule,
        SliderModule,
        SparkModule,
        TableModule,
        TabsetModule,
        TooltipModule,
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ComponentsTablesModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}