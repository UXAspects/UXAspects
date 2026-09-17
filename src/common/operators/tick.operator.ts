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

import { Observable } from 'rxjs';

/**
 * This is a simple RxJS operator to allow us to avoid the
 * "expression has changed after it was checked issue"
 * by making the subscription asynchronous. We could just use a
 * delay operator but this uses a timeout which is significantly
 * slower than using requestAnimationFrame.
 */
export const tick =
  <T>() =>
  (source: Observable<T>) =>
    new Observable<T>(subscriber => {
      source.subscribe({
        next(value: T) {
          requestAnimationFrame(() => subscriber.next(value));
        },
        error(err: unknown) {
          subscriber.error(err);
        },
        complete() {
          subscriber.complete();
        },
      });
    });
