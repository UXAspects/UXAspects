/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
var DragService = /** @class */ (function () {
    function DragService() {
        /**
         * Emit when dragging begins
         */
        this.onDragStart = new Subject();
        /**
         * Emit when dragging moves
         */
        this.onDrag = new Subject();
        /**
         * Emit when dragging ends
         */
        this.onDragEnd = new Subject();
        /**
         * Emit when the user is dragging over the drop area
         */
        this.onDropEnter = new Subject();
        /**
         * Emit when the user is dragging out of the drop area
         */
        this.onDropLeave = new Subject();
        /**
         * Emit when a drop occurs
         */
        this.onDrop = new Subject();
    }
    /** Destroy all observables */
    /**
     * Destroy all observables
     * @return {?}
     */
    DragService.prototype.ngOnDestroy = /**
     * Destroy all observables
     * @return {?}
     */
    function () {
        this.onDragStart.complete();
        this.onDrag.complete();
        this.onDragEnd.complete();
        this.onDrop.complete();
        this.onDropEnter.complete();
        this.onDropLeave.complete();
    };
    DragService.decorators = [
        { type: Injectable }
    ];
    return DragService;
}());
export { DragService };
function DragService_tsickle_Closure_declarations() {
    /**
     * Emit when dragging begins
     * @type {?}
     */
    DragService.prototype.onDragStart;
    /**
     * Emit when dragging moves
     * @type {?}
     */
    DragService.prototype.onDrag;
    /**
     * Emit when dragging ends
     * @type {?}
     */
    DragService.prototype.onDragEnd;
    /**
     * Emit when the user is dragging over the drop area
     * @type {?}
     */
    DragService.prototype.onDropEnter;
    /**
     * Emit when the user is dragging out of the drop area
     * @type {?}
     */
    DragService.prototype.onDropLeave;
    /**
     * Emit when a drop occurs
     * @type {?}
     */
    DragService.prototype.onDrop;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvZHJhZy9kcmFnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQzs7Ozs7OzJCQU1yQixJQUFJLE9BQU8sRUFBZTs7OztzQkFHL0IsSUFBSSxPQUFPLEVBQWU7Ozs7eUJBR3ZCLElBQUksT0FBTyxFQUFlOzs7OzJCQUd4QixJQUFJLE9BQU8sRUFBUTs7OzsyQkFHbkIsSUFBSSxPQUFPLEVBQVE7Ozs7c0JBR3hCLElBQUksT0FBTyxFQUFPOztJQUUzQiw4QkFBOEI7Ozs7O0lBQzlCLGlDQUFXOzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUMvQjs7Z0JBN0JKLFVBQVU7O3NCQUhYOztTQUlhLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRHJhZ1NlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgLyoqIEVtaXQgd2hlbiBkcmFnZ2luZyBiZWdpbnMgKi9cbiAgICBvbkRyYWdTdGFydCA9IG5ldyBTdWJqZWN0PFV4RHJhZ0V2ZW50PigpO1xuXG4gICAgLyoqIEVtaXQgd2hlbiBkcmFnZ2luZyBtb3ZlcyAqL1xuICAgIG9uRHJhZyA9IG5ldyBTdWJqZWN0PFV4RHJhZ0V2ZW50PigpO1xuXG4gICAgLyoqIEVtaXQgd2hlbiBkcmFnZ2luZyBlbmRzICovXG4gICAgb25EcmFnRW5kID0gbmV3IFN1YmplY3Q8VXhEcmFnRXZlbnQ+KCk7XG5cbiAgICAvKiogRW1pdCB3aGVuIHRoZSB1c2VyIGlzIGRyYWdnaW5nIG92ZXIgdGhlIGRyb3AgYXJlYSAqL1xuICAgIG9uRHJvcEVudGVyID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIC8qKiBFbWl0IHdoZW4gdGhlIHVzZXIgaXMgZHJhZ2dpbmcgb3V0IG9mIHRoZSBkcm9wIGFyZWEgKi9cbiAgICBvbkRyb3BMZWF2ZSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICAvKiogRW1pdCB3aGVuIGEgZHJvcCBvY2N1cnMgKi9cbiAgICBvbkRyb3AgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgICAvKiogRGVzdHJveSBhbGwgb2JzZXJ2YWJsZXMgKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkRyYWdTdGFydC5jb21wbGV0ZSgpO1xuICAgICAgICB0aGlzLm9uRHJhZy5jb21wbGV0ZSgpO1xuICAgICAgICB0aGlzLm9uRHJhZ0VuZC5jb21wbGV0ZSgpO1xuICAgICAgICB0aGlzLm9uRHJvcC5jb21wbGV0ZSgpO1xuICAgICAgICB0aGlzLm9uRHJvcEVudGVyLmNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMub25Ecm9wTGVhdmUuY29tcGxldGUoKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IHR5cGUgVXhEcmFnRXZlbnQgPSB7IGdyb3VwPzogc3RyaW5nLCBldmVudD86IE1vdXNlRXZlbnQsIGRhdGE/OiBhbnkgfTsiXX0=