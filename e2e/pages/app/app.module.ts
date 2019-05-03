import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
    {
        path: 'card-tabs',
        loadChildren: './card-tabs/card-tabs.module#CardTabsTestPageModule'
    },
    {
        path: 'checkboxes',
        loadChildren: './checkbox/checkbox.module#CheckboxTestPageModule'
    },
    {
        path: 'column-resizing',
        loadChildren: './column-resizing/column-resizing.module#ColumnResizingTestPageModule'
    },
    {
        path: 'column-picker',
        loadChildren: './column-picker/column-picker.module#ColumnPickerTestPageModule'
    },
    {
        path: 'custom-facet',
        loadChildren: './custom-facet/custom-facet.module#CustomFacetTestPageModule'
    },
    {
        path: 'conduits',
        loadChildren: './conduits/conduits.module#ConduitsTestPageModule'
    },
    {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardTestPageModule'
    },
    {
        path: 'date-time-picker',
        loadChildren: './date-time-picker/date-time-picker.module#DateTimePickerTestPageModule'
    },
    {
        path: 'date-range-picker',
        loadChildren: './date-range-picker/date-range-picker.module#DateRangePickerTestPageModule'
    },
    {
        path: 'expanding-text-area',
        loadChildren: './expanding-text-area/expanding-text-area.module#ExpandingTextAreaModule'
    },
    {
        path: 'facet-check-list',
        loadChildren: './facet-check-list/facet-check-list.module#FacetCheckListTestPageModule'
    },
    {
        path: 'facet-container',
        loadChildren: './facet-container/facet-container.module#FacetContainerTestPageModule'
    },
    {
        path: 'facet-typeahead-list',
        loadChildren: './facet-typeahead-list/facet-typeahead-list.module#FacetTypeaheadListPageModule'
    },
    {
        path: 'filters',
        loadChildren: './filters/filters.module#FiltersTestPageModule'
    },
    {
        path: 'flippable-cards',
        loadChildren: './flippable-cards/flippable-cards.module#FlippableCardsTestPageModule'
    },
    {
        path: 'float-label',
        loadChildren: './float-label/float-label.module#FloatLabelTestPageModule'
    },
    {
        path: 'floating-action-buttons',
        loadChildren: './floating-action-buttons/floating-action-buttons.module#FloatingActionButtonsTestPageModule'
    },
    {
        path: 'focus-indicator',
        loadChildren: './focus-indicator/focus-indicator.module#FocusIndicatorTestPageModule'
    },
    {
        path: 'hierarchy-bar',
        loadChildren: './hierarchy-bar/hierarchy-bar.module#HierarchyBarTestPageModule'
    },
    {
        path: 'infinite-scroll',
        loadChildren: './infinite-scroll/infinite-scroll.module#InfiniteScrollTestPageModule'
    },
    {
        path: 'item-display-panel',
        loadChildren: './item-display-panel/item-display-panel.module#ItemDisplayPanelTestPageModule'
    },
    {
        path: 'marquee-wizard',
        loadChildren: './marquee-wizard/marquee-wizard.module#MarqueeWizardTestPageModule'
    },
    {
        path: 'navigation',
        loadChildren: './navigation/navigation.module#NavigationTestPageModule'
    },
    {
        path: 'number-picker',
        loadChildren: './number-picker/number-picker.module#NumberPickerTestPageModule'
    },
    {
        path: 'page-header',
        loadChildren: './page-header/page-header.module#PageHeaderTestPageModule'
    },
    {
        path: 'pagination',
        loadChildren: './pagination/pagination.module#PaginationTestPageModule'
    },
    {
        path: 'popover',
        loadChildren: './popover/popover.module#PopoverTestPageModule'
    },
    {
        path: 'radiobuttons',
        loadChildren: './radiobuttons/radiobuttons.module#RadioButtonsTestPageModule'
    },
    {
        path: 'reorderable-table',
        loadChildren: './reorderable-table/reorderable-table.module#ReorderableTableTestPageModule'
    },
    {
        path: 'reorderable-group',
        loadChildren: './reorderable-group/reorderable-group.module#ReorderableGroupTestPageModule'
    },
    {
        path: 'search-builder',
        loadChildren: './search-builder/search-builder.module#SearchBuilderTestPageModule'
    },
    {
        path: 'select',
        loadChildren: './select/select.module#SelectTestPageModule'
    },
    {
        path: 'select-list',
        loadChildren: './select-list/select-list.module#SelectListTestPageModule'
    },
    {
        path: 'selection',
        loadChildren: './selection/selection.module#SelectionTestPageModule'
    },
    {
        path: 'side-panel',
        loadChildren: './side-panel/side-panel.module#SidePanelTestPageModule'
    },
    {
        path: 'sliders',
        loadChildren: './sliders/sliders.module#SlidersTestPageModule'
    },
    {
        path: 'spark',
        loadChildren: './spark/spark.module#SparkTestPageModule',
    },
    {
        path: 'splitter',
        loadChildren: './splitter/splitter.module#SplitterTestPageModule'
    },
    {
        path: 'tabbable-list',
        loadChildren: './tabbable-list/tabbable-list.module#TabbableListTestPageModule'
    },
    {
        path: 'tabs',
        loadChildren: './tabs/tabs.module#TabsTestPageModule'
    },
    {
        path: 'tags',
        loadChildren: './tags/tags.module#TagsTestPageModule'
    },
    {
        path: 'timeline',
        loadChildren: './timeline/timeline.module#TimelineTestPageModule'
    },
    {
        path: 'toggleswitches',
        loadChildren: './toggleswitches/toggleswitches.module#ToggleSwitchesTestPageModule'
    },
    {
        path: 'toolbar-search',
        loadChildren: './toolbar-search/toolbar-search.module#ToolbarSearchTestPageModule'
    },
    {
        path: 'tooltips',
        loadChildren: './tooltips/tooltips.module#TooltipsTestPageModule'
    },
    {
        path: 'virtual-for',
        loadChildren: './virtual-for/virtual-for.module#VirtualForTestPageModule'
    },
    {
        path: 'virtual-scroll',
        loadChildren: './virtual-scroll/virtual-scroll.module#VirtualScrollTestPageModule'
    },
    {
        path: 'wizard',
        loadChildren: './wizard/wizard.module#WizardTestPageModule'
    }
];

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes, { useHash: true }),
        BrowserAnimationsModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
