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

import { DOWN_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { RowSelectionStrategy } from './row-selection.strategy';

export class RowAltSelectionStrategy<T> extends RowSelectionStrategy<T> {
  keydown(event: KeyboardEvent, data: T): void {
    switch (event.which) {
      case UP_ARROW:
      case DOWN_ARROW:
        event.preventDefault();
        this.handleCursorKey(event, data);
        break;

      case SPACE:
        event.preventDefault();
        this.selectionService.strategy.toggle(data);
        break;
    }
  }

  /**
   * Select the sibling item when arrow keys are pressed
   */
  private handleCursorKey(event: KeyboardEvent, data: T): void {
    // determine which modifier keys are pressed
    const { ctrlKey, shiftKey } = event;

    // if no modifier keys are pressed then deselect all and clear the selection
    if (!ctrlKey && !shiftKey) {
      this.deselectAll();
      this.clearSelection(false);
    }

    if (ctrlKey) {
      this.selectionService.activateSibling(event.which === UP_ARROW);
    } else {
      const sibling = this.selectionService.getSibling(event.which === UP_ARROW);
      this.multipleSelect(sibling ? sibling : data);
    }
  }
}
