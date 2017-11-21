import { NgModule, Injector } from '@angular/core';

import { FlotComponent } from './components/flot.component';
import { NestedDonutComponent } from './components/nested-donut.component';
import { OrganizationChartComponent } from './components/organization-chart.component';
import { PartitionMapComponent } from './components/partition-map.component';
import { PeityBarChartComponent } from './components/peity-bar-chart.component';
import { PeityLineChartComponent } from './components/peity-line-chart.component';
import { PeityPieChartComponent } from './components/peity-pie-chart.component';
import { PeityUpdatingLineChartComponent } from './components/peity-updating-line-chart.component';
import { SankeyComponent } from './components/sankey.component';
import { SocialChartComponent } from './components/social-chart.component';
import { SparkChartComponent } from './components/spark-chart.component';
import { GroupedButtonsComponent } from './examples/buttons/grouped-buttons.component';
import { ToggleButtonsComponent } from './examples/buttons/toggle-buttons.component';
import { FloatingActionButtonComponent } from './examples/buttons/floating-action-button.component';
import { SingleToggleButtonComponent } from './examples/buttons/single-toggle-button.component';
import { CheckboxButtonsComponent } from './examples/buttons/checkbox-buttons.component';
import { RadioButtonsComponent } from './examples/buttons/radio-buttons.component';
import { PaginationComponent } from './examples/buttons/pagination.component';
import { DropdownComponent } from './examples/buttons/dropdowns.component';
import { ThumbnailComponent } from './examples/thumbnails/thumbnails.component';
import { ComponentListComponent } from './examples/component-list/component-list.component';
import { ContactsComponent } from './examples/contacts/contacts.component';
import { ContactsOverflowComponent } from './examples/contacts/contacts-overflow.component';
import { DraggableCardsComponent } from './examples/draggable-cards/draggable-cards.component';
import { DraggableCardsListViewComponent } from './examples/draggable-cards/draggable-cards-list.component';
import { DraggablePanelsComponent } from './examples/draggable-panels/draggable-panels.component';
import { DraggablePanelsViewsComponent } from './examples/draggable-panels/draggable-panels-views.component';
import { DetailRowHeaderComponent } from './examples/tables/detail-row-header.component';
import { DetailRowResponsiveComponent } from './examples/tables/detail-row-responsive.component';
import { FixedHeaderTableComponent } from './examples/tables/fixed-header-table.component';
import { HoverActionsComponent } from './examples/tables/hover-actions.component';
import { ReorderableTableComponent } from './examples/tables/reorderable-table.component';
import { SortToggleComponent } from './examples/tables/sort-toggle.component';
import { SingleColumnSortingComponent } from './examples/tables/single-column-sorting.component';
import { MultiColumnSortingComponent } from './examples/tables/multi-column-sorting.component';
import { PreviewPaneWindowComponent } from './examples/tables/preview-pane-window.component';
import { FacetLineChartComponent } from './examples/facets/facet-line-chart.component';
import { FileUploadComponent } from './examples/file-upload/file-upload.component';
import { FlippableCardsComponent } from './examples/flippable-cards/flippable-cards.component';
import { GridComponent } from './examples/tables/grid.component';
import { HierarchyBarComponent } from './examples/hierarchy-bar/hierarchy-bar.component';
import { HotkeysComponent } from './examples/hotkeys/hotkeys.component';
import { KeyboardServiceComponent } from './examples/hotkeys/keyboard-service.component';
import { ModalComponent } from './examples/modals/modal.component';
import { SquareModalComponent } from './examples/modals/square-modal.component';
import { MarqueeModalComponent } from './examples/modals/marquee-modal.component';
import { SideModalComponent } from './examples/modals/side-modal.component';
import { NotificationsComponent } from './examples/notifications/notifications.component';
import { NotificationListComponent } from './examples/notifications/notifications-list.component';
import { NotificationDropdownComponent } from './examples/notifications/notifications-dropdown.component';
import { AlertStylesComponent } from './examples/alerts/alert.component';
import { DismissableStylesComponent } from './examples/alerts/alert-dismissable.component';
import { CollapsiblePanelsComponent } from './examples/panels/collapsible-panels.component';
import { ItemDisplayPanelComponent } from './examples/panels/item-display-panel.component';
import { ModalInsetPanelComponent } from './examples/panels/modal-inset-panel.component';
import { PopoverComponent } from './examples/popover/popover.component';
import { ProgressBarComponent } from './examples/progress-bar/progress-bar.component';
import { CustomScrollbarComponent } from './examples/scrollbar/custom-scrollbar.component';
import { InfiniteScrollComponent } from './examples/scrollbar/infinite-scroll.component';
import { InfiniteScrollLoadMoreComponent } from './examples/scrollbar/infinite-scroll-load-more.component';
import { SearchBuilderComponent } from './examples/search-builder/search-builder.component';
import { SearchBuilderCodeComponent } from './examples/search-builder/search-builder-code.component';
import { SearchHistoryComponent } from './examples/search-builder/search-history.component';
import { SearchToolbarComponent } from './examples/search-builder/search-toolbar.component';
import { SplitterComponent } from './examples/splitter/splitter.component';
import { NestedSplitterComponent } from './examples/splitter/nested-splitter.component';
import { LayoutSwitchingSplitterComponent } from './examples/splitter/layout-switching-splitter.component';
import { SideInsetPanelSplitterComponent } from './examples/splitter/side-inset-splitter.component';
import { TabsComponent } from './examples/tabs/tabs.component';
import { DetailedTabComponent } from './examples/tabs/detailed-tabs.component';
import { StackedTabsComponent } from './examples/tabs/stacked-tabs.component';
import { CardTabsComponent } from './examples/tabs/card-tabs.component';
import { TimelineComponent } from './examples/timeline/timeline.component';
import { TooltipsComponent } from './examples/tooltips/tooltips.component';
import { OverflowTooltipComponent } from './examples/tooltips/overflow-tooltips.component';
import { SingleLineOverflowTooltipComponent } from './examples/tooltips/single-line-overflow-tooltip.component';
import { StaticTooltipComponent } from './examples/tooltips/static-tooltip.component';
import { TreeViewComponent } from './examples/tree-view/tree-view.component';
import { TreeViewCompanionViewComponent } from './examples/tree-view/tree-view-companion.component';
import { TreeGridComponent } from './examples/tree-view/tree-grid.component';
import { TreeGridAsynchronousLoadingComponent } from './examples/tree-view/tree-grid-async.component';
import { WizardComponent } from './examples/wizard/wizard.component';
import { WizardValidationComponent } from './examples/wizard/wizard-validation.component';
import { VerticalWizardComponent } from './examples/wizard/vertical-wizard.component';
import { ExpandingContentComponent } from './examples/utils/expanding-content.component';
import { PdfServiceComponent } from './examples/utils/pdf-service.component';
import { TimeAgoServiceComponent } from './examples/utils/time-ago-service';
import { ListItemFilterComponent } from './examples/utils/list-item-filter.component';
import { MarqueeWizardComponent } from './examples/wizard/marquee-wizard.component';
import { CustomResponsiveTableComponent } from './examples/tables/custom-responsive-table.component';
import { CheckboxComponent } from './examples/checkbox/checkbox.component';
import { CustomDropdownComponent } from './examples/dropdown/custom-dropdown.component';
import { ExpandingTextAreaComponent } from './examples/inputs/expanding-textarea.component';
import { ToggleSwitchComponent } from './examples/inputs/toggle-switch.component';
import { CustomToggleSwitchComponent } from './examples/inputs/custom-toggle-switch.component';
import { DatePickerComponent } from './examples/date-picker/date-picker.component';
import { IntegratedDatePickerComponent } from './examples/date-picker/integrated-date-picker.component';
import { DateRangePickerComponent } from './examples/date-picker/date-range-picker.component';
import { TimePickerComponent } from './examples/date-picker/time-picker.component';
import { NumberPickerComponent } from './examples/inputs/number-picker.component';
import { InlineDropdownComponent } from './examples/dropdown/inline-dropdown.component';
import { InputExpandComponent } from './examples/inputs/input-expand.component';
import { InputMaskComponent } from './examples/inputs/input-mask.component';
import { RadioButtonComponent } from './examples/inputs/radio-buttons.component';
import { SelectComponent } from './examples/select/select.component';
import { SingleSelectTableComponent } from './examples/select/single-select.component';
import { MultipleSelectTableComponent } from './examples/select/multiple-select.component';
import { TagsComponent } from './examples/tags/tags.component';
import { TagsCustomComponent } from './examples/tags/tags-custom.component';
import { TagsAutocompleteComponent } from './examples/tags/tags-autocomplete.component';
import { SlidersComponent } from './examples/sliders/sliders.component';
import { SliderChartsComponent } from './examples/sliders/slider-charts.component';
import { NavigationComponent } from './examples/navigation/navigation.component';
import { FormValidationFieldByFieldComponent } from './examples/forms/form-validation-by-field.component';
import { FormValidationOnSubmitComponent } from './examples/forms/form-validation-on-submit.component';
import { FloatLabelsComponent } from './examples/forms/float-labels.component';
import { AppNavigatorComponent } from './examples/popover/app-navigator.component';

