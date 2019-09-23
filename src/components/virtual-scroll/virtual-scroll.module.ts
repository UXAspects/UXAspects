import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { ResizeModule } from '../../directives/resize/index';
import { VirtualForContainerComponent } from './virtual-for/virtual-for.component';
import { VirtualForDirective } from './virtual-for/virtual-for.directive';
import { VirtualScrollCellDirective } from './virtual-scroll/directives/virtual-scroll-cell.directive';
import { VirtualScrollLoadButtonDirective } from './virtual-scroll/directives/virtual-scroll-load-button.directive';
import { VirtualScrollLoadingDirective } from './virtual-scroll/directives/virtual-scroll-loading.directive';
import { VirtualScrollComponent } from './virtual-scroll/virtual-scroll.component';


const DECLARATIONS = [
    VirtualScrollComponent,
    VirtualScrollLoadingDirective,
    VirtualScrollLoadButtonDirective,
    VirtualScrollCellDirective,
    VirtualForContainerComponent,
    VirtualForDirective,
];

@NgModule({
    imports: [
        AccessibilityModule,
        CommonModule,
        ResizeModule
    ],
    exports: DECLARATIONS,
    declarations: DECLARATIONS
})
export class VirtualScrollModule { }
