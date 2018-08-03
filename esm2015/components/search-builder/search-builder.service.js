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
    { type: Injectable }
];
function SearchBuilderService_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJ1aWxkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlYXJjaC1idWlsZGVyL3NlYXJjaC1idWlsZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFLdkMsTUFBTTs7cUJBRXdCLEVBQUU7MkJBQ2EsSUFBSSxPQUFPLEVBQXNCO2dDQUMvQixJQUFJLGVBQWUsQ0FBVSxJQUFJLENBQUM7NEJBRWhELENBQUM7MkJBQzBCLEVBQUU7MkJBQ1YsRUFBRTs7Ozs7OztJQUtwRCxpQkFBaUIsQ0FBQyxTQUEyQzs7UUFHM0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUQsTUFBTSxJQUFJLEtBQUssQ0FBQywrREFBK0QsU0FBUyxDQUFDLElBQUkseUJBQXlCLENBQUMsQ0FBQztTQUN6SDs7UUFHRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNsQzs7Ozs7OztJQU1ELGtCQUFrQixDQUFDLFVBQThDO1FBQy9ELFVBQVUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztLQUNwRTs7Ozs7O0lBS0QsWUFBWSxDQUFDLElBQVk7O1FBR3ZCLHVCQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUM7O1FBR2xFLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsMkNBQTJDLElBQUksU0FBUyxDQUFDLENBQUM7U0FDM0U7O1FBR0QsU0FBUyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUUxQyxNQUFNLENBQUMsU0FBUyxDQUFDO0tBQ2xCOzs7Ozs7O0lBTUQsUUFBUSxDQUFDLEtBQXlCO1FBQ2hDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDdkM7Ozs7O0lBS0QsUUFBUTtRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ25COzs7OztJQUtELGVBQWU7UUFDYixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbkM7Ozs7Ozs7SUFLRCxRQUFRLENBQUMsRUFBVSxFQUFFLEtBQWM7O1FBR2pDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDOztRQUc3QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNoRzs7Ozs7SUFLRCxtQkFBbUI7UUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUM1Qjs7O1lBM0ZGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IFNlYXJjaEJ1aWxkZXJDb21wb25lbnREZWZpbml0aW9uIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2NvbXBvbmVudC1kZWZpbml0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBTZWFyY2hCdWlsZGVyUXVlcnkgfSBmcm9tICcuL2ludGVyZmFjZXMvcXVlcnkuaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlYXJjaEJ1aWxkZXJTZXJ2aWNlIHtcblxuICBxdWVyeTogU2VhcmNoQnVpbGRlclF1ZXJ5ID0ge307XG4gIHF1ZXJ5Q2hhbmdlOiBTdWJqZWN0PFNlYXJjaEJ1aWxkZXJRdWVyeT4gPSBuZXcgU3ViamVjdDxTZWFyY2hCdWlsZGVyUXVlcnk+KCk7XG4gIHZhbGlkYXRpb25DaGFuZ2U6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG5cbiAgcHJpdmF0ZSBfY29tcG9uZW50SWQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2NvbXBvbmVudHM6IFNlYXJjaEJ1aWxkZXJDb21wb25lbnREZWZpbml0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSBfdmFsaWRhdGlvbjogeyBba2V5OiBudW1iZXJdOiBib29sZWFuIH0gPSB7fTtcblxuICAvKipcbiAgICogQWRkIGEgY29tcG9uZW50IHRvIHRoZSBpbnRlcm5hbCBsaXN0IG9mIGNvbXBvbmVudHNcbiAgICovXG4gIHJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudDogU2VhcmNoQnVpbGRlckNvbXBvbmVudERlZmluaXRpb24pOiB2b2lkIHtcblxuICAgIC8vIGVuc3VyZSB0aGVyZSBhcmUgbm8gY29tcG9uZW50cyB3aXRoIGEgbWF0Y2hpbmcgbmFtZVxuICAgIGlmICh0aGlzLl9jb21wb25lbnRzLmZpbmQoY21wID0+IGNtcC5uYW1lID09PSBjb21wb25lbnQubmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgU2VhcmNoIGJ1aWxkZXIgY29tcG9uZW50cyBtdXN0IGhhdmUgYSB1bmlxdWUgbmFtZS4gVGhlIG5hbWUgJHtjb21wb25lbnQubmFtZX0gaGFzIGFscmVhZHkgYmVlbiB1c2VkLmApO1xuICAgIH1cblxuICAgIC8vIGlmIHVuaXF1ZSB0aGVuIGFkZCB0aGUgY29tcG9uZW50IHRvIHRoZSBsaXN0XG4gICAgdGhpcy5fY29tcG9uZW50cy5wdXNoKGNvbXBvbmVudCk7XG4gIH1cblxuICAvKipcbiAgICogQnVsayByZWdpc3RyYXRpb24gb2YgY29tcG9uZW50c1xuICAgKiAoSnVzdCBhIGhlbHBlciBtZXRob2QpXG4gICAqL1xuICByZWdpc3RlckNvbXBvbmVudHMoY29tcG9uZW50czogU2VhcmNoQnVpbGRlckNvbXBvbmVudERlZmluaXRpb25bXSk6IHZvaWQge1xuICAgIGNvbXBvbmVudHMuZm9yRWFjaChjb21wb25lbnQgPT4gdGhpcy5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSByZWdpc3RlcmVkIGNvbXBvbmVudCBjbGFzc1xuICAgKi9cbiAgZ2V0Q29tcG9uZW50KG5hbWU6IHN0cmluZyk6IGFueSB7XG5cbiAgICAvLyBmaW5kIHRoZSBjb21wb25lbnRcbiAgICBjb25zdCBjb21wb25lbnQgPSB0aGlzLl9jb21wb25lbnRzLmZpbmQoY21wID0+IGNtcC5uYW1lID09PSBuYW1lKTtcblxuICAgIC8vIGlmIHRoZXJlIGlzIG5vIG1hdGNoIHRocm93IGFuIGV4Y2VwdGlvblxuICAgIGlmICghY29tcG9uZW50KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIHNlYXJjaCBidWlsZCBjb21wb25lbnQgd2l0aCB0aGUgbmFtZSAke25hbWV9IGV4aXN0c2ApO1xuICAgIH1cblxuICAgIC8vIGVuc3VyZSBjb25maWcgaXMgZGVmaW5lZCAtIGF0IGxlYXN0IHRvIGFuIGVtcHR5IG9iamVjdFxuICAgIGNvbXBvbmVudC5jb25maWcgPSBjb21wb25lbnQuY29uZmlnIHx8IHt9O1xuXG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIGludGVybmFsIHNlYXJjaCBxdWVyeSBzdGF0ZVxuICAgKiBub3RlIHRoYXQgdGhlIHF1ZXJ5IHdpbGwgYmUgaW1tdXRhYmxlXG4gICAqL1xuICBzZXRRdWVyeShxdWVyeTogU2VhcmNoQnVpbGRlclF1ZXJ5KTogdm9pZCB7XG4gICAgdGhpcy5xdWVyeSA9IE9iamVjdC5hc3NpZ24oe30sIHF1ZXJ5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgcXVlcnkgc3RhdGVcbiAgICovXG4gIGdldFF1ZXJ5KCk6IFNlYXJjaEJ1aWxkZXJRdWVyeSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnk7XG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlciB0aGUgb2JzZXJ2YWJsZSB0byBpbmRpY2F0ZSB0aGUgcXVlcnkgaGFzIGJlZW4gdXBkYXRlZFxuICAgKi9cbiAgcXVlcnlIYXNDaGFuZ2VkKCk6IHZvaWQge1xuICAgIHRoaXMucXVlcnlDaGFuZ2UubmV4dCh0aGlzLnF1ZXJ5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9yZSB0aGUgdmFsaWRhdGlvbiBzdGF0ZSBvZiB0aGUgcXVlcnlcbiAgICovXG4gIHNldFZhbGlkKGlkOiBudW1iZXIsIHZhbGlkOiBib29sZWFuKTogdm9pZCB7XG5cbiAgICAvLyBzdG9yZSB0aGUgc3RhdGUgZm9yIHRoaXMgc3BlY2lmaWMgY29tcG9uZW50XG4gICAgdGhpcy5fdmFsaWRhdGlvbltpZF0gPSB2YWxpZDtcblxuICAgIC8vIGV2YWx1YXRlIHRoZSBlbnRpcmUgdmFsaWRhdGlvbiBzdGF0ZVxuICAgIHRoaXMudmFsaWRhdGlvbkNoYW5nZS5uZXh0KCFPYmplY3Qua2V5cyh0aGlzLl92YWxpZGF0aW9uKS5zb21lKGtleSA9PiAhdGhpcy5fdmFsaWRhdGlvbltrZXldKSk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgYSB1bmlxdWUgaWQgZm9yIGVhY2ggY29tcG9uZW50XG4gICAqL1xuICBnZW5lcmF0ZUNvbXBvbmVudElkKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBvbmVudElkKys7XG4gIH1cbn1cbiJdfQ==