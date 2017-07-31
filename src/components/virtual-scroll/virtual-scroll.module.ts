import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VirtualScrollComponent } from './virtual-scroll.component';
import { ResizeModule } from '../../directives/resize/index';
import { VirtualScrollLoadingDirective } from './directives/virtual-scroll-loading.directive';
import { VirtualScrollLoadButtonDirective } from './directives/virtual-scroll-load-button.directive';
import { VirtualScrollCellDirective } from './directives/virtual-scroll-cell.directive';

const DECLARATIONS = [
    VirtualScrollComponent,
    VirtualScrollLoadingDirective,
    VirtualScrollLoadButtonDirective,
    VirtualScrollCellDirective
];

@NgModule({
    imports: [
        CommonModule,
        ResizeModule
    ],
    exports: DECLARATIONS,
    declarations: DECLARATIONS
})
export class VirtualScrollModule { }
