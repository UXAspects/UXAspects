declare var angular: ng.IAngularStatic;

let app = angular.module('app');

import { NgModule, forwardRef, Component, Injector } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import 'chart.js';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { UpgradeComponent, UpgradeModule, downgradeComponent } from '@angular/upgrade/static';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TreeModule } from 'angular-tree-component';

import { AppComponent } from './app.component';
import { ButtonDropdownsTestPageComponent } from './button-dropdowns/button-dropdowns.testpage.component';
import { ButtonsRadioButtonsTestPageComponent } from './buttons-radio-buttons/buttons-radio-buttons.testpage.component';
import { ButtonSizeVariationsTestPageComponent } from './button-size-variations/button-size-variations.testpage.component';
import { CheckboxTestPageComponent } from './checkbox/checkbox.testpage.component';
import { CircularIconButtonsTestPageComponent } from './circular-icon-buttons/circular-icon-buttons.testpage.component';
import { ColoredButtonsTestPageComponent } from './colored-buttons/colored-buttons.testpage.component';
import { CustomFacetTestPageComponent } from './custom-facet/custom-facet.testpage.component';
import { DashboardTestPageComponent } from './dashboard/dashboard.testpage.component';
import { DropdownsTestPageComponent } from './dropdowns/dropdowns.testpage.component';
import { FacetCheckListTestPageComponent } from './facet-check-list/facet-check-list.testpage.component';
import { FacetContainerTestPageComponent } from './facet-container/facet-container.testpage.component';
import { FacetTypeaheadListPageComponent } from './facet-typeahead-list/facet-typeahead-list.testpage.component';
import { FiltersTestPageComponent } from './filters/filters.testpage.component';
import { FlippableCardsTestPageComponent } from './flippable-cards/flippable-cards.testpage.component';
import { FloatingActionButtonsNg1TestPageComponent } from './floating-action-buttons-ng1/floating-action-buttons-ng1.testpage.component';
import { HyperlinksTestPageComponent } from './hyperlinks/hyperlinks.testpage.component';
import { InfiniteScrollTestPageComponent } from './infinite-scroll/infinite-scroll.testpage.component';
import { ItemDisplayPanelTestPageComponent } from './item-display-panel/item-display-panel.testpage.component';
import { LinkButtonsTestPageComponent } from './link-buttons/link-buttons.testpage.component';
import { NumberPickerTestPageComponent } from './number-picker/number-picker.testpage.component';
import { PageHeaderTestPageComponent } from './page-header/page-header.testpage.component';
import { PaginationTestPageComponent } from './pagination/pagination.testpage.component';
import { RadioButtonsTestPageComponent } from './radiobuttons/radiobuttons.testpage.component';
import { SampleCustomFacetComponent } from './custom-facet/facet-component.testpage.component';
import { SelectTestPageComponent } from './select/select.testpage.component';
import { SideInsetPanelSplitterNg1TestPageComponent } from './side-inset-panel-splitter-ng1/side-inset-panel-splitter-ng1.testpage.component';
import { SlidersTestPageComponent } from './sliders/sliders.testpage.component';
import { SplitButtonDropdownsTestPageComponent } from './split-button-dropdowns/split-button-dropdowns.testpage.component';
import { StackedTabsNg1TestPageComponent } from './stacked-tabs-ng1/stacked-tabs-ng1.testpage.component';
import { TabsNg1TestPageComponent } from './tabs-ng1/tabs-ng1.testpage.component';
import { TagsTestPageComponent } from './tags/tags.testpage.component';
import { ToggleButtonTestPageComponent } from './toggle-button/toggle-button.testpage.component';
import { ToggleSwitchesTestPageComponent } from './toggleswitches/toggleswitches.testpage.component';
import { TreeGridNg1TestPageComponent } from './tree-grid-ng1/tree-grid-ng1.testpage.component';
import { VirtualScrollTestPageComponent } from './virtual-scroll/virtual-scroll.testpage.component';
import { WizardTestPageComponent } from './wizard/wizard.testpage.component';
import {
  CheckboxModule, ColorServiceModule, DashboardModule, FacetsModule, FilterModule, FlippableCardModule,
  InfiniteScrollModule, ItemDisplayPanelModule, NumberPickerModule, PageHeaderModule, RadioButtonModule, SelectModule,
  SliderModule, SparkModule, StringFilterModule, TagInputModule, ToggleSwitchModule, TypeaheadModule,
  VirtualScrollModule, WizardModule, DateTimePickerModule
}
  from '../../../dist';
  import { FloatingActionButtonComponent } from './floating-action-buttons-ng1/wrapper/floating-action-button-wrapper.directive';
