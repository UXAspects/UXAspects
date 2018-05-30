import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchBuilderComponent } from './search-builder.component';
import { SearchBuilderGroupComponent } from './search-builder-group/search-builder-group.component';
import { SearchTextComponent } from './search-components/text/text.component';
import { SearchDateComponent } from './search-components/date/date.component';
import { SearchBuilderOutletDirective } from './search-builder-outlet/search-builder-outlet.directive';
import { BaseSearchComponent } from './search-components/base-search.component';
import { DateTimePickerModule } from '../date-time-picker/date-time-picker.module';
import { SearchDateRangeComponent } from './search-components/date-range/date-range.component';
import { SearchSelectComponent } from './search-components/select/select.component';
import { SelectModule } from '../select/index';
import { PopoverModule } from '../popover/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DateTimePickerModule,
    PopoverModule,
    SelectModule
  ],
  exports: [
    SearchBuilderComponent,
    SearchBuilderGroupComponent,
    BaseSearchComponent
  ],
  declarations: [
    SearchBuilderComponent,
    SearchBuilderGroupComponent,
    SearchTextComponent,
    SearchDateComponent,
    SearchDateRangeComponent,
    SearchBuilderOutletDirective,
    SearchSelectComponent,
    BaseSearchComponent
  ],
  entryComponents: [
    SearchTextComponent,
    SearchDateComponent,
    SearchDateRangeComponent,
    SearchSelectComponent
  ]
})
export class SearchBuilderModule { }
