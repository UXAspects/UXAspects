import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { LayoutSwitcherModule } from '../../../../../../src/directives/layout-switcher/index';
import { CheckboxModule, ColumnSortingModule, FilterModule, FixedHeaderTableModule, HoverActionModule, RadioButtonModule, ReorderableModule, SelectionModule, SliderModule, SparkModule, TooltipModule } from '../../../../../../src/index';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { ComponentsColumnSortingComponent } from './column-sorting/column-sorting.component';
import { ComponentsColumnVisibilityNg1Component } from './column-visibility-ng1/column-visibility-ng1.component';
import { ComponentsCustomFiltersComponent } from './custom-filters-component/custom-filters.component';
import { SampleFilterCustomComponent } from './custom-filters-component/sample/sample-filter.component';
import { ComponentsCustomResponsiveTableNg1Component } from './custom-responsive-table-ng1/custom-responsive-table-ng1.component';
import { ComponentsDetailRowHeaderNg1Component } from './detail-row-header-ng1/detail-row-header-ng1.component';
import { ComponentsDetailRowResponsiveNg1Component } from './detail-row-responsive-ng1/detail-row-responsive-ng1.component';
import { ComponentsDynamicFiltersNg1Component } from './dynamic-filters-ng1/dynamic-filters-ng1.component';
import { ComponentsFiltersNg1Component } from './filters-ng1/filters-ng1.component';
import { ComponentsFiltersComponent } from './filters/filters.component';
import { ComponentsFixedHeaderTableNg1Component } from './fixed-header-table-ng1/fixed-header-table-ng1.component';
import { ComponentsFixedHeaderTableComponent } from './fixed-header-table/fixed-header-table.component';
import { ComponentsGroupingNg1Component } from './grouping-ng1/grouping-ng1.component';
import { ComponentsHoverActionsNg1Component } from './hover-actions-ng1/hover-actions-ng1.component';
import { ComponentsHoverActionsComponent } from './hover-actions/hover-actions.component';
import { ComponentsIndicesNg1Component } from './indices-ng1/indices-ng1.component';
import { ComponentsLayoutSwitchingNg1Component } from './layout-switching-ng1/layout-switching-ng1.component';
import { ComponentsLayoutSwitchingComponent } from './layout-switching/layout-switching.component';
import { ComponentsListHoverActionsNg1Component } from './list-hover-actions-ng1/list-hover-actions-ng1.component';
import { ComponentsMultipleColumnSortingNg1Component } from './multiple-column-sorting-ng1/multiple-column-sorting-ng1.component';
import { ComponentsMultipleSelectActionsNg1Component } from './multiple-select-actions-ng1/multiple-select-actions-ng1.component';
import { ComponentsMultipleSelectionRowNg1Component } from './multiple-selection-row-ng1/multiple-selection-row-ng1.component';
import { ComponentsPreviewPaneNg1Component } from './preview-pane-ng1/preview-pane-ng1.component';
import { ComponentsPreviewPaneWindowNg1Component } from './preview-pane-window-ng1/preview-pane-window-ng1.component';
import { ComponentsReorderableTableNg1Component } from './reorderable-table-ng1/reorderable-table-ng1.component';
import { ComponentsReorderableTableComponent } from './reorderable-table/reorderable-table.component';
import { ComponentsScrollableTableNg1Component } from './scrollable-table-ng1/scrollable-table-ng1.component';
import { ComponentsSelectionComponent } from './selection/selection.component';
import { ComponentsSingleColumnSortingNg1Component } from './single-column-sorting-ng1/single-column-sorting-ng1.component';
import { ComponentsSortDirectionToggleNg1Component } from './sort-direction-toggle-ng1/sort-direction-toggle-ng1.component';
import { ComponentsSortingNg1Component } from './sorting-ng1/sorting-ng1.component';
import { ComponentsSortingComponent } from './sorting/sorting.component';
import { ComponentsTraditionalMultipleSelectActionsNg1Component } from './traditional-multiple-select-actions-ng1/traditional-multiple-select-actions-ng1.component';



const SECTIONS = [
    ComponentsColumnSortingComponent,
    ComponentsDetailRowResponsiveNg1Component,
    ComponentsDetailRowHeaderNg1Component,
    ComponentsFiltersComponent,
    ComponentsCustomFiltersComponent,
    ComponentsFiltersNg1Component,
    ComponentsDynamicFiltersNg1Component,
    ComponentsIndicesNg1Component,
    ComponentsGroupingNg1Component,
    ComponentsLayoutSwitchingNg1Component,
    ComponentsScrollableTableNg1Component,
    ComponentsListHoverActionsNg1Component,
    ComponentsHoverActionsNg1Component,
    ComponentsPreviewPaneNg1Component,
    ComponentsPreviewPaneWindowNg1Component,
    ComponentsReorderableTableNg1Component,
    ComponentsReorderableTableComponent,
    ComponentsMultipleSelectActionsNg1Component,
    ComponentsTraditionalMultipleSelectActionsNg1Component,
    ComponentsMultipleSelectionRowNg1Component,
    ComponentsSortingNg1Component,
    ComponentsSortDirectionToggleNg1Component,
    ComponentsSingleColumnSortingNg1Component,
    ComponentsMultipleColumnSortingNg1Component,
    ComponentsColumnVisibilityNg1Component,
    ComponentsCustomResponsiveTableNg1Component,
    SampleFilterCustomComponent,
    ComponentsLayoutSwitchingComponent,
    ComponentsHoverActionsComponent,
    ComponentsFixedHeaderTableComponent,
    ComponentsFixedHeaderTableNg1Component,
    ComponentsSelectionComponent,
    ComponentsSortingComponent
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
        WrappersModule,
        CommonModule,
        FormsModule,
        TabsModule,
        CheckboxModule,
        RadioButtonModule,
        ColumnSortingModule,
        SparkModule,
        FilterModule,
        SelectionModule,
        LayoutSwitcherModule,
        DocumentationComponentsModule,
        BsDropdownModule.forRoot(),
        ButtonsModule.forRoot(),
        AccordionModule.forRoot(),
        SliderModule,
        ReorderableModule,
        HoverActionModule,
        FixedHeaderTableModule,
        TooltipModule,
        RouterModule.forChild(ROUTES),
        A11yModule
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