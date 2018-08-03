/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
var SearchBuilderService = /** @class */ (function () {
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
        { type: Injectable }
    ];
    return SearchBuilderService;
}());
export { SearchBuilderService };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJ1aWxkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlYXJjaC1idWlsZGVyL3NlYXJjaC1idWlsZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7OztxQkFPVCxFQUFFOzJCQUNhLElBQUksT0FBTyxFQUFzQjtnQ0FDL0IsSUFBSSxlQUFlLENBQVUsSUFBSSxDQUFDOzRCQUVoRCxDQUFDOzJCQUMwQixFQUFFOzJCQUNWLEVBQUU7O0lBRXBEOztPQUVHOzs7Ozs7SUFDSCxnREFBaUI7Ozs7O0lBQWpCLFVBQWtCLFNBQTJDOztRQUczRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLElBQUksRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5RCxNQUFNLElBQUksS0FBSyxDQUFDLGlFQUErRCxTQUFTLENBQUMsSUFBSSw0QkFBeUIsQ0FBQyxDQUFDO1NBQ3pIOztRQUdELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ2xDO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0gsaURBQWtCOzs7Ozs7SUFBbEIsVUFBbUIsVUFBOEM7UUFBakUsaUJBRUM7UUFEQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsU0FBUyxJQUFJLE9BQUEsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxFQUFqQyxDQUFpQyxDQUFDLENBQUM7S0FDcEU7SUFFRDs7T0FFRzs7Ozs7O0lBQ0gsMkNBQVk7Ozs7O0lBQVosVUFBYSxJQUFZOztRQUd2QixxQkFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsSUFBSSxLQUFLLElBQUksRUFBakIsQ0FBaUIsQ0FBQyxDQUFDOztRQUdsRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDZixNQUFNLElBQUksS0FBSyxDQUFDLDZDQUEyQyxJQUFJLFlBQVMsQ0FBQyxDQUFDO1NBQzNFOztRQUdELFNBQVMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFFMUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztLQUNsQjtJQUVEOzs7T0FHRzs7Ozs7OztJQUNILHVDQUFROzs7Ozs7SUFBUixVQUFTLEtBQXlCO1FBQ2hDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDdkM7SUFFRDs7T0FFRzs7Ozs7SUFDSCx1Q0FBUTs7OztJQUFSO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDbkI7SUFFRDs7T0FFRzs7Ozs7SUFDSCw4Q0FBZTs7OztJQUFmO1FBQ0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ25DO0lBRUQ7O09BRUc7Ozs7Ozs7SUFDSCx1Q0FBUTs7Ozs7O0lBQVIsVUFBUyxFQUFVLEVBQUUsS0FBYztRQUFuQyxpQkFPQzs7UUFKQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQzs7UUFHN0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDLENBQUM7S0FDaEc7SUFFRDs7T0FFRzs7Ozs7SUFDSCxrREFBbUI7Ozs7SUFBbkI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQzVCOztnQkEzRkYsVUFBVTs7K0JBTlg7O1NBT2Esb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBTZWFyY2hCdWlsZGVyQ29tcG9uZW50RGVmaW5pdGlvbiB9IGZyb20gJy4vaW50ZXJmYWNlcy9jb21wb25lbnQtZGVmaW5pdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU2VhcmNoQnVpbGRlclF1ZXJ5IH0gZnJvbSAnLi9pbnRlcmZhY2VzL3F1ZXJ5LmludGVyZmFjZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZWFyY2hCdWlsZGVyU2VydmljZSB7XG5cbiAgcXVlcnk6IFNlYXJjaEJ1aWxkZXJRdWVyeSA9IHt9O1xuICBxdWVyeUNoYW5nZTogU3ViamVjdDxTZWFyY2hCdWlsZGVyUXVlcnk+ID0gbmV3IFN1YmplY3Q8U2VhcmNoQnVpbGRlclF1ZXJ5PigpO1xuICB2YWxpZGF0aW9uQ2hhbmdlOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuXG4gIHByaXZhdGUgX2NvbXBvbmVudElkOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9jb21wb25lbnRzOiBTZWFyY2hCdWlsZGVyQ29tcG9uZW50RGVmaW5pdGlvbltdID0gW107XG4gIHByaXZhdGUgX3ZhbGlkYXRpb246IHsgW2tleTogbnVtYmVyXTogYm9vbGVhbiB9ID0ge307XG5cbiAgLyoqXG4gICAqIEFkZCBhIGNvbXBvbmVudCB0byB0aGUgaW50ZXJuYWwgbGlzdCBvZiBjb21wb25lbnRzXG4gICAqL1xuICByZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQ6IFNlYXJjaEJ1aWxkZXJDb21wb25lbnREZWZpbml0aW9uKTogdm9pZCB7XG5cbiAgICAvLyBlbnN1cmUgdGhlcmUgYXJlIG5vIGNvbXBvbmVudHMgd2l0aCBhIG1hdGNoaW5nIG5hbWVcbiAgICBpZiAodGhpcy5fY29tcG9uZW50cy5maW5kKGNtcCA9PiBjbXAubmFtZSA9PT0gY29tcG9uZW50Lm5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFNlYXJjaCBidWlsZGVyIGNvbXBvbmVudHMgbXVzdCBoYXZlIGEgdW5pcXVlIG5hbWUuIFRoZSBuYW1lICR7Y29tcG9uZW50Lm5hbWV9IGhhcyBhbHJlYWR5IGJlZW4gdXNlZC5gKTtcbiAgICB9XG5cbiAgICAvLyBpZiB1bmlxdWUgdGhlbiBhZGQgdGhlIGNvbXBvbmVudCB0byB0aGUgbGlzdFxuICAgIHRoaXMuX2NvbXBvbmVudHMucHVzaChjb21wb25lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEJ1bGsgcmVnaXN0cmF0aW9uIG9mIGNvbXBvbmVudHNcbiAgICogKEp1c3QgYSBoZWxwZXIgbWV0aG9kKVxuICAgKi9cbiAgcmVnaXN0ZXJDb21wb25lbnRzKGNvbXBvbmVudHM6IFNlYXJjaEJ1aWxkZXJDb21wb25lbnREZWZpbml0aW9uW10pOiB2b2lkIHtcbiAgICBjb21wb25lbnRzLmZvckVhY2goY29tcG9uZW50ID0+IHRoaXMucmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgcmVnaXN0ZXJlZCBjb21wb25lbnQgY2xhc3NcbiAgICovXG4gIGdldENvbXBvbmVudChuYW1lOiBzdHJpbmcpOiBhbnkge1xuXG4gICAgLy8gZmluZCB0aGUgY29tcG9uZW50XG4gICAgY29uc3QgY29tcG9uZW50ID0gdGhpcy5fY29tcG9uZW50cy5maW5kKGNtcCA9PiBjbXAubmFtZSA9PT0gbmFtZSk7XG5cbiAgICAvLyBpZiB0aGVyZSBpcyBubyBtYXRjaCB0aHJvdyBhbiBleGNlcHRpb25cbiAgICBpZiAoIWNvbXBvbmVudCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBzZWFyY2ggYnVpbGQgY29tcG9uZW50IHdpdGggdGhlIG5hbWUgJHtuYW1lfSBleGlzdHNgKTtcbiAgICB9XG5cbiAgICAvLyBlbnN1cmUgY29uZmlnIGlzIGRlZmluZWQgLSBhdCBsZWFzdCB0byBhbiBlbXB0eSBvYmplY3RcbiAgICBjb21wb25lbnQuY29uZmlnID0gY29tcG9uZW50LmNvbmZpZyB8fCB7fTtcblxuICAgIHJldHVybiBjb21wb25lbnQ7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBpbnRlcm5hbCBzZWFyY2ggcXVlcnkgc3RhdGVcbiAgICogbm90ZSB0aGF0IHRoZSBxdWVyeSB3aWxsIGJlIGltbXV0YWJsZVxuICAgKi9cbiAgc2V0UXVlcnkocXVlcnk6IFNlYXJjaEJ1aWxkZXJRdWVyeSk6IHZvaWQge1xuICAgIHRoaXMucXVlcnkgPSBPYmplY3QuYXNzaWduKHt9LCBxdWVyeSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBjdXJyZW50IHF1ZXJ5IHN0YXRlXG4gICAqL1xuICBnZXRRdWVyeSgpOiBTZWFyY2hCdWlsZGVyUXVlcnkge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5O1xuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXIgdGhlIG9ic2VydmFibGUgdG8gaW5kaWNhdGUgdGhlIHF1ZXJ5IGhhcyBiZWVuIHVwZGF0ZWRcbiAgICovXG4gIHF1ZXJ5SGFzQ2hhbmdlZCgpOiB2b2lkIHtcbiAgICB0aGlzLnF1ZXJ5Q2hhbmdlLm5leHQodGhpcy5xdWVyeSk7XG4gIH1cblxuICAvKipcbiAgICogU3RvcmUgdGhlIHZhbGlkYXRpb24gc3RhdGUgb2YgdGhlIHF1ZXJ5XG4gICAqL1xuICBzZXRWYWxpZChpZDogbnVtYmVyLCB2YWxpZDogYm9vbGVhbik6IHZvaWQge1xuXG4gICAgLy8gc3RvcmUgdGhlIHN0YXRlIGZvciB0aGlzIHNwZWNpZmljIGNvbXBvbmVudFxuICAgIHRoaXMuX3ZhbGlkYXRpb25baWRdID0gdmFsaWQ7XG5cbiAgICAvLyBldmFsdWF0ZSB0aGUgZW50aXJlIHZhbGlkYXRpb24gc3RhdGVcbiAgICB0aGlzLnZhbGlkYXRpb25DaGFuZ2UubmV4dCghT2JqZWN0LmtleXModGhpcy5fdmFsaWRhdGlvbikuc29tZShrZXkgPT4gIXRoaXMuX3ZhbGlkYXRpb25ba2V5XSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIGEgdW5pcXVlIGlkIGZvciBlYWNoIGNvbXBvbmVudFxuICAgKi9cbiAgZ2VuZXJhdGVDb21wb25lbnRJZCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9jb21wb25lbnRJZCsrO1xuICB9XG59XG4iXX0=