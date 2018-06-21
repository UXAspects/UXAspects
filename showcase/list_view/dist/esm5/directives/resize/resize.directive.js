/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { ResizeService } from './resize.service';
var ResizeDirective = (function () {
    function ResizeDirective(_elementRef, _resizeService, _ngZone) {
        this._elementRef = _elementRef;
        this._resizeService = _resizeService;
        this._ngZone = _ngZone;
        this.throttle = 0;
        this.uxResize = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ResizeDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._subscription = this._resizeService.addResizeListener(this._elementRef.nativeElement)
            .pipe(debounceTime(this.throttle))
            .subscribe(function (event) { return _this._ngZone.run(function () { return _this.uxResize.emit(event); }); });
    };
    /**
     * @return {?}
     */
    ResizeDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    ResizeDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxResize]',
                    providers: [ResizeService]
                },] },
    ];
    /** @nocollapse */
    ResizeDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: ResizeService, },
        { type: NgZone, },
    ]; };
    ResizeDirective.propDecorators = {
        "throttle": [{ type: Input },],
        "uxResize": [{ type: Output },],
    };
    return ResizeDirective;
}());
export { ResizeDirective };
function ResizeDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ResizeDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ResizeDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    ResizeDirective.propDecorators;
    /** @type {?} */
    ResizeDirective.prototype.throttle;
    /** @type {?} */
    ResizeDirective.prototype.uxResize;
    /** @type {?} */
    ResizeDirective.prototype._subscription;
    /** @type {?} */
    ResizeDirective.prototype._elementRef;
    /** @type {?} */
    ResizeDirective.prototype._resizeService;
    /** @type {?} */
    ResizeDirective.prototype._ngZone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3Jlc2l6ZS9yZXNpemUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBcUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5QyxPQUFPLEVBQW9CLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDOztJQWEvRCx5QkFBb0IsV0FBdUIsRUFBVSxjQUE2QixFQUFVLE9BQWU7UUFBdkYsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQVE7d0JBTC9FLENBQUM7d0JBQ3dCLElBQUksWUFBWSxFQUFvQjtLQUl1Qjs7OztJQUVoSCxrQ0FBUTs7O0lBQVI7UUFBQSxpQkFJQztRQUhHLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQzthQUNyRixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNqQyxTQUFTLENBQUMsVUFBQyxLQUF1QixJQUFLLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUF6QixDQUF5QixDQUFDLEVBQWpELENBQWlELENBQUMsQ0FBQztLQUNsRzs7OztJQUVELHFDQUFXOzs7SUFBWDtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEM7O2dCQXJCSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLFlBQVk7b0JBQ3RCLFNBQVMsRUFBRSxDQUFDLGFBQWEsQ0FBQztpQkFDN0I7Ozs7Z0JBUm1CLFVBQVU7Z0JBR0gsYUFBYTtnQkFIYSxNQUFNOzs7NkJBV3RELEtBQUs7NkJBQ0wsTUFBTTs7MEJBWlg7O1NBU2EsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgTmdab25lLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBSZXNpemVEaW1lbnNpb25zLCBSZXNpemVTZXJ2aWNlIH0gZnJvbSAnLi9yZXNpemUuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4UmVzaXplXScsXG4gICAgcHJvdmlkZXJzOiBbUmVzaXplU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgUmVzaXplRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgdGhyb3R0bGU6IG51bWJlciA9IDA7XG4gICAgQE91dHB1dCgpIHV4UmVzaXplOiBFdmVudEVtaXR0ZXI8UmVzaXplRGltZW5zaW9ucz4gPSBuZXcgRXZlbnRFbWl0dGVyPFJlc2l6ZURpbWVuc2lvbnM+KCk7XG5cbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3Jlc2l6ZVNlcnZpY2U6IFJlc2l6ZVNlcnZpY2UsIHByaXZhdGUgX25nWm9uZTogTmdab25lKSB7IH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSB0aGlzLl9yZXNpemVTZXJ2aWNlLmFkZFJlc2l6ZUxpc3RlbmVyKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudClcbiAgICAgICAgICAgIC5waXBlKGRlYm91bmNlVGltZSh0aGlzLnRocm90dGxlKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBSZXNpemVEaW1lbnNpb25zKSA9PiB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHRoaXMudXhSZXNpemUuZW1pdChldmVudCkpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxufSJdfQ==