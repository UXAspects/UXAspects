import { A11yModule } from '@angular/cdk/a11y';
import { CdkTreeModule } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { DragModule } from '../../directives/drag/index';
import { ReorderableModule } from '../../directives/reorderable/index';
import { ResizeModule } from '../../directives/resize/index';
import { SelectionModule } from '../../directives/selection/index';
import { IconModule } from '../icon/index';
import { ColumnPickerComponent } from './column-picker/column-picker.component';
import { ResizableTableCellComponent } from './table-column-resize/resizable-table-cell.component';
import { ResizableTableColumnComponent } from './table-column-resize/resizable-table-column.component';
import { ResizableExpandingTableDirective } from './table-column-resize/table-column-resize-expanding/resizable-expanding-table.directive';
import { ResizableTableDirective } from './table-column-resize/table-column-resize-standard/resizable-table.directive';

@NgModule({
    imports: [
        A11yModule,
        AccessibilityModule,
        CdkTreeModule,
        CommonModule,
        DragModule,
        IconModule,
        ResizeModule,
        ReorderableModule,
        SelectionModule,
    ],
    declarations: [
        ColumnPickerComponent,
        ResizableTableDirective,
        ResizableExpandingTableDirective,
        ResizableTableColumnComponent,
        ResizableTableCellComponent,
    ],
    exports: [
        ColumnPickerComponent,
        ResizableTableDirective,
        ResizableExpandingTableDirective,
        ResizableTableColumnComponent,
        ResizableTableCellComponent,
    ]
})
export class TableModule { }
