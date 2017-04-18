import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentationComponentsModule } from '../../components/components.module';

import { ComponentsPageComponent } from './components.component';

const ROUTES: Routes = [
    {
        path: '',
        component: ComponentsPageComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'buttons' },
            { path: 'buttons', loadChildren: './sections/buttons/buttons.module#ComponentsButtonsModule' },
            { path: 'component-list', loadChildren: './sections/component-list/component-list.module#ComponentsListModule' },
            { path: 'contacts', loadChildren: './sections/contacts/contacts.module#ComponentsContactsModule' },
            { path: 'date-time-picker', loadChildren: './sections/date-time-picker/date-time-picker.module#ComponentsDateTimePickerModule' },
            { path: 'draggable-cards', loadChildren: './sections/draggable-cards/draggable-cards.module#ComponentsDraggableCardsModule' },
            { path: 'draggable-panels', loadChildren: './sections/draggable-panels/draggable-panels.module#ComponentsDraggablePanelsModule' },
            { path: 'facets', loadChildren: './sections/facets/facets.module#ComponentsFacetsModule' },
            { path: 'file-upload', loadChildren: './sections/file-upload/file-upload.module#ComponentsFileUploadModule' },
            { path: 'flippable-cards', loadChildren: './sections/flippable-cards/flippable-cards.module#ComponentsFlippableCardsModule' },
            { path: 'grid', loadChildren: './sections/grid/grid.module#ComponentsGridModule' },
            { path: 'help-center', loadChildren: './sections/help-center/help-center.module#ComponentsHelpCenterModule' },
            { path: 'hierarchy-bar', loadChildren: './sections/hierarchy-bar/hierarchy-bar.module#ComponentsHierarchyBarModule' },
            { path: 'input-controls', loadChildren: './sections/input-controls/input-controls.module#ComponentsInputControlsModule' },
            { path: 'keyboard', loadChildren: './sections/keyboard/keyboard.module#ComponentsKeyboardModule' },
            { path: 'modals', loadChildren: './sections/modals/modals.module#ComponentsModalsModule' },
            { path: 'notifications', loadChildren: './sections/notifications/notifications.module#ComponentsNotificationsModule' },
            { path: 'panels', loadChildren: './sections/panels/panels.module#ComponentsPanelsModule' },
            { path: 'popover', loadChildren: './sections/popover/popover.module#ComponentsPopoverModule' },
            { path: 'progress', loadChildren: './sections/progress/progress.module#ComponentsProgressModule' },
            { path: 'scrollbar', loadChildren: './sections/scrollbar/scrollbar.module#ComponentsScrollbarModule' },
            { path: 'search', loadChildren: './sections/search/search.module#ComponentsSearchModule' },
            { path: 'select', loadChildren: './sections/select/select.module#ComponentsSelectModule' },
            { path: 'splitter', loadChildren: './sections/splitter/splitter.module#ComponentsSplitterModule' },
            { path: 'tables', loadChildren: './sections/tables/tables.module#ComponentsTablesModule' },
            { path: 'tabs', loadChildren: './sections/tabs/tabs.module#ComponentsTabsModule' },
            { path: 'timeline', loadChildren: './sections/timeline/timeline.module#ComponentsTimelineModule' },
            { path: 'tooltips', loadChildren: './sections/tooltips/tooltips.module#ComponentsTooltipsModule' },
            { path: 'tree-view', loadChildren: './sections/tree-view/tree-view.module#ComponentsTreeViewModule' },
            { path: 'ui-router', loadChildren: './sections/ui-router/router.module#ComponentsRouterModule' },
            { path: 'utilities', loadChildren: './sections/utilities/utilities.module#ComponentsUtilitiesModule' },
            { path: 'wizard', loadChildren: './sections/wizard/wizard.module#ComponentsWizardModule' }
        ],
    },
    {
        path: '**',
        redirectTo: '/buttons'
    }
];

