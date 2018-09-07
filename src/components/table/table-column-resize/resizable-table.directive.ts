import { AfterViewInit, ContentChildren, Directive, ElementRef, QueryList } from '@angular/core';
import { ResizableTableColumnComponent } from './resizable-table-column.component';
import { ResizableTableService } from './resizable-table.service';

@Directive({
  selector: '[uxResizableTable]',
  providers: [ResizableTableService],
  host: {
    class: 'ux-resizable-table'
  }
})
export class ResizableTableDirective implements AfterViewInit {

  @ContentChildren(ResizableTableColumnComponent) columns: QueryList<ResizableTableColumnComponent>;

  constructor(elementRef: ElementRef<HTMLTableElement>, private _table: ResizableTableService) {
    _table.setTable(elementRef.nativeElement);
  }

  ngAfterViewInit(): void {
    this._table.setColumns(this.columns);
  }
}