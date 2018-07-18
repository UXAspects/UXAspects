import { Injector, NgModule } from '@angular/core';
import '../pages/charts/charts-sections/partition-map/partition-map-ng1/popover/popover.controller';
import { SparkChartComponent } from './components/spark-chart.component';
import { DismissableStylesComponent } from './examples/alerts/alert-dismissable.component';
import { AlertStylesComponent } from './examples/alerts/alert.component';
import { CheckboxButtonsComponent } from './examples/buttons/checkbox-buttons.component';
import { DropdownComponent } from './examples/buttons/dropdowns.component';
import { GroupedButtonsComponent } from './examples/buttons/grouped-buttons.component';
import { PaginationComponent } from './examples/buttons/pagination.component';
import { RadioButtonsComponent } from './examples/buttons/radio-buttons.component';
import { SingleToggleButtonComponent } from './examples/buttons/single-toggle-button.component';
import { ToggleButtonsComponent } from './examples/buttons/toggle-buttons.component';
import { CheckboxComponent } from './examples/checkbox/checkbox.component';
import { ComponentListComponent } from './examples/component-list/component-list.component';
import { ContactsOverflowComponent } from './examples/contacts/contacts-overflow.component';
import { ContactsComponent } from './examples/contacts/contacts.component';
import { DatePickerComponent } from './examples/date-picker/date-picker.component';
import { DateRangePickerComponent } from './examples/date-picker/date-range-picker.component';
import { IntegratedDatePickerComponent } from './examples/date-picker/integrated-date-picker.component';
import { TimePickerComponent } from './examples/date-picker/time-picker.component';
import { DraggableCardsListViewComponent } from './examples/drag-and-drop/draggable-cards-list.component';
import { DraggableCardsComponent } from './examples/drag-and-drop/draggable-cards.component';
import { DraggablePanelsViewsComponent } from './examples/drag-and-drop/draggable-panels-views.component';
import { DraggablePanelsComponent } from './examples/drag-and-drop/draggable-panels.component';
import { CustomDropdownComponent } from './examples/dropdown/custom-dropdown.component';
import { InlineDropdownComponent } from './examples/dropdown/inline-dropdown.component';
import { FacetLineChartComponent } from './examples/facets/facet-line-chart.component';
import { FileUploadComponent } from './examples/file-upload/file-upload.component';
import { FlippableCardsComponent } from './examples/flippable-cards/flippable-cards.component';
import { FloatLabelsComponent } from './examples/forms/float-labels.component';
import { FormValidationFieldByFieldComponent } from './examples/forms/form-validation-by-field.component';
import { FormValidationOnSubmitComponent } from './examples/forms/form-validation-on-submit.component';
import { HierarchyBarComponent } from './examples/hierarchy-bar/hierarchy-bar.component';
import { HotkeysComponent } from './examples/hotkeys/hotkeys.component';
import { KeyboardServiceComponent } from './examples/hotkeys/keyboard-service.component';
import { CustomToggleSwitchComponent } from './examples/inputs/custom-toggle-switch.component';
import { ExpandingTextAreaComponent } from './examples/inputs/expanding-textarea.component';
import { InputExpandComponent } from './examples/inputs/input-expand.component';
import { InputMaskComponent } from './examples/inputs/input-mask.component';
import { NumberPickerComponent } from './examples/inputs/number-picker.component';
import { RadioButtonComponent } from './examples/inputs/radio-buttons.component';
import { ToggleSwitchComponent } from './examples/inputs/toggle-switch.component';
import { MarqueeModalComponent } from './examples/modals/marquee-modal.component';
import { ModalComponent } from './examples/modals/modal.component';
import { SideModalComponent } from './examples/modals/side-modal.component';
import { SquareModalComponent } from './examples/modals/square-modal.component';
import { NavigationComponent } from './examples/navigation/navigation.component';
import { NotificationDropdownComponent } from './examples/notifications/notifications-dropdown.component';
import { NotificationListComponent } from './examples/notifications/notifications-list.component';
import { NotificationsComponent } from './examples/notifications/notifications.component';
import { AccordionNg1Component } from './examples/panels/accordion.component';
import { ItemDisplayPanelComponent } from './examples/panels/item-display-panel.component';
import { ModalInsetPanelComponent } from './examples/panels/modal-inset-panel.component';
import { AppNavigatorComponent } from './examples/popover/app-navigator.component';
import { PopoverComponent } from './examples/popover/popover.component';
import { ProgressBarComponent } from './examples/progress-bar/progress-bar.component';
import { CustomScrollbarComponent } from './examples/scrollbar/custom-scrollbar.component';
import { InfiniteScrollLoadMoreComponent } from './examples/scrollbar/infinite-scroll-load-more.component';
import { InfiniteScrollComponent } from './examples/scrollbar/infinite-scroll.component';
import { SearchBuilderCodeComponent } from './examples/search-builder/search-builder-code.component';
import { SearchBuilderComponent } from './examples/search-builder/search-builder.component';
import { SearchHistoryComponent } from './examples/search-builder/search-history.component';
import { SearchToolbarComponent } from './examples/search-builder/search-toolbar.component';
import { MultipleSelectTableComponent } from './examples/select/multiple-select.component';
import { SelectComponent } from './examples/select/select.component';
import { SingleSelectTableComponent } from './examples/select/single-select.component';
import { SliderChartsComponent } from './examples/sliders/slider-charts.component';
import { SlidersComponent } from './examples/sliders/sliders.component';
import { LayoutSwitchingSplitterComponent } from './examples/splitter/layout-switching-splitter.component';
import { NestedSplitterComponent } from './examples/splitter/nested-splitter.component';
import { SideInsetPanelSplitterComponent } from './examples/splitter/side-inset-splitter.component';
import { SplitterComponent } from './examples/splitter/splitter.component';
import { CustomResponsiveTableComponent } from './examples/tables/custom-responsive-table.component';
import { DetailRowHeaderComponent } from './examples/tables/detail-row-header.component';
import { DetailRowResponsiveComponent } from './examples/tables/detail-row-responsive.component';
import { FixedHeaderTableComponent } from './examples/tables/fixed-header-table.component';
import { HoverActionsComponent } from './examples/tables/hover-actions.component';
import { MultiColumnSortingComponent } from './examples/tables/multi-column-sorting.component';
import { PreviewPaneWindowComponent } from './examples/tables/preview-pane-window.component';
import { ReorderableTableComponent } from './examples/tables/reorderable-table.component';
import { ScrollableTableComponent } from './examples/tables/scrollable-table.component';
import { SingleColumnSortingComponent } from './examples/tables/single-column-sorting.component';
import { SortToggleComponent } from './examples/tables/sort-toggle.component';
import { CardTabsComponent } from './examples/tabs/card-tabs.component';
import { DetailedTabComponent } from './examples/tabs/detailed-tabs.component';
import { StackedTabsComponent } from './examples/tabs/stacked-tabs.component';
import { TabsComponent } from './examples/tabs/tabs.component';
import { TagsAutocompleteComponent } from './examples/tags/tags-autocomplete.component';
import { TagsCustomComponent } from './examples/tags/tags-custom.component';
import { TagsComponent } from './examples/tags/tags.component';
import { ThumbnailComponent } from './examples/thumbnails/thumbnails.component';
import { TimelineComponent } from './examples/timeline/timeline.component';
import { OverflowTooltipComponent } from './examples/tooltips/overflow-tooltips.component';
import { SingleLineOverflowTooltipComponent } from './examples/tooltips/single-line-overflow-tooltip.component';
import { StaticTooltipComponent } from './examples/tooltips/static-tooltip.component';
import { TooltipsComponent } from './examples/tooltips/tooltips.component';
import './examples/tree-view/tree-grid.controller';
import { TreeViewCompanionViewComponent } from './examples/tree-view/tree-view-companion.component';
import { TreeViewComponent } from './examples/tree-view/tree-view.component';
import { ExpandingContentComponent } from './examples/utils/expanding-content.component';
import { ListItemFilterComponent } from './examples/utils/list-item-filter.component';
import { PdfServiceComponent } from './examples/utils/pdf-service.component';
import { TimeAgoServiceComponent } from './examples/utils/time-ago-service';
import { MarqueeWizardComponent } from './examples/wizard/marquee-wizard.component';
import { VerticalWizardComponent } from './examples/wizard/vertical-wizard.component';
import { WizardValidationComponent } from './examples/wizard/wizard-validation.component';
import { WizardComponent } from './examples/wizard/wizard.component';



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
