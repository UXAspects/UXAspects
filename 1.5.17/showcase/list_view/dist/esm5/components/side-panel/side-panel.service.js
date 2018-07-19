/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
var SidePanelService = (function () {
    function SidePanelService() {
        this.open$ = new BehaviorSubject(false);
    }
    /**
     * @return {?}
     */
    SidePanelService.prototype.open = /**
     * @return {?}
     */
    function () {
        this.open$.next(true);
    };
    /**
     * @return {?}
     */
    SidePanelService.prototype.close = /**
     * @return {?}
     */
    function () {
        this.open$.next(false);
    };
    SidePanelService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SidePanelService.ctorParameters = function () { return []; };
    return SidePanelService;
}());
export { SidePanelService };
function SidePanelService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SidePanelService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SidePanelService.ctorParameters;
    /** @type {?} */
    SidePanelService.prototype.open$;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZS1wYW5lbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2lkZS1wYW5lbC9zaWRlLXBhbmVsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7cUJBSzNDLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQzs7Ozs7SUFFM0MsK0JBQUk7OztJQUFKO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDekI7Ozs7SUFFRCxnQ0FBSzs7O0lBQUw7UUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUMxQjs7Z0JBWEosVUFBVTs7OzsyQkFIWDs7U0FJYSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTaWRlUGFuZWxTZXJ2aWNlIHtcblxuICAgIG9wZW4kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgICBvcGVuKCkge1xuICAgICAgICB0aGlzLm9wZW4kLm5leHQodHJ1ZSk7XG4gICAgfVxuXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIHRoaXMub3BlbiQubmV4dChmYWxzZSk7XG4gICAgfVxufSJdfQ==