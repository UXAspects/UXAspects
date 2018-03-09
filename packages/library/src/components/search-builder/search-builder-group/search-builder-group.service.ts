import { Injectable } from '@angular/core';
import { SearchBuilderService } from '../search-builder.service';
import { SearchBuilderGroupQuery } from '../interfaces/group-query.interface';
import { SearchBuilderQuery } from '../interfaces/query.interface';

@Injectable()
export class SearchBuilderGroupService {

  private _id: string;

  constructor(private _searchBuilderService: SearchBuilderService) { }

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
   * Remove a field from the search builder query
   */
  remove(field: SearchBuilderGroupQuery): void {
    // get the query for this group
    const query = this.getQuery();

    // remove the field from the array
    query.splice(query.indexOf(field), 1);
  }

  /**
   * Get the query for this specific search group
   */
  getQuery(): SearchBuilderGroupQuery[] {
    return this._searchBuilderService.query[this._id] ? this._searchBuilderService.query[this._id] : [];
  }
}
