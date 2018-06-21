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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmctYWN0aW9uLWJ1dHRvbnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2Zsb2F0aW5nLWFjdGlvbi1idXR0b25zL2Zsb2F0aW5nLWFjdGlvbi1idXR0b25zLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7cUJBSzNDLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQzs7Ozs7SUFFM0MsMkNBQUk7OztJQUFKO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDekI7Ozs7SUFFRCw2Q0FBTTs7O0lBQU47UUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztLQUMzQzs7OztJQUVELDRDQUFLOzs7SUFBTDtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzFCOztnQkFmSixVQUFVOzt1Q0FIWDs7U0FJYSw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGbG9hdGluZ0FjdGlvbkJ1dHRvbnNTZXJ2aWNlIHtcblxuICAgIG9wZW4kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgICBvcGVuKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9wZW4kLm5leHQodHJ1ZSk7XG4gICAgfVxuXG4gICAgdG9nZ2xlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9wZW4kLm5leHQoIXRoaXMub3BlbiQuZ2V0VmFsdWUoKSk7XG4gICAgfVxuXG4gICAgY2xvc2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub3BlbiQubmV4dChmYWxzZSk7XG4gICAgfVxufSJdfQ==