@NgModule({
    imports: [
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: [ComponentsPageComponent],
    declarations: [ComponentsPageComponent]
})
export class ComponentsPageModule {
}


// import { NgModule, ComponentFactoryResolver } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// import { CheckboxModule, ToggleSwitchModule } from '../../../../src/index';
// import { DocumentationComponentsModule } from '../../components/components.module';
// import { TabsModule } from 'ngx-bootstrap/tabs';

// import { ComponentsGroupedButtonsNg1Component } from './sections/buttons/grouped-buttons-ng1/grouped-buttons-ng1.component';
// import { ComponentsToggleButtonsNg1Component } from './sections/buttons/toggle-buttons-ng1/toggle-buttons-ng1.component';
// import { ComponentsFloatingActionButtonNg1Component } from './sections/buttons/floating-action-button-ng1/floating-action-button-ng1.component';
// import { ComponentsPaginationNg1Component } from './sections/buttons/pagination-ng1/pagination-ng1.component';
// import { ComponentsSingleToggleButtonNg1Component } from './sections/buttons/single-toggle-button-ng1/single-toggle-button-ng1.component';
// import { ComponentsCheckboxButtonsNg1Component } from './sections/buttons/checkbox-buttons-ng1/checkbox-buttons-ng1.component';
// import { ComponentsRadioButtonsNg1Component } from './sections/buttons/radio-buttons-ng1/radio-buttons-ng1.component';
// import { ComponentsDropdownNg1Component } from './sections/buttons/dropdown-ng1/dropdown-ng1.component';
// import { ComponentsThumbnailNg1Component } from './sections/buttons/thumbnail-ng1/thumbnail-ng1.component';
// import { ComponentsComponentListNg1Component } from './sections/component-list/component-list-ng1/component-list-ng1.component';
// import { ComponentsContactsNg1Component } from './sections/contacts/contacts-ng1/contacts-ng1.component';
// import { ComponentsContactsOverflowNg1Component } from './sections/contacts/contacts-overflow-ng1/contacts-overflow-ng1.component';
// import { ComponentsDraggableCardsNg1Component } from './sections/draggable-cards/draggable-cards-ng1/draggable-cards-ng1.component';
// import { ComponentsDraggableCardsListViewNg1Component } from './sections/draggable-cards/draggable-cards-list-view-ng1/draggable-cards-list-view-ng1.component';
// import { ComponentsDraggablePanelsNg1Component } from './sections/draggable-panels/draggable-panels-ng1/draggable-panels-ng1.component';
// import { ComponentsDraggablePanelsViewsNg1Component } from './sections/draggable-panels/draggable-panels-views-ng1/draggable-panels-views-ng1.component';
// import { ComponentsFacetsNg1Component } from './sections/facets/facets-ng1/facets-ng1.components';
// import { ComponentsCustomFacetsNg1Component } from './sections/facets/custom-facets-ng1/custom-facets-ng1.component';
// import { ComponentsDynamicFacetsNg1Component } from './sections/facets/dynamic-facets-ng1/dynamic-facets-ng1.components';
// import { ComponentsCheckboxComponent } from './sections/input-controls/checkbox/checkbox.component';
// import { ComponentsToggleSwitchComponent } from './sections/input-controls/toggleswitch/toggleswitch.component';
// import { ComponentsEboxComponent } from './sections/ebox/ebox.component';
// import { ComponentsDetailRowResponsiveNg1Component } from './sections/tables/detail-row-responsive-ng1/detail-row-responsive-ng1.component';
// import { ComponentsColumnVisibilityNg1Component } from './sections/tables/column-visibility-ng1/column-visibility-ng1.component';
// import { ComponentsCustomResponsiveTableNg1Component } from './sections/tables/custom-responsive-table-ng1/custom-responsive-table-ng1.component';
// import { ComponentsDetailRowHeaderNg1Component } from './sections/tables/detail-row-header-ng1/detail-row-header-ng1.component';
// import { ComponentsDynamicFiltersNg1Component } from './sections/tables/dynamic-filters-ng1/dynamic-filters-ng1.component';
// import { ComponentsFiltersNg1Component } from './sections/tables/filters-ng1/filters-ng1.component';
// import { ComponentsFixedHeaderTableNg1Component } from './sections/tables/fixed-header-table-ng1/fixed-header-table-ng1.component';
// import { ComponentsGroupingNg1Component } from './sections/tables/grouping-ng1/grouping-ng1.component';
// import { ComponentsHoverActionsNg1Component } from './sections/tables/hover-actions-ng1/hover-actions-ng1.component';
// import { ComponentsIndicesNg1Component } from './sections/tables/indices-ng1/indices-ng1.component';
// import { ComponentsLayoutSwitchingNg1Component } from './sections/tables/layout-switching-ng1/layout-switching-ng1.component';
// import { ComponentsListHoverActionsNg1Component } from './sections/tables/list-hover-actions-ng1/list-hover-actions-ng1.component';
// import { ComponentsMultipleColumnSortingNg1Component } from './sections/tables/multiple-column-sorting-ng1/multiple-column-sorting-ng1.component';
// import { ComponentsMultipleSelectActionsNg1Component } from './sections/tables/multiple-select-actions-ng1/multiple-select-actions-ng1.component';
// import { ComponentsPreviewPaneNg1Component } from './sections/tables/preview-pane-ng1/preview-pane-ng1.component';
// import { ComponentsMultipleSelectionRowNg1Component } from './sections/tables/multiple-selection-row-ng1/multiple-selection-row-ng1.component';
// import { ComponentsPreviewPaneWindowNg1Component } from './sections/tables/preview-pane-window-ng1/preview-pane-window-ng1.component';
// import { ComponentsReorderableTableNg1Component } from './sections/tables/reorderable-table-ng1/reorderable-table-ng1.component';
// import { ComponentsSingleColumnSortingNg1Component } from './sections/tables/single-column-sorting-ng1/single-column-sorting-ng1.component';
// import { ComponentsSortDirectionToggleNg1Component } from './sections/tables/sort-direction-toggle-ng1/sort-direction-toggle-ng1.component';
// import { ComponentsSortingNg1Component } from './sections/tables/sorting-ng1/sorting-ng1.component';
// import { ComponentsTraditionalMultipleSelectActionsNg1Component } from './sections/tables/traditional-multiple-select-actions-ng1/traditional-multiple-select-actions-ng1.component';
// import { ComponentsFacetLineChartNg1Component } from './sections/facets/facet-line-chart-ng1/facet-line-chart-ng1.component';
// import { ComponentsProgrammaticSelectionNg1Component } from './sections/facets/programmatic-selection-ng1/programmatic-selection-ng1.component';
// import { ComponentsFileUploadNg1Component } from './sections/file-upload/file-upload-ng1/file-upload-ng1.component';
// import { ComponentsFlippableCardsNg1Component } from './sections/flippable-cards/flippable-cards-ng1/flippable-cards-ng1.component';
// import { ComponentsGridNg1Component } from './sections/grid/grid-ng1/grid-ng1.component';
// import { ComponentsHelpCenterNg1Component } from './sections/help-center/help-center-ng1/help-center-ng1.component';
// import { ComponentsHierarchyBarNg1Component } from './sections/hierarchy-bar/hierarchy-bar-ng1/hierarchy-bar-ng1.component';
// import { ComponentsHotkeysNg1Component } from './sections/keyboard/hotkeys-ng1/hotkeys-ng1.component';
// import { ComponentsKeyboardServiceNg1Component } from './sections/keyboard/keyboard-service-ng1/keyboard-service-ng1.component';
// import { ComponentsModalNg1Component } from './sections/modals/modal-ng1/modal-ng1.component';
// import { ComponentsSquareModalNg1Component } from './sections/modals/square-modal-ng1/square-modal-ng1.component';
// import { ComponentsMarqueeModalNg1Component } from './sections/modals/marquee-modal-ng1/marquee-modal-ng1.component';
// import { ComponentsSideModalNg1Component } from './sections/modals/side-modal-ng1/side-modal-ng1.component';
// import { ComponentsNotificationsNg1Component } from './sections/notifications/notifications-ng1/notifications-ng1.component';
// import { ComponentsNotificationListNg1Component } from './sections/notifications/notification-list-ng1/notification-list-ng1.component';
// import { ComponentsNotificationDropdownNg1Component } from './sections/notifications/notification-dropdown-ng1/notification-dropdown-ng1.component';
// import { ComponentsAlertStylesNg1Component } from './sections/notifications/alert-styles-ng1/alert-styles-ng1.component';
// import { ComponentsDismissableStylesNg1Component } from './sections/notifications/dismissable-styles-ng1/dismissable-styles-ng1.component';
// import { ComponentsCollapsiblePanelsNg1Component } from './sections/panels/collapsible-panels-ng1/collapsible-panels-ng1.component';
// import { ComponentsItemDisplayPanelNg1Component } from './sections/panels/item-display-panel-ng1/item-display-panel-ng1.component';
// import { ComponentsItemDisplayPanelServiceNg1Component } from './sections/panels/item-display-panel-service-ng1/item-display-panel-service-ng1.component';
// import { ComponentsModalInsetPanelNg1Component } from './sections/panels/modal-inset-panel-ng1/item-display-panel-ng1.component';
// import { ComponentsSideInsetPanelNg1Component } from './sections/panels/side-inset-panel-ng1/side-inset-panel-ng1.component';
// import { ComponentsPopoverNg1Component } from './sections/popover/popover-ng1/popover-ng1.component';
// import { ComponentsProgressBarNg1Component } from './sections/progress/progress-bar-ng1/progress-bar-ng1.component';
// import { ComponentsCustomScrollbarNg1Component } from './sections/scrollbar/custom-scrollbar-ng1/custom-scrollbar-ng1.component';
// import { ComponentsInfiniteScrollNg1Component } from './sections/scrollbar/infinite-scroll-ng1/infinite-scroll-ng1.component';
// import { ComponentsInfiniteScrollLoadMoreNg1Component } from './sections/scrollbar/infinite-scroll-load-more-ng1/infinite-scroll-load-more-ng1.component';
// import { ComponentsSearchBuilderNg1Component } from './sections/search/search-builder-ng1/search-builder-ng1.component';
// import { ComponentsSearchHistoryNg1Component } from './sections/search/search-history-ng1/search-history-ng1.component';
// import { ComponentsSearchToolbarNg1Component } from './sections/search/search-toolbar-ng1/search-toolbar-ng1.component';
// import { ComponentsSplitterNg1Component } from './sections/splitter/splitter-ng1/splitter-ng1.component';
// import { ComponentsNestedSplitterNg1Component } from './sections/splitter/nested-splitter-ng1/nested-splitter-ng1.component';
// import { ComponentsLayoutSwitchingSplitterNg1Component } from './sections/splitter/layout-switching-splitter-ng1/layout-switching-splitter-ng1.component';
// import { ComponentsSideInsetPanelSplitterNg1Component } from './sections/splitter/side-inset-panel-splitter-ng1/side-inset-panel-splitter-ng1.component';
// import { ComponentsTabsNg1Component } from './sections/tabs/tabs-ng1/tabs-ng1.component';
// import { ComponentsDetailedTabExampleNg1Component } from './sections/tabs/detailed-tab-example-ng1/detailed-tab-example-ng1.component';
// import { ComponentsStackedTabsNg1Component } from './sections/tabs/stacked-tabs-ng1/stacked-tabs-ng1-component';
// import { ComponentsCardTabsNg1Component } from './sections/tabs/card-tabs-ng1/card-tabs-ng1.component';
// import { ComponentsTimelineNg1Component } from './sections/timeline/timeline-ng1/timeline-ng1.component';
// import { ComponentsTooltipsNg1Component } from './sections/tooltips/tooltips-ng1/tooltips-ng1.component';
// import { ComponentsOverflowTooltipNg1Component } from './sections/tooltips/overflow-tooltip-ng1/overflow-tooltip-ng1.component';
// import { ComponentsSingleLineOverflowTooltipNg1Component } from './sections/tooltips/single-line-overflow-tooltip-ng1/single-line-overflow-tooltip-ng1.component';
// import { ComponentsStaticTooltipNg1Component } from './sections/tooltips/static-tooltip-ng1/static-tooltip-ng1.component';
// import { ComponentsUiRouterNg1Component } from './sections/ui-router/ui-router-ng1/ui-router-ng1.component';
// import { ComponentsTreeViewNg1Component } from './sections/tree-view/tree-view-ng1/tree-view-ng1.component';
// import { ComponentsTreeViewCompanionViewNg1Component } from './sections/tree-view/tree-view-companion-view-ng1/tree-view-companion-view-ng1.component';
// import { ComponentsTreeGridNg1Component } from './sections/tree-view/tree-grid-ng1/tree-grid-ng1.component';
// import { ComponentsWizardNg1Component } from './sections/wizard/wizard-ng1/wizard-ng1.component';
// import { ComponentsWizardValidationNg1Component } from './sections/wizard/wizard-validation-ng1/wizard-validation-ng1.component';
// import { ComponentsVerticalWizardNg1Component } from './sections/wizard/vertical-wizard-ng1/vertical-wizard-ng1.component';
// import { ComponentsColorServiceNg1Component } from './sections/utilities/color-service-ng1/color-service-ng1.component';
// import { ComponentsForceFocusNg1Component } from './sections/utilities/force-focus-ng1/force-focus-ng1.component';
// import { ComponentsFocusOnShowNg1Component } from './sections/utilities/focus-on-show-ng1/focus-on-show-component';
// import { ComponentsExpandingContentNg1Component } from './sections/utilities/expanding-content-ng1/expanding-content-ng1.component';
// import { ComponentsPdfServiceNg1Component } from './sections/utilities/pdf-service-ng1/pdf-service-ng1.component';
// import { ComponentsSafeTimeoutNg1Component } from './sections/utilities/safe-timeout-ng1/safe-timeout-ng1.component';
// import { ComponentsSafeIntervalNg1Component } from './sections/utilities/safe-interval-ng1/safe-interval-ng1.component';
// import { ComponentsTimeAgoServiceNg1Component } from './sections/utilities/time-ago-service-ng1/time-ago-service-ng1.component';
// import { ComponentsListItemFilterNg1Component } from './sections/utilities/list-item-filter-ng1/list-item-filter-ng1.component';
// import { ComponentsWindowCommunicationServiceNg1Component } from './sections/utilities/window-communication-service-ng1/window-communication-service-ng1.component';
// import { ComponentsMarqueeWizardNg1Component } from './sections/wizard/marquee-wizard-ng1/marquee-wizard-ng1.component';
// import { ComponentsTreeGridAsynchronousLoadingNg1Component } from './sections/tree-view/tree-grid-asynchronous-loading-ng1/tree-grid-asynchronous-loading-ng1.component';
// import { ComponentsCheckboxNg1Component } from './sections/input-controls/checkbox-ng1/checkbox-ng1.component';
// import { ComponentsCustomDropdownNg1Component } from './sections/input-controls/custom-dropdown-ng1/custom-dropdown-ng1.component';
// import { ComponentsExpandingTextAreaNg1Component } from './sections/input-controls/expanding-text-area-ng1/expanding-text-area-ng1.component';
// import { ComponentsToggleSwitchNg1Component } from './sections/input-controls/toggle-switch-ng1/toggle-switch-ng1.component';
// import { ComponentsDatePickerNg1Component } from './sections/date-time-picker/date-picker-ng1/date-picker-ng1.component';
// import { ComponentsIntegratedDatePickerNg1Component } from './sections/date-time-picker/integrated-date-picker-ng1/integrated-date-picker-ng1.component';
// import { ComponentsDateRangePickerNg1Component } from './sections/date-time-picker/date-range-picker-ng1/date-range-picker-ng1.component';
// import { ComponentsTimePickerNg1Component } from './sections/date-time-picker/time-picker-ng1/time-picker-ng1.component';
// import { ComponentsNumberPickerNg1Component } from './sections/input-controls/number-picker-ng1/number-picker-ng1.component';
// import { ComponentsInlineDropdownNg1Component } from './sections/input-controls/inline-dropdown-ng1/inline-dropdown-ng1.component';
// import { ComponentsInputExpandNg1Component } from './sections/input-controls/input-expand-ng1/input-expand-ng1.component';
// import { ComponentsInputMaskNg1Component } from './sections/input-controls/input-mask-ng1/input-mask-ng1.component';
// import { ComponentsRadioButtonNg1Component } from './sections/input-controls/radio-button-ng1/radio-button-ng1.component';
// import { ComponentsSelectNg1Component } from './sections/select/select-ng1/select-ng1.component';
// import { ComponentsSingleSelectTableNg1Component } from './sections/select/single-select-table-ng1/single-select-table-ng1.component';
// import { ComponentsMultipleSelectTableNg1Component } from './sections/select/multiple-select-table-ng1/multiple-select-table-ng1.component';
// import { ComponentsTagsNg1Component } from './sections/input-controls/tags-ng1/tags-ng1.component';
// import { ComponentsSlidersNg1Component } from './sections/input-controls/sliders-ng1/sliders-ng1.component';
// import { ComponentsSliderChartsNg1Component } from './sections/input-controls/slider-charts-ng1/slider-charts-ng1.component';

// import { WrappersModule } from '../../wrappers.module';
// import { ResolverService } from '../../services/resolver/resolver.service';


// const COMPONENT_SECTIONS = [
//     ComponentsGroupedButtonsNg1Component,
//     ComponentsToggleButtonsNg1Component,
//     ComponentsFloatingActionButtonNg1Component,
//     ComponentsPaginationNg1Component,
//     ComponentsSingleToggleButtonNg1Component,
//     ComponentsCheckboxButtonsNg1Component,
//     ComponentsRadioButtonsNg1Component,
//     ComponentsDropdownNg1Component,
//     ComponentsThumbnailNg1Component,
//     ComponentsComponentListNg1Component,
//     ComponentsContactsNg1Component,
//     ComponentsContactsOverflowNg1Component,
//     ComponentsDraggableCardsNg1Component,
//     ComponentsDraggableCardsListViewNg1Component,
//     ComponentsDraggablePanelsNg1Component,
//     ComponentsDraggablePanelsViewsNg1Component,
//     ComponentsFacetsNg1Component,
//     ComponentsCustomFacetsNg1Component,
//     ComponentsDynamicFacetsNg1Component,
//     ComponentsCheckboxComponent,
//     ComponentsToggleSwitchComponent,
//     ComponentsEboxComponent,
//     ComponentsDetailRowResponsiveNg1Component,
//     ComponentsColumnVisibilityNg1Component,
//     ComponentsCustomResponsiveTableNg1Component,
//     ComponentsDetailRowHeaderNg1Component,
//     ComponentsDynamicFiltersNg1Component,
//     ComponentsFiltersNg1Component,
//     ComponentsFixedHeaderTableNg1Component,
//     ComponentsGroupingNg1Component,
//     ComponentsHoverActionsNg1Component,
//     ComponentsIndicesNg1Component,
//     ComponentsLayoutSwitchingNg1Component,
//     ComponentsListHoverActionsNg1Component,
//     ComponentsMultipleColumnSortingNg1Component,
//     ComponentsMultipleSelectActionsNg1Component,
//     ComponentsMultipleSelectionRowNg1Component,
//     ComponentsPreviewPaneNg1Component,
//     ComponentsPreviewPaneWindowNg1Component,
//     ComponentsReorderableTableNg1Component,
//     ComponentsSingleColumnSortingNg1Component,
//     ComponentsSortDirectionToggleNg1Component,
//     ComponentsSortingNg1Component,
//     ComponentsTraditionalMultipleSelectActionsNg1Component,
//     ComponentsFacetLineChartNg1Component,
//     ComponentsProgrammaticSelectionNg1Component,
//     ComponentsFileUploadNg1Component,
//     ComponentsFlippableCardsNg1Component,
//     ComponentsGridNg1Component,
//     ComponentsHelpCenterNg1Component,
//     ComponentsHierarchyBarNg1Component,
    
//     ComponentsHotkeysNg1Component,
//     ComponentsKeyboardServiceNg1Component,
//     ComponentsModalNg1Component,
//     ComponentsSquareModalNg1Component,
//     ComponentsMarqueeModalNg1Component,
//     ComponentsSideModalNg1Component,
//     ComponentsNotificationsNg1Component,
//     ComponentsNotificationListNg1Component,
//     ComponentsNotificationDropdownNg1Component,
//     ComponentsAlertStylesNg1Component,
//     ComponentsDismissableStylesNg1Component,
//     ComponentsCollapsiblePanelsNg1Component,
//     ComponentsItemDisplayPanelNg1Component,
//     ComponentsItemDisplayPanelServiceNg1Component,
//     ComponentsModalInsetPanelNg1Component,
//     ComponentsSideInsetPanelNg1Component,
//     ComponentsPopoverNg1Component,
//     ComponentsProgressBarNg1Component,
//     ComponentsCustomScrollbarNg1Component,
//     ComponentsInfiniteScrollNg1Component,
//     ComponentsInfiniteScrollLoadMoreNg1Component,
//     ComponentsSearchBuilderNg1Component,
//     ComponentsSearchHistoryNg1Component,
//     ComponentsSearchToolbarNg1Component,
//     ComponentsSplitterNg1Component,
//     ComponentsNestedSplitterNg1Component,
//     ComponentsLayoutSwitchingSplitterNg1Component,
//     ComponentsSideInsetPanelSplitterNg1Component,
//     ComponentsTabsNg1Component,
//     ComponentsDetailedTabExampleNg1Component,
//     ComponentsStackedTabsNg1Component,
//     ComponentsCardTabsNg1Component,
//     ComponentsTimelineNg1Component,
//     ComponentsTooltipsNg1Component,
//     ComponentsOverflowTooltipNg1Component,
//     ComponentsSingleLineOverflowTooltipNg1Component,
//     ComponentsStaticTooltipNg1Component,
//     ComponentsUiRouterNg1Component,
//     ComponentsTreeViewNg1Component,
//     ComponentsTreeViewCompanionViewNg1Component,
//     ComponentsTreeGridNg1Component,
//     ComponentsWizardNg1Component,
//     ComponentsWizardValidationNg1Component,
//     ComponentsVerticalWizardNg1Component,
//     ComponentsColorServiceNg1Component,
//     ComponentsForceFocusNg1Component,
//     ComponentsFocusOnShowNg1Component,
//     ComponentsExpandingContentNg1Component,
//     ComponentsPdfServiceNg1Component,
//     ComponentsSafeTimeoutNg1Component,
//     ComponentsSafeIntervalNg1Component,
//     ComponentsTimeAgoServiceNg1Component,
//     ComponentsListItemFilterNg1Component,
//     ComponentsWindowCommunicationServiceNg1Component,
//     ComponentsMarqueeWizardNg1Component,
//     ComponentsTreeGridAsynchronousLoadingNg1Component,
//     ComponentsCheckboxNg1Component,
//     ComponentsCustomDropdownNg1Component,
//     ComponentsExpandingTextAreaNg1Component,
//     ComponentsToggleSwitchNg1Component,
//     ComponentsDatePickerNg1Component,
//     ComponentsIntegratedDatePickerNg1Component,
//     ComponentsDateRangePickerNg1Component,
//     ComponentsTimePickerNg1Component,
//     ComponentsNumberPickerNg1Component,
//     ComponentsInlineDropdownNg1Component,
//     ComponentsInputExpandNg1Component,
//     ComponentsInputMaskNg1Component,
//     ComponentsRadioButtonNg1Component,
//     ComponentsSelectNg1Component,
//     ComponentsSingleSelectTableNg1Component,
//     ComponentsMultipleSelectTableNg1Component,
//     ComponentsTagsNg1Component,
//     ComponentsSlidersNg1Component,
//     ComponentsSliderChartsNg1Component,
// ];

// @NgModule({
//     imports: [
//         DocumentationComponentsModule,
//         TabsModule,
//         CommonModule,
//         FormsModule,
//         WrappersModule,
//         CheckboxModule, 
//         ToggleSwitchModule,
//         RouterModule.forChild(ResolverService.resolveRouteComponents(require('../../data/components-page.json')))
//     ],
//     exports: COMPONENT_SECTIONS,
//     declarations: COMPONENT_SECTIONS,
//     providers: [],
//     entryComponents: COMPONENT_SECTIONS
// })
// export class ComponentsPageModule {

//     constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
//         resolverService.registerResolver(componentFactoryResolver);
//     }
    
// }
