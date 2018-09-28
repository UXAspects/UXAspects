/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { SearchBuilderFocusService } from '../search-builder-focus.service';
import { SearchBuilderService } from '../search-builder.service';
var SearchBuilderGroupService = /** @class */ (function () {
    function SearchBuilderGroupService(_searchBuilderService, _searchBuilderFocusService) {
        this._searchBuilderService = _searchBuilderService;
        this._searchBuilderFocusService = _searchBuilderFocusService;
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
     * Remove a field from the search builder query and return focus to the previous field.
     */
    /**
     * Remove a field from the search builder query and return focus to the previous field.
     * @param {?} index
     * @return {?}
     */
    SearchBuilderGroupService.prototype.removeAtIndex = /**
     * Remove a field from the search builder query and return focus to the previous field.
     * @param {?} index
     * @return {?}
     */
    function (index) {
        // get the query for this group
        var /** @type {?} */ query = this.getQuery();
        // remove the field from the array
        query.splice(index, 1);
        // Focus the previous item if available
        this._searchBuilderFocusService.setFocus(this._id, index <= 0 ? 0 : index - 1);
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
        { type: Injectable }
    ];
    /** @nocollapse */
    SearchBuilderGroupService.ctorParameters = function () { return [
        { type: SearchBuilderService },
        { type: SearchBuilderFocusService }
    ]; };
    return SearchBuilderGroupService;
}());
export { SearchBuilderGroupService };
function SearchBuilderGroupService_tsickle_Closure_declarations() {
    /** @type {?} */
    SearchBuilderGroupService.prototype._id;
    /** @type {?} */
    SearchBuilderGroupService.prototype._searchBuilderService;
    /** @type {?} */
    SearchBuilderGroupService.prototype._searchBuilderFocusService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJ1aWxkZXItZ3JvdXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlYXJjaC1idWlsZGVyL3NlYXJjaC1idWlsZGVyLWdyb3VwL3NlYXJjaC1idWlsZGVyLWdyb3VwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDNUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0lBTy9ELG1DQUNVLHVCQUNBO1FBREEsMEJBQXFCLEdBQXJCLHFCQUFxQjtRQUNyQiwrQkFBMEIsR0FBMUIsMEJBQTBCO0tBQy9CO0lBRUw7O09BRUc7Ozs7OztJQUNILHdDQUFJOzs7OztJQUFKLFVBQUssRUFBVTtRQUFmLGlCQWFDOztRQVhDLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDOztRQUdkLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUdoRCxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7O1lBR2hELFVBQVUsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLHFCQUFxQixDQUFDLGVBQWUsRUFBRSxFQUE1QyxDQUE0QyxDQUFDLENBQUM7U0FDaEU7S0FDRjtJQUVEOztPQUVHOzs7Ozs7SUFDSCxpREFBYTs7Ozs7SUFBYixVQUFjLEtBQWE7O1FBR3pCLHFCQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7O1FBRzlCLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDOztRQUd2QixJQUFJLENBQUMsMEJBQTBCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDaEY7SUFFRDs7T0FFRzs7Ozs7SUFDSCw0Q0FBUTs7OztJQUFSO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0tBQ3JHOztnQkFoREYsVUFBVTs7OztnQkFGRixvQkFBb0I7Z0JBRHBCLHlCQUF5Qjs7b0NBRmxDOztTQU1hLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNlYXJjaEJ1aWxkZXJHcm91cFF1ZXJ5IH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9ncm91cC1xdWVyeS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU2VhcmNoQnVpbGRlckZvY3VzU2VydmljZSB9IGZyb20gJy4uL3NlYXJjaC1idWlsZGVyLWZvY3VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VhcmNoQnVpbGRlclNlcnZpY2UgfSBmcm9tICcuLi9zZWFyY2gtYnVpbGRlci5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlYXJjaEJ1aWxkZXJHcm91cFNlcnZpY2Uge1xuXG4gIHByaXZhdGUgX2lkOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfc2VhcmNoQnVpbGRlclNlcnZpY2U6IFNlYXJjaEJ1aWxkZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgX3NlYXJjaEJ1aWxkZXJGb2N1c1NlcnZpY2U6IFNlYXJjaEJ1aWxkZXJGb2N1c1NlcnZpY2VcbiAgKSB7IH1cblxuICAvKipcbiAgICogSW5pdGlhbGlzZSB0aGUgZ3JvdXAgYnkgZGVmaW5pbmcgYW4gaWRcbiAgICovXG4gIGluaXQoaWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIC8vIHN0b3JlIHRoZSBuYW1lIG9mIHRoZSBncm91cFxuICAgIHRoaXMuX2lkID0gaWQ7XG5cbiAgICAvLyBjcmVhdGUgdGhlIGVudHJ5IGluIHRoZSBxdWVyeSBvYmplY3QgaWYgaXQgZG9lc24ndCBleGlzdFxuICAgIGlmICghdGhpcy5fc2VhcmNoQnVpbGRlclNlcnZpY2UucXVlcnlbdGhpcy5faWRdKSB7XG5cbiAgICAgIC8vIGNyZWF0ZSB0aGUgc2VjdGlvblxuICAgICAgdGhpcy5fc2VhcmNoQnVpbGRlclNlcnZpY2UucXVlcnlbdGhpcy5faWRdID0gW107XG5cbiAgICAgIC8vIGVtaXQgdGhlIGNoYW5nZXMgYWZ0ZXIgdGhlIGluaXRpYWwgc2V0dXBcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fc2VhcmNoQnVpbGRlclNlcnZpY2UucXVlcnlIYXNDaGFuZ2VkKCkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBmaWVsZCBmcm9tIHRoZSBzZWFyY2ggYnVpbGRlciBxdWVyeSBhbmQgcmV0dXJuIGZvY3VzIHRvIHRoZSBwcmV2aW91cyBmaWVsZC5cbiAgICovXG4gIHJlbW92ZUF0SW5kZXgoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuXG4gICAgLy8gZ2V0IHRoZSBxdWVyeSBmb3IgdGhpcyBncm91cFxuICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5nZXRRdWVyeSgpO1xuXG4gICAgLy8gcmVtb3ZlIHRoZSBmaWVsZCBmcm9tIHRoZSBhcnJheVxuICAgIHF1ZXJ5LnNwbGljZShpbmRleCwgMSk7XG5cbiAgICAvLyBGb2N1cyB0aGUgcHJldmlvdXMgaXRlbSBpZiBhdmFpbGFibGVcbiAgICB0aGlzLl9zZWFyY2hCdWlsZGVyRm9jdXNTZXJ2aWNlLnNldEZvY3VzKHRoaXMuX2lkLCBpbmRleCA8PSAwID8gMCA6IGluZGV4IC0gMSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBxdWVyeSBmb3IgdGhpcyBzcGVjaWZpYyBzZWFyY2ggZ3JvdXBcbiAgICovXG4gIGdldFF1ZXJ5KCk6IFNlYXJjaEJ1aWxkZXJHcm91cFF1ZXJ5W10ge1xuICAgIHJldHVybiB0aGlzLl9zZWFyY2hCdWlsZGVyU2VydmljZS5xdWVyeVt0aGlzLl9pZF0gPyB0aGlzLl9zZWFyY2hCdWlsZGVyU2VydmljZS5xdWVyeVt0aGlzLl9pZF0gOiBbXTtcbiAgfVxufVxuIl19