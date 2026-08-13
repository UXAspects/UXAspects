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

import { FocusOrigin } from '@angular/cdk/a11y';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FocusIndicatorOriginService {
  /** Store the most recent origin event */
  private _origin: FocusOrigin;

  /** Store the event source origin */
  setOrigin(origin: FocusOrigin): void {
    this._origin = origin;
  }

  /** Get the most recent event origin */
  getOrigin(): FocusOrigin | null {
    // get the most recent origin if there is one
    const origin = this._origin;

    // we should clear the origin so this value doesn't cause issues with future focus events
    this._origin = null;

    return origin;
  }
}