import { SideInsetPanelSplitterComponent } from './side-inset-panel-splitter-ng1/wrapper/side-inset-panel-splitter-wrapper.directive';
import { StackedTabsComponent } from './stacked-tabs-ng1/wrapper/stacked-tabs-wrapper.directive';
import { TabsComponent } from './tabs-ng1/wrapper/tabs-wrapper.directive';
import { TreeGridComponent } from './tree-grid-ng1/wrapper/tree-grid-wrapper.directive';
import { DateTimePickerTestPageComponent } from './date-time-picker/date-time-picker.testpage.component';

// import scripts that require upgrade


const ROUTES: Routes = [
  {
    path: 'button-dropdowns',
    component: ButtonDropdownsTestPageComponent
  }, {
    path: 'button-size-variations',
    component: ButtonSizeVariationsTestPageComponent
  }, {
    path: 'buttons-radio-buttons',
    component: ButtonsRadioButtonsTestPageComponent
  }, {
    path: 'checkboxes',
    component: CheckboxTestPageComponent
  }, {
    path: 'circular-icon-buttons',
    component: CircularIconButtonsTestPageComponent
  }, {
    path: 'custom-facet',
    component: CustomFacetTestPageComponent
  }, {
    path: 'colored-buttons',
    component: ColoredButtonsTestPageComponent
  }, {
    path: 'dashboard',
    component: DashboardTestPageComponent
  }, {
    path: 'date-time-picker',
    component: DateTimePickerTestPageComponent
  }, {
    path: 'dropdowns',
    component: DropdownsTestPageComponent
  }, {
    path: 'facet-check-list',
    component: FacetCheckListTestPageComponent
  }, {
    path: 'facet-container',
    component: FacetContainerTestPageComponent
  }, {
    path: 'facet-typeahead-list',
    component: FacetTypeaheadListPageComponent
  }, {
    path: 'filters',
    component: FiltersTestPageComponent
  }, {
    path: 'flippable-cards',
    component: FlippableCardsTestPageComponent
  }, {
    path: 'floating-action-buttons',
    component: FloatingActionButtonsNg1TestPageComponent
  }, {
    path: 'hyperlinks',
    component: HyperlinksTestPageComponent
  }, {
    path: 'infinite-scroll',
    component: InfiniteScrollTestPageComponent
  }, {
    path: 'item-display-panel',
    component: ItemDisplayPanelTestPageComponent
  }, {
    path: 'link-buttons',
    component: LinkButtonsTestPageComponent
  }, {
    path: 'number-picker',
    component: NumberPickerTestPageComponent
  }, {
    path: 'page-header',
    component: PageHeaderTestPageComponent
  }, {
    path: 'pagination',
    component: PaginationTestPageComponent
  }, {
    path: 'radiobuttons',
    component: RadioButtonsTestPageComponent
  }, {
    path: 'select',
    component: SelectTestPageComponent
  }, {
    path: 'side-inset-panel-splitter',
    component: SideInsetPanelSplitterNg1TestPageComponent
  }, {
    path: 'sliders',
    component: SlidersTestPageComponent
  }, {
    path: 'split-button-dropdowns',
    component: SplitButtonDropdownsTestPageComponent
  }, {
    path: 'stacked-tabs',
    component: StackedTabsNg1TestPageComponent
  }, {
    path: 'tabs',
    component: TabsNg1TestPageComponent
  }, {
    path: 'tags',
    component: TagsTestPageComponent
  }, {
    path: 'toggle-button',
    component: ToggleButtonTestPageComponent
  }, {
    path: 'toggleswitches',
    component: ToggleSwitchesTestPageComponent
  }, {
    path: 'tree-grid',
    component: TreeGridNg1TestPageComponent
  }, {
    path: 'virtual-scroll',
    component: VirtualScrollTestPageComponent
  }, {
    path: 'wizard',
    component: WizardTestPageComponent
  }
];

