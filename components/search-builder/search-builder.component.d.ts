import { EventEmitter, OnDestroy } from '@angular/core';
import { SearchBuilderComponentDefinition } from './interfaces/component-definition.interface';
import { SearchBuilderQuery } from './interfaces/query.interface';
import { SearchBuilderService } from './search-builder.service';
export declare class SearchBuilderComponent implements OnDestroy {
    private _searchBuilderService;
    components: SearchBuilderComponentDefinition[];
    query: SearchBuilderQuery;
    queryChange: EventEmitter<SearchBuilderQuery>;
    valid: EventEmitter<boolean>;
    private _querySubscription;
    private _validSubscription;
    /**
     * Register the default search builder components
     */
    constructor(_searchBuilderService: SearchBuilderService);
    /**
     * Remove any subscriptions and cleanup
     */
    ngOnDestroy(): void;
}
