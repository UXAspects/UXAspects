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
import { SelectionStrategy } from './selection.strategy';

export class SimpleSelectionStrategy<T> extends SelectionStrategy<T> {
  /**
   * When the item is clicked simply toggle the current selected state
   */
  click(_event: MouseEvent, data: T): void {
    this.toggle(data);
  }

  /**
   * Add basic keyboard support for navigating
   * and selecting/deselecting items
   */
  keydown(event: KeyboardEvent, data: T): void {
    switch (event.which) {
      case UP_ARROW:
        event.preventDefault();
        this.selectionService.activateSibling(true);
        return;

      case DOWN_ARROW:
        event.preventDefault();
        this.selectionService.activateSibling(false);
        return;

      case SPACE:
        event.preventDefault();
        return this.toggle(data);
    }
  }

  /**
   * Override the standard toggle function to always activate the item
   */
  toggle(data: T): void {
    super.toggle(data);
    this.selectionService.activate(data);
  }
}
