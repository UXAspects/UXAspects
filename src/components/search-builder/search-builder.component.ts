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

import { Component, EventEmitter, inject, Input, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { SearchBuilderComponentDefinition } from './interfaces/component-definition.interface';
import { SearchBuilderQuery } from './interfaces/query.interface';
import { SearchBuilderService } from './search-builder.service';

@Component({
  selector: 'ux-search-builder',
  templateUrl: './search-builder.component.html',
  providers: [SearchBuilderService],
})
export class SearchBuilderComponent implements OnDestroy {
  private readonly _searchBuilderService = inject(SearchBuilderService);

  @Input()
  set components(components: SearchBuilderComponentDefinition[]) {
    this._searchBuilderService.registerComponents(components);
  }

  @Input()
  set query(value: SearchBuilderQuery) {
    this._searchBuilderService.setQuery(value);
  }

  get query() {
    return this._searchBuilderService.getQuery();
  }

  @Output() queryChange: EventEmitter<SearchBuilderQuery> = new EventEmitter<SearchBuilderQuery>();
  @Output() valid: EventEmitter<boolean> = new EventEmitter<boolean>(true);

  private readonly _querySubscription: Subscription;
  private readonly _validSubscription: Subscription;

  /**
   * Register the default search builder components
   */
  constructor() {
    // watch for any query changes
    this._querySubscription = this._searchBuilderService.queryChange.subscribe(query =>
      this.queryChange.emit(query)
    );

    // watch for any changes to the validation
    this._validSubscription = this._searchBuilderService.validationChange
      .pipe(distinctUntilChanged())
      .subscribe(valid => this.valid.emit(valid));
  }

  /**
   * Remove any subscriptions and cleanup
   */
  ngOnDestroy(): void {
    this._querySubscription.unsubscribe();
    this._validSubscription.unsubscribe();
  }
}
