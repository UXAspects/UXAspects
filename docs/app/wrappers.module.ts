import { NgModule } from '@angular/core';

import { upgradeAdapter } from './app.module';

// Import dependant controllers
import './pages/charts/sections/partition-map/partition-map-ng1/popover/popover.controller';

// Import Wrappers
import './pages/css/sections/forms/form-validation-field-by-field/wrapper/form-validation-field-by-field-wrapper.directive';
import './pages/css/sections/forms/form-validation-on-submit/wrapper/form-validation-on-submit-wrapper.directive';
import './pages/css/sections/text-inputs/float-labels/wrapper/float-labels-wrapper.directive';

import './pages/components/sections/buttons/checkbox-buttons-ng1/wrapper/checkbox-buttons-wrapper.directive';
import './pages/components/sections/buttons/dropdown-ng1/wrapper/dropdown-wrapper.directive';
import './pages/components/sections/buttons/floating-action-button-ng1/wrapper/floating-action-button-wrapper.directive';
import './pages/components/sections/buttons/grouped-buttons-ng1/wrapper/grouped-buttons-wrapper.directive';
import './pages/components/sections/buttons/pagination-ng1/wrapper/pagination-wrapper.directive.ts';
import './pages/components/sections/buttons/radio-buttons-ng1/wrapper/radio-buttons-wrapper.directive';
import './pages/components/sections/buttons/single-toggle-button-ng1/wrapper/single-toggle-button-wrapper.directive';
import './pages/components/sections/buttons/thumbnail-ng1/wrapper/thumbnail-wrapper.directive';
import './pages/components/sections/buttons/toggle-buttons-ng1/wrapper/toggle-buttons-wrapper.directive';
import './pages/components/sections/component-list/component-list-ng1/wrapper/component-list-wrapper.directive';
import './pages/components/sections/contacts/contacts-ng1/wrapper/contacts-wrapper.directive';
import './pages/components/sections/contacts/contacts-overflow-ng1/wrapper/contacts-overflow-wrapper.directive';
import './pages/components/sections/draggable-cards/draggable-cards-ng1/wrapper/draggable-cards-wrapper.directive';
import './pages/components/sections/draggable-cards/draggable-cards-list-view-ng1/wrapper/draggable-cards-list-view-wrapper.directive';
import './pages/components/sections/draggable-panels/draggable-panels-ng1/wrapper/draggable-panels-wrapper.directive';
import './pages/components/sections/draggable-panels/draggable-panels-views-ng1/wrapper/draggable-panels-views-wrapper.directive';
import './pages/components/sections/keyboard/hotkeys-ng1/wrapper/hotkeys-wrapper.directive';
import './pages/components/sections/keyboard/keyboard-service-ng1/wrapper/keyboard-service-wrapper.directive';
import './pages/components/sections/modals/modal-ng1/wrapper/modal-wrapper.directive';
import './pages/components/sections/modals/marquee-modal-ng1/wrapper/marquee-modal-wrapper.directive';
import './pages/components/sections/modals/side-modal-ng1/wrapper/side-modal-wrapper.directive';
import './pages/components/sections/modals/square-modal-ng1/wrapper/square-modal-wrapper.directive';
import './pages/components/sections/notifications/alert-styles-ng1/wrapper/alert-styles-wrapper.directive';
import './pages/components/sections/notifications/dismissable-styles-ng1/wrapper/dismissable-styles-wrapper.directive';
import './pages/components/sections/notifications/notification-dropdown-ng1/wrapper/notification-dropdown-wrapper.directive';
import './pages/components/sections/notifications/notification-list-ng1/wrapper/notification-list-wrapper.directive';
import './pages/components/sections/notifications/notifications-ng1/wrapper/notifications-wrapper.directive';
import './pages/components/sections/panels/collapsible-panels-ng1/wrapper/collapsible-panels-wrapper.directive';
import './pages/components/sections/panels/item-display-panel-ng1/wrapper/item-display-panel-wrapper.directive';
import './pages/components/sections/panels/modal-inset-panel-ng1/wrapper/modal-inset-panel-wrapper.directive';
import './pages/components/sections/popover/popover-ng1/wrapper/popover-wrapper.directive';
import './pages/components/sections/progress/progress-bar-ng1/wrapper/progress-bar-wrapper.directive';
import './pages/components/sections/scrollbar/custom-scrollbar-ng1/wrapper/custom-scrollbar-wrapper.directive';
import './pages/components/sections/scrollbar/infinite-scroll-load-more-ng1/wrapper/infinite-scroll-load-more-wrapper.directive';
import './pages/components/sections/scrollbar/infinite-scroll-ng1/wrapper/infinite-scroll-wrapper.directive';
import './pages/components/sections/search/search-builder-ng1/wrapper/search-builder-code-wrapper.directive';
import './pages/components/sections/search/search-builder-ng1/wrapper/search-builder-wrapper.directive';
import './pages/components/sections/search/search-history-ng1/wrapper/search-history-wrapper.directive';
import './pages/components/sections/search/search-toolbar-ng1/wrapper/search-toolbar-wrapper.directive';
import './pages/components/sections/side-navigation/navigation/wrapper/navigation-wrapper.directive';
import './pages/components/sections/side-navigation/navigation/wrapper/boldify.directive';
import './pages/components/sections/side-navigation/app-navigator/wrapper/app-navigator-wrapper.directive';
import './pages/components/sections/splitter/layout-switching-splitter-ng1/wrapper/layout-switching-splitter-wrapper.directive';
import './pages/components/sections/splitter/nested-splitter-ng1/wrapper/nested-splitter-wrapper.directive';
import './pages/components/sections/splitter/side-inset-panel-splitter-ng1/wrapper/side-inset-panel-splitter-wrapper.directive';
import './pages/components/sections/splitter/splitter-ng1/wrapper/splitter-wrapper.directive';

