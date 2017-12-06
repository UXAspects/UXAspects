import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { SearchBuilderQuery } from './interfaces/query.interface';
import { SearchBuilderGroupQuery } from './interfaces/group-query.interface';
import { SearchBuilderComponentDefinition } from './interfaces/component-definition.interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SearchBuilderService {

  query: SearchBuilderQuery = {};
  queryChange: Subject<SearchBuilderQuery> = new Subject<SearchBuilderQuery>();
  validationChange: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private _componentId: number = 0;
  private _components: SearchBuilderComponentDefinition[] = [];
  private _validation: { [key: number]: boolean } = {};

  /**
   * Add a component to the internal list of components
   */
  registerComponent(component: SearchBuilderComponentDefinition): void {

    // ensure there are no components with a matching name
    if (this._components.find(cmp => cmp.name === component.name)) {
      throw new Error(`Search builder components must have a unique name. The name ${component.name} has already been used.`);
    }

    // if unique then add the component to the list
    this._components.push(component);
  }

  /**
   * Bulk registration of components
   * (Just a helper method)
   */
  registerComponents(components: SearchBuilderComponentDefinition[]): void {
    components.forEach(component => this.registerComponent(component));
  }

  /**
   * Get a registered component class
   */
  getComponent(name: string): any {

    // find the component
    const component = this._components.find(cmp => cmp.name === name);

    // if there is no match throw an exception
    if (!component) {
      throw new Error(`No search build component with the name ${name} exists`);
    }

    // ensure config is defined - at least to an empty object
    component.config = component.config || {};

    return component;
  }

  /**
   * Update the internal search query state
   * note that the query will be immutable
   */
  setQuery(query: SearchBuilderQuery): void {
    this.query = Object.assign({}, query);
  }

  /**
   * Return the current query state
   */
  getQuery(): SearchBuilderQuery {
    return this.query;
  }

  /**
   * Trigger the observable to indicate the query has been updated
   */
  queryHasChanged(): void {
    this.queryChange.next(this.query);
  }

  /**
   * Store the validation state of the query
   */
  setValid(id: number, valid: boolean): void {

    // store the state for this specific component
    this._validation[id] = valid;

    // evaluate the entire validation state
    this.validationChange.next(!Object.keys(this._validation).some(key => !this._validation[key]));
  }

  /**
   * Generate a unique id for each component
   */
  generateComponentId(): number {
    return this._componentId++;
  }
}
