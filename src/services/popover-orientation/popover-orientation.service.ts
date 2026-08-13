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

import { ViewportRuler } from '@angular/cdk/scrolling';
import { ElementRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResizeService } from '../../directives/resize/index';

@Injectable()
export class PopoverOrientationService {
  private readonly _resizeService = inject(ResizeService);

  private readonly _viewportRuler = inject(ViewportRuler);

  public createPopoverOrientationListener(
    element: ElementRef | HTMLElement,
    parentElement?: ElementRef | HTMLElement
  ): PopoverOrientationListener {
    const nativeElement = element instanceof ElementRef ? element.nativeElement : element;

    const nativeElementParent =
      parentElement instanceof ElementRef ? parentElement.nativeElement : element;

    return new PopoverOrientationListener(
      nativeElement,
      nativeElementParent,
      this._resizeService,
      this._viewportRuler
    );
  }
}

export class PopoverOrientationListener {
  /** Allow subscribing to state changes */
  orientation$ = new BehaviorSubject<PopoverOrientation>(1);

  /** Max value the height of the dropdown can be */
  maxHeight: number = 250;

  /** Store the last known position and size */
  private _rect: ClientRect;

  private readonly _onDestroy = new Subject<void>();

  constructor(
    private readonly _element: HTMLElement,
    private readonly _elementParent: HTMLElement,
    private readonly _resizeService: ResizeService,
    private readonly _viewportRuler: ViewportRuler
  ) {
    // watch for changes to the typeahead size
    this._resizeService
      .addResizeListener(this._element)
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.onScrollOrResize();
      });

    // watch for changes to the typeahead position when scrolling or resizing
    fromEvent(window, 'scroll', { passive: true })
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => this.onScrollOrResize());
    fromEvent(window, 'resize', { passive: true })
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => this.onScrollOrResize());
  }

  destroy(): void {
    this.orientation$.complete();
    this._onDestroy.next();
    this._onDestroy.complete();
    this._resizeService.removeResizeListener(this._element);
  }

  private onScrollOrResize() {
    this._rect = this._elementParent
      ? this._elementParent.parentElement.getBoundingClientRect()
      : this._element.parentElement.getBoundingClientRect();
    // use the maxHeight input value if the element does not exist yet to prevent the direction from immediately changing when opened
    const itemHeight = this._element.offsetHeight || this.maxHeight;
    const viewportSize = this._viewportRuler.getViewportSize();
    const bottomSpaceAvailable = viewportSize.height - this._rect.bottom - itemHeight;

    this.orientation$.next(
      bottomSpaceAvailable <= 0 ? PopoverOrientation.Up : PopoverOrientation.Down
    );
  }
}

export const enum PopoverOrientation {
  Up,
  Down,
}
