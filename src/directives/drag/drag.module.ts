import { NgModule } from '@angular/core';
import { DragDirective } from './drag.directive';
import { DropDirective } from './drop.directive';

@NgModule({
  imports: [DragDirective, DropDirective],
  exports: [DragDirective, DropDirective],
})
export class DragModule {}