const WRAPPERS: any[] = [

    // Components
    FlotComponent,
    NestedDonutComponent,
    OrganizationChartComponent,
    PartitionMapComponent,
    PeityBarChartComponent,
    PeityLineChartComponent,
    PeityPieChartComponent,
    PeityUpdatingLineChartComponent,
    SankeyComponent,
    SocialChartComponent,
    SparkChartComponent,

    // Examples
    GroupedButtonsComponent,
    ToggleButtonsComponent,
    FloatingActionButtonComponent,
    SingleToggleButtonComponent,
    CheckboxButtonsComponent,
    RadioButtonsComponent,
    PaginationComponent,
    DropdownComponent,
    ThumbnailComponent,
    ComponentListComponent,
    ContactsComponent,
    ContactsOverflowComponent,
    DraggableCardsComponent,
    DraggableCardsListViewComponent,
    DraggablePanelsComponent,
    DraggablePanelsViewsComponent,
    DetailRowHeaderComponent,
    DetailRowResponsiveComponent,
    FixedHeaderTableComponent,
    HoverActionsComponent,
    ReorderableTableComponent,
    SortToggleComponent,
    SingleColumnSortingComponent,
    MultiColumnSortingComponent,
    PreviewPaneWindowComponent,
    FacetLineChartComponent,
    FileUploadComponent,
    FlippableCardsComponent,
    GridComponent,
    HierarchyBarComponent,
    HotkeysComponent,
    KeyboardServiceComponent,
    ModalComponent,
    SquareModalComponent,
    MarqueeModalComponent,
    SideModalComponent,
    NotificationsComponent,
    NotificationListComponent,
    NotificationDropdownComponent,
    AlertStylesComponent,
    DismissableStylesComponent,
    CollapsiblePanelsComponent,
    ItemDisplayPanelComponent,
    ModalInsetPanelComponent,
    PopoverComponent,
    ProgressBarComponent,
    CustomScrollbarComponent,
    InfiniteScrollComponent,
    InfiniteScrollLoadMoreComponent,
    SearchBuilderComponent,
    SearchBuilderCodeComponent,
    SearchHistoryComponent,
    SearchToolbarComponent,
    SplitterComponent,
    NestedSplitterComponent,
    LayoutSwitchingSplitterComponent,
    SideInsetPanelSplitterComponent,
    TabsComponent,
    DetailedTabComponent,
    StackedTabsComponent,
    CardTabsComponent,
    TimelineComponent,
    TooltipsComponent,
    OverflowTooltipComponent,
    SingleLineOverflowTooltipComponent,
    StaticTooltipComponent,
    TreeViewComponent,
    TreeViewCompanionViewComponent,
    TreeGridComponent,
    TreeGridAsynchronousLoadingComponent,
    WizardComponent,
    WizardValidationComponent,
    VerticalWizardComponent,
    MarqueeWizardComponent,
    ExpandingContentComponent,
    PdfServiceComponent,
    TimeAgoServiceComponent,
    ListItemFilterComponent,
    CustomResponsiveTableComponent,
    CheckboxComponent,
    CustomDropdownComponent,
    ExpandingTextAreaComponent,
    ToggleSwitchComponent,
    CustomToggleSwitchComponent,
    DatePickerComponent,
    IntegratedDatePickerComponent,
    DateRangePickerComponent,
    TimePickerComponent,
    NumberPickerComponent,
    InlineDropdownComponent,
    InputExpandComponent,
    InputMaskComponent,
    RadioButtonComponent,
    SelectComponent,
    SingleSelectTableComponent,
    MultipleSelectTableComponent,
    TagsComponent,
    TagsCustomComponent,
    TagsAutocompleteComponent,
    SlidersComponent,
    SliderChartsComponent,
    NavigationComponent,
    FormValidationFieldByFieldComponent,
    FormValidationOnSubmitComponent,
    FloatLabelsComponent,
    AppNavigatorComponent
];

@NgModule({
    exports: WRAPPERS,
    declarations: WRAPPERS,
    providers: [
        {
            provide: 'flotDataService',
            useFactory: (injector: Injector) => injector.get('flotDataService'),
            deps: ['$injector']
        },
        {
            provide: 'lineDataService',
            useFactory: (injector: Injector) => injector.get('lineDataService'),
            deps: ['$injector']
        }
    ],
})
export class WrappersModule { }
