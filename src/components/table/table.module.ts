import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { DragModule } from '../../directives/drag/index';
import { ReorderableModule } from '../../directives/reorderable/index';
import { ResizeModule } from '../../directives/resize/index';
import { SelectionModule } from '../../directives/selection/index';
import { IconModule } from '../icon/index';
import { ColumnPickerComponent } from './column-picker/column-picker.component';
import { ResizableTableCellDirective } from './table-column-resize/resizable-table-cell.directive';
import { ResizableTableColumnComponent } from './table-column-resize/resizable-table-column.component';
import { ResizableExpandingTableDirective } from './table-column-resize/table-column-resize-expanding/resizable-expanding-table.directive';
import { ResizableTableDirective } from './table-column-resize/table-column-resize-standard/resizable-table.directive';
import { CdkTreeModule } from '@angular/cdk/tree';

@NgModule({
    imports: [
        A11yModule,
        AccessibilityModule,
        CommonModule,
        DragModule,
        IconModule,
        ResizeModule,
        ReorderableModule,
        SelectionModule,
        CdkTreeModule
    ],
    declarations: [
        ResizableTableDirective,
        ResizableExpandingTableDirective,
        ResizableTableColumnComponent,
        ResizableTableCellDirective,
        ColumnPickerComponent,
    ],
    exports: [
        ResizableTableDirective,
        ResizableExpandingTableDirective,
        ResizableTableColumnComponent,
        ResizableTableCellDirective,
        ColumnPickerComponent,
    ]
})
export class TableModule { }
