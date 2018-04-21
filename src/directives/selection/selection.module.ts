import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SelectionItemDirective } from './selection-item.directive';
import { SelectionDirective } from './selection.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SelectionDirective, SelectionItemDirective],
  exports: [SelectionDirective, SelectionItemDirective]
})
export class SelectionModule { }
