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

import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DragService<T = unknown> implements OnDestroy {
  /** Emit when dragging begins */
  onDragStart = new Subject<UxDragEvent<T>>();

  /** Emit when dragging moves */
  onDrag = new Subject<UxDragEvent<T>>();

  /** Emit when dragging ends */
  onDragEnd = new Subject<UxDragEvent<T>>();

  /** Emit when the user is dragging over the drop area */
  onDropEnter = new Subject<void>();

  /** Emit when the user is dragging out of the drop area */
  onDropLeave = new Subject<void>();

  /** Emit when a drop occurs */
  onDrop = new Subject<T>();

  /** Destroy all observables */
  ngOnDestroy(): void {
    this.onDragStart.complete();
    this.onDrag.complete();
    this.onDragEnd.complete();
    this.onDrop.complete();
    this.onDropEnter.complete();
    this.onDropLeave.complete();
  }
}

export type UxDragEvent<T = unknown> = { group?: string; event?: MouseEvent; data?: T };
