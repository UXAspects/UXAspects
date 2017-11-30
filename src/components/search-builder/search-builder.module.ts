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
import { PopoverModule } from 'ngx-bootstrap/popover';
import { SearchDateRangeComponent } from './search-components/date-range/date-range.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DateTimePickerModule,
    PopoverModule
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
    BaseSearchComponent
  ],
  entryComponents: [
    SearchTextComponent,
    SearchDateComponent,
    SearchDateRangeComponent
  ]
})
export class SearchBuilderModule { }
