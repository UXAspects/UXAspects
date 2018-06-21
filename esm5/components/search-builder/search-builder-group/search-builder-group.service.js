/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { SearchBuilderService } from '../search-builder.service';
var SearchBuilderGroupService = (function () {
    function SearchBuilderGroupService(_searchBuilderService) {
        this._searchBuilderService = _searchBuilderService;
    }
    /**
     * Initialise the group by defining an id
     */
    /**
     * Initialise the group by defining an id
     * @param {?} id
     * @return {?}
     */
    SearchBuilderGroupService.prototype.init = /**
     * Initialise the group by defining an id
     * @param {?} id
     * @return {?}
     */
    function (id) {
        var _this = this;
        // store the name of the group
        this._id = id;
        // create the entry in the query object if it doesn't exist
        if (!this._searchBuilderService.query[this._id]) {
            // create the section
            this._searchBuilderService.query[this._id] = [];
            // emit the changes after the initial setup
            setTimeout(function () { return _this._searchBuilderService.queryHasChanged(); });
        }
    };
    /**
     * Remove a field from the search builder query
     */
    /**
     * Remove a field from the search builder query
     * @param {?} field
     * @return {?}
     */
    SearchBuilderGroupService.prototype.remove = /**
     * Remove a field from the search builder query
     * @param {?} field
     * @return {?}
     */
    function (field) {
        // get the query for this group
        var /** @type {?} */ query = this.getQuery();
        // remove the field from the array
        query.splice(query.indexOf(field), 1);
    };
    /**
     * Get the query for this specific search group
     */
    /**
     * Get the query for this specific search group
     * @return {?}
     */
    SearchBuilderGroupService.prototype.getQuery = /**
     * Get the query for this specific search group
     * @return {?}
     */
    function () {
        return this._searchBuilderService.query[this._id] ? this._searchBuilderService.query[this._id] : [];
    };
    SearchBuilderGroupService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SearchBuilderGroupService.ctorParameters = function () { return [
        { type: SearchBuilderService, },
    ]; };
    return SearchBuilderGroupService;
}());
export { SearchBuilderGroupService };
function SearchBuilderGroupService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SearchBuilderGroupService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SearchBuilderGroupService.ctorParameters;
    /** @type {?} */
    SearchBuilderGroupService.prototype._id;
    /** @type {?} */
    SearchBuilderGroupService.prototype._searchBuilderService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJ1aWxkZXItZ3JvdXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlYXJjaC1idWlsZGVyL3NlYXJjaC1idWlsZGVyLWdyb3VwL3NlYXJjaC1idWlsZGVyLWdyb3VwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0lBTy9ELG1DQUFvQixxQkFBMkM7UUFBM0MsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFzQjtLQUFLO0lBRXBFOztPQUVHOzs7Ozs7SUFDSCx3Q0FBSTs7Ozs7SUFBSixVQUFLLEVBQVU7UUFBZixpQkFhQzs7UUFYQyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQzs7UUFHZCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFHaEQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDOztZQUdoRCxVQUFVLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxlQUFlLEVBQUUsRUFBNUMsQ0FBNEMsQ0FBQyxDQUFDO1NBQ2hFO0tBQ0Y7SUFFRDs7T0FFRzs7Ozs7O0lBQ0gsMENBQU07Ozs7O0lBQU4sVUFBTyxLQUE4Qjs7UUFFbkMscUJBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7UUFHOUIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ3ZDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsNENBQVE7Ozs7SUFBUjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDckc7O2dCQXpDRixVQUFVOzs7O2dCQUZGLG9CQUFvQjs7b0NBRjdCOztTQUthLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNlYXJjaEJ1aWxkZXJHcm91cFF1ZXJ5IH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9ncm91cC1xdWVyeS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU2VhcmNoQnVpbGRlclNlcnZpY2UgfSBmcm9tICcuLi9zZWFyY2gtYnVpbGRlci5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlYXJjaEJ1aWxkZXJHcm91cFNlcnZpY2Uge1xuXG4gIHByaXZhdGUgX2lkOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VhcmNoQnVpbGRlclNlcnZpY2U6IFNlYXJjaEJ1aWxkZXJTZXJ2aWNlKSB7IH1cblxuICAvKipcbiAgICogSW5pdGlhbGlzZSB0aGUgZ3JvdXAgYnkgZGVmaW5pbmcgYW4gaWRcbiAgICovXG4gIGluaXQoaWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIC8vIHN0b3JlIHRoZSBuYW1lIG9mIHRoZSBncm91cFxuICAgIHRoaXMuX2lkID0gaWQ7XG5cbiAgICAvLyBjcmVhdGUgdGhlIGVudHJ5IGluIHRoZSBxdWVyeSBvYmplY3QgaWYgaXQgZG9lc24ndCBleGlzdFxuICAgIGlmICghdGhpcy5fc2VhcmNoQnVpbGRlclNlcnZpY2UucXVlcnlbdGhpcy5faWRdKSB7XG5cbiAgICAgIC8vIGNyZWF0ZSB0aGUgc2VjdGlvblxuICAgICAgdGhpcy5fc2VhcmNoQnVpbGRlclNlcnZpY2UucXVlcnlbdGhpcy5faWRdID0gW107XG5cbiAgICAgIC8vIGVtaXQgdGhlIGNoYW5nZXMgYWZ0ZXIgdGhlIGluaXRpYWwgc2V0dXBcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fc2VhcmNoQnVpbGRlclNlcnZpY2UucXVlcnlIYXNDaGFuZ2VkKCkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBmaWVsZCBmcm9tIHRoZSBzZWFyY2ggYnVpbGRlciBxdWVyeVxuICAgKi9cbiAgcmVtb3ZlKGZpZWxkOiBTZWFyY2hCdWlsZGVyR3JvdXBRdWVyeSk6IHZvaWQge1xuICAgIC8vIGdldCB0aGUgcXVlcnkgZm9yIHRoaXMgZ3JvdXBcbiAgICBjb25zdCBxdWVyeSA9IHRoaXMuZ2V0UXVlcnkoKTtcblxuICAgIC8vIHJlbW92ZSB0aGUgZmllbGQgZnJvbSB0aGUgYXJyYXlcbiAgICBxdWVyeS5zcGxpY2UocXVlcnkuaW5kZXhPZihmaWVsZCksIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcXVlcnkgZm9yIHRoaXMgc3BlY2lmaWMgc2VhcmNoIGdyb3VwXG4gICAqL1xuICBnZXRRdWVyeSgpOiBTZWFyY2hCdWlsZGVyR3JvdXBRdWVyeVtdIHtcbiAgICByZXR1cm4gdGhpcy5fc2VhcmNoQnVpbGRlclNlcnZpY2UucXVlcnlbdGhpcy5faWRdID8gdGhpcy5fc2VhcmNoQnVpbGRlclNlcnZpY2UucXVlcnlbdGhpcy5faWRdIDogW107XG4gIH1cbn1cbiJdfQ==