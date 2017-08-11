import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import 'chart.js';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { AppComponent } from './app.component';
import { CheckboxTestPageComponent }  from './checkbox/checkbox.testpage.component';
import { CustomFacetTestPageComponent }  from './custom-facet/custom-facet.testpage.component';
import { DashboardTestPageComponent }  from './dashboard/dashboard.testpage.component';
import { DropdownsTestPageComponent } from './dropdowns/dropdowns.testpage.component';
import { FacetCheckListTestPageComponent }  from './facet-check-list/facet-check-list.testpage.component';
import { FacetContainerTestPageComponent }  from './facet-container/facet-container.testpage.component';
import { FacetTypeaheadListPageComponent }  from './facet-typeahead-list/facet-typeahead-list.testpage.component';
import { FiltersTestPageComponent } from './filters/filters.testpage.component';
import { FlippableCardsTestPageComponent }  from './flippable-cards/flippable-cards.testpage.component';
import { InfiniteScrollTestPageComponent }  from './infinite-scroll/infinite-scroll.testpage.component';
import { ItemDisplayPanelTestPageComponent }  from './item-display-panel/item-display-panel.testpage.component';
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
import { CheckboxModule, ColorServiceModule, DashboardModule, FacetsModule, FilterModule, FlippableCardModule,
InfiniteScrollModule, ItemDisplayPanelModule, NumberPickerModule, PageHeaderModule, RadioButtonModule, SelectModule,
SliderModule, SparkModule, StringFilterModule, TagInputModule, ToggleSwitchModule, TypeaheadModule, VirtualScrollModule }
from '../../../dist/lib/index.js';

const ROUTES: Routes = [
  {
    path: 'checkboxes',
    component: CheckboxTestPageComponent
  }, {
    path: 'custom-facet',
    component: CustomFacetTestPageComponent
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
    path: 'infinite-scroll',
    component: InfiniteScrollTestPageComponent
  }, {
    path: 'item-display-panel',
    component: ItemDisplayPanelTestPageComponent
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
    RouterModule.forRoot(ROUTES),
    SelectModule,
    SliderModule,
    SparkModule,
    StringFilterModule,
    TagInputModule,
    ToggleSwitchModule,
    TypeaheadModule,
    VirtualScrollModule
  ],
  declarations: [
    AppComponent,
    CheckboxTestPageComponent,
    CustomFacetTestPageComponent,
    DashboardTestPageComponent,
    DropdownsTestPageComponent,
    FacetCheckListTestPageComponent,
    FacetContainerTestPageComponent,
    FacetTypeaheadListPageComponent,
    FiltersTestPageComponent,
    FlippableCardsTestPageComponent,
    InfiniteScrollTestPageComponent,
    ItemDisplayPanelTestPageComponent,
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
    VirtualScrollTestPageComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }