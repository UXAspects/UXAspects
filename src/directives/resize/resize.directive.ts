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

import {
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ResizeDimensions, ResizeService } from './resize.service';

@Directive({
  selector: '[uxResize]',
  providers: [ResizeService],
})
export class ResizeDirective implements OnInit, OnDestroy {
  private readonly _elementRef = inject(ElementRef);

  private readonly _resizeService = inject(ResizeService);

  private readonly _ngZone = inject(NgZone);

  /** Debounce the resize event emitter */
  @Input() throttle: number = 0;

  /** Emits whenever a resize event occurs */
  @Output() uxResize: EventEmitter<ResizeDimensions> = new EventEmitter<ResizeDimensions>();

  /** Remove all subscriptions on component destroy */
  private readonly _onDestroy = new Subject<void>();

  ngOnInit(): void {
    this._resizeService
      .addResizeListener(this._elementRef.nativeElement)
      .pipe(takeUntil(this._onDestroy), debounceTime(this.throttle))
      .subscribe((event: ResizeDimensions) => this._ngZone.run(() => this.uxResize.emit(event)));
  }

  ngOnDestroy(): void {
    this._resizeService.removeResizeListener(this._elementRef.nativeElement);
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
