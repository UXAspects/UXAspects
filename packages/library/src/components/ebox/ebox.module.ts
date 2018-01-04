import { NgModule } from '@angular/core';

import { EboxComponent, EboxContentDirective, EboxHeaderDirective } from './ebox.component';

@NgModule({
    exports: [EboxComponent, EboxContentDirective, EboxHeaderDirective],
    declarations: [EboxComponent, EboxContentDirective, EboxHeaderDirective]
})
export class EboxModule { }
