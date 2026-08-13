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

@Injectable({
  providedIn: 'root',
})
export class HelpCenterService {
  items: BehaviorSubject<HelpCenterItem[]> = new BehaviorSubject<HelpCenterItem[]>([]);

  registerItem(item: HelpCenterItem): void {
    // get the current items
    const items = this.items.getValue();

    // add the new item to the list
    items.push(item);

    // update the observable
    this.items.next(items);
  }

  unregisterItem(item: HelpCenterItem): void {
    // get the current items
    let items = this.items.getValue();

    // remove the item being unregistered
    items = items.filter(itm => itm !== item);

    // update the observable
    this.items.next(items);
  }
}

export interface HelpCenterItem {
  icon?: string;
  title: string;
  select?: () => void;
}
