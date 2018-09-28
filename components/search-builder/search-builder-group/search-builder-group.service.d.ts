import { SearchBuilderGroupQuery } from '../interfaces/group-query.interface';
import { SearchBuilderFocusService } from '../search-builder-focus.service';
import { SearchBuilderService } from '../search-builder.service';
export declare class SearchBuilderGroupService {
    private _searchBuilderService;
    private _searchBuilderFocusService;
    private _id;
    constructor(_searchBuilderService: SearchBuilderService, _searchBuilderFocusService: SearchBuilderFocusService);
    /**
     * Initialise the group by defining an id
     */
    init(id: string): void;
    /**
     * Remove a field from the search builder query and return focus to the previous field.
     */
    removeAtIndex(index: number): void;
    /**
     * Get the query for this specific search group
     */
    getQuery(): SearchBuilderGroupQuery[];
}
