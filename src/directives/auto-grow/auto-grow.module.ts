import { NgModule } from '@angular/core';

import { AutoGrowDirective } from './auto-grow.directive';

@NgModule({
    exports: [AutoGrowDirective],
    declarations: [AutoGrowDirective]
})
export class AutoGrowModule { }
