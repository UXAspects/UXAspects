import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { SearchBuilderComponentDefinition } from './interfaces/component-definition.interface';
import { SearchBuilderQuery } from './interfaces/query.interface';
export declare class SearchBuilderService {
    query: SearchBuilderQuery;
    queryChange: Subject<SearchBuilderQuery>;
    validationChange: BehaviorSubject<boolean>;
    private _componentId;
    private _components;
    private _validation;
    /**
     * Add a component to the internal list of components
     */
    registerComponent(component: SearchBuilderComponentDefinition): void;
    /**
     * Bulk registration of components
     * (Just a helper method)
     */
    registerComponents(components: SearchBuilderComponentDefinition[]): void;
    /**
     * Get a registered component class
     */
    getComponent(name: string): any;
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
    /**
     * Store the validation state of the query
     */
    setValid(id: number, valid: boolean): void;
    /**
     * Generate a unique id for each component
     */
    generateComponentId(): number;
}
