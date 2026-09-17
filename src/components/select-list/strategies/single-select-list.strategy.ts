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

import { DOWN_ARROW, ENTER, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { SelectionStrategy } from '../../../directives/selection/index';

export class SingleSelectListStrategy<T> extends SelectionStrategy<T> {
  click(_event: MouseEvent, data: T): void {
    // activate the clicked item
    this.selectionService.activate(data);

    // toggle the selected state of the item
    if (!this.selectionService.isSelected(data)) {
      this.selectOnly(data);
    } else {
      this.deselect(data);
    }
  }

  keydown(event: KeyboardEvent, data: T): void {
    switch (event.which) {
      case UP_ARROW: {
        event.preventDefault();
        this.selectionService.activateSibling(true);
        break;
      }

      case DOWN_ARROW: {
        event.preventDefault();
        this.selectionService.activateSibling(false);
        break;
      }

      case SPACE:
      case ENTER:
        event.preventDefault();
        this.click(null, data);
        break;
    }
  }
}
