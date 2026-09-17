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

import { Injectable, OnDestroy, QueryList } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ResizableTableColumnComponent } from './resizable-table-column.component';

@Injectable()
export abstract class BaseResizableTableService implements OnDestroy {
  abstract type: ResizableTableType;

  /** Emit an event whenever a column is resized */
  onResize$ = new Subject<void>();

  /** Store the current width of the table */
  tableWidth: number = 0;

  /** Determine if we are currently resizing */
  isResizing$ = new BehaviorSubject<boolean>(false);

  /** Indicate when the columns are ready */
  isInitialised$ = new BehaviorSubject<boolean>(false);

  /** Store the percentage widths of each column */
  columns: ReadonlyArray<number> = [];

  abstract resizeColumn(index: number, delta: number, isDragging?: boolean): void;

  abstract setColumns(columns: QueryList<ResizableTableColumnComponent>): void;

  abstract setUniformWidths(): void;

  abstract getColumnDisabled(index: number): boolean;

  /** Cleanup when service is disposed */
  ngOnDestroy(): void {
    this.onResize$.complete();
  }

  /** Update the resizing state */
  setResizing(isResizing: boolean): void {
    this.isResizing$.next(isResizing);
  }

  /** Get the width of a column in a specific unit */
  getColumnWidth(
    index: number,
    unit: ColumnUnit,
    columns: ReadonlyArray<number> = this.columns
  ): number {
    switch (unit) {
      case ColumnUnit.Percentage:
        return columns[index];

      case ColumnUnit.Pixel:
        return (this.tableWidth / 100) * columns[index];
    }
  }
}

export enum ColumnUnit {
  Pixel,
  Percentage,
}

export enum ResizableTableType {
  Standard,
  Expand,
}
