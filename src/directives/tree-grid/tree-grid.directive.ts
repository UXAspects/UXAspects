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

import {
  ChangeDetectorRef,
  Directive,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TreeGridItem } from './tree-grid-item.interface';
import { TreeGridLoadFunction } from './tree-grid-load-function.type';
import { TreeGridService } from './tree-grid.service';

@Directive({
  selector: '[uxTreeGrid]',
  providers: [TreeGridService],
  host: {
    class: 'treegrid',
  },
})
export class TreeGridDirective implements OnInit, OnDestroy {
  private readonly _changeDetector = inject(ChangeDetectorRef);

  private readonly _treeGridService = inject(TreeGridService);

  @Input('uxTreeGrid')
  set data(data: TreeGridItem[]) {
    this._treeGridService.data$.next(data);
  }

  @Input()
  set loadChildren(loadChildren: TreeGridLoadFunction) {
    this._treeGridService.loadChildren = loadChildren;
  }

  @Output()
  rowsChange = new EventEmitter<TreeGridItem[]>();

  private readonly _onDestroy = new Subject<void>();

  ngOnInit(): void {
    this._treeGridService.rows$.pipe(takeUntil(this._onDestroy)).subscribe(rows => {
      this.rowsChange.emit(rows);
      this._changeDetector.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
