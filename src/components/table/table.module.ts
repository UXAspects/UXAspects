import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DragModule } from '../../directives/drag/index';
import { ResizeModule } from '../../directives/resize/index';
import { ResizableTableCellDirective } from './table-column-resize/resizable-table-cell.directive';
import { ResizableTableColumnComponent } from './table-column-resize/resizable-table-column.component';
import { ResizableTableDirective } from './table-column-resize/resizable-table.directive';

@NgModule({
    imports: [
        CommonModule,
        DragModule,
        ResizeModule
    ],
    declarations: [
        ResizableTableDirective,
        ResizableTableColumnComponent,
        ResizableTableCellDirective
    ],
    exports: [
        ResizableTableDirective,
        ResizableTableColumnComponent,
        ResizableTableCellDirective
    ]
})
export class TableModule {}
