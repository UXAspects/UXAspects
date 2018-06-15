import { Injector, NgModule } from '@angular/core';

import '../pages/charts/charts-sections/partition-map/partition-map-ng1/popover/popover.controller';
import { AlertStylesComponent } from './examples/alerts/alert.component';
import { AppNavigatorComponent } from './examples/popover/app-navigator.component';
import { CardTabsComponent } from './examples/tabs/card-tabs.component';
import { CheckboxButtonsComponent } from './examples/buttons/checkbox-buttons.component';
import { CheckboxComponent } from './examples/checkbox/checkbox.component';
import { AccordionNg1Component } from './examples/panels/accordion.component';
import { ComponentListComponent } from './examples/component-list/component-list.component';
import { ContactsComponent } from './examples/contacts/contacts.component';
import { ContactsOverflowComponent } from './examples/contacts/contacts-overflow.component';
import { CustomDropdownComponent } from './examples/dropdown/custom-dropdown.component';
import { CustomResponsiveTableComponent } from './examples/tables/custom-responsive-table.component';
import { CustomScrollbarComponent } from './examples/scrollbar/custom-scrollbar.component';
import { CustomToggleSwitchComponent } from './examples/inputs/custom-toggle-switch.component';
import { DatePickerComponent } from './examples/date-picker/date-picker.component';
import { DateRangePickerComponent } from './examples/date-picker/date-range-picker.component';
import { DetailedTabComponent } from './examples/tabs/detailed-tabs.component';
import { DetailRowHeaderComponent } from './examples/tables/detail-row-header.component';
import { DetailRowResponsiveComponent } from './examples/tables/detail-row-responsive.component';
import { DismissableStylesComponent } from './examples/alerts/alert-dismissable.component';
import { DraggableCardsComponent } from './examples/drag-and-drop/draggable-cards.component';
import { DraggableCardsListViewComponent } from './examples/drag-and-drop/draggable-cards-list.component';
import { DraggablePanelsComponent } from './examples/drag-and-drop/draggable-panels.component';
import { DraggablePanelsViewsComponent } from './examples/drag-and-drop/draggable-panels-views.component';
import { DropdownComponent } from './examples/buttons/dropdowns.component';
import { ExpandingContentComponent } from './examples/utils/expanding-content.component';
import { ExpandingTextAreaComponent } from './examples/inputs/expanding-textarea.component';
import { FacetLineChartComponent } from './examples/facets/facet-line-chart.component';
import { FileUploadComponent } from './examples/file-upload/file-upload.component';
import { FixedHeaderTableComponent } from './examples/tables/fixed-header-table.component';
import { FlippableCardsComponent } from './examples/flippable-cards/flippable-cards.component';
import { FloatLabelsComponent } from './examples/forms/float-labels.component';
import { FormValidationFieldByFieldComponent } from './examples/forms/form-validation-by-field.component';
import { FormValidationOnSubmitComponent } from './examples/forms/form-validation-on-submit.component';
import { GridComponent } from './examples/tables/grid.component';
import { GroupedButtonsComponent } from './examples/buttons/grouped-buttons.component';
import { HierarchyBarComponent } from './examples/hierarchy-bar/hierarchy-bar.component';
import { HotkeysComponent } from './examples/hotkeys/hotkeys.component';
import { HoverActionsComponent } from './examples/tables/hover-actions.component';
import { InfiniteScrollComponent } from './examples/scrollbar/infinite-scroll.component';
import { InfiniteScrollLoadMoreComponent } from './examples/scrollbar/infinite-scroll-load-more.component';
import { InlineDropdownComponent } from './examples/dropdown/inline-dropdown.component';
import { InputExpandComponent } from './examples/inputs/input-expand.component';
import { InputMaskComponent } from './examples/inputs/input-mask.component';
import { IntegratedDatePickerComponent } from './examples/date-picker/integrated-date-picker.component';
import { ItemDisplayPanelComponent } from './examples/panels/item-display-panel.component';
import { KeyboardServiceComponent } from './examples/hotkeys/keyboard-service.component';
import { LayoutSwitchingSplitterComponent } from './examples/splitter/layout-switching-splitter.component';
import { ListItemFilterComponent } from './examples/utils/list-item-filter.component';
import { MarqueeModalComponent } from './examples/modals/marquee-modal.component';
import { MarqueeWizardComponent } from './examples/wizard/marquee-wizard.component';
import { ModalComponent } from './examples/modals/modal.component';
import { ModalInsetPanelComponent } from './examples/panels/modal-inset-panel.component';
import { MultiColumnSortingComponent } from './examples/tables/multi-column-sorting.component';
import { MultipleSelectTableComponent } from './examples/select/multiple-select.component';
import { NavigationComponent } from './examples/navigation/navigation.component';
import { NestedSplitterComponent } from './examples/splitter/nested-splitter.component';
import { NotificationDropdownComponent } from './examples/notifications/notifications-dropdown.component';
import { NotificationListComponent } from './examples/notifications/notifications-list.component';
import { NotificationsComponent } from './examples/notifications/notifications.component';
import { NumberPickerComponent } from './examples/inputs/number-picker.component';
import { OverflowTooltipComponent } from './examples/tooltips/overflow-tooltips.component';
import { PaginationComponent } from './examples/buttons/pagination.component';
import { PdfServiceComponent } from './examples/utils/pdf-service.component';
import { PopoverComponent } from './examples/popover/popover.component';
import { PreviewPaneWindowComponent } from './examples/tables/preview-pane-window.component';
import { ProgressBarComponent } from './examples/progress-bar/progress-bar.component';
import { RadioButtonComponent } from './examples/inputs/radio-buttons.component';
import { RadioButtonsComponent } from './examples/buttons/radio-buttons.component';
import { ReorderableTableComponent } from './examples/tables/reorderable-table.component';
import { ScrollableTableComponent } from './examples/tables/scrollable-table.component';
import { SearchBuilderCodeComponent } from './examples/search-builder/search-builder-code.component';
import { SearchBuilderComponent } from './examples/search-builder/search-builder.component';
import { SearchHistoryComponent } from './examples/search-builder/search-history.component';
import { SearchToolbarComponent } from './examples/search-builder/search-toolbar.component';
import { SelectComponent } from './examples/select/select.component';
import { SideInsetPanelSplitterComponent } from './examples/splitter/side-inset-splitter.component';
import { SideModalComponent } from './examples/modals/side-modal.component';
import { SingleColumnSortingComponent } from './examples/tables/single-column-sorting.component';
import { SingleLineOverflowTooltipComponent } from './examples/tooltips/single-line-overflow-tooltip.component';
import { SingleSelectTableComponent } from './examples/select/single-select.component';
import { SingleToggleButtonComponent } from './examples/buttons/single-toggle-button.component';
import { SliderChartsComponent } from './examples/sliders/slider-charts.component';
import { SlidersComponent } from './examples/sliders/sliders.component';
import { SortToggleComponent } from './examples/tables/sort-toggle.component';
import { SparkChartComponent } from './components/spark-chart.component';
import { SplitterComponent } from './examples/splitter/splitter.component';
import { SquareModalComponent } from './examples/modals/square-modal.component';
import { StackedTabsComponent } from './examples/tabs/stacked-tabs.component';
import { StaticTooltipComponent } from './examples/tooltips/static-tooltip.component';
import { TabsComponent } from './examples/tabs/tabs.component';
import { TagsAutocompleteComponent } from './examples/tags/tags-autocomplete.component';
import { TagsComponent } from './examples/tags/tags.component';
import { TagsCustomComponent } from './examples/tags/tags-custom.component';
import { ThumbnailComponent } from './examples/thumbnails/thumbnails.component';
import { TimeAgoServiceComponent } from './examples/utils/time-ago-service';
import { TimelineComponent } from './examples/timeline/timeline.component';
import { TimePickerComponent } from './examples/date-picker/time-picker.component';
import { ToggleButtonsComponent } from './examples/buttons/toggle-buttons.component';
import { ToggleSwitchComponent } from './examples/inputs/toggle-switch.component';
import { TooltipsComponent } from './examples/tooltips/tooltips.component';
import { TreeGridAsynchronousLoadingComponent } from './examples/tree-view/tree-grid-async.component';
import { TreeGridComponent } from './examples/tree-view/tree-grid.component';
import { TreeViewCompanionViewComponent } from './examples/tree-view/tree-view-companion.component';
import { TreeViewComponent } from './examples/tree-view/tree-view.component';
import { VerticalWizardComponent } from './examples/wizard/vertical-wizard.component';
import { WizardComponent } from './examples/wizard/wizard.component';
import { WizardValidationComponent } from './examples/wizard/wizard-validation.component';


