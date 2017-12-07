import { SearchBuilderService } from '../search-builder.service';
import { SearchBuilderGroupQuery } from '../interfaces/group-query.interface';
export declare class SearchBuilderGroupService {
    private _searchBuilderService;
    private _id;
    constructor(_searchBuilderService: SearchBuilderService);
    /**
     * Initialise the group by defining an id
     */
    init(id: string): void;
    /**
     * Remove a field from the search builder query
     */
    remove(field: SearchBuilderGroupQuery): void;
    /**
     * Get the query for this specific search group
     */
    getQuery(): SearchBuilderGroupQuery[];
}
