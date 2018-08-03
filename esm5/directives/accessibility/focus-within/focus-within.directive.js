/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { Directive, ElementRef, EventEmitter, NgZone, Output } from '@angular/core';
var FocusWithinDirective = /** @class */ (function () {
    function FocusWithinDirective(_elementRef, _focusMonitor, ngZone) {
        var _this = this;
        this._elementRef = _elementRef;
        this._focusMonitor = _focusMonitor;
        this.focusWithin = new EventEmitter();
        this.blurWithin = new EventEmitter();
        _focusMonitor.monitor(this._elementRef.nativeElement, true)
            .subscribe(function (origin) { return ngZone.run(function () { return origin ? _this.focusWithin.emit() : _this.blurWithin.emit(); }); });
    }
    /**
     * @return {?}
     */
    FocusWithinDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
    };
    FocusWithinDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[focusWithin],[blurWithin]',
                },] }
    ];
    /** @nocollapse */
    FocusWithinDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: FocusMonitor },
        { type: NgZone }
    ]; };
    FocusWithinDirective.propDecorators = {
        focusWithin: [{ type: Output }],
        blurWithin: [{ type: Output }]
    };
    return FocusWithinDirective;
}());
export { FocusWithinDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtd2l0aGluLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2FjY2Vzc2liaWxpdHkvZm9jdXMtd2l0aGluL2ZvY3VzLXdpdGhpbi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFhLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQzs7SUFVM0YsOEJBQW9CLFdBQXVCLEVBQVUsYUFBMkIsRUFBRSxNQUFjO1FBQWhHLGlCQUdDO1FBSG1CLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWM7MkJBSHhELElBQUksWUFBWSxFQUFROzBCQUN6QixJQUFJLFlBQVksRUFBUTtRQUczQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQzthQUN0RCxTQUFTLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEVBQXpELENBQXlELENBQUMsRUFBM0UsQ0FBMkUsQ0FBQyxDQUFDO0tBQ3pHOzs7O0lBRUQsMENBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztLQUNyRTs7Z0JBZkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSw0QkFBNEI7aUJBQ3pDOzs7O2dCQUptQixVQUFVO2dCQURyQixZQUFZO2dCQUN5QixNQUFNOzs7OEJBTy9DLE1BQU07NkJBQ04sTUFBTTs7K0JBVFg7O1NBTWEsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNNb25pdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIE5nWm9uZSwgT25EZXN0cm95LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbZm9jdXNXaXRoaW5dLFtibHVyV2l0aGluXScsXG59KVxuZXhwb3J0IGNsYXNzIEZvY3VzV2l0aGluRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIEBPdXRwdXQoKSBmb2N1c1dpdGhpbiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgICBAT3V0cHV0KCkgYmx1cldpdGhpbiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgX2ZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLCBuZ1pvbmU6IE5nWm9uZSkge1xuICAgICAgICBfZm9jdXNNb25pdG9yLm1vbml0b3IodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0cnVlKVxuICAgICAgICAgICAgLnN1YnNjcmliZShvcmlnaW4gPT4gbmdab25lLnJ1bigoKSA9PiBvcmlnaW4gPyB0aGlzLmZvY3VzV2l0aGluLmVtaXQoKSA6IHRoaXMuYmx1cldpdGhpbi5lbWl0KCkpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxufSJdfQ==