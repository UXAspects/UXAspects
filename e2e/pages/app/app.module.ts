import * as angular from 'angular';

let app = angular.module('app');

import { NgModule, forwardRef, Component, Injector } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule, downgradeComponent } from '@angular/upgrade/static';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TabsComponent } from './tabs-ng1/wrapper/tabs-wrapper.directive';
import { TabsNg1TestPageComponent } from './tabs-ng1/tabs-ng1.testpage.component';
import { StackedTabsNg1TestPageComponent } from './stacked-tabs-ng1/stacked-tabs-ng1.testpage.component';
import { StackedTabsComponent } from './stacked-tabs-ng1/wrapper/stacked-tabs-wrapper.directive';
import { SideInsetPanelSplitterNg1TestPageComponent } from './side-inset-panel-splitter-ng1/side-inset-panel-splitter-ng1.testpage.component';
import { SideInsetPanelSplitterComponent } from './side-inset-panel-splitter-ng1/wrapper/side-inset-panel-splitter-wrapper.directive';
import { FloatingActionButtonsNg1TestPageComponent } from './floating-action-buttons-ng1/floating-action-buttons-ng1.testpage.component';
import { FloatingActionButtonComponent } from './floating-action-buttons-ng1/wrapper/floating-action-button-wrapper.directive';

