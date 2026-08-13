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

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const UNSET_FOCUS: SearchBuilderFocus = { groupId: null, index: -1 };

@Injectable({
  providedIn: 'root',
})
export class SearchBuilderFocusService {
  focus$ = new BehaviorSubject<SearchBuilderFocus>(UNSET_FOCUS);

  /**
   * Set focus on a search builder component.
   * @param groupId The `id` of the group containing the component.
   * @param index The (zero-based) index of the component.
   */
  setFocus(groupId: string, index: number): void {
    this.focus$.next({ groupId, index });
  }

  /**
   * Removes focus from all components. If focus is not on a search builder component, this does nothing.
   */
  clearFocus(): void {
    this.focus$.next(UNSET_FOCUS);
  }
}

export interface SearchBuilderFocus {
  groupId: string;
  index: number;
}
