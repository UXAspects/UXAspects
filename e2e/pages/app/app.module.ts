declare var angular: ng.IAngularStatic;

let app = angular.module('app', ['ux-aspects']);

import { NgModule, forwardRef, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import 'chart.js';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { UpgradeAdapter } from '@angular/upgrade';

import { AppComponent } from './app.component';
import { ButtonsRadioButtonsTestPageComponent }  from './buttons-radio-buttons/buttons-radio-buttons.testpage.component';
import { ButtonSizeVariationsTestPageComponent }  from './button-size-variations/button-size-variations.testpage.component';
import { CheckboxTestPageComponent }  from './checkbox/checkbox.testpage.component';
import { CircularIconButtonsTestPageComponent }  from './circular-icon-buttons/circular-icon-buttons.testpage.component';
import { ColoredButtonsTestPageComponent }  from './colored-buttons/colored-buttons.testpage.component';
import { CustomFacetTestPageComponent }  from './custom-facet/custom-facet.testpage.component';
import { DashboardTestPageComponent }  from './dashboard/dashboard.testpage.component';
import { DropdownsTestPageComponent } from './dropdowns/dropdowns.testpage.component';
import { FacetCheckListTestPageComponent }  from './facet-check-list/facet-check-list.testpage.component';
import { FacetContainerTestPageComponent }  from './facet-container/facet-container.testpage.component';
import { FacetTypeaheadListPageComponent }  from './facet-typeahead-list/facet-typeahead-list.testpage.component';
import { FiltersTestPageComponent } from './filters/filters.testpage.component';
import { FlippableCardsTestPageComponent }  from './flippable-cards/flippable-cards.testpage.component';
import { HyperlinksTestPageComponent }  from './hyperlinks/hyperlinks.testpage.component';
import { InfiniteScrollTestPageComponent }  from './infinite-scroll/infinite-scroll.testpage.component';
import { ItemDisplayPanelTestPageComponent }  from './item-display-panel/item-display-panel.testpage.component';
import { LinkButtonsTestPageComponent }  from './link-buttons/link-buttons.testpage.component';
import { NumberPickerTestPageComponent }  from './number-picker/number-picker.testpage.component';
import { PageHeaderTestPageComponent }  from './page-header/page-header.testpage.component';
import { PaginationTestPageComponent } from './pagination/pagination.testpage.component';
import { RadioButtonsTestPageComponent }  from './radiobuttons/radiobuttons.testpage.component';
import { SampleCustomFacetComponent }  from './custom-facet/facet-component.testpage.component';
import { SelectTestPageComponent } from './select/select.testpage.component';
import { SlidersTestPageComponent }  from './sliders/sliders.testpage.component';
import { TagsTestPageComponent }  from './tags/tags.testpage.component';
import { ToggleButtonTestPageComponent }  from './toggle-button/toggle-button.testpage.component';
import { ToggleSwitchesTestPageComponent }  from './toggleswitches/toggleswitches.testpage.component';
import { VirtualScrollTestPageComponent }  from './virtual-scroll/virtual-scroll.testpage.component';
import { WizardTestPageComponent } from './wizard/wizard.testpage.component';
import { CheckboxModule, ColorServiceModule, DashboardModule, FacetsModule, FilterModule, FlippableCardModule,
InfiniteScrollModule, ItemDisplayPanelModule, NumberPickerModule, PageHeaderModule, RadioButtonModule, SelectModule,
SliderModule, SparkModule, StringFilterModule, TagInputModule, ToggleSwitchModule, TypeaheadModule, VirtualScrollModule, WizardModule }
from '../../../dist';

// import scripts that require upgrade

// create a singleton of the upgrade adapter
export const upgradeAdapter = new UpgradeAdapter(forwardRef(() => AppModule));

const ROUTES: Routes = [
  {
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
    path: 'sliders',
    component: SlidersTestPageComponent
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
    FacetsModule,
    FilterModule,
    FlippableCardModule,
    InfiniteScrollModule,
    ItemDisplayPanelModule,
    NumberPickerModule,
    PageHeaderModule,
    PaginationModule.forRoot(),
    RadioButtonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES, { initialNavigation: false }),
    SelectModule,
    SliderModule,
    SparkModule,
    StringFilterModule,
    TagInputModule,
    ToggleSwitchModule,
    TypeaheadModule,
    VirtualScrollModule,
    WizardModule
  ],
  declarations: [
    AppComponent,
    ButtonsRadioButtonsTestPageComponent,
    ButtonSizeVariationsTestPageComponent,
    CheckboxTestPageComponent,
    CircularIconButtonsTestPageComponent,
    ColoredButtonsTestPageComponent,
    CustomFacetTestPageComponent,
    DashboardTestPageComponent,
    DropdownsTestPageComponent,
    FacetCheckListTestPageComponent,
    FacetContainerTestPageComponent,
    FacetTypeaheadListPageComponent,
    FiltersTestPageComponent,
    FlippableCardsTestPageComponent,
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
    SlidersTestPageComponent,
    TagsTestPageComponent,
    ToggleButtonTestPageComponent,
    ToggleSwitchesTestPageComponent,
    VirtualScrollTestPageComponent,
    WizardTestPageComponent    
  ]
})
export class AppModule {
  ngDoBootstrap() { }
}

upgradeAdapter.upgradeNg1Provider('$navigationMenu');

app.directive('myApp', upgradeAdapter.downgradeNg2Component(AppComponent) as angular.IDirectiveFactory);

// bootstrap the Angular 1 application here 
upgradeAdapter.bootstrap(document.documentElement, ['app']);
