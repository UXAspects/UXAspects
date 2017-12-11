import { NgModule } from '@angular/core';

import { FixedHeaderTableDirective } from './fixed-header-table.directive';

@NgModule({
    exports: [FixedHeaderTableDirective],
    declarations: [FixedHeaderTableDirective]
})
export class FixedHeaderTableModule { }
