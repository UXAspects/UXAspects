import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ColorServiceModule, colorSets } from '@ux-aspects/ux-aspects';
import { AppComponent } from './app.component';

const routes: Routes = [
    {
        path: 'alert',
        loadChildren: () => import('./alert/alert.module').then(m => m.AlertTestPageModule)
    },
    {
        path: 'badge',
        loadChildren: () => import('./badge/badge.module').then(m => m.BadgeTestPageModule)
    },
    {
        path: 'card-tabs',
        loadChildren: () => import('./card-tabs/card-tabs.module').then(m => m.CardTabsTestPageModule)
    },
    {
        path: 'checkboxes',
        loadChildren: () => import('./checkbox/checkbox.module').then(m => m.CheckboxTestPageModule)
    },
    {
        path: 'color-picker',
        loadChildren: () => import('./color-picker/color-picker.testpage.component.module').then(m => m.ColumnPickerTestPageModule)
    },
    {
        path: 'column-resizing',
        loadChildren: () => import('./column-resizing/column-resizing.module').then(m => m.ColumnResizingTestPageModule)
    },
    {
        path: 'column-picker',
        loadChildren: () => import('./column-picker/column-picker.module').then(m => m.ColumnPickerTestPageModule)
    },
    {
        path: 'custom-facet',
        loadChildren: () => import('./custom-facet/custom-facet.module').then(m => m.CustomFacetTestPageModule)
    },
    {
        path: 'conduits',
        loadChildren: () => import('./conduits/conduits.module').then(m => m.ConduitsTestPageModule)
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardTestPageModule)
    },
    {
        path: 'date-time-picker',
        loadChildren: () => import('./date-time-picker/date-time-picker.module').then(m => m.DateTimePickerTestPageModule)
    },
    {
        path: 'date-range-picker',
        loadChildren: () => import('./date-range-picker/date-range-picker.module').then(m => m.DateRangePickerTestPageModule)
    },
    {
        path: 'expanding-text-area',
        loadChildren: () => import('./expanding-text-area/expanding-text-area.module').then(m => m.ExpandingTextAreaModule)
    },
    {
        path: 'facet-check-list',
        loadChildren: () => import('./facet-check-list/facet-check-list.module').then(m => m.FacetCheckListTestPageModule)
    },
    {
        path: 'facet-container',
        loadChildren: () => import('./facet-container/facet-container.module').then(m => m.FacetContainerTestPageModule)
    },
    {
        path: 'facet-typeahead-list',
        loadChildren: () => import('./facet-typeahead-list/facet-typeahead-list.module').then(m => m.FacetTypeaheadListPageModule)
    },
    {
        path: 'filters',
        loadChildren: () => import('./filters/filters.module').then(m => m.FiltersTestPageModule)
    },
    {
        path: 'flippable-cards',
        loadChildren: () => import('./flippable-cards/flippable-cards.module').then(m => m.FlippableCardsTestPageModule)
    },
    {
        path: 'float-label',
        loadChildren: () => import('./float-label/float-label.module').then(m => m.FloatLabelTestPageModule)
    },
    {
        path: 'floating-action-buttons',
        loadChildren: () => import('./floating-action-buttons/floating-action-buttons.module').then(m => m.FloatingActionButtonsTestPageModule)
    },
    {
        path: 'focus-indicator',
        loadChildren: () => import('./focus-indicator/focus-indicator.module').then(m => m.FocusIndicatorTestPageModule)
    },
    {
        path: 'hierarchy-bar',
        loadChildren: () => import('./hierarchy-bar/hierarchy-bar.module').then(m => m.HierarchyBarTestPageModule)
    },
    {
        path: 'infinite-scroll',
        loadChildren: () => import('./infinite-scroll/infinite-scroll.module').then(m => m.InfiniteScrollTestPageModule)
    },
    {
        path: 'input-dropdown',
        loadChildren: () => import('./input-dropdown/input-dropdown.module').then(m => m.InputDropdownTestPageModule)
    },
    {
        path: 'item-display-panel',
        loadChildren: () => import('./item-display-panel/item-display-panel.module').then(m => m.ItemDisplayPanelTestPageModule)
    },
    {
        path: 'marquee-wizard',
        loadChildren: () => import('./marquee-wizard/marquee-wizard.module').then(m => m.MarqueeWizardTestPageModule)
    },
    {
        path: 'media-player',
        loadChildren: () => import('./media-player/media-player.module').then(m => m.MediaPlayerTestPageModule)
    },
    {
        path: 'menu',
        loadChildren: () => import('./menu/menu.module').then(m => m.MenuTestPageModule)
    },
    {
        path: 'navigation',
        loadChildren: () => import('./navigation/navigation.module').then(m => m.NavigationTestPageModule)
    },
    {
        path: 'notification',
        loadChildren: () => import('./notification/notification.module').then(m => m.NotificationTestPageModule)
    },
    {
        path: 'number-picker',
        loadChildren: () => import('./number-picker/number-picker.module').then(m => m.NumberPickerTestPageModule)
    },
    {
        path: 'organization-chart',
        loadChildren: () => import('./organization-chart/organization-chart.module').then(m => m.OrganizationChartTestPageModule)
    },
    {
        path: 'page-header',
        loadChildren: () => import('./page-header/page-header.module').then(m => m.PageHeaderTestPageModule)
    },
    {
        path: 'pagination',
        loadChildren: () => import('./pagination/pagination.module').then(m => m.PaginationTestPageModule)
    },
    {
        path: 'partition-map',
        loadChildren: () => import('./partition-map/partition-map.module').then(m => m.PartitionMapTestPageModule)
    },
    {
        path: 'popover',
        loadChildren: () => import('./popover/popover.module').then(m => m.PopoverTestPageModule)
    },
    {
        path: 'radiobuttons',
        loadChildren: () => import('./radiobuttons/radiobuttons.module').then(m => m.RadioButtonsTestPageModule)
    },
    {
        path: 'reorderable-table',
        loadChildren: () => import('./reorderable-table/reorderable-table.module').then(m => m.ReorderableTableTestPageModule)
    },
    {
        path: 'reorderable-group',
        loadChildren: () => import('./reorderable-group/reorderable-group.module').then(m => m.ReorderableGroupTestPageModule)
    },
    {
        path: 'sankey-chart',
        loadChildren: () => import('./sankey-chart/sankey-chart.module').then(m => m.SankeyChartTestPageModule)
    },
    {
        path: 'search-builder',
        loadChildren: () => import('./search-builder/search-builder.module').then(m => m.SearchBuilderTestPageModule)
    },
    {
        path: 'select',
        loadChildren: () => import('./select/select.module').then(m => m.SelectTestPageModule)
    },
    {
        path: 'select-list',
        loadChildren: () => import('./select-list/select-list.module').then(m => m.SelectListTestPageModule)
    },
    {
        path: 'selection',
        loadChildren: () => import('./selection/selection.module').then(m => m.SelectionTestPageModule)
    },
    {
        path: 'side-panel',
        loadChildren: () => import('./side-panel/side-panel.module').then(m => m.SidePanelTestPageModule)
    },
    {
        path: 'sliders',
        loadChildren: () => import('./sliders/sliders.module').then(m => m.SlidersTestPageModule)
    },
    {
        path: 'spark',
        loadChildren: () => import('./spark/spark.module').then(m => m.SparkTestPageModule)
    },
    {
        path: 'splitter',
        loadChildren: () => import('./splitter/splitter.module').then(m => m.SplitterTestPageModule)
    },
    {
        path: 'tabbable-list',
        loadChildren: () => import('./tabbable-list/tabbable-list.module').then(m => m.TabbableListTestPageModule)
    },
    {
        path: 'tabs',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsTestPageModule)
    },
    {
        path: 'tags',
        loadChildren: () => import('./tags/tags.module').then(m => m.TagsTestPageModule)
    },
    {
        path: 'timeline',
        loadChildren: () => import('./timeline/timeline.module').then(m => m.TimelineTestPageModule)
    },
    {
        path: 'toggleswitches',
        loadChildren: () => import('./toggleswitches/toggleswitches.module').then(m => m.ToggleSwitchesTestPageModule)
    },
    {
        path: 'toolbar-search',
        loadChildren: () => import('./toolbar-search/toolbar-search.module').then(m => m.ToolbarSearchTestPageModule)
    },
    {
        path: 'tooltips',
        loadChildren: () => import('./tooltips/tooltips.module').then(m => m.TooltipsTestPageModule)
    },
    {
        path: 'treegrid',
        loadChildren: () => import('./treegrid/treegrid.module').then(m => m.TreeGridTestPageModule)
    },
    {
        path: 'typeahead',
        loadChildren: () => import('./typeahead/typeahead.module').then(m => m.TypeaheadTestPageModule)
    },
    {
        path: 'virtual-for',
        loadChildren: () => import('./virtual-for/virtual-for.module').then(m => m.VirtualForTestPageModule)
    },
    {
        path: 'virtual-scroll',
        loadChildren: () => import('./virtual-scroll/virtual-scroll.module').then(m => m.VirtualScrollTestPageModule)
    },
    {
        path: 'wizard',
        loadChildren: () => import('./wizard/wizard.module').then(m => m.WizardTestPageModule)
    }
];

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes, { useHash: true }),
        ColorServiceModule.forRoot(colorSets.keppel),
        NoopAnimationsModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
