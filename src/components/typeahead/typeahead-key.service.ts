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

import { DOWN_ARROW, ENTER, ESCAPE, UP_ARROW } from '@angular/cdk/keycodes';
import { Injectable } from '@angular/core';
import { TypeaheadComponent } from './typeahead.component';

@Injectable({
  providedIn: 'root',
})
export class TypeaheadKeyService<T = unknown> {
  handleKey(event: KeyboardEvent, typeahead: TypeaheadComponent<T>): void {
    if (!typeahead) {
      return;
    }

    switch (event.keyCode) {
      case UP_ARROW:
        if (!typeahead.open) {
          typeahead.open = true;
        } else {
          typeahead.moveHighlight(-1);
        }
        event.preventDefault();
        break;

      case DOWN_ARROW:
        if (!typeahead.open) {
          typeahead.open = true;
        } else {
          typeahead.moveHighlight(1);
        }
        event.preventDefault();
        break;

      case ESCAPE:
        typeahead.open = false;
        break;

      case ENTER:
        if (typeahead.selectOnEnter) {
          typeahead.selectHighlighted();
        }
    }
  }
}
