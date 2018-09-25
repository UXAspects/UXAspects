import { NgModule } from '@angular/core';
import { TreeGridIndentDirective } from './tree-grid-indent.directive';
import { TreeGridRowDirective } from './tree-grid-row.directive';
import { TreeGridDirective } from './tree-grid.directive';

@NgModule({
    declarations: [
        TreeGridDirective,
        TreeGridRowDirective,
        TreeGridIndentDirective
    ],
    exports: [
        TreeGridDirective,
        TreeGridRowDirective,
        TreeGridIndentDirective
    ]
})
export class TreeGridModule {}
