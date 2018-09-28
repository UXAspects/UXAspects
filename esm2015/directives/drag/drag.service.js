/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
export class DragService {
    constructor() {
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
    /**
     * Destroy all observables
     * @return {?}
     */
    ngOnDestroy() {
        this.onDragStart.complete();
        this.onDrag.complete();
        this.onDragEnd.complete();
        this.onDrop.complete();
        this.onDropEnter.complete();
        this.onDropLeave.complete();
    }
}
DragService.decorators = [
    { type: Injectable }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvZHJhZy9kcmFnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUd2QyxNQUFNOzs7OzsyQkFHWSxJQUFJLE9BQU8sRUFBZTs7OztzQkFHL0IsSUFBSSxPQUFPLEVBQWU7Ozs7eUJBR3ZCLElBQUksT0FBTyxFQUFlOzs7OzJCQUd4QixJQUFJLE9BQU8sRUFBUTs7OzsyQkFHbkIsSUFBSSxPQUFPLEVBQVE7Ozs7c0JBR3hCLElBQUksT0FBTyxFQUFPOzs7Ozs7SUFHM0IsV0FBVztRQUNQLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQy9COzs7WUE3QkosVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEcmFnU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICAvKiogRW1pdCB3aGVuIGRyYWdnaW5nIGJlZ2lucyAqL1xuICAgIG9uRHJhZ1N0YXJ0ID0gbmV3IFN1YmplY3Q8VXhEcmFnRXZlbnQ+KCk7XG5cbiAgICAvKiogRW1pdCB3aGVuIGRyYWdnaW5nIG1vdmVzICovXG4gICAgb25EcmFnID0gbmV3IFN1YmplY3Q8VXhEcmFnRXZlbnQ+KCk7XG5cbiAgICAvKiogRW1pdCB3aGVuIGRyYWdnaW5nIGVuZHMgKi9cbiAgICBvbkRyYWdFbmQgPSBuZXcgU3ViamVjdDxVeERyYWdFdmVudD4oKTtcblxuICAgIC8qKiBFbWl0IHdoZW4gdGhlIHVzZXIgaXMgZHJhZ2dpbmcgb3ZlciB0aGUgZHJvcCBhcmVhICovXG4gICAgb25Ecm9wRW50ZXIgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgLyoqIEVtaXQgd2hlbiB0aGUgdXNlciBpcyBkcmFnZ2luZyBvdXQgb2YgdGhlIGRyb3AgYXJlYSAqL1xuICAgIG9uRHJvcExlYXZlID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIC8qKiBFbWl0IHdoZW4gYSBkcm9wIG9jY3VycyAqL1xuICAgIG9uRHJvcCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICAgIC8qKiBEZXN0cm95IGFsbCBvYnNlcnZhYmxlcyAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uRHJhZ1N0YXJ0LmNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMub25EcmFnLmNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMub25EcmFnRW5kLmNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMub25Ecm9wLmNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMub25Ecm9wRW50ZXIuY29tcGxldGUoKTtcbiAgICAgICAgdGhpcy5vbkRyb3BMZWF2ZS5jb21wbGV0ZSgpO1xuICAgIH1cblxufVxuXG5leHBvcnQgdHlwZSBVeERyYWdFdmVudCA9IHsgZ3JvdXA/OiBzdHJpbmcsIGV2ZW50PzogTW91c2VFdmVudCwgZGF0YT86IGFueSB9OyJdfQ==