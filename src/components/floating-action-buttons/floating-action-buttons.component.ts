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

import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { NgClass, AsyncPipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnDestroy,
  Output,
  QueryList,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FloatingActionButtonComponent } from './floating-action-button.component';
import {
  FloatingActionButtonDirection,
  FloatingActionButtonsService,
} from './floating-action-buttons.service';

@Component({
  selector: 'ux-floating-action-buttons',
  templateUrl: './floating-action-buttons.component.html',
  providers: [FloatingActionButtonsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  animations: [
    trigger('fabAnimation', [
      transition('void => true', [
        query('ux-floating-action-button', style({ opacity: 0 })),
        query('ux-floating-action-button', stagger(50, animate(250, style({ opacity: 1 })))),
      ]),
      transition('true => void', [
        query('ux-floating-action-button', stagger(-50, animate(250, style({ opacity: 0 })))),
      ]),
    ]),
  ],
  imports: [NgClass, AsyncPipe],
})
export class FloatingActionButtonsComponent implements AfterViewInit, OnDestroy {
  readonly fab = inject(FloatingActionButtonsService);

  private readonly _elementRef = inject(ElementRef);

  /** Specify the direction that the FAB should display */
  @Input() set direction(direction: FloatingActionButtonDirection) {
    this.fab.direction$.next(direction);
  }

  /** Emit whenever the open state changes */
  @Output() openChange = new EventEmitter<boolean>();

  /** Get all child FAB buttons */
  @ContentChildren(FloatingActionButtonComponent) buttons: QueryList<FloatingActionButtonComponent>;

  private readonly _subscription: Subscription = new Subscription();

  constructor() {
    this._subscription.add(this.fab.open$.subscribe(value => this.openChange.emit(value)));
  }

  ngAfterViewInit(): void {
    this.fab.setButtons(this.buttons);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  /*
   * Detect any clicks to trigger close of the menu
   */
  @HostListener('document:click', ['$event.target']) close(target: HTMLElement): void {
    if (!this._elementRef.nativeElement.contains(target)) {
      this.fab.close();
    }
  }
}
