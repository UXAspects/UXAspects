import { NgModule } from '@angular/core';

import { ResizeDirective } from './resize.directive';
import { ResizeService } from './resize.service';

@NgModule({
    exports: [ResizeDirective],
    declarations: [ResizeDirective],
    providers: [ResizeService]
})
export class ResizeModule { }
