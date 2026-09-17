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

import { Directive, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { PageHeaderService } from '../../page-header.service';
import { PageHeaderNavigationItem } from '../navigation.component';

@Directive({ selector: '[uxPageHeaderNavigationSecondaryItem]' })
export class PageHeaderNavigationSecondaryItemDirective implements OnInit, OnDestroy {
  private readonly _pageHeaderService = inject(PageHeaderService);

  @Input('uxPageHeaderNavigationSecondaryItem')
  item: PageHeaderNavigationItem;

  private readonly _onDestroy = new Subject<void>();

  ngOnInit() {
    this._pageHeaderService.selected$.pipe(delay(0), takeUntil(this._onDestroy)).subscribe(next => {
      // Update selected state for this item
      this._pageHeaderService.updateItem(this.item, next);
    });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
