import { EventEmitter, OnDestroy } from '@angular/core';
import { SearchBuilderService } from './search-builder.service';
import { SearchBuilderQuery } from './interfaces/query.interface';
import { SearchBuilderComponentDefinition } from './interfaces/component-definition.interface';
import 'rxjs/add/operator/distinctUntilChanged';
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
