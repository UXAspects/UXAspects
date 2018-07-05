/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
var SearchBuilderService = (function () {
    function SearchBuilderService() {
        this.query = {};
        this.queryChange = new Subject();
        this.validationChange = new BehaviorSubject(true);
        this._componentId = 0;
        this._components = [];
        this._validation = {};
    }
    /**
     * Add a component to the internal list of components
     */
    /**
     * Add a component to the internal list of components
     * @param {?} component
     * @return {?}
     */
    SearchBuilderService.prototype.registerComponent = /**
     * Add a component to the internal list of components
     * @param {?} component
     * @return {?}
     */
    function (component) {
        // ensure there are no components with a matching name
        if (this._components.find(function (cmp) { return cmp.name === component.name; })) {
            throw new Error("Search builder components must have a unique name. The name " + component.name + " has already been used.");
        }
        // if unique then add the component to the list
        this._components.push(component);
    };
    /**
     * Bulk registration of components
     * (Just a helper method)
     */
    /**
     * Bulk registration of components
     * (Just a helper method)
     * @param {?} components
     * @return {?}
     */
    SearchBuilderService.prototype.registerComponents = /**
     * Bulk registration of components
     * (Just a helper method)
     * @param {?} components
     * @return {?}
     */
    function (components) {
        var _this = this;
        components.forEach(function (component) { return _this.registerComponent(component); });
    };
    /**
     * Get a registered component class
     */
    /**
     * Get a registered component class
     * @param {?} name
     * @return {?}
     */
    SearchBuilderService.prototype.getComponent = /**
     * Get a registered component class
     * @param {?} name
     * @return {?}
     */
    function (name) {
        // find the component
        var /** @type {?} */ component = this._components.find(function (cmp) { return cmp.name === name; });
        // if there is no match throw an exception
        if (!component) {
            throw new Error("No search build component with the name " + name + " exists");
        }
        // ensure config is defined - at least to an empty object
        component.config = component.config || {};
        return component;
    };
    /**
     * Update the internal search query state
     * note that the query will be immutable
     */
    /**
     * Update the internal search query state
     * note that the query will be immutable
     * @param {?} query
     * @return {?}
     */
    SearchBuilderService.prototype.setQuery = /**
     * Update the internal search query state
     * note that the query will be immutable
     * @param {?} query
     * @return {?}
     */
    function (query) {
        this.query = Object.assign({}, query);
    };
    /**
     * Return the current query state
     */
    /**
     * Return the current query state
     * @return {?}
     */
    SearchBuilderService.prototype.getQuery = /**
     * Return the current query state
     * @return {?}
     */
    function () {
        return this.query;
    };
    /**
     * Trigger the observable to indicate the query has been updated
     */
    /**
     * Trigger the observable to indicate the query has been updated
     * @return {?}
     */
    SearchBuilderService.prototype.queryHasChanged = /**
     * Trigger the observable to indicate the query has been updated
     * @return {?}
     */
    function () {
        this.queryChange.next(this.query);
    };
    /**
     * Store the validation state of the query
     */
    /**
     * Store the validation state of the query
     * @param {?} id
     * @param {?} valid
     * @return {?}
     */
    SearchBuilderService.prototype.setValid = /**
     * Store the validation state of the query
     * @param {?} id
     * @param {?} valid
     * @return {?}
     */
    function (id, valid) {
        var _this = this;
        // store the state for this specific component
        this._validation[id] = valid;
        // evaluate the entire validation state
        this.validationChange.next(!Object.keys(this._validation).some(function (key) { return !_this._validation[key]; }));
    };
    /**
     * Generate a unique id for each component
     */
    /**
     * Generate a unique id for each component
     * @return {?}
     */
    SearchBuilderService.prototype.generateComponentId = /**
     * Generate a unique id for each component
     * @return {?}
     */
    function () {
        return this._componentId++;
    };
    SearchBuilderService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SearchBuilderService.ctorParameters = function () { return []; };
    return SearchBuilderService;
}());
export { SearchBuilderService };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJ1aWxkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlYXJjaC1idWlsZGVyL3NlYXJjaC1idWlsZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7OztxQkFPVCxFQUFFOzJCQUNhLElBQUksT0FBTyxFQUFzQjtnQ0FDL0IsSUFBSSxlQUFlLENBQVUsSUFBSSxDQUFDOzRCQUVoRCxDQUFDOzJCQUMwQixFQUFFOzJCQUNWLEVBQUU7O0lBRXBEOztPQUVHOzs7Ozs7SUFDSCxnREFBaUI7Ozs7O0lBQWpCLFVBQWtCLFNBQTJDOztRQUczRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLElBQUksRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5RCxNQUFNLElBQUksS0FBSyxDQUFDLGlFQUErRCxTQUFTLENBQUMsSUFBSSw0QkFBeUIsQ0FBQyxDQUFDO1NBQ3pIOztRQUdELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ2xDO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0gsaURBQWtCOzs7Ozs7SUFBbEIsVUFBbUIsVUFBOEM7UUFBakUsaUJBRUM7UUFEQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsU0FBUyxJQUFJLE9BQUEsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxFQUFqQyxDQUFpQyxDQUFDLENBQUM7S0FDcEU7SUFFRDs7T0FFRzs7Ozs7O0lBQ0gsMkNBQVk7Ozs7O0lBQVosVUFBYSxJQUFZOztRQUd2QixxQkFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsSUFBSSxLQUFLLElBQUksRUFBakIsQ0FBaUIsQ0FBQyxDQUFDOztRQUdsRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDZixNQUFNLElBQUksS0FBSyxDQUFDLDZDQUEyQyxJQUFJLFlBQVMsQ0FBQyxDQUFDO1NBQzNFOztRQUdELFNBQVMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFFMUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztLQUNsQjtJQUVEOzs7T0FHRzs7Ozs7OztJQUNILHVDQUFROzs7Ozs7SUFBUixVQUFTLEtBQXlCO1FBQ2hDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDdkM7SUFFRDs7T0FFRzs7Ozs7SUFDSCx1Q0FBUTs7OztJQUFSO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDbkI7SUFFRDs7T0FFRzs7Ozs7SUFDSCw4Q0FBZTs7OztJQUFmO1FBQ0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ25DO0lBRUQ7O09BRUc7Ozs7Ozs7SUFDSCx1Q0FBUTs7Ozs7O0lBQVIsVUFBUyxFQUFVLEVBQUUsS0FBYztRQUFuQyxpQkFPQzs7UUFKQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQzs7UUFHN0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDLENBQUM7S0FDaEc7SUFFRDs7T0FFRzs7Ozs7SUFDSCxrREFBbUI7Ozs7SUFBbkI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQzVCOztnQkEzRkYsVUFBVTs7OzsrQkFOWDs7U0FPYSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IFNlYXJjaEJ1aWxkZXJDb21wb25lbnREZWZpbml0aW9uIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2NvbXBvbmVudC1kZWZpbml0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBTZWFyY2hCdWlsZGVyUXVlcnkgfSBmcm9tICcuL2ludGVyZmFjZXMvcXVlcnkuaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlYXJjaEJ1aWxkZXJTZXJ2aWNlIHtcblxuICBxdWVyeTogU2VhcmNoQnVpbGRlclF1ZXJ5ID0ge307XG4gIHF1ZXJ5Q2hhbmdlOiBTdWJqZWN0PFNlYXJjaEJ1aWxkZXJRdWVyeT4gPSBuZXcgU3ViamVjdDxTZWFyY2hCdWlsZGVyUXVlcnk+KCk7XG4gIHZhbGlkYXRpb25DaGFuZ2U6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG5cbiAgcHJpdmF0ZSBfY29tcG9uZW50SWQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2NvbXBvbmVudHM6IFNlYXJjaEJ1aWxkZXJDb21wb25lbnREZWZpbml0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSBfdmFsaWRhdGlvbjogeyBba2V5OiBudW1iZXJdOiBib29sZWFuIH0gPSB7fTtcblxuICAvKipcbiAgICogQWRkIGEgY29tcG9uZW50IHRvIHRoZSBpbnRlcm5hbCBsaXN0IG9mIGNvbXBvbmVudHNcbiAgICovXG4gIHJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudDogU2VhcmNoQnVpbGRlckNvbXBvbmVudERlZmluaXRpb24pOiB2b2lkIHtcblxuICAgIC8vIGVuc3VyZSB0aGVyZSBhcmUgbm8gY29tcG9uZW50cyB3aXRoIGEgbWF0Y2hpbmcgbmFtZVxuICAgIGlmICh0aGlzLl9jb21wb25lbnRzLmZpbmQoY21wID0+IGNtcC5uYW1lID09PSBjb21wb25lbnQubmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgU2VhcmNoIGJ1aWxkZXIgY29tcG9uZW50cyBtdXN0IGhhdmUgYSB1bmlxdWUgbmFtZS4gVGhlIG5hbWUgJHtjb21wb25lbnQubmFtZX0gaGFzIGFscmVhZHkgYmVlbiB1c2VkLmApO1xuICAgIH1cblxuICAgIC8vIGlmIHVuaXF1ZSB0aGVuIGFkZCB0aGUgY29tcG9uZW50IHRvIHRoZSBsaXN0XG4gICAgdGhpcy5fY29tcG9uZW50cy5wdXNoKGNvbXBvbmVudCk7XG4gIH1cblxuICAvKipcbiAgICogQnVsayByZWdpc3RyYXRpb24gb2YgY29tcG9uZW50c1xuICAgKiAoSnVzdCBhIGhlbHBlciBtZXRob2QpXG4gICAqL1xuICByZWdpc3RlckNvbXBvbmVudHMoY29tcG9uZW50czogU2VhcmNoQnVpbGRlckNvbXBvbmVudERlZmluaXRpb25bXSk6IHZvaWQge1xuICAgIGNvbXBvbmVudHMuZm9yRWFjaChjb21wb25lbnQgPT4gdGhpcy5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSByZWdpc3RlcmVkIGNvbXBvbmVudCBjbGFzc1xuICAgKi9cbiAgZ2V0Q29tcG9uZW50KG5hbWU6IHN0cmluZyk6IGFueSB7XG5cbiAgICAvLyBmaW5kIHRoZSBjb21wb25lbnRcbiAgICBjb25zdCBjb21wb25lbnQgPSB0aGlzLl9jb21wb25lbnRzLmZpbmQoY21wID0+IGNtcC5uYW1lID09PSBuYW1lKTtcblxuICAgIC8vIGlmIHRoZXJlIGlzIG5vIG1hdGNoIHRocm93IGFuIGV4Y2VwdGlvblxuICAgIGlmICghY29tcG9uZW50KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIHNlYXJjaCBidWlsZCBjb21wb25lbnQgd2l0aCB0aGUgbmFtZSAke25hbWV9IGV4aXN0c2ApO1xuICAgIH1cblxuICAgIC8vIGVuc3VyZSBjb25maWcgaXMgZGVmaW5lZCAtIGF0IGxlYXN0IHRvIGFuIGVtcHR5IG9iamVjdFxuICAgIGNvbXBvbmVudC5jb25maWcgPSBjb21wb25lbnQuY29uZmlnIHx8IHt9O1xuXG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIGludGVybmFsIHNlYXJjaCBxdWVyeSBzdGF0ZVxuICAgKiBub3RlIHRoYXQgdGhlIHF1ZXJ5IHdpbGwgYmUgaW1tdXRhYmxlXG4gICAqL1xuICBzZXRRdWVyeShxdWVyeTogU2VhcmNoQnVpbGRlclF1ZXJ5KTogdm9pZCB7XG4gICAgdGhpcy5xdWVyeSA9IE9iamVjdC5hc3NpZ24oe30sIHF1ZXJ5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgcXVlcnkgc3RhdGVcbiAgICovXG4gIGdldFF1ZXJ5KCk6IFNlYXJjaEJ1aWxkZXJRdWVyeSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnk7XG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlciB0aGUgb2JzZXJ2YWJsZSB0byBpbmRpY2F0ZSB0aGUgcXVlcnkgaGFzIGJlZW4gdXBkYXRlZFxuICAgKi9cbiAgcXVlcnlIYXNDaGFuZ2VkKCk6IHZvaWQge1xuICAgIHRoaXMucXVlcnlDaGFuZ2UubmV4dCh0aGlzLnF1ZXJ5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9yZSB0aGUgdmFsaWRhdGlvbiBzdGF0ZSBvZiB0aGUgcXVlcnlcbiAgICovXG4gIHNldFZhbGlkKGlkOiBudW1iZXIsIHZhbGlkOiBib29sZWFuKTogdm9pZCB7XG5cbiAgICAvLyBzdG9yZSB0aGUgc3RhdGUgZm9yIHRoaXMgc3BlY2lmaWMgY29tcG9uZW50XG4gICAgdGhpcy5fdmFsaWRhdGlvbltpZF0gPSB2YWxpZDtcblxuICAgIC8vIGV2YWx1YXRlIHRoZSBlbnRpcmUgdmFsaWRhdGlvbiBzdGF0ZVxuICAgIHRoaXMudmFsaWRhdGlvbkNoYW5nZS5uZXh0KCFPYmplY3Qua2V5cyh0aGlzLl92YWxpZGF0aW9uKS5zb21lKGtleSA9PiAhdGhpcy5fdmFsaWRhdGlvbltrZXldKSk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgYSB1bmlxdWUgaWQgZm9yIGVhY2ggY29tcG9uZW50XG4gICAqL1xuICBnZW5lcmF0ZUNvbXBvbmVudElkKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBvbmVudElkKys7XG4gIH1cbn1cbiJdfQ==