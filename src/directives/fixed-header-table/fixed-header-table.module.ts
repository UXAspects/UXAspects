import { NgModule } from '@angular/core';
import { ResizeModule } from '../resize/index';
import { FixedHeaderTableDirective } from './fixed-header-table.directive';

@NgModule({
    imports: [
        ResizeModule
    ],
    exports: [
        FixedHeaderTableDirective
    ],
    declarations: [
        FixedHeaderTableDirective
    ]
})
export class FixedHeaderTableModule { }
