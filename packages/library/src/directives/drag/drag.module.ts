import { NgModule } from '@angular/core';

import { DragDirective } from './drag.directive';

@NgModule({
    exports: [DragDirective],
    declarations: [DragDirective]
})
export class DragModule { }
