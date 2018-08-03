/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { Directive, ElementRef, EventEmitter, NgZone, Output } from '@angular/core';
export class FocusWithinDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _focusMonitor
     * @param {?} ngZone
     */
    constructor(_elementRef, _focusMonitor, ngZone) {
        this._elementRef = _elementRef;
        this._focusMonitor = _focusMonitor;
        this.focusWithin = new EventEmitter();
        this.blurWithin = new EventEmitter();
        _focusMonitor.monitor(this._elementRef.nativeElement, true)
            .subscribe(origin => ngZone.run(() => origin ? this.focusWithin.emit() : this.blurWithin.emit()));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
    }
}
FocusWithinDirective.decorators = [
    { type: Directive, args: [{
                selector: '[focusWithin],[blurWithin]',
            },] }
];
/** @nocollapse */
FocusWithinDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor },
    { type: NgZone }
];
FocusWithinDirective.propDecorators = {
    focusWithin: [{ type: Output }],
    blurWithin: [{ type: Output }]
};
function FocusWithinDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    FocusWithinDirective.prototype.focusWithin;
    /** @type {?} */
    FocusWithinDirective.prototype.blurWithin;
    /** @type {?} */
    FocusWithinDirective.prototype._elementRef;
    /** @type {?} */
    FocusWithinDirective.prototype._focusMonitor;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtd2l0aGluLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2FjY2Vzc2liaWxpdHkvZm9jdXMtd2l0aGluL2ZvY3VzLXdpdGhpbi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFhLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUsvRixNQUFNOzs7Ozs7SUFLRixZQUFvQixXQUF1QixFQUFVLGFBQTJCLEVBQUUsTUFBYztRQUE1RSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFjOzJCQUh4RCxJQUFJLFlBQVksRUFBUTswQkFDekIsSUFBSSxZQUFZLEVBQVE7UUFHM0MsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUM7YUFDdEQsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ3pHOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDckU7OztZQWZKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsNEJBQTRCO2FBQ3pDOzs7O1lBSm1CLFVBQVU7WUFEckIsWUFBWTtZQUN5QixNQUFNOzs7MEJBTy9DLE1BQU07eUJBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzTW9uaXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBOZ1pvbmUsIE9uRGVzdHJveSwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2ZvY3VzV2l0aGluXSxbYmx1cldpdGhpbl0nLFxufSlcbmV4cG9ydCBjbGFzcyBGb2N1c1dpdGhpbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBAT3V0cHV0KCkgZm9jdXNXaXRoaW4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gICAgQE91dHB1dCgpIGJsdXJXaXRoaW4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIF9mb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvciwgbmdab25lOiBOZ1pvbmUpIHtcbiAgICAgICAgX2ZvY3VzTW9uaXRvci5tb25pdG9yKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdHJ1ZSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUob3JpZ2luID0+IG5nWm9uZS5ydW4oKCkgPT4gb3JpZ2luID8gdGhpcy5mb2N1c1dpdGhpbi5lbWl0KCkgOiB0aGlzLmJsdXJXaXRoaW4uZW1pdCgpKSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5zdG9wTW9uaXRvcmluZyh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cbn0iXX0=