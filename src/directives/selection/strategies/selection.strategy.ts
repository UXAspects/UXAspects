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

import { SelectionService } from '../selection.service';

export class SelectionStrategy<T = any> {
  constructor(protected selectionService?: SelectionService<T>) {}

  setSelectionService(selectionService: SelectionService<T>): void {
    this.selectionService = selectionService;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  mousedown(event: MouseEvent, data: T): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  click(event: MouseEvent, data: T): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  keydown(event: KeyboardEvent, data: T): void {}

  /**
   * Select the item - default behavior
   */
  select(...data: T[]): void {
    this.selectionService.select(...data);
  }

  /**
   * Replace the current selection with the list of items specified
   */
  selectOnly(...data: T[]): void {
    this.selectionService.selectOnly(...data);
  }

  /**
   * Toggle the item's selected state - default behavior
   */
  toggle(...data: T[]): void {
    this.selectionService.toggle(...data);
  }

  /**
   * Deselect the item - default behavior
   */
  deselect(...data: T[]): void {
    this.selectionService.deselect(...data);
  }

  /**
   * Select all items - default behavior
   */
  selectAll(): void {
    this.select(...this.selectionService.dataset);
  }

  /**
   * Deselect all items - default behavior
   */
  deselectAll(): void {
    // call deselect on all items in the dataset
    this.selectionService.deselectAll();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  destroy(): void {}
}
