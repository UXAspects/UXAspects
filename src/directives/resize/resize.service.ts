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

import { inject, Injectable, NgZone, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class ResizeService implements OnDestroy {
  private readonly _zone = inject(NgZone);

  private readonly _observer = new ResizeObserver(this.elementDidResize.bind(this));

  private readonly _targets = new WeakMap<HTMLElement, ReplaySubject<ResizeDimensions>>();

  ngOnDestroy(): void {
    this._observer.disconnect();
  }

  addResizeListener(target: HTMLElement): ReplaySubject<ResizeDimensions> {
    this._zone.runOutsideAngular(() => this._observer.observe(target));

    if (this._targets.has(target)) {
      return this._targets.get(target);
    } else {
      const emitter = new ReplaySubject<ResizeDimensions>();
      this._targets.set(target, emitter);
      return emitter;
    }
  }

  removeResizeListener(target: HTMLElement): void {
    this._observer.unobserve(target);
  }

  private elementDidResize(entries: ResizeObserverEntry[]): void {
    this._zone.run(() => {
      for (const entry of entries) {
        if (this._targets.has(entry.target as HTMLElement)) {
          const emitter = this._targets.get(entry.target as HTMLElement);
          emitter.next({
            width: (entry.target as HTMLElement).offsetWidth,
            height: (entry.target as HTMLElement).offsetHeight,
          });
        }
      }
    });
  }
}

export interface ResizeDimensions {
  width: number;
  height: number;
}
