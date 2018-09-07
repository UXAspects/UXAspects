import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DragModule } from '../../directives/drag/index';
import { ResizableTableColumnComponent } from './table-column-resize/resizable-table-column.component';
import { ResizableTableDirective } from './table-column-resize/resizable-table.directive';

@NgModule({
    imports: [
        CommonModule,
        DragModule
    ],
    declarations: [
        ResizableTableDirective,
        ResizableTableColumnComponent
    ],
    exports: [
        ResizableTableDirective,
        ResizableTableColumnComponent
    ]
})
export class TableModule {}