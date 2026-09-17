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
import { BehaviorSubject, Subject } from 'rxjs';
import { FilterAddEvent } from './events/filter-add-event';
import { FilterEvent } from './events/filter-event';
import { FilterRemoveAllEvent } from './events/filter-remove-all-event';
import { FilterRemoveEvent } from './events/filter-remove-event';
import { Filter } from './interfaces/filter.interface';

@Injectable()
export class FilterService {
  /** The list of active filters */
  filters$ = new BehaviorSubject<Filter[]>([]);

  /** Emit all the events when they occur */
  events$ = new Subject<FilterEvent>();

  add(filter: Filter): void {
    // if the filter is already selected or it is the intial filter then do nothing
    if (this.isSelected(filter) || filter.initial) {
      return;
    }

    // update the list of active filters
    this.filters$.next([...this.filters$.value, filter]);

    // emit the event
    this.events$.next(new FilterAddEvent(filter));
  }

  remove(filter: Filter): void {
    // if the filter is not selected then do nothing
    if (!this.isSelected(filter)) {
      return;
    }

    // update the list of active filters
    this.filters$.next(this.filters$.value.filter(_filter => _filter !== filter));

    // emit the event
    this.events$.next(new FilterRemoveEvent(filter));
  }

  removeAll(): void {
    // empty the list of active filters
    this.filters$.next([]);

    // emit the event
    this.events$.next(new FilterRemoveAllEvent());
  }

  isSelected(filter: Filter): boolean {
    return this.filters$.value.indexOf(filter) > -1;
  }
}
