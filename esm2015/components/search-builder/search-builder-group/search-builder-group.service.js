/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { SearchBuilderService } from '../search-builder.service';
export class SearchBuilderGroupService {
    /**
     * @param {?} _searchBuilderService
     */
    constructor(_searchBuilderService) {
        this._searchBuilderService = _searchBuilderService;
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
     * Remove a field from the search builder query
     * @param {?} field
     * @return {?}
     */
    remove(field) {
        // get the query for this group
        const /** @type {?} */ query = this.getQuery();
        // remove the field from the array
        query.splice(query.indexOf(field), 1);
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
    { type: SearchBuilderService }
];
function SearchBuilderGroupService_tsickle_Closure_declarations() {
    /** @type {?} */
    SearchBuilderGroupService.prototype._id;
    /** @type {?} */
    SearchBuilderGroupService.prototype._searchBuilderService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJ1aWxkZXItZ3JvdXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlYXJjaC1idWlsZGVyL3NlYXJjaC1idWlsZGVyLWdyb3VwL3NlYXJjaC1idWlsZGVyLWdyb3VwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFHakUsTUFBTTs7OztJQUlKLFlBQW9CLHFCQUEyQztRQUEzQywwQkFBcUIsR0FBckIscUJBQXFCLENBQXNCO0tBQUs7Ozs7OztJQUtwRSxJQUFJLENBQUMsRUFBVTs7UUFFYixJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQzs7UUFHZCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFHaEQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDOztZQUdoRCxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7U0FDaEU7S0FDRjs7Ozs7O0lBS0QsTUFBTSxDQUFDLEtBQThCOztRQUVuQyx1QkFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDOztRQUc5QixLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDdkM7Ozs7O0lBS0QsUUFBUTtRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztLQUNyRzs7O1lBekNGLFVBQVU7Ozs7WUFGRixvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTZWFyY2hCdWlsZGVyR3JvdXBRdWVyeSB9IGZyb20gJy4uL2ludGVyZmFjZXMvZ3JvdXAtcXVlcnkuaW50ZXJmYWNlJztcbmltcG9ydCB7IFNlYXJjaEJ1aWxkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VhcmNoLWJ1aWxkZXIuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZWFyY2hCdWlsZGVyR3JvdXBTZXJ2aWNlIHtcblxuICBwcml2YXRlIF9pZDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlYXJjaEJ1aWxkZXJTZXJ2aWNlOiBTZWFyY2hCdWlsZGVyU2VydmljZSkgeyB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpc2UgdGhlIGdyb3VwIGJ5IGRlZmluaW5nIGFuIGlkXG4gICAqL1xuICBpbml0KGlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAvLyBzdG9yZSB0aGUgbmFtZSBvZiB0aGUgZ3JvdXBcbiAgICB0aGlzLl9pZCA9IGlkO1xuXG4gICAgLy8gY3JlYXRlIHRoZSBlbnRyeSBpbiB0aGUgcXVlcnkgb2JqZWN0IGlmIGl0IGRvZXNuJ3QgZXhpc3RcbiAgICBpZiAoIXRoaXMuX3NlYXJjaEJ1aWxkZXJTZXJ2aWNlLnF1ZXJ5W3RoaXMuX2lkXSkge1xuXG4gICAgICAvLyBjcmVhdGUgdGhlIHNlY3Rpb25cbiAgICAgIHRoaXMuX3NlYXJjaEJ1aWxkZXJTZXJ2aWNlLnF1ZXJ5W3RoaXMuX2lkXSA9IFtdO1xuXG4gICAgICAvLyBlbWl0IHRoZSBjaGFuZ2VzIGFmdGVyIHRoZSBpbml0aWFsIHNldHVwXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuX3NlYXJjaEJ1aWxkZXJTZXJ2aWNlLnF1ZXJ5SGFzQ2hhbmdlZCgpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGEgZmllbGQgZnJvbSB0aGUgc2VhcmNoIGJ1aWxkZXIgcXVlcnlcbiAgICovXG4gIHJlbW92ZShmaWVsZDogU2VhcmNoQnVpbGRlckdyb3VwUXVlcnkpOiB2b2lkIHtcbiAgICAvLyBnZXQgdGhlIHF1ZXJ5IGZvciB0aGlzIGdyb3VwXG4gICAgY29uc3QgcXVlcnkgPSB0aGlzLmdldFF1ZXJ5KCk7XG5cbiAgICAvLyByZW1vdmUgdGhlIGZpZWxkIGZyb20gdGhlIGFycmF5XG4gICAgcXVlcnkuc3BsaWNlKHF1ZXJ5LmluZGV4T2YoZmllbGQpLCAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHF1ZXJ5IGZvciB0aGlzIHNwZWNpZmljIHNlYXJjaCBncm91cFxuICAgKi9cbiAgZ2V0UXVlcnkoKTogU2VhcmNoQnVpbGRlckdyb3VwUXVlcnlbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlYXJjaEJ1aWxkZXJTZXJ2aWNlLnF1ZXJ5W3RoaXMuX2lkXSA/IHRoaXMuX3NlYXJjaEJ1aWxkZXJTZXJ2aWNlLnF1ZXJ5W3RoaXMuX2lkXSA6IFtdO1xuICB9XG59XG4iXX0=