const WRAPPERS: any[] = [
    SparkChartComponent,
    AlertStylesComponent,
    AppNavigatorComponent,
    CardTabsComponent,
    CheckboxButtonsComponent,
    CheckboxComponent,
    AccordionNg1Component,
    ComponentListComponent,
    ContactsComponent,
    ContactsOverflowComponent,
    CustomDropdownComponent,
    CustomResponsiveTableComponent,
    CustomScrollbarComponent,
    CustomToggleSwitchComponent,
    DatePickerComponent,
    DateRangePickerComponent,
    DetailRowHeaderComponent,
    DetailRowResponsiveComponent,
    DetailedTabComponent,
    DismissableStylesComponent,
    DraggableCardsComponent,
    DraggableCardsListViewComponent,
    DraggablePanelsComponent,
    DraggablePanelsViewsComponent,
    DropdownComponent,
    ExpandingContentComponent,
    ExpandingTextAreaComponent,
    FacetLineChartComponent,
    FileUploadComponent,
    FixedHeaderTableComponent,
    FlippableCardsComponent,
    FloatLabelsComponent,
    FormValidationFieldByFieldComponent,
    FormValidationOnSubmitComponent,
    GridComponent,
    GroupedButtonsComponent,
    HierarchyBarComponent,
    HotkeysComponent,
    HoverActionsComponent,
    InfiniteScrollComponent,
    InfiniteScrollLoadMoreComponent,
    InlineDropdownComponent,
    InputExpandComponent,
    InputMaskComponent,
    IntegratedDatePickerComponent,
    ItemDisplayPanelComponent,
    KeyboardServiceComponent,
    LayoutSwitchingSplitterComponent,
    ListItemFilterComponent,
    MarqueeModalComponent,
    MarqueeWizardComponent,
    ModalComponent,
    ModalInsetPanelComponent,
    MultiColumnSortingComponent,
    MultipleSelectTableComponent,
    NavigationComponent,
    NestedSplitterComponent,
    NotificationDropdownComponent,
    NotificationListComponent,
    NotificationsComponent,
    NumberPickerComponent,
    OverflowTooltipComponent,
    PaginationComponent,
    PdfServiceComponent,
    PopoverComponent,
    PreviewPaneWindowComponent,
    ProgressBarComponent,
    RadioButtonComponent,
    RadioButtonsComponent,
    ReorderableTableComponent,
    ScrollableTableComponent,
    SearchBuilderCodeComponent,
    SearchBuilderComponent,
    SearchHistoryComponent,
    SearchToolbarComponent,
    SelectComponent,
    SideInsetPanelSplitterComponent,
    SideModalComponent,
    SingleColumnSortingComponent,
    SingleLineOverflowTooltipComponent,
    SingleSelectTableComponent,
    SingleToggleButtonComponent,
    SliderChartsComponent,
    SlidersComponent,
    SortToggleComponent,
    SplitterComponent,
    SquareModalComponent,
    StackedTabsComponent,
    StaticTooltipComponent,
    TabsComponent,
    TagsAutocompleteComponent,
    TagsComponent,
    TagsCustomComponent,
    ThumbnailComponent,
    TimeAgoServiceComponent,
    TimePickerComponent,
    TimelineComponent,
    ToggleButtonsComponent,
    ToggleSwitchComponent,
    TooltipsComponent,
    TreeGridAsynchronousLoadingComponent,
    TreeGridComponent,
    TreeViewCompanionViewComponent,
    TreeViewComponent,
    VerticalWizardComponent,
    WizardComponent,
    WizardValidationComponent,
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