import './pages/components/sections/tables/detail-row-header-ng1/wrapper/service/detail-row-data.service';
import './pages/components/sections/tables/detail-row-header-ng1/wrapper/detail-row-header-wrapper.directive';
import './pages/components/sections/tables/detail-row-responsive-ng1/wrapper/detail-row-responsive-wrapper.directive';
import './pages/components/sections/tables/fixed-header-table-ng1/wrapper/fixed-header-table-wrapper.directive';
import './pages/components/sections/tables/hover-actions-ng1/wrapper/hover-actions-wrapper.directive';
import './pages/components/sections/tables/reorderable-table-ng1/wrapper/reorderable-table-wrapper.directive';
import './pages/components/sections/tables/sort-direction-toggle-ng1/wrapper/sort-toggle-wrapper.directive';
import './pages/components/sections/tables/single-column-sorting-ng1/wrapper/single-column-sorting-wrapper.directive';
import './pages/components/sections/tables/multiple-column-sorting-ng1/wrapper/multi-column-sorting-wrapper.directive';
import './pages/components/sections/tables/preview-pane-window-ng1/wrapper/preview-pane-window-wrapper.directive';
import './pages/components/sections/facets/facet-line-chart-ng1/wrapper/facet-line-chart-ng1-wrapper';
import './pages/components/sections/file-upload/file-upload-ng1/wrapper/file-upload-wrapper.directive';
import './pages/components/sections/flippable-cards/flippable-cards-ng1/wrapper/flippable-cards-wrapper.directive';
import './pages/components/sections/grid/grid-ng1/wrapper/grid-wrapper.directive';
import './pages/components/sections/hierarchy-bar/hierarchy-bar-ng1/wrapper/hierarchy-bar-wrapper.directive';
import './pages/components/sections/tabs/tabs-ng1/wrapper/tabs-wrapper.directive';
import './pages/components/sections/tabs/detailed-tab-example-ng1/wrapper/detailed-tab-wrapper.directive';
import './pages/components/sections/tabs/stacked-tabs-ng1/wrapper/stacked-tabs-wrapper.directive';
import './pages/components/sections/tabs/card-tabs-ng1/wrapper/card-tabs-wrapper.directive';
import './pages/components/sections/timeline/timeline-ng1/wrapper/timeline-wrapper.directive';
import './pages/components/sections/tooltips/tooltips-ng1/wrapper/tooltips-wrapper.directive';
import './pages/components/sections/tooltips/overflow-tooltip-ng1/wrapper/overflow-tooltip-wrapper.directive';
import './pages/components/sections/tooltips/single-line-overflow-tooltip-ng1/wrapper/single-line-overflow-tooltip-wrapper.directive';
import './pages/components/sections/tooltips/static-tooltip-ng1/wrapper/static-tooltip-wrapper.directive';
import './pages/components/sections/tree-view/tree-view-ng1/wrapper/tree-view-wrapper.directive';
import './pages/components/sections/tree-view/tree-view-companion-view-ng1/wrapper/tree-view-companion-view-wrapper.directive';
import './pages/components/sections/tree-view/tree-grid-ng1/wrapper/tree-grid-wrapper.directive';
import './pages/components/sections/wizard/wizard-ng1/wrapper/wizard-wrapper.directive';
import './pages/components/sections/wizard/wizard-validation-ng1/wrapper/wizard-validation-wrapper.directive';
import './pages/components/sections/wizard/vertical-wizard-ng1/wrapper/vertical-wizard-wrapper.directive';
import './pages/components/sections/utilities/expanding-content-ng1/wrapper/expanding-content-wrapper.directive';
import './pages/components/sections/utilities/pdf-service-ng1/wrapper/pdf-service-wrapper.directive';
import './pages/components/sections/utilities/time-ago-service-ng1/wrapper/time-ago-service-wrapper.directive';
import './pages/components/sections/utilities/list-item-filter-ng1/wrapper/list-item-filter-wrapper.directive';
import './pages/components/sections/wizard/marquee-wizard-ng1/wrapper/marquee-wizard-wrapper.directive';
import './pages/components/sections/tree-view/tree-grid-asynchronous-loading-ng1/wrapper/tree-grid-asynchronous-loading-wrapper.directive';
import './pages/components/sections/tables/custom-responsive-table-ng1/wrapper/custom-responsive-wrapper.directive';
import './pages/components/sections/input-controls/checkbox-ng1/wrapper/checkbox-wrapper.directive';
import './pages/components/sections/input-controls/custom-dropdown-ng1/wrapper/custom-dropdown-wrapper.directive';
import './pages/components/sections/input-controls/expanding-text-area-ng1/wrapper/expanding-text-area-wrapper.directive';
import './pages/components/sections/input-controls/toggle-switch-ng1/wrapper/toggle-switch-wrapper.directive';
import './pages/components/sections/input-controls/toggle-switch-ng1/wrapper/custom-toggle-switch-wrapper.directive';
import './pages/components/sections/date-time-picker/date-picker-ng1/wrapper/date-picker-wrapper.directive';
import './pages/components/sections/date-time-picker/integrated-date-picker-ng1/wrapper/integrated-date-picker-wrapper.directive';
import './pages/components/sections/date-time-picker/time-picker-ng1/wrapper/time-picker-wrapper.directive';
import './pages/components/sections/input-controls/number-picker-ng1/wrapper/number-picker-wrapper.directive';
import './pages/components/sections/input-controls/inline-dropdown-ng1/wrapper/inline-dropdown-wrapper.directive';
import './pages/components/sections/input-controls/input-expand-ng1/wrapper/input-expand-wrapper.directive';
import './pages/components/sections/input-controls/input-mask-ng1/wrapper/input-mask-wrapper.directive';
import './pages/components/sections/input-controls/radio-button-ng1/wrapper/radio-button-wrapper.directive';
import './pages/components/sections/select/select-ng1/wrapper/select-wrapper.directive';
import './pages/components/sections/select/single-select-table-ng1/wrapper/single-select-table-wrapper.directive';
import './pages/components/sections/select/multiple-select-table-ng1/wrapper/multiple-select-table-wrapper.directive';
import './pages/components/sections/input-controls/tags-ng1/wrapper/tags-wrapper.directive';
import './pages/components/sections/input-controls/tags-ng1/wrapper/tags-custom-wrapper.directive';
import './pages/components/sections/input-controls/tags-ng1/wrapper/tags-autocomplete-wrapper.directive';
import './pages/components/sections/input-controls/sliders-ng1/wrapper/sliders-wrapper.directive';
import './pages/components/sections/input-controls/slider-charts-ng1/wrapper/slider-charts-wrapper.directive';
import './pages/components/sections/date-time-picker/date-range-picker-ng1/wrapper/date-range-picker-wrapper.directive';


