import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TreeGridRowDirective } from './tree-grid-row.directive';
import { TreeGridDirective } from './tree-grid.directive';

@NgModule({
    declarations: [
        TreeGridDirective,
        TreeGridRowDirective,
    ],
    exports: [
        TreeGridDirective,
        TreeGridRowDirective,
    ]
})
export class TreeGridModule {}
