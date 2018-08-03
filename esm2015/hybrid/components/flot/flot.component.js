/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Injector, Input, Output, EventEmitter } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
export class FlotNg1Component extends UpgradeComponent {
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    constructor(elementRef, injector) {
        super('uxFlotNg1', elementRef, injector);
        this.onPlotClick = new EventEmitter();
        this.onPlotHover = new EventEmitter();
    }
}
FlotNg1Component.decorators = [
    { type: Directive, args: [{
                selector: 'flot'
            },] }
];
/** @nocollapse */
FlotNg1Component.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector }
];
FlotNg1Component.propDecorators = {
    dataset: [{ type: Input }],
    options: [{ type: Input }],
    callback: [{ type: Input }],
    donutLabels: [{ type: Input }],
    onPlotClick: [{ type: Output }],
    onPlotHover: [{ type: Output }]
};
function FlotNg1Component_tsickle_Closure_declarations() {
    /** @type {?} */
    FlotNg1Component.prototype.dataset;
    /** @type {?} */
    FlotNg1Component.prototype.options;
    /** @type {?} */
    FlotNg1Component.prototype.callback;
    /** @type {?} */
    FlotNg1Component.prototype.donutLabels;
    /** @type {?} */
    FlotNg1Component.prototype.onPlotClick;
    /** @type {?} */
    FlotNg1Component.prototype.onPlotHover;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiaHlicmlkL2NvbXBvbmVudHMvZmxvdC9mbG90LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBSzNELE1BQU0sdUJBQXdCLFNBQVEsZ0JBQWdCOzs7OztJQVNsRCxZQUFZLFVBQXNCLEVBQUUsUUFBa0I7UUFDbEQsS0FBSyxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7MkJBSnJCLElBQUksWUFBWSxFQUFPOzJCQUN2QixJQUFJLFlBQVksRUFBTztLQUk5Qzs7O1lBZEosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxNQUFNO2FBQ25COzs7O1lBTG1CLFVBQVU7WUFBRSxRQUFROzs7c0JBUW5DLEtBQUs7c0JBQ0wsS0FBSzt1QkFDTCxLQUFLOzBCQUNMLEtBQUs7MEJBQ0wsTUFBTTswQkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3RvciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVcGdyYWRlQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvdXBncmFkZS9zdGF0aWMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2Zsb3QnXG59KVxuZXhwb3J0IGNsYXNzIEZsb3ROZzFDb21wb25lbnQgZXh0ZW5kcyBVcGdyYWRlQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIGRhdGFzZXQ6IGFueTtcbiAgICBASW5wdXQoKSBvcHRpb25zOiBhbnk7XG4gICAgQElucHV0KCkgY2FsbGJhY2s6IGFueTtcbiAgICBASW5wdXQoKSBkb251dExhYmVsczogYW55O1xuICAgIEBPdXRwdXQoKSBvblBsb3RDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIEBPdXRwdXQoKSBvblBsb3RIb3ZlciA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgICAgIHN1cGVyKCd1eEZsb3ROZzEnLCBlbGVtZW50UmVmLCBpbmplY3Rvcik7XG4gICAgfVxufSJdfQ==