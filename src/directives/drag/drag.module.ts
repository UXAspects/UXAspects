import { NgModule } from '@angular/core';
import { DragDirective } from './drag.directive';
import { DropDirective } from './drop.directive';

@NgModule({
    exports: [DragDirective, DropDirective],
    declarations: [DragDirective, DropDirective]
})
export class DragModule {}
