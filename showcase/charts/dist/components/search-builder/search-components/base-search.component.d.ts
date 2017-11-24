import { SearchBuilderService } from '../search-builder.service';
import { SearchBuilderGroupQuery } from '../interfaces/group-query.interface';
import { SearchBuilderGroupService } from '../search-builder-group/search-builder-group.service';
export declare class BaseSearchComponent {
    private _searchBuilderService;
    private _searchBuilderGroupService;
    type: string;
    context: SearchBuilderGroupQuery;
    constructor(_searchBuilderService: SearchBuilderService, _searchBuilderGroupService: SearchBuilderGroupService);
    setValue(value: any): void;
}
