import { Injectable } from '@angular/core';
import { SearchBuilderGroupQuery } from '../interfaces/group-query.interface';
import { SearchBuilderFocusService } from '../search-builder-focus.service';
import { SearchBuilderService } from '../search-builder.service';

@Injectable()
export class SearchBuilderGroupService {

  private _id: string;

  constructor(
    private _searchBuilderService: SearchBuilderService,
    private _searchBuilderFocusService: SearchBuilderFocusService
  ) { }

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
    return this._searchBuilderService.query[this._id] ? this._searchBuilderService.query[this._id] : [];
  }
}
