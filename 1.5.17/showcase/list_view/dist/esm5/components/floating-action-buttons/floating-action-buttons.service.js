/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
var FloatingActionButtonsService = (function () {
    function FloatingActionButtonsService() {
        this.open$ = new BehaviorSubject(false);
    }
    /**
     * @return {?}
     */
    FloatingActionButtonsService.prototype.open = /**
     * @return {?}
     */
    function () {
        this.open$.next(true);
    };
    /**
     * @return {?}
     */
    FloatingActionButtonsService.prototype.toggle = /**
     * @return {?}
     */
    function () {
        this.open$.next(!this.open$.getValue());
    };
    /**
     * @return {?}
     */
    FloatingActionButtonsService.prototype.close = /**
     * @return {?}
     */
    function () {
        this.open$.next(false);
    };
    FloatingActionButtonsService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    FloatingActionButtonsService.ctorParameters = function () { return []; };
    return FloatingActionButtonsService;
}());
export { FloatingActionButtonsService };
function FloatingActionButtonsService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FloatingActionButtonsService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FloatingActionButtonsService.ctorParameters;
    /** @type {?} */
    FloatingActionButtonsService.prototype.open$;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmctYWN0aW9uLWJ1dHRvbnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2Zsb2F0aW5nLWFjdGlvbi1idXR0b25zL2Zsb2F0aW5nLWFjdGlvbi1idXR0b25zLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7cUJBSzNDLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQzs7Ozs7SUFFM0MsMkNBQUk7OztJQUFKO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDekI7Ozs7SUFFRCw2Q0FBTTs7O0lBQU47UUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztLQUMzQzs7OztJQUVELDRDQUFLOzs7SUFBTDtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzFCOztnQkFmSixVQUFVOzs7O3VDQUhYOztTQUlhLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZsb2F0aW5nQWN0aW9uQnV0dG9uc1NlcnZpY2Uge1xuXG4gICAgb3BlbiQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAgIG9wZW4oKTogdm9pZCB7XG4gICAgICAgIHRoaXMub3BlbiQubmV4dCh0cnVlKTtcbiAgICB9XG5cbiAgICB0b2dnbGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub3BlbiQubmV4dCghdGhpcy5vcGVuJC5nZXRWYWx1ZSgpKTtcbiAgICB9XG5cbiAgICBjbG9zZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vcGVuJC5uZXh0KGZhbHNlKTtcbiAgICB9XG59Il19