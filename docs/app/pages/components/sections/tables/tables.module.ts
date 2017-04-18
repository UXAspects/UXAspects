import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from '../../../../../../src/index';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { ComponentsDetailRowResponsiveNg1Component } from './detail-row-responsive-ng1/detail-row-responsive-ng1.component';
import { ComponentsDetailRowHeaderNg1Component } from './detail-row-header-ng1/detail-row-header-ng1.component';
import { ComponentsFiltersNg1Component } from './filters-ng1/filters-ng1.component';
import { ComponentsDynamicFiltersNg1Component } from './dynamic-filters-ng1/dynamic-filters-ng1.component';
import { ComponentsIndicesNg1Component } from './indices-ng1/indices-ng1.component';
import { ComponentsGroupingNg1Component } from './grouping-ng1/grouping-ng1.component';
import { ComponentsLayoutSwitchingNg1Component } from './layout-switching-ng1/layout-switching-ng1.component';
import { ComponentsFixedHeaderTableNg1Component } from './fixed-header-table-ng1/fixed-header-table-ng1.component';
import { ComponentsListHoverActionsNg1Component } from './list-hover-actions-ng1/list-hover-actions-ng1.component';
import { ComponentsHoverActionsNg1Component } from './hover-actions-ng1/hover-actions-ng1.component';
import { ComponentsPreviewPaneNg1Component } from './preview-pane-ng1/preview-pane-ng1.component';
import { ComponentsPreviewPaneWindowNg1Component } from './preview-pane-window-ng1/preview-pane-window-ng1.component';
import { ComponentsReorderableTableNg1Component } from './reorderable-table-ng1/reorderable-table-ng1.component';
import { ComponentsMultipleSelectActionsNg1Component } from './multiple-select-actions-ng1/multiple-select-actions-ng1.component';
import { ComponentsTraditionalMultipleSelectActionsNg1Component } from './traditional-multiple-select-actions-ng1/traditional-multiple-select-actions-ng1.component';
import { ComponentsMultipleSelectionRowNg1Component } from './multiple-selection-row-ng1/multiple-selection-row-ng1.component';
import { ComponentsSortingNg1Component } from './sorting-ng1/sorting-ng1.component';
import { ComponentsSortDirectionToggleNg1Component } from './sort-direction-toggle-ng1/sort-direction-toggle-ng1.component';
import { ComponentsSingleColumnSortingNg1Component } from './single-column-sorting-ng1/single-column-sorting-ng1.component';
import { ComponentsMultipleColumnSortingNg1Component } from './multiple-column-sorting-ng1/multiple-column-sorting-ng1.component';
import { ComponentsColumnVisibilityNg1Component } from './column-visibility-ng1/column-visibility-ng1.component';
import { ComponentsCustomResponsiveTableNg1Component } from './custom-responsive-table-ng1/custom-responsive-table-ng1.component';
import { WrappersModule } from '../../../../wrappers.module';
import { TabsModule } from 'ngx-bootstrap/tabs';


const SECTIONS = [
    ComponentsDetailRowResponsiveNg1Component,
    ComponentsDetailRowHeaderNg1Component,
    ComponentsFiltersNg1Component,
    ComponentsDynamicFiltersNg1Component,
    ComponentsIndicesNg1Component,
    ComponentsGroupingNg1Component,
    ComponentsLayoutSwitchingNg1Component,
    ComponentsFixedHeaderTableNg1Component,
    ComponentsListHoverActionsNg1Component,
    ComponentsHoverActionsNg1Component,
    ComponentsPreviewPaneNg1Component,
    ComponentsPreviewPaneWindowNg1Component,
    ComponentsReorderableTableNg1Component,
    ComponentsMultipleSelectActionsNg1Component,
    ComponentsTraditionalMultipleSelectActionsNg1Component,
    ComponentsMultipleSelectionRowNg1Component,
    ComponentsSortingNg1Component,
    ComponentsSortDirectionToggleNg1Component,
    ComponentsSingleColumnSortingNg1Component,
    ComponentsMultipleColumnSortingNg1Component,
    ComponentsColumnVisibilityNg1Component,
    ComponentsCustomResponsiveTableNg1Component
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: {
                'title': 'Tables',
                'link': 'tables',
                'sections': [
                    {
                        'title': 'Detail Row Responsive Table',
                        'component': 'ComponentsDetailRowResponsiveNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Detail Row Header',
                        'component': 'ComponentsDetailRowHeaderNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Filters',
                        'component': 'ComponentsFiltersNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Dynamic Filters',
                        'component': 'ComponentsDynamicFiltersNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Indices',
                        'component': 'ComponentsIndicesNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Grouping',
                        'component': 'ComponentsGroupingNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Layout Switching',
                        'component': 'ComponentsLayoutSwitchingNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Fixed Header Table',
                        'component': 'ComponentsFixedHeaderTableNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'List Hover Actions',
                        'component': 'ComponentsListHoverActionsNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Hover Actions',
                        'component': 'ComponentsHoverActionsNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Preview Pane',
                        'component': 'ComponentsPreviewPaneNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Preview Pane Window',
                        'component': 'ComponentsPreviewPaneWindowNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Reorderable Table',
                        'component': 'ComponentsReorderableTableNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Multiple Selection Actions',
                        'component': 'ComponentsMultipleSelectActionsNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Traditional Multiple Selection Actions',
                        'component': 'ComponentsTraditionalMultipleSelectActionsNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Multiple Selection by Row',
                        'component': 'ComponentsMultipleSelectionRowNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Sorting',
                        'component': 'ComponentsSortingNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Sort Direction Toggle',
                        'component': 'ComponentsSortDirectionToggleNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Single Column Sorting',
                        'component': 'ComponentsSingleColumnSortingNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Multiple Column Sorting',
                        'component': 'ComponentsMultipleColumnSortingNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Column Visibility',
                        'component': 'ComponentsColumnVisibilityNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Custom Responsive Table',
                        'component': 'ComponentsCustomResponsiveTableNg1Component',
                        'version': 'AngularJS'
                    }]
            }
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
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
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