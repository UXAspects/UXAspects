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
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  Input,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { tick } from '../../../common/index';
import { FocusIndicator, FocusIndicatorService } from '../../../directives/accessibility/index';
import { SelectionService } from '../../../directives/selection/selection.service';

@Component({
  selector: 'ux-select-list-item',
  templateUrl: './select-list-item.component.html',
  host: {
    role: 'listitem',
  },
})
export class SelectListItemComponent<T> implements OnDestroy {
  private readonly _selection = inject<SelectionService<T>>(SelectionService);

  readonly elementRef = inject(ElementRef);

  readonly focusIndicatorService = inject(FocusIndicatorService);

  /** This should define the data this item represents. This value will appear in the selected array whenever this item is selected. */
  @Input() data: T;

  @HostBinding('tabindex') tabindex: number = -1;

  @HostBinding('class.selected')
  @HostBinding('attr.aria-selected')
  set selected(isSelected: boolean) {
    isSelected ? this._selection.select(this.data) : this._selection.deselect(this.data);
  }

  get selected(): boolean {
    return this._selection.isSelected(this.data);
  }

  /** Store a reference to the focus indicator instance */
  private readonly _focusIndicator: FocusIndicator;

  /** Unsubscribe from all subscriptions on destroy */
  private readonly _onDestroy = new Subject<void>();

  constructor() {
    // create the focus indicator
    this._focusIndicator = this.focusIndicatorService.monitor(this.elementRef.nativeElement);

    this._selection.active$
      .pipe(
        takeUntil(this._onDestroy),
        filter(data => data === this.data)
      )
      .subscribe(active => {
        this._selection.focus$.next(active);
        this.elementRef.nativeElement.focus();
      });

    // make this item tabbable or not based on the focused element
    this._selection.focus$
      .pipe(takeUntil(this._onDestroy), tick())
      .subscribe(focused => (this.tabindex = focused === this.data ? 0 : -1));
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
    this._focusIndicator.destroy();
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this._selection.strategy.mousedown(event, this.data);
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    this._selection.strategy.click(event, this.data);
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    this._selection.strategy.keydown(event, this.data);
  }
}
