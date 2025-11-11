import { NgModule } from '@angular/core';
import { SelectionItemDirective } from './selection-item.directive';
import { SelectionDirective } from './selection.directive';

@NgModule({
  imports: [SelectionDirective, SelectionItemDirective],
  exports: [SelectionDirective, SelectionItemDirective],
})
export class SelectionModule {}
