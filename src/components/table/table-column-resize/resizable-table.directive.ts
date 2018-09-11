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

  constructor(private _elementRef: ElementRef<HTMLTableElement>, private _table: ResizableTableService) { }

  ngAfterViewInit(): void {
    this._table.setTable(this._elementRef.nativeElement);
    this._table.setColumns(this.columns);
  }
}