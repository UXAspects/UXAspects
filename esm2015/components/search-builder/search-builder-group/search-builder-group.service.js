/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { SearchBuilderFocusService } from '../search-builder-focus.service';
import { SearchBuilderService } from '../search-builder.service';
export class SearchBuilderGroupService {
    /**
     * @param {?} _searchBuilderService
     * @param {?} _searchBuilderFocusService
     */
    constructor(_searchBuilderService, _searchBuilderFocusService) {
        this._searchBuilderService = _searchBuilderService;
        this._searchBuilderFocusService = _searchBuilderFocusService;
    }
    /**
     * Initialise the group by defining an id
     * @param {?} id
     * @return {?}
     */
    init(id) {
        // store the name of the group
        this._id = id;
        // create the entry in the query object if it doesn't exist
        if (!this._searchBuilderService.query[this._id]) {
            // create the section
            this._searchBuilderService.query[this._id] = [];
            // emit the changes after the initial setup
            setTimeout(() => this._searchBuilderService.queryHasChanged());
        }
    }
    /**
     * Remove a field from the search builder query and return focus to the previous field.
     * @param {?} index
     * @return {?}
     */
    removeAtIndex(index) {
        // get the query for this group
        const /** @type {?} */ query = this.getQuery();
        // remove the field from the array
        query.splice(index, 1);
        // Focus the previous item if available
        this._searchBuilderFocusService.setFocus(this._id, index <= 0 ? 0 : index - 1);
    }
    /**
     * Get the query for this specific search group
     * @return {?}
     */
    getQuery() {
        return this._searchBuilderService.query[this._id] ? this._searchBuilderService.query[this._id] : [];
    }
}
SearchBuilderGroupService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
SearchBuilderGroupService.ctorParameters = () => [
    { type: SearchBuilderService },
    { type: SearchBuilderFocusService }
];
function SearchBuilderGroupService_tsickle_Closure_declarations() {
    /** @type {?} */
    SearchBuilderGroupService.prototype._id;
    /** @type {?} */
    SearchBuilderGroupService.prototype._searchBuilderService;
    /** @type {?} */
    SearchBuilderGroupService.prototype._searchBuilderFocusService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJ1aWxkZXItZ3JvdXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlYXJjaC1idWlsZGVyL3NlYXJjaC1idWlsZGVyLWdyb3VwL3NlYXJjaC1idWlsZGVyLWdyb3VwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDNUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFHakUsTUFBTTs7Ozs7SUFJSixZQUNVLHVCQUNBO1FBREEsMEJBQXFCLEdBQXJCLHFCQUFxQjtRQUNyQiwrQkFBMEIsR0FBMUIsMEJBQTBCO0tBQy9COzs7Ozs7SUFLTCxJQUFJLENBQUMsRUFBVTs7UUFFYixJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQzs7UUFHZCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFHaEQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDOztZQUdoRCxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7U0FDaEU7S0FDRjs7Ozs7O0lBS0QsYUFBYSxDQUFDLEtBQWE7O1FBR3pCLHVCQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7O1FBRzlCLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDOztRQUd2QixJQUFJLENBQUMsMEJBQTBCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDaEY7Ozs7O0lBS0QsUUFBUTtRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztLQUNyRzs7O1lBaERGLFVBQVU7Ozs7WUFGRixvQkFBb0I7WUFEcEIseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2VhcmNoQnVpbGRlckdyb3VwUXVlcnkgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2dyb3VwLXF1ZXJ5LmludGVyZmFjZSc7XG5pbXBvcnQgeyBTZWFyY2hCdWlsZGVyRm9jdXNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VhcmNoLWJ1aWxkZXItZm9jdXMuc2VydmljZSc7XG5pbXBvcnQgeyBTZWFyY2hCdWlsZGVyU2VydmljZSB9IGZyb20gJy4uL3NlYXJjaC1idWlsZGVyLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VhcmNoQnVpbGRlckdyb3VwU2VydmljZSB7XG5cbiAgcHJpdmF0ZSBfaWQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9zZWFyY2hCdWlsZGVyU2VydmljZTogU2VhcmNoQnVpbGRlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfc2VhcmNoQnVpbGRlckZvY3VzU2VydmljZTogU2VhcmNoQnVpbGRlckZvY3VzU2VydmljZVxuICApIHsgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXNlIHRoZSBncm91cCBieSBkZWZpbmluZyBhbiBpZFxuICAgKi9cbiAgaW5pdChpZDogc3RyaW5nKTogdm9pZCB7XG4gICAgLy8gc3RvcmUgdGhlIG5hbWUgb2YgdGhlIGdyb3VwXG4gICAgdGhpcy5faWQgPSBpZDtcblxuICAgIC8vIGNyZWF0ZSB0aGUgZW50cnkgaW4gdGhlIHF1ZXJ5IG9iamVjdCBpZiBpdCBkb2Vzbid0IGV4aXN0XG4gICAgaWYgKCF0aGlzLl9zZWFyY2hCdWlsZGVyU2VydmljZS5xdWVyeVt0aGlzLl9pZF0pIHtcblxuICAgICAgLy8gY3JlYXRlIHRoZSBzZWN0aW9uXG4gICAgICB0aGlzLl9zZWFyY2hCdWlsZGVyU2VydmljZS5xdWVyeVt0aGlzLl9pZF0gPSBbXTtcblxuICAgICAgLy8gZW1pdCB0aGUgY2hhbmdlcyBhZnRlciB0aGUgaW5pdGlhbCBzZXR1cFxuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLl9zZWFyY2hCdWlsZGVyU2VydmljZS5xdWVyeUhhc0NoYW5nZWQoKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIGZpZWxkIGZyb20gdGhlIHNlYXJjaCBidWlsZGVyIHF1ZXJ5IGFuZCByZXR1cm4gZm9jdXMgdG8gdGhlIHByZXZpb3VzIGZpZWxkLlxuICAgKi9cbiAgcmVtb3ZlQXRJbmRleChpbmRleDogbnVtYmVyKTogdm9pZCB7XG5cbiAgICAvLyBnZXQgdGhlIHF1ZXJ5IGZvciB0aGlzIGdyb3VwXG4gICAgY29uc3QgcXVlcnkgPSB0aGlzLmdldFF1ZXJ5KCk7XG5cbiAgICAvLyByZW1vdmUgdGhlIGZpZWxkIGZyb20gdGhlIGFycmF5XG4gICAgcXVlcnkuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgIC8vIEZvY3VzIHRoZSBwcmV2aW91cyBpdGVtIGlmIGF2YWlsYWJsZVxuICAgIHRoaXMuX3NlYXJjaEJ1aWxkZXJGb2N1c1NlcnZpY2Uuc2V0Rm9jdXModGhpcy5faWQsIGluZGV4IDw9IDAgPyAwIDogaW5kZXggLSAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHF1ZXJ5IGZvciB0aGlzIHNwZWNpZmljIHNlYXJjaCBncm91cFxuICAgKi9cbiAgZ2V0UXVlcnkoKTogU2VhcmNoQnVpbGRlckdyb3VwUXVlcnlbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlYXJjaEJ1aWxkZXJTZXJ2aWNlLnF1ZXJ5W3RoaXMuX2lkXSA/IHRoaXMuX3NlYXJjaEJ1aWxkZXJTZXJ2aWNlLnF1ZXJ5W3RoaXMuX2lkXSA6IFtdO1xuICB9XG59XG4iXX0=