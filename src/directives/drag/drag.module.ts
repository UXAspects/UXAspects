import { NgModule } from '@angular/core';
import { DragDirective } from './drag.directive';
import { DragService } from './drag.service';
import { DropDirective } from './drop.directive';

@NgModule({
    exports:      [DragDirective, DropDirective],
    declarations: [DragDirective, DropDirective],
    providers:    [DragService]
})
export class DragModule { }
