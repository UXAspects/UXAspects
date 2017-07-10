import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { CheckboxTestPageComponent }  from './checkbox/checkbox.testpage.component';
import { FacetCheckListTestPageComponent }  from './facet-check-list/facet-check-list.testpage.component';
import { FacetContainerTestPageComponent }  from './facet-container/facet-container.testpage.component';
import { FacetTypeaheadListPageComponent }  from './facet-typeahead-list/facet-typeahead-list.testpage.component';
import { RadioButtonsTestPageComponent }  from './radiobuttons/radiobuttons.testpage.component';
import { SlidersTestPageComponent }  from './sliders/sliders.testpage.component';
import { TagsTestPageComponent }  from './tags/tags.testpage.component';
import { ToggleSwitchesTestPageComponent }  from './toggleswitches/toggleswitches.testpage.component';
import { CheckboxModule, FacetsModule, RadioButtonModule, SliderModule, ToggleSwitchModule, TagInputModule, TypeaheadModule, NumberPickerModule } from '../../../dist/lib/index.js';

const ROUTES: Routes = [
  {
    path: 'checkboxes',
    component: CheckboxTestPageComponent
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
    BrowserModule,
    FormsModule,
    CheckboxModule,
    FacetsModule,
    RadioButtonModule,
    SliderModule,
    TagInputModule,
    TypeaheadModule,
    ToggleSwitchModule,
    NumberPickerModule,
    AccordionModule.forRoot(),
    RouterModule.forRoot(ROUTES)
  ],
  declarations: [
    AppComponent,
    CheckboxTestPageComponent,
    FacetCheckListTestPageComponent,
    FacetContainerTestPageComponent,
    FacetTypeaheadListPageComponent,
    RadioButtonsTestPageComponent,
    SlidersTestPageComponent,
    TagsTestPageComponent,
    ToggleSwitchesTestPageComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }