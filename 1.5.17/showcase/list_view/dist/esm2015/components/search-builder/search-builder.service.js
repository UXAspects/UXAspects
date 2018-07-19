/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
export class SearchBuilderService {
    constructor() {
        this.query = {};
        this.queryChange = new Subject();
        this.validationChange = new BehaviorSubject(true);
        this._componentId = 0;
        this._components = [];
        this._validation = {};
    }
    /**
     * Add a component to the internal list of components
     * @param {?} component
     * @return {?}
     */
    registerComponent(component) {
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
     * @param {?} components
     * @return {?}
     */
    registerComponents(components) {
        components.forEach(component => this.registerComponent(component));
    }
    /**
     * Get a registered component class
     * @param {?} name
     * @return {?}
     */
    getComponent(name) {
        // find the component
        const /** @type {?} */ component = this._components.find(cmp => cmp.name === name);
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
     * @param {?} query
     * @return {?}
     */
    setQuery(query) {
        this.query = Object.assign({}, query);
    }
    /**
     * Return the current query state
     * @return {?}
     */
    getQuery() {
        return this.query;
    }
    /**
     * Trigger the observable to indicate the query has been updated
     * @return {?}
     */
    queryHasChanged() {
        this.queryChange.next(this.query);
    }
    /**
     * Store the validation state of the query
     * @param {?} id
     * @param {?} valid
     * @return {?}
     */
    setValid(id, valid) {
        // store the state for this specific component
        this._validation[id] = valid;
        // evaluate the entire validation state
        this.validationChange.next(!Object.keys(this._validation).some(key => !this._validation[key]));
    }
    /**
     * Generate a unique id for each component
     * @return {?}
     */
    generateComponentId() {
        return this._componentId++;
    }
}
SearchBuilderService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SearchBuilderService.ctorParameters = () => [];
function SearchBuilderService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SearchBuilderService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SearchBuilderService.ctorParameters;
    /** @type {?} */
    SearchBuilderService.prototype.query;
    /** @type {?} */
    SearchBuilderService.prototype.queryChange;
    /** @type {?} */
    SearchBuilderService.prototype.validationChange;
    /** @type {?} */
    SearchBuilderService.prototype._componentId;
    /** @type {?} */
    SearchBuilderService.prototype._components;
    /** @type {?} */
    SearchBuilderService.prototype._validation;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJ1aWxkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlYXJjaC1idWlsZGVyL3NlYXJjaC1idWlsZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFLdkMsTUFBTTs7cUJBRXdCLEVBQUU7MkJBQ2EsSUFBSSxPQUFPLEVBQXNCO2dDQUMvQixJQUFJLGVBQWUsQ0FBVSxJQUFJLENBQUM7NEJBRWhELENBQUM7MkJBQzBCLEVBQUU7MkJBQ1YsRUFBRTs7Ozs7OztJQUtwRCxpQkFBaUIsQ0FBQyxTQUEyQzs7UUFHM0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5RCxNQUFNLElBQUksS0FBSyxDQUFDLCtEQUErRCxTQUFTLENBQUMsSUFBSSx5QkFBeUIsQ0FBQyxDQUFDO1NBQ3pIOztRQUdELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ2xDOzs7Ozs7O0lBTUQsa0JBQWtCLENBQUMsVUFBOEM7UUFDL0QsVUFBVSxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7S0FDcEU7Ozs7OztJQUtELFlBQVksQ0FBQyxJQUFZOztRQUd2Qix1QkFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUM7O1FBR2xFLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsMkNBQTJDLElBQUksU0FBUyxDQUFDLENBQUM7U0FDM0U7O1FBR0QsU0FBUyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUUxQyxNQUFNLENBQUMsU0FBUyxDQUFDO0tBQ2xCOzs7Ozs7O0lBTUQsUUFBUSxDQUFDLEtBQXlCO1FBQ2hDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDdkM7Ozs7O0lBS0QsUUFBUTtRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ25COzs7OztJQUtELGVBQWU7UUFDYixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbkM7Ozs7Ozs7SUFLRCxRQUFRLENBQUMsRUFBVSxFQUFFLEtBQWM7O1FBR2pDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDOztRQUc3QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2hHOzs7OztJQUtELG1CQUFtQjtRQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQzVCOzs7WUEzRkYsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgU2VhcmNoQnVpbGRlckNvbXBvbmVudERlZmluaXRpb24gfSBmcm9tICcuL2ludGVyZmFjZXMvY29tcG9uZW50LWRlZmluaXRpb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IFNlYXJjaEJ1aWxkZXJRdWVyeSB9IGZyb20gJy4vaW50ZXJmYWNlcy9xdWVyeS5pbnRlcmZhY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VhcmNoQnVpbGRlclNlcnZpY2Uge1xuXG4gIHF1ZXJ5OiBTZWFyY2hCdWlsZGVyUXVlcnkgPSB7fTtcbiAgcXVlcnlDaGFuZ2U6IFN1YmplY3Q8U2VhcmNoQnVpbGRlclF1ZXJ5PiA9IG5ldyBTdWJqZWN0PFNlYXJjaEJ1aWxkZXJRdWVyeT4oKTtcbiAgdmFsaWRhdGlvbkNoYW5nZTogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcblxuICBwcml2YXRlIF9jb21wb25lbnRJZDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfY29tcG9uZW50czogU2VhcmNoQnVpbGRlckNvbXBvbmVudERlZmluaXRpb25bXSA9IFtdO1xuICBwcml2YXRlIF92YWxpZGF0aW9uOiB7IFtrZXk6IG51bWJlcl06IGJvb2xlYW4gfSA9IHt9O1xuXG4gIC8qKlxuICAgKiBBZGQgYSBjb21wb25lbnQgdG8gdGhlIGludGVybmFsIGxpc3Qgb2YgY29tcG9uZW50c1xuICAgKi9cbiAgcmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50OiBTZWFyY2hCdWlsZGVyQ29tcG9uZW50RGVmaW5pdGlvbik6IHZvaWQge1xuXG4gICAgLy8gZW5zdXJlIHRoZXJlIGFyZSBubyBjb21wb25lbnRzIHdpdGggYSBtYXRjaGluZyBuYW1lXG4gICAgaWYgKHRoaXMuX2NvbXBvbmVudHMuZmluZChjbXAgPT4gY21wLm5hbWUgPT09IGNvbXBvbmVudC5uYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBTZWFyY2ggYnVpbGRlciBjb21wb25lbnRzIG11c3QgaGF2ZSBhIHVuaXF1ZSBuYW1lLiBUaGUgbmFtZSAke2NvbXBvbmVudC5uYW1lfSBoYXMgYWxyZWFkeSBiZWVuIHVzZWQuYCk7XG4gICAgfVxuXG4gICAgLy8gaWYgdW5pcXVlIHRoZW4gYWRkIHRoZSBjb21wb25lbnQgdG8gdGhlIGxpc3RcbiAgICB0aGlzLl9jb21wb25lbnRzLnB1c2goY29tcG9uZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCdWxrIHJlZ2lzdHJhdGlvbiBvZiBjb21wb25lbnRzXG4gICAqIChKdXN0IGEgaGVscGVyIG1ldGhvZClcbiAgICovXG4gIHJlZ2lzdGVyQ29tcG9uZW50cyhjb21wb25lbnRzOiBTZWFyY2hCdWlsZGVyQ29tcG9uZW50RGVmaW5pdGlvbltdKTogdm9pZCB7XG4gICAgY29tcG9uZW50cy5mb3JFYWNoKGNvbXBvbmVudCA9PiB0aGlzLnJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHJlZ2lzdGVyZWQgY29tcG9uZW50IGNsYXNzXG4gICAqL1xuICBnZXRDb21wb25lbnQobmFtZTogc3RyaW5nKTogYW55IHtcblxuICAgIC8vIGZpbmQgdGhlIGNvbXBvbmVudFxuICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMuX2NvbXBvbmVudHMuZmluZChjbXAgPT4gY21wLm5hbWUgPT09IG5hbWUpO1xuXG4gICAgLy8gaWYgdGhlcmUgaXMgbm8gbWF0Y2ggdGhyb3cgYW4gZXhjZXB0aW9uXG4gICAgaWYgKCFjb21wb25lbnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gc2VhcmNoIGJ1aWxkIGNvbXBvbmVudCB3aXRoIHRoZSBuYW1lICR7bmFtZX0gZXhpc3RzYCk7XG4gICAgfVxuXG4gICAgLy8gZW5zdXJlIGNvbmZpZyBpcyBkZWZpbmVkIC0gYXQgbGVhc3QgdG8gYW4gZW1wdHkgb2JqZWN0XG4gICAgY29tcG9uZW50LmNvbmZpZyA9IGNvbXBvbmVudC5jb25maWcgfHwge307XG5cbiAgICByZXR1cm4gY29tcG9uZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgaW50ZXJuYWwgc2VhcmNoIHF1ZXJ5IHN0YXRlXG4gICAqIG5vdGUgdGhhdCB0aGUgcXVlcnkgd2lsbCBiZSBpbW11dGFibGVcbiAgICovXG4gIHNldFF1ZXJ5KHF1ZXJ5OiBTZWFyY2hCdWlsZGVyUXVlcnkpOiB2b2lkIHtcbiAgICB0aGlzLnF1ZXJ5ID0gT2JqZWN0LmFzc2lnbih7fSwgcXVlcnkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY3VycmVudCBxdWVyeSBzdGF0ZVxuICAgKi9cbiAgZ2V0UXVlcnkoKTogU2VhcmNoQnVpbGRlclF1ZXJ5IHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VyIHRoZSBvYnNlcnZhYmxlIHRvIGluZGljYXRlIHRoZSBxdWVyeSBoYXMgYmVlbiB1cGRhdGVkXG4gICAqL1xuICBxdWVyeUhhc0NoYW5nZWQoKTogdm9pZCB7XG4gICAgdGhpcy5xdWVyeUNoYW5nZS5uZXh0KHRoaXMucXVlcnkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3JlIHRoZSB2YWxpZGF0aW9uIHN0YXRlIG9mIHRoZSBxdWVyeVxuICAgKi9cbiAgc2V0VmFsaWQoaWQ6IG51bWJlciwgdmFsaWQ6IGJvb2xlYW4pOiB2b2lkIHtcblxuICAgIC8vIHN0b3JlIHRoZSBzdGF0ZSBmb3IgdGhpcyBzcGVjaWZpYyBjb21wb25lbnRcbiAgICB0aGlzLl92YWxpZGF0aW9uW2lkXSA9IHZhbGlkO1xuXG4gICAgLy8gZXZhbHVhdGUgdGhlIGVudGlyZSB2YWxpZGF0aW9uIHN0YXRlXG4gICAgdGhpcy52YWxpZGF0aW9uQ2hhbmdlLm5leHQoIU9iamVjdC5rZXlzKHRoaXMuX3ZhbGlkYXRpb24pLnNvbWUoa2V5ID0+ICF0aGlzLl92YWxpZGF0aW9uW2tleV0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBhIHVuaXF1ZSBpZCBmb3IgZWFjaCBjb21wb25lbnRcbiAgICovXG4gIGdlbmVyYXRlQ29tcG9uZW50SWQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY29tcG9uZW50SWQrKztcbiAgfVxufVxuIl19