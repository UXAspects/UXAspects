import { EventEmitter, OnDestroy } from '@angular/core';
import { SearchBuilderService } from './search-builder.service';
import { SearchBuilderQuery } from './interfaces/query.interface';
import { SearchBuilderComponentDefinition } from './interfaces/component-definition.interface';
export declare class SearchBuilderComponent implements OnDestroy {
    private _searchBuilderService;
    components: SearchBuilderComponentDefinition[];
    query: SearchBuilderQuery;
    queryChange: EventEmitter<SearchBuilderQuery>;
    private _subscription;
    /**
     * Register the default search builder components
     */
    constructor(_searchBuilderService: SearchBuilderService);
    ngOnDestroy(): void;
}
