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
        this.uxFocusWithin = new EventEmitter();
        this.uxBlurWithin = new EventEmitter();
        _focusMonitor.monitor(this._elementRef.nativeElement, true)
            .subscribe(origin => ngZone.run(() => origin ? this.uxFocusWithin.emit() : this.uxBlurWithin.emit()));
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
                selector: '[uxFocusWithin],[uxBlurWithin]',
            },] }
];
/** @nocollapse */
FocusWithinDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor },
    { type: NgZone }
];
FocusWithinDirective.propDecorators = {
    uxFocusWithin: [{ type: Output }],
    uxBlurWithin: [{ type: Output }]
};
function FocusWithinDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    FocusWithinDirective.prototype.uxFocusWithin;
    /** @type {?} */
    FocusWithinDirective.prototype.uxBlurWithin;
    /** @type {?} */
    FocusWithinDirective.prototype._elementRef;
    /** @type {?} */
    FocusWithinDirective.prototype._focusMonitor;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtd2l0aGluLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2FjY2Vzc2liaWxpdHkvZm9jdXMtd2l0aGluL2ZvY3VzLXdpdGhpbi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFhLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUsvRixNQUFNOzs7Ozs7SUFLRixZQUFvQixXQUF1QixFQUFVLGFBQTJCLEVBQUUsTUFBYztRQUE1RSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFjOzZCQUh0RCxJQUFJLFlBQVksRUFBUTs0QkFDekIsSUFBSSxZQUFZLEVBQVE7UUFHN0MsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUM7YUFDdEQsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQzdHOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDckU7OztZQWZKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZ0NBQWdDO2FBQzdDOzs7O1lBSm1CLFVBQVU7WUFEckIsWUFBWTtZQUN5QixNQUFNOzs7NEJBTy9DLE1BQU07MkJBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzTW9uaXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBOZ1pvbmUsIE9uRGVzdHJveSwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4Rm9jdXNXaXRoaW5dLFt1eEJsdXJXaXRoaW5dJyxcbn0pXG5leHBvcnQgY2xhc3MgRm9jdXNXaXRoaW5EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgQE91dHB1dCgpIHV4Rm9jdXNXaXRoaW4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gICAgQE91dHB1dCgpIHV4Qmx1cldpdGhpbiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgX2ZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLCBuZ1pvbmU6IE5nWm9uZSkge1xuICAgICAgICBfZm9jdXNNb25pdG9yLm1vbml0b3IodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0cnVlKVxuICAgICAgICAgICAgLnN1YnNjcmliZShvcmlnaW4gPT4gbmdab25lLnJ1bigoKSA9PiBvcmlnaW4gPyB0aGlzLnV4Rm9jdXNXaXRoaW4uZW1pdCgpIDogdGhpcy51eEJsdXJXaXRoaW4uZW1pdCgpKSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5zdG9wTW9uaXRvcmluZyh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cbn0iXX0=