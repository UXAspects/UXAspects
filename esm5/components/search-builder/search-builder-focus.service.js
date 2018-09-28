/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
var /** @type {?} */ UNSET_FOCUS = { groupId: null, index: -1 };
var SearchBuilderFocusService = /** @class */ (function () {
    function SearchBuilderFocusService() {
        this.focus$ = new BehaviorSubject(UNSET_FOCUS);
    }
    /**
     * Set focus on a search builder component.
     * @param groupId The `id` of the group containing the component.
     * @param index The (zero-based) index of the component.
     */
    /**
     * Set focus on a search builder component.
     * @param {?} groupId The `id` of the group containing the component.
     * @param {?} index The (zero-based) index of the component.
     * @return {?}
     */
    SearchBuilderFocusService.prototype.setFocus = /**
     * Set focus on a search builder component.
     * @param {?} groupId The `id` of the group containing the component.
     * @param {?} index The (zero-based) index of the component.
     * @return {?}
     */
    function (groupId, index) {
        this.focus$.next({ groupId: groupId, index: index });
    };
    /**
     * Removes focus from all components. If focus is not on a search builder component, this does nothing.
     */
    /**
     * Removes focus from all components. If focus is not on a search builder component, this does nothing.
     * @return {?}
     */
    SearchBuilderFocusService.prototype.clearFocus = /**
     * Removes focus from all components. If focus is not on a search builder component, this does nothing.
     * @return {?}
     */
    function () {
        this.focus$.next(UNSET_FOCUS);
    };
    SearchBuilderFocusService.decorators = [
        { type: Injectable }
    ];
    return SearchBuilderFocusService;
}());
export { SearchBuilderFocusService };
function SearchBuilderFocusService_tsickle_Closure_declarations() {
    /** @type {?} */
    SearchBuilderFocusService.prototype.focus$;
}
/**
 * @record
 */
export function SearchBuilderFocus() { }
function SearchBuilderFocus_tsickle_Closure_declarations() {
    /** @type {?} */
    SearchBuilderFocus.prototype.groupId;
    /** @type {?} */
    SearchBuilderFocus.prototype.index;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJ1aWxkZXItZm9jdXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlYXJjaC1idWlsZGVyL3NlYXJjaC1idWlsZGVyLWZvY3VzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXZELHFCQUFNLFdBQVcsR0FBdUIsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDOzs7c0JBS3hELElBQUksZUFBZSxDQUFxQixXQUFXLENBQUM7O0lBRTdEOzs7O09BSUc7Ozs7Ozs7SUFDSCw0Q0FBUTs7Ozs7O0lBQVIsVUFBUyxPQUFlLEVBQUUsS0FBYTtRQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7S0FDeEQ7SUFFRDs7T0FFRzs7Ozs7SUFDSCw4Q0FBVTs7OztJQUFWO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDakM7O2dCQW5CSixVQUFVOztvQ0FMWDs7U0FNYSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5cbmNvbnN0IFVOU0VUX0ZPQ1VTOiBTZWFyY2hCdWlsZGVyRm9jdXMgPSB7IGdyb3VwSWQ6IG51bGwsIGluZGV4OiAtMSB9O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VhcmNoQnVpbGRlckZvY3VzU2VydmljZSB7XG5cbiAgICBmb2N1cyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFNlYXJjaEJ1aWxkZXJGb2N1cz4oVU5TRVRfRk9DVVMpO1xuXG4gICAgLyoqXG4gICAgICogU2V0IGZvY3VzIG9uIGEgc2VhcmNoIGJ1aWxkZXIgY29tcG9uZW50LlxuICAgICAqIEBwYXJhbSBncm91cElkIFRoZSBgaWRgIG9mIHRoZSBncm91cCBjb250YWluaW5nIHRoZSBjb21wb25lbnQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSAoemVyby1iYXNlZCkgaW5kZXggb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKi9cbiAgICBzZXRGb2N1cyhncm91cElkOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb2N1cyQubmV4dCh7IGdyb3VwSWQ6IGdyb3VwSWQsIGluZGV4OiBpbmRleCB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGZvY3VzIGZyb20gYWxsIGNvbXBvbmVudHMuIElmIGZvY3VzIGlzIG5vdCBvbiBhIHNlYXJjaCBidWlsZGVyIGNvbXBvbmVudCwgdGhpcyBkb2VzIG5vdGhpbmcuXG4gICAgICovXG4gICAgY2xlYXJGb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb2N1cyQubmV4dChVTlNFVF9GT0NVUyk7XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNlYXJjaEJ1aWxkZXJGb2N1cyB7XG4gICAgZ3JvdXBJZDogc3RyaW5nO1xuICAgIGluZGV4OiBudW1iZXI7XG59Il19