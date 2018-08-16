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
        this.uxFocusWithin = new EventEmitter();
        this.uxBlurWithin = new EventEmitter();
        _focusMonitor.monitor(this._elementRef.nativeElement, true)
            .subscribe(function (origin) { return ngZone.run(function () { return origin ? _this.uxFocusWithin.emit() : _this.uxBlurWithin.emit(); }); });
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
                    selector: '[uxFocusWithin],[uxBlurWithin]',
                },] }
    ];
    /** @nocollapse */
    FocusWithinDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: FocusMonitor },
        { type: NgZone }
    ]; };
    FocusWithinDirective.propDecorators = {
        uxFocusWithin: [{ type: Output }],
        uxBlurWithin: [{ type: Output }]
    };
    return FocusWithinDirective;
}());
export { FocusWithinDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtd2l0aGluLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2FjY2Vzc2liaWxpdHkvZm9jdXMtd2l0aGluL2ZvY3VzLXdpdGhpbi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFhLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQzs7SUFVM0YsOEJBQW9CLFdBQXVCLEVBQVUsYUFBMkIsRUFBRSxNQUFjO1FBQWhHLGlCQUdDO1FBSG1CLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWM7NkJBSHRELElBQUksWUFBWSxFQUFROzRCQUN6QixJQUFJLFlBQVksRUFBUTtRQUc3QyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQzthQUN0RCxTQUFTLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEVBQTdELENBQTZELENBQUMsRUFBL0UsQ0FBK0UsQ0FBQyxDQUFDO0tBQzdHOzs7O0lBRUQsMENBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztLQUNyRTs7Z0JBZkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxnQ0FBZ0M7aUJBQzdDOzs7O2dCQUptQixVQUFVO2dCQURyQixZQUFZO2dCQUN5QixNQUFNOzs7Z0NBTy9DLE1BQU07K0JBQ04sTUFBTTs7K0JBVFg7O1NBTWEsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNNb25pdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIE5nWm9uZSwgT25EZXN0cm95LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhGb2N1c1dpdGhpbl0sW3V4Qmx1cldpdGhpbl0nLFxufSlcbmV4cG9ydCBjbGFzcyBGb2N1c1dpdGhpbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBAT3V0cHV0KCkgdXhGb2N1c1dpdGhpbiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgICBAT3V0cHV0KCkgdXhCbHVyV2l0aGluID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBfZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsIG5nWm9uZTogTmdab25lKSB7XG4gICAgICAgIF9mb2N1c01vbml0b3IubW9uaXRvcih0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRydWUpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKG9yaWdpbiA9PiBuZ1pvbmUucnVuKCgpID0+IG9yaWdpbiA/IHRoaXMudXhGb2N1c1dpdGhpbi5lbWl0KCkgOiB0aGlzLnV4Qmx1cldpdGhpbi5lbWl0KCkpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxufSJdfQ==