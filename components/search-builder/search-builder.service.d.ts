import { Subject } from 'rxjs/Subject';
import { SearchBuilderQuery } from './interfaces/query.interface';
import { SearchBuilderComponentDefinition } from './interfaces/component-definition.interface';
export declare class SearchBuilderService {
    query: SearchBuilderQuery;
    queryChange: Subject<SearchBuilderQuery>;
    private _components;
    /**
     * Add a component to the internal list of components
     */
    registerComponent(name: string, component: any): void;
    /**
     * Bulk registration of components
     * (Just a helper method)
     */
    registerComponents(components: SearchBuilderComponentDefinition[]): void;
    /**
     * Get a registered component class
     */
    getComponent(type: string): any;
    /**
     * Update the internal search query state
     * note that the query will be immutable
     */
    setQuery(query: SearchBuilderQuery): void;
    /**
     * Return the current query state
     */
    getQuery(): SearchBuilderQuery;
    /**
     * Trigger the observable to indicate the query has been updated
     */
    queryHasChanged(): void;
}