const ROUTES: Routes = [
    {
        path: 'button-dropdowns',
        loadChildren:
            './button-dropdowns/button-dropdowns.module#ButtonDropdownsTestPageModule'
    },
    {
        path: 'button-size-variations',
        loadChildren:
            './button-size-variations/button-size-variation.module#ButtonSizeVariationsTestPageModule'
    },
    {
        path: 'buttons-radio-buttons',
        loadChildren:
            './buttons-radio-buttons/buttons-radio-buttons.module#ButtonsRadioButtonsTestPageModule'
    },
    {
        path: 'checkboxes',
        loadChildren: './checkbox/checkbox.module#CheckboxTestPageModule'
    },
    {
        path: 'circular-icon-buttons',
        loadChildren:
            './circular-icon-buttons/circular-icon-buttons.module#CircularIconButtonsTestPageModule'
    },
    {
        path: 'custom-facet',
        loadChildren:
            './custom-facet/custom-facet.module#CustomFacetTestPageModule'
    },
    {
        path: 'colored-buttons',
        loadChildren:
            './colored-buttons/colored-buttons.module#ColoredButtonsTestPageModule'
    },
    {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardTestPageModule'
    },
    {
        path: 'dropdowns',
        loadChildren: './dropdowns/dropdowns.module#DropdownsTestPageModule'
    },
    {
        path: 'expanding-text-area',
        loadChildren: './expanding-text-area/expanding-text-area.module#ExpandingTextAreaModule'
    },
    {
        path: 'facet-check-list',
        loadChildren:
            './facet-check-list/facet-check-list.module#FacetCheckListTestPageModule'
    },
    {
        path: 'facet-container',
        loadChildren:
            './facet-container/facet-container.module#FacetContainerTestPageModule'
    },
    {
        path: 'facet-typeahead-list',
        loadChildren:
            './facet-typeahead-list/facet-typeahead-list.module#FacetTypeaheadListPageModule'
    },
    {
        path: 'filters',
        loadChildren: './filters/filters.module#FiltersTestPageModule'
    },
    {
        path: 'flippable-cards',
        loadChildren:
            './flippable-cards/flippable-cards.module#FlippableCardsTestPageModule'
    },
    {
        path: 'floating-action-buttons',
        loadChildren:
            './floating-action-buttons/floating-action-buttons.module#FloatingActionButtonsTestPageModule'
    },
    {
        path: 'floating-action-buttons-ng1',
        component: FloatingActionButtonsNg1TestPageComponent
    },
    {
        path: 'hyperlinks',
        loadChildren: './hyperlinks/hyperlinks.module#HyperlinksTestPageModule'
    },
    {
        path: 'infinite-scroll',
        loadChildren:
            './infinite-scroll/infinite-scroll.module#InfiniteScrollTestPageModule'
    },
    {
        path: 'item-display-panel',
        loadChildren:
            './item-display-panel/item-display-panel.module#ItemDisplayPanelTestPageModule'
    },
    {
        path: 'link-buttons',
        loadChildren:
            './link-buttons/link-buttons.module#LinkButtonsTestPageModule'
    },
    {
        path: 'marquee-wizard',
        loadChildren:
            './marquee-wizard/marquee-wizard.module#MarqueeWizardTestPageModule'
    },
    {
        path: 'number-picker',
        loadChildren:
            './number-picker/number-picker.module#NumberPickerTestPageModule'
    },
    {
        path: 'page-header',
        loadChildren:
            './page-header/page-header.module#PageHeaderTestPageModule'
    },
    {
        path: 'pagination',
        loadChildren: './pagination/pagination.module#PaginationTestPageModule'
    },
    {
        path: 'radiobuttons',
        loadChildren:
            './radiobuttons/radiobuttons.module#RadioButtonsTestPageModule'
    },
    {
        path: 'reorderable-table',
        loadChildren:
            './reorderable-table/reorderable-table.module#ReorderableTableTestPageModule'
    },
    {
        path: 'search-builder',
        loadChildren:
            './search-builder/search-builder.module#SearchBuilderTestPageModule'
    },
    {
        path: 'select',
        loadChildren: './select/select.module#SelectTestPageModule'
    },
    {
        path: 'selection',
        loadChildren: './selection/selection.module#SelectionTestPageModule'
    },
    {
        path: 'side-inset-panel-splitter',
        component: SideInsetPanelSplitterNg1TestPageComponent
    },
    {
        path: 'sliders',
        loadChildren: './sliders/sliders.module#SlidersTestPageModule'
    },
    {
        path: 'split-button-dropdowns',
        loadChildren:
            './split-button-dropdowns/split-button-dropdowns.module#SplitButtonDropdownsTestPageModule'
    },
    {
        path: 'stacked-tabs',
        component: StackedTabsNg1TestPageComponent
    },
    {
        path: 'tabs',
        component: TabsNg1TestPageComponent
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
        path: 'toggle-button',
        loadChildren:
            './toggle-button/toggle-button.module#ToggleButtonTestPageModule'
    },
    {
        path: 'toggleswitches',
        loadChildren:
            './toggleswitches/toggleswitches.module#ToggleSwitchesTestPageModule'
    },
    {
        path: 'toolbar-search',
        loadChildren: './toolbar-search/toolbar-search.module#ToolbarSearchTestPageModule'
    },
    {
        path: 'tree-grid',
        loadChildren:
            './tree-grid-ng1/tree-grid-ng1.module#TreeGridNg1TestPageModule'
    },
    {
        path: 'virtual-scroll',
        loadChildren:
            './virtual-scroll/virtual-scroll.module#VirtualScrollTestPageModule'
    },
    {
        path: 'wizard',
        loadChildren: './wizard/wizard.module#WizardTestPageModule'
    }
];

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(ROUTES, {
            initialNavigation: false,
            useHash: true
        }),
        UpgradeModule,
        BrowserAnimationsModule
    ],
    declarations: [
        AppComponent,
        TabsComponent,
        TabsNg1TestPageComponent,
        StackedTabsNg1TestPageComponent,
        StackedTabsComponent,
        SideInsetPanelSplitterNg1TestPageComponent,
        SideInsetPanelSplitterComponent,
        FloatingActionButtonsNg1TestPageComponent,
        FloatingActionButtonComponent
    ],
    providers: [
        {
            provide: '$navigationMenu',
            useFactory: (injector: Injector) => injector.get('$navigationMenu'),
            deps: ['$injector']
        }
    ],
    entryComponents: [AppComponent]
})
export class AppModule {
    constructor(private _upgrade: UpgradeModule) {}

    ngDoBootstrap() {
        this._upgrade.bootstrap(document.body, ['app'], { strictDi: true });
    }
}

app.directive('myApp', downgradeComponent({ component: AppComponent }));