@NgModule({
  imports: [
    AccordionModule.forRoot(),
    BrowserModule,
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot(),
    FormsModule,
    ChartsModule,
    CheckboxModule,
    ColorServiceModule,
    DashboardModule,
    DateTimePickerModule,
    FacetsModule,
    FilterModule,
    FlippableCardModule,
    InfiniteScrollModule,
    ItemDisplayPanelModule,
    NumberPickerModule,
    PageHeaderModule,
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    RadioButtonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES, { initialNavigation: false }),
    SelectModule,
    SliderModule,
    SparkModule,
    StringFilterModule,
    TabsModule.forRoot(),
    TagInputModule,
    ToggleSwitchModule,
    TypeaheadModule,
    UpgradeModule,
    VirtualScrollModule,
    WizardModule
  ],
  declarations: [
    AppComponent,
    ButtonDropdownsTestPageComponent,
    ButtonsRadioButtonsTestPageComponent,
    ButtonSizeVariationsTestPageComponent,
    CheckboxTestPageComponent,
    CircularIconButtonsTestPageComponent,
    ColoredButtonsTestPageComponent,
    CustomFacetTestPageComponent,
    DashboardTestPageComponent,
    DateTimePickerTestPageComponent,
    DropdownsTestPageComponent,
    FacetCheckListTestPageComponent,
    FacetContainerTestPageComponent,
    FacetTypeaheadListPageComponent,
    FiltersTestPageComponent,
    FlippableCardsTestPageComponent,
    FloatingActionButtonsNg1TestPageComponent,
    HyperlinksTestPageComponent,
    InfiniteScrollTestPageComponent,
    ItemDisplayPanelTestPageComponent,
    LinkButtonsTestPageComponent,
    NumberPickerTestPageComponent,
    PageHeaderTestPageComponent,
    PaginationTestPageComponent,
    RadioButtonsTestPageComponent,
    SampleCustomFacetComponent,
    SelectTestPageComponent,
    SideInsetPanelSplitterNg1TestPageComponent,
    SlidersTestPageComponent,
    SplitButtonDropdownsTestPageComponent,
    TabsNg1TestPageComponent,
    StackedTabsNg1TestPageComponent,
    TagsTestPageComponent,
    ToggleButtonTestPageComponent,
    ToggleSwitchesTestPageComponent,
    TreeGridNg1TestPageComponent,
    VirtualScrollTestPageComponent,
    WizardTestPageComponent,

    FloatingActionButtonComponent,
    SideInsetPanelSplitterComponent,
    StackedTabsComponent,
    TabsComponent,
    TreeGridComponent
  ],
  providers: [
    {
      provide: '$navigationMenu',
      useFactory: (injector: Injector) => injector.get('$navigationMenu'),
      deps: ['$injector']
    }
  ],
  entryComponents: [
    AppComponent
  ]
})
export class AppModule {
  constructor(private _upgrade: UpgradeModule) { }

  ngDoBootstrap() {
    this._upgrade.bootstrap(document.body, ['app'], { strictDi: true });
  }
}

app.directive('myApp', downgradeComponent({ component: AppComponent }));
