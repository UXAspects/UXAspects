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

import { inject, Injectable } from '@angular/core';
import { SearchBuilderGroupQuery } from '../interfaces/group-query.interface';
import { SearchBuilderFocusService } from '../search-builder-focus.service';
import { SearchBuilderService } from '../search-builder.service';

@Injectable()
export class SearchBuilderGroupService {
  private readonly _searchBuilderService = inject(SearchBuilderService);

  private readonly _searchBuilderFocusService = inject(SearchBuilderFocusService);

  private _id: string;

  /**
   * Initialise the group by defining an id
   */
  init(id: string): void {
    // store the name of the group
    this._id = id;

    // create the entry in the query object if it doesn't exist
    if (!this._searchBuilderService.query[this._id]) {
      // create the section
      this._searchBuilderService.query[this._id] = [];

      // emit the changes after the initial setup
      setTimeout(() => this._searchBuilderService.queryHasChanged());
    }
  }

  /**
   * Remove a field from the search builder query and return focus to the previous field.
   */
  removeAtIndex(index: number): void {
    // get the query for this group
    const query = this.getQuery();

    // remove the field from the array
    query.splice(index, 1);

    // Focus the previous item if available
    this._searchBuilderFocusService.setFocus(this._id, index <= 0 ? 0 : index - 1);
  }

  /**
   * Get the query for this specific search group
   */
  getQuery(): SearchBuilderGroupQuery[] {
    return this._searchBuilderService.query[this._id]
      ? this._searchBuilderService.query[this._id]
      : [];
  }
}
