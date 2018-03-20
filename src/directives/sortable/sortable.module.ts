import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortableDirective } from './sortable.directive';
import { SortableHandleDirective } from './sortable-handle.directive';
import { SortableModelDirective } from './sortable-model.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SortableDirective,
    SortableHandleDirective,
    SortableModelDirective
  ],
  exports: [
    SortableDirective,
    SortableHandleDirective,
    SortableModelDirective
  ]
})
export class SortableModule {}
