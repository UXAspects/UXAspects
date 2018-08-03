/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { SearchBuilderService } from '../search-builder.service';
var SearchBuilderGroupService = /** @class */ (function () {
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
        { type: Injectable }
    ];
    /** @nocollapse */
    SearchBuilderGroupService.ctorParameters = function () { return [
        { type: SearchBuilderService }
    ]; };
    return SearchBuilderGroupService;
}());
export { SearchBuilderGroupService };
function SearchBuilderGroupService_tsickle_Closure_declarations() {
    /** @type {?} */
    SearchBuilderGroupService.prototype._id;
    /** @type {?} */
    SearchBuilderGroupService.prototype._searchBuilderService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJ1aWxkZXItZ3JvdXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlYXJjaC1idWlsZGVyL3NlYXJjaC1idWlsZGVyLWdyb3VwL3NlYXJjaC1idWlsZGVyLWdyb3VwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0lBTy9ELG1DQUFvQixxQkFBMkM7UUFBM0MsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFzQjtLQUFLO0lBRXBFOztPQUVHOzs7Ozs7SUFDSCx3Q0FBSTs7Ozs7SUFBSixVQUFLLEVBQVU7UUFBZixpQkFhQzs7UUFYQyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQzs7UUFHZCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFHaEQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDOztZQUdoRCxVQUFVLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxlQUFlLEVBQUUsRUFBNUMsQ0FBNEMsQ0FBQyxDQUFDO1NBQ2hFO0tBQ0Y7SUFFRDs7T0FFRzs7Ozs7O0lBQ0gsMENBQU07Ozs7O0lBQU4sVUFBTyxLQUE4Qjs7UUFFbkMscUJBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7UUFHOUIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ3ZDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsNENBQVE7Ozs7SUFBUjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztLQUNyRzs7Z0JBekNGLFVBQVU7Ozs7Z0JBRkYsb0JBQW9COztvQ0FGN0I7O1NBS2EseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2VhcmNoQnVpbGRlckdyb3VwUXVlcnkgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2dyb3VwLXF1ZXJ5LmludGVyZmFjZSc7XG5pbXBvcnQgeyBTZWFyY2hCdWlsZGVyU2VydmljZSB9IGZyb20gJy4uL3NlYXJjaC1idWlsZGVyLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VhcmNoQnVpbGRlckdyb3VwU2VydmljZSB7XG5cbiAgcHJpdmF0ZSBfaWQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZWFyY2hCdWlsZGVyU2VydmljZTogU2VhcmNoQnVpbGRlclNlcnZpY2UpIHsgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXNlIHRoZSBncm91cCBieSBkZWZpbmluZyBhbiBpZFxuICAgKi9cbiAgaW5pdChpZDogc3RyaW5nKTogdm9pZCB7XG4gICAgLy8gc3RvcmUgdGhlIG5hbWUgb2YgdGhlIGdyb3VwXG4gICAgdGhpcy5faWQgPSBpZDtcblxuICAgIC8vIGNyZWF0ZSB0aGUgZW50cnkgaW4gdGhlIHF1ZXJ5IG9iamVjdCBpZiBpdCBkb2Vzbid0IGV4aXN0XG4gICAgaWYgKCF0aGlzLl9zZWFyY2hCdWlsZGVyU2VydmljZS5xdWVyeVt0aGlzLl9pZF0pIHtcblxuICAgICAgLy8gY3JlYXRlIHRoZSBzZWN0aW9uXG4gICAgICB0aGlzLl9zZWFyY2hCdWlsZGVyU2VydmljZS5xdWVyeVt0aGlzLl9pZF0gPSBbXTtcblxuICAgICAgLy8gZW1pdCB0aGUgY2hhbmdlcyBhZnRlciB0aGUgaW5pdGlhbCBzZXR1cFxuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLl9zZWFyY2hCdWlsZGVyU2VydmljZS5xdWVyeUhhc0NoYW5nZWQoKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIGZpZWxkIGZyb20gdGhlIHNlYXJjaCBidWlsZGVyIHF1ZXJ5XG4gICAqL1xuICByZW1vdmUoZmllbGQ6IFNlYXJjaEJ1aWxkZXJHcm91cFF1ZXJ5KTogdm9pZCB7XG4gICAgLy8gZ2V0IHRoZSBxdWVyeSBmb3IgdGhpcyBncm91cFxuICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5nZXRRdWVyeSgpO1xuXG4gICAgLy8gcmVtb3ZlIHRoZSBmaWVsZCBmcm9tIHRoZSBhcnJheVxuICAgIHF1ZXJ5LnNwbGljZShxdWVyeS5pbmRleE9mKGZpZWxkKSwgMSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBxdWVyeSBmb3IgdGhpcyBzcGVjaWZpYyBzZWFyY2ggZ3JvdXBcbiAgICovXG4gIGdldFF1ZXJ5KCk6IFNlYXJjaEJ1aWxkZXJHcm91cFF1ZXJ5W10ge1xuICAgIHJldHVybiB0aGlzLl9zZWFyY2hCdWlsZGVyU2VydmljZS5xdWVyeVt0aGlzLl9pZF0gPyB0aGlzLl9zZWFyY2hCdWlsZGVyU2VydmljZS5xdWVyeVt0aGlzLl9pZF0gOiBbXTtcbiAgfVxufVxuIl19