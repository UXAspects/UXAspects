import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap';
import 'chart.js';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { CheckboxTestPageComponent }  from './checkbox/checkbox.testpage.component';
import { CustomFacetTestPageComponent }  from './custom-facet/custom-facet.testpage.component';
import { DashboardTestPageComponent }  from './dashboard/dashboard.testpage.component';
import { FacetCheckListTestPageComponent }  from './facet-check-list/facet-check-list.testpage.component';
import { FacetContainerTestPageComponent }  from './facet-container/facet-container.testpage.component';
import { FacetTypeaheadListPageComponent }  from './facet-typeahead-list/facet-typeahead-list.testpage.component';
import { RadioButtonsTestPageComponent }  from './radiobuttons/radiobuttons.testpage.component';
import { SampleCustomFacetComponent }  from './custom-facet/facet-component.testpage.component';
import { SlidersTestPageComponent }  from './sliders/sliders.testpage.component';
import { TagsTestPageComponent }  from './tags/tags.testpage.component';
import { ToggleSwitchesTestPageComponent }  from './toggleswitches/toggleswitches.testpage.component';
import { CheckboxModule, ColorServiceModule, DashboardModule, FacetsModule, NumberPickerModule, RadioButtonModule,
SliderModule, SparkModule, TagInputModule, ToggleSwitchModule, TypeaheadModule } from '../../../dist/lib/index.js';

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
    path: 'facet-check-list',
    component: FacetCheckListTestPageComponent
  }, {
    path: 'facet-container',
    component: FacetContainerTestPageComponent
  }, {
    path: 'facet-typeahead-list',
    component: FacetTypeaheadListPageComponent
  }, {
    path: 'radiobuttons',
    component: RadioButtonsTestPageComponent
  }, {
    path: 'sliders',
    component: SlidersTestPageComponent
  }, {
    path: 'tags',
    component: TagsTestPageComponent
  }, {
    path: 'toggleswitches',
    component: ToggleSwitchesTestPageComponent
  }
];


@NgModule({
  imports: [
    AccordionModule.forRoot(),
    BrowserModule,
    FormsModule,
    ChartsModule,
    CheckboxModule,
    ColorServiceModule,
    DashboardModule,
    FacetsModule,
    NumberPickerModule,
    RadioButtonModule,
    RouterModule.forRoot(ROUTES),
    SliderModule,
    SparkModule,
    TagInputModule,
    ToggleSwitchModule,
    TypeaheadModule
  ],
  declarations: [
    AppComponent,
    CheckboxTestPageComponent,
    CustomFacetTestPageComponent,
    DashboardTestPageComponent,
    FacetCheckListTestPageComponent,
    FacetContainerTestPageComponent,
    FacetTypeaheadListPageComponent,
    RadioButtonsTestPageComponent,
    SampleCustomFacetComponent,
    SlidersTestPageComponent,
    TagsTestPageComponent,
    ToggleSwitchesTestPageComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }