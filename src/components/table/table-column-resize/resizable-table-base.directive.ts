///
/// Copyright 2015-2026 Micro Focus or one of its affiliates.
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///      http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import { Directive, ElementRef, inject, OnDestroy, QueryList, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResizeService } from '../../../directives/resize';
import { ResizableTableColumnComponent } from './resizable-table-column.component';
import { RESIZABLE_TABLE_SERVICE_TOKEN } from './resizable-table-service.token';

@Directive()
export abstract class BaseResizableTableDirective implements OnDestroy {
  protected readonly _table = inject(RESIZABLE_TABLE_SERVICE_TOKEN);

  protected readonly _elementRef = inject<ElementRef<HTMLTableElement>>(ElementRef);

  protected readonly _renderer = inject(Renderer2);

  readonly resize = inject(ResizeService);

  columns: QueryList<ResizableTableColumnComponent>;

  /** Unsubscribe from the observables */
  protected _onDestroy = new Subject<void>();

  /** Store the initialised state of the table */
  protected _initialised: boolean = false;

  constructor() {
    // watch for the table being resized
    this.resize
      .addResizeListener(this._elementRef.nativeElement)
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        // store the latest table size
        this._table.tableWidth = this.getScrollWidth();

        // run the initial logic if the table is fully visible
        this.onTableReady();
      });
  }

  /** Cleanup after the component is destroyed */
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /** Set all resizable columns to the same width */
  setUniformWidths(): void {
    this._table.setUniformWidths();
  }

  /** Get the smallest tbody width taking into account scrollbars (uxFixedHeaderTable) */
  protected getScrollWidth(): number {
    return Array.from((this._elementRef.nativeElement as HTMLTableElement).tBodies).reduce(
      (width, tbody) => Math.min(width, tbody.scrollWidth),
      (this._elementRef.nativeElement as HTMLTableElement).offsetWidth
    );
  }

  abstract onTableReady(): void;
}
