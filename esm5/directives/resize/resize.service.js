/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, NgZone } from '@angular/core';
import ResizeObserver from 'resize-observer-polyfill';
import { ReplaySubject } from 'rxjs/ReplaySubject';
var ResizeService = /** @class */ (function () {
    function ResizeService(_zone) {
        this._zone = _zone;
        this._observer = new ResizeObserver(this.elementDidResize.bind(this));
        this._targets = new WeakMap();
    }
    /**
     * @return {?}
     */
    ResizeService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._observer.disconnect();
    };
    /**
     * @param {?} target
     * @return {?}
     */
    ResizeService.prototype.addResizeListener = /**
     * @param {?} target
     * @return {?}
     */
    function (target) {
        var _this = this;
        this._zone.runOutsideAngular(function () { return _this._observer.observe(target); });
        if (this._targets.has(target)) {
            return this._targets.get(target);
        }
        else {
            var /** @type {?} */ emitter = new ReplaySubject();
            this._targets.set(target, emitter);
            return emitter;
        }
    };
    /**
     * @param {?} target
     * @return {?}
     */
    ResizeService.prototype.removeResizeListener = /**
     * @param {?} target
     * @return {?}
     */
    function (target) {
        this._observer.unobserve(target);
    };
    /**
     * @param {?} entries
     * @return {?}
     */
    ResizeService.prototype.elementDidResize = /**
     * @param {?} entries
     * @return {?}
     */
    function (entries) {
        var _this = this;
        this._zone.run(function () {
            try {
                for (var entries_1 = tslib_1.__values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
                    var entry = entries_1_1.value;
                    if (_this._targets.has(/** @type {?} */ (entry.target))) {
                        var /** @type {?} */ emitter = _this._targets.get(/** @type {?} */ (entry.target));
                        emitter.next({ width: (/** @type {?} */ (entry.target)).offsetWidth, height: (/** @type {?} */ (entry.target)).offsetHeight });
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (entries_1_1 && !entries_1_1.done && (_a = entries_1.return)) _a.call(entries_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var e_1, _a;
        });
    };
    ResizeService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ResizeService.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
    return ResizeService;
}());
export { ResizeService };
function ResizeService_tsickle_Closure_declarations() {
    /** @type {?} */
    ResizeService.prototype._observer;
    /** @type {?} */
    ResizeService.prototype._targets;
    /** @type {?} */
    ResizeService.prototype._zone;
}
/**
 * @record
 */
export function ResizeDimensions() { }
function ResizeDimensions_tsickle_Closure_declarations() {
    /** @type {?} */
    ResizeDimensions.prototype.width;
    /** @type {?} */
    ResizeDimensions.prototype.height;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9yZXNpemUvcmVzaXplLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLGNBQWMsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0lBUS9DLHVCQUFvQixLQUFhO1FBQWIsVUFBSyxHQUFMLEtBQUssQ0FBUTt5QkFIYixJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNyRCxJQUFJLE9BQU8sRUFBZ0Q7S0FFekM7Ozs7SUFFckMsbUNBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUMvQjs7Ozs7SUFFRCx5Q0FBaUI7Ozs7SUFBakIsVUFBa0IsTUFBbUI7UUFBckMsaUJBVUM7UUFURyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBOUIsQ0FBOEIsQ0FBQyxDQUFDO1FBRW5FLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDcEM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLHFCQUFNLE9BQU8sR0FBRyxJQUFJLGFBQWEsRUFBb0IsQ0FBQztZQUN0RCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDbkMsTUFBTSxDQUFDLE9BQU8sQ0FBQztTQUNsQjtLQUNKOzs7OztJQUVELDRDQUFvQjs7OztJQUFwQixVQUFxQixNQUFtQjtRQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNwQzs7Ozs7SUFFTyx3Q0FBZ0I7Ozs7Y0FBQyxPQUE4Qjs7UUFDbkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7O2dCQUNYLEdBQUcsQ0FBQyxDQUFnQixJQUFBLFlBQUEsaUJBQUEsT0FBTyxDQUFBLGdDQUFBO29CQUF0QixJQUFNLEtBQUssb0JBQUE7b0JBQ1osRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLG1CQUFDLEtBQUssQ0FBQyxNQUFxQixFQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNqRCxxQkFBTSxPQUFPLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLG1CQUFDLEtBQUssQ0FBQyxNQUFxQixFQUFDLENBQUM7d0JBQy9ELE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsbUJBQUMsS0FBSyxDQUFDLE1BQXFCLEVBQUMsQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLG1CQUFDLEtBQUssQ0FBQyxNQUFxQixFQUFDLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztxQkFDMUg7aUJBQ0o7Ozs7Ozs7Ozs7U0FDSixDQUFDLENBQUM7OztnQkFwQ1YsVUFBVTs7OztnQkFKVSxNQUFNOzt3QkFBM0I7O1NBS2EsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgUmVzaXplT2JzZXJ2ZXIgZnJvbSAncmVzaXplLW9ic2VydmVyLXBvbHlmaWxsJztcbmltcG9ydCB7IFJlcGxheVN1YmplY3QgfSBmcm9tICdyeGpzL1JlcGxheVN1YmplY3QnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVzaXplU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBwcml2YXRlIF9vYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcih0aGlzLmVsZW1lbnREaWRSZXNpemUuYmluZCh0aGlzKSk7XG4gICAgcHJpdmF0ZSBfdGFyZ2V0cyA9IG5ldyBXZWFrTWFwPEhUTUxFbGVtZW50LCBSZXBsYXlTdWJqZWN0PFJlc2l6ZURpbWVuc2lvbnM+PigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfem9uZTogTmdab25lKSB7fVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX29ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBhZGRSZXNpemVMaXN0ZW5lcih0YXJnZXQ6IEhUTUxFbGVtZW50KTogUmVwbGF5U3ViamVjdDxSZXNpemVEaW1lbnNpb25zPiB7XG4gICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gdGhpcy5fb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXQpKTtcblxuICAgICAgICBpZiAodGhpcy5fdGFyZ2V0cy5oYXModGFyZ2V0KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RhcmdldHMuZ2V0KHRhcmdldCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBlbWl0dGVyID0gbmV3IFJlcGxheVN1YmplY3Q8UmVzaXplRGltZW5zaW9ucz4oKTtcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldHMuc2V0KHRhcmdldCwgZW1pdHRlcik7XG4gICAgICAgICAgICByZXR1cm4gZW1pdHRlcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZVJlc2l6ZUxpc3RlbmVyKHRhcmdldDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb2JzZXJ2ZXIudW5vYnNlcnZlKHRhcmdldCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlbGVtZW50RGlkUmVzaXplKGVudHJpZXM6IFJlc2l6ZU9ic2VydmVyRW50cnlbXSk6IHZvaWQge1xuICAgICAgICB0aGlzLl96b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIGVudHJpZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdGFyZ2V0cy5oYXMoZW50cnkudGFyZ2V0IGFzIEhUTUxFbGVtZW50KSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbWl0dGVyID0gdGhpcy5fdGFyZ2V0cy5nZXQoZW50cnkudGFyZ2V0IGFzIEhUTUxFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5uZXh0KHsgd2lkdGg6IChlbnRyeS50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLm9mZnNldFdpZHRoLCBoZWlnaHQ6IChlbnRyeS50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLm9mZnNldEhlaWdodCB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZXNpemVEaW1lbnNpb25zIHtcbiAgICB3aWR0aDogbnVtYmVyO1xuICAgIGhlaWdodDogbnVtYmVyO1xufSJdfQ==