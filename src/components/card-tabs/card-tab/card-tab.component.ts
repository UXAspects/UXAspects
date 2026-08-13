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

import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  inject,
  OnDestroy,
  TemplateRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CardTabsService } from '../card-tabs.service';
import { CardTabContentDirective } from './card-tab-content.directive';

@Component({
  selector: 'ux-card-tab',
  templateUrl: './card-tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe],
})
export class CardTabComponent implements OnDestroy {
  private readonly _tabService = inject(CardTabsService);

  active$: Observable<boolean> = this._tabService.tab$.pipe(map(tab => tab === this));
  @ContentChild(CardTabContentDirective, { read: TemplateRef, static: false })
  content: TemplateRef<void>;

  constructor() {
    this._tabService.addTab(this);
  }

  ngOnDestroy(): void {
    this._tabService.removeTab(this);
  }
}
