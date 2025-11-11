import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToolbarSearchButtonDirective } from './toolbar-search-button.directive';
import { ToolbarSearchFieldDirective } from './toolbar-search-field.directive';
import { ToolbarSearchComponent } from './toolbar-search.component';

const DECLARATIONS = [
  ToolbarSearchComponent,
  ToolbarSearchFieldDirective,
  ToolbarSearchButtonDirective,
];

@NgModule({
  imports: [CommonModule, ...DECLARATIONS],
  exports: DECLARATIONS,
  providers: [],
})
export class ToolbarSearchModule {}
