import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchBuilderComponent } from './search-builder.component';
import { SearchBuilderGroupComponent } from './search-builder-group/search-builder-group.component';
import { SearchTextComponent } from './search-components/search-text/search-text.component';
import { SearchBuilderOutletDirective } from './search-builder-outlet/search-builder-outlet.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SearchBuilderComponent,
    SearchBuilderGroupComponent
  ],
  declarations: [
    SearchBuilderComponent,
    SearchBuilderGroupComponent,
    SearchTextComponent,
    SearchBuilderOutletDirective
  ],
  entryComponents: [SearchTextComponent]
})
export class SearchBuilderModule { }
