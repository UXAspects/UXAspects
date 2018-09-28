/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
const /** @type {?} */ UNSET_FOCUS = { groupId: null, index: -1 };
export class SearchBuilderFocusService {
    constructor() {
        this.focus$ = new BehaviorSubject(UNSET_FOCUS);
    }
    /**
     * Set focus on a search builder component.
     * @param {?} groupId The `id` of the group containing the component.
     * @param {?} index The (zero-based) index of the component.
     * @return {?}
     */
    setFocus(groupId, index) {
        this.focus$.next({ groupId: groupId, index: index });
    }
    /**
     * Removes focus from all components. If focus is not on a search builder component, this does nothing.
     * @return {?}
     */
    clearFocus() {
        this.focus$.next(UNSET_FOCUS);
    }
}
SearchBuilderFocusService.decorators = [
    { type: Injectable }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJ1aWxkZXItZm9jdXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlYXJjaC1idWlsZGVyL3NlYXJjaC1idWlsZGVyLWZvY3VzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXZELHVCQUFNLFdBQVcsR0FBdUIsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO0FBR3JFLE1BQU07O3NCQUVPLElBQUksZUFBZSxDQUFxQixXQUFXLENBQUM7Ozs7Ozs7O0lBTzdELFFBQVEsQ0FBQyxPQUFlLEVBQUUsS0FBYTtRQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7S0FDeEQ7Ozs7O0lBS0QsVUFBVTtRQUNOLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQ2pDOzs7WUFuQkosVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcblxuY29uc3QgVU5TRVRfRk9DVVM6IFNlYXJjaEJ1aWxkZXJGb2N1cyA9IHsgZ3JvdXBJZDogbnVsbCwgaW5kZXg6IC0xIH07XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZWFyY2hCdWlsZGVyRm9jdXNTZXJ2aWNlIHtcblxuICAgIGZvY3VzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8U2VhcmNoQnVpbGRlckZvY3VzPihVTlNFVF9GT0NVUyk7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgZm9jdXMgb24gYSBzZWFyY2ggYnVpbGRlciBjb21wb25lbnQuXG4gICAgICogQHBhcmFtIGdyb3VwSWQgVGhlIGBpZGAgb2YgdGhlIGdyb3VwIGNvbnRhaW5pbmcgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlICh6ZXJvLWJhc2VkKSBpbmRleCBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqL1xuICAgIHNldEZvY3VzKGdyb3VwSWQ6IHN0cmluZywgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmZvY3VzJC5uZXh0KHsgZ3JvdXBJZDogZ3JvdXBJZCwgaW5kZXg6IGluZGV4IH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgZm9jdXMgZnJvbSBhbGwgY29tcG9uZW50cy4gSWYgZm9jdXMgaXMgbm90IG9uIGEgc2VhcmNoIGJ1aWxkZXIgY29tcG9uZW50LCB0aGlzIGRvZXMgbm90aGluZy5cbiAgICAgKi9cbiAgICBjbGVhckZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZvY3VzJC5uZXh0KFVOU0VUX0ZPQ1VTKTtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VhcmNoQnVpbGRlckZvY3VzIHtcbiAgICBncm91cElkOiBzdHJpbmc7XG4gICAgaW5kZXg6IG51bWJlcjtcbn0iXX0=