const WRAPPERS = [
    upgradeAdapter.upgradeNg1Component('uxFlotNg1'),
    upgradeAdapter.upgradeNg1Component('uxPeityLineChartNg1'),
    upgradeAdapter.upgradeNg1Component('uxPeityBarChartNg1'),
    upgradeAdapter.upgradeNg1Component('uxPeityPieChartNg1'),
    upgradeAdapter.upgradeNg1Component('uxPeityUpdatingLineChartNg1'),
    upgradeAdapter.upgradeNg1Component('uxNestedDonutNg1'),
    upgradeAdapter.upgradeNg1Component('uxOrganizationChartNg1'),
    upgradeAdapter.upgradeNg1Component('uxSparkNg1'),
    upgradeAdapter.upgradeNg1Component('uxPartitionMapNg1'),
    upgradeAdapter.upgradeNg1Component('uxSankeyNg1'),
    upgradeAdapter.upgradeNg1Component('uxSocialChartNg1'),
    upgradeAdapter.upgradeNg1Component('uxContactGroupNg1'),
    upgradeAdapter.upgradeNg1Component('uxScrollPaneNg1'),

    /*
        CSS Wrappers
    */
    upgradeAdapter.upgradeNg1Component('uxdNavigationWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdFormValidationFieldByFieldWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdFormValidationOnSubmitWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdFloatLabelsWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdAppNavigatorWrapper'),

    /*
        Components Wrapper
    */
    upgradeAdapter.upgradeNg1Component('uxdGroupedButtonsWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdToggleButtonsWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdFloatingActionButtonWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdPaginationWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdSingleToggleButtonWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdCheckboxButtonsWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdRadioButtonsWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdDropdownWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdThumbnailWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdComponentListWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdContactsWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdContactsOverflowWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdDraggableCardsWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdDraggableCardsListViewWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdDraggablePanelsWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdDraggablePanelsViewsWrapper'),

    upgradeAdapter.upgradeNg1Component('uxdDetailRowHeaderWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdDetailRowResponsiveWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdFixedHeaderTableWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdHoverActionsWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdReorderableTableWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdSortToggleWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdSingleColumnSortingWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdMultiColumnSortingWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdPreviewPaneWindowWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdDetailRowHeaderWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdPreviewPaneWindowWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdFacetLineChartWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdFileUploadWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdFlippableCardsWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdGridWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdHierarchyBarWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdHotkeysWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdKeyboardServiceWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdModalWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdSquareModalWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdMarqueeModalWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdSideModalWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdNotificationsWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdNotificationListWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdNotificationDropdownWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdAlertStylesWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdDismissableStylesWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdCollapsiblePanelsWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdItemDisplayPanelWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdModalInsetPanelWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdPopoverWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdProgressBarWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdCustomScrollbarWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdInfiniteScrollWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdInfiniteScrollLoadMoreWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdSearchBuilderWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdSearchBuilderCodeWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdSearchHistoryWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdSearchToolbarWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdSplitterWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdNestedSplitterWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdLayoutSwitchingSplitterWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdSideInsetPanelSplitterWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdTabsWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdDetailedTabWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdStackedTabsWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdCardTabsWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdTimelineWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdTooltipsWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdOverflowTooltipWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdSingleLineOverflowTooltipWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdStaticTooltipWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdTreeViewWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdTreeViewCompanionViewWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdTreeGridWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdTreeGridAsynchronousLoadingWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdWizardWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdWizardValidationWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdVerticalWizardWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdExpandingContentWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdPdfServiceWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdTimeAgoServiceWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdListItemFilterWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdMarqueeWizardWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdCustomResponsiveTableWrapper'),

    upgradeAdapter.upgradeNg1Component('uxdCheckboxWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdCustomDropdownWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdExpandingTextAreaWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdToggleSwitchWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdCustomToggleSwitchWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdDatePickerWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdIntegratedDatePickerWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdDateRangePickerWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdTimePickerWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdNumberPickerWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdInlineDropdownWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdInputExpandWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdInputMaskWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdRadioButtonWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdSelectWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdSingleSelectTableWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdMultipleSelectTableWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdTagsWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdTagsCustomWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdTagsAutocompleteWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdSlidersWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdSliderChartsWrapper'),
];

@NgModule({
    imports: [],
    exports: WRAPPERS,
    declarations: WRAPPERS,
    providers: [],
})
export class WrappersModule { }
