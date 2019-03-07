import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { DragModule } from '../../directives/drag/index';
import { ReorderableModule } from '../../directives/reorderable/index';
import { ResizeModule } from '../../directives/resize/index';
import { SelectionModule } from '../../directives/selection/index';
import { ColumnPickerComponent } from './column-picker/column-picker.component';
import { ResizableTableCellDirective } from './table-column-resize/resizable-table-cell.directive';
import { ResizableTableColumnComponent } from './table-column-resize/resizable-table-column.component';
import { ResizableTableDirective } from './table-column-resize/resizable-table.directive';

@NgModule({
    imports: [
        A11yModule,
        AccessibilityModule,
        CommonModule,
        DragModule,
        ResizeModule,
        ReorderableModule,
        SelectionModule
    ],
    declarations: [
        ResizableTableDirective,
        ResizableTableColumnComponent,
        ResizableTableCellDirective,
        ColumnPickerComponent
    ],
    exports: [
        ResizableTableDirective,
        ResizableTableColumnComponent,
        ResizableTableCellDirective,
        ColumnPickerComponent
    ]
})
export class TableModule { }
