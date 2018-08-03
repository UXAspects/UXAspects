/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import ResizeObserver from 'resize-observer-polyfill';
import { ReplaySubject } from 'rxjs/ReplaySubject';
export class ResizeService {
    /**
     * @param {?} _zone
     */
    constructor(_zone) {
        this._zone = _zone;
        this._observer = new ResizeObserver(this.elementDidResize.bind(this));
        this._targets = new WeakMap();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._observer.disconnect();
    }
    /**
     * @param {?} target
     * @return {?}
     */
    addResizeListener(target) {
        this._zone.runOutsideAngular(() => this._observer.observe(target));
        if (this._targets.has(target)) {
            return this._targets.get(target);
        }
        else {
            const /** @type {?} */ emitter = new ReplaySubject();
            this._targets.set(target, emitter);
            return emitter;
        }
    }
    /**
     * @param {?} target
     * @return {?}
     */
    removeResizeListener(target) {
        this._observer.unobserve(target);
    }
    /**
     * @param {?} entries
     * @return {?}
     */
    elementDidResize(entries) {
        this._zone.run(() => {
            for (const /** @type {?} */ entry of entries) {
                if (this._targets.has(/** @type {?} */ (entry.target))) {
                    const /** @type {?} */ emitter = this._targets.get(/** @type {?} */ (entry.target));
                    emitter.next({ width: (/** @type {?} */ (entry.target)).offsetWidth, height: (/** @type {?} */ (entry.target)).offsetHeight });
                }
            }
        });
    }
}
ResizeService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ResizeService.ctorParameters = () => [
    { type: NgZone }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9yZXNpemUvcmVzaXplLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sY0FBYyxNQUFNLDBCQUEwQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUduRCxNQUFNOzs7O0lBS0YsWUFBb0IsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7eUJBSGIsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDckQsSUFBSSxPQUFPLEVBQWdEO0tBRXpDOzs7O0lBRXJDLFdBQVc7UUFDUCxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO0tBQy9COzs7OztJQUVELGlCQUFpQixDQUFDLE1BQW1CO1FBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUVuRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3BDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSix1QkFBTSxPQUFPLEdBQUcsSUFBSSxhQUFhLEVBQW9CLENBQUM7WUFDdEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ25DLE1BQU0sQ0FBQyxPQUFPLENBQUM7U0FDbEI7S0FDSjs7Ozs7SUFFRCxvQkFBb0IsQ0FBQyxNQUFtQjtRQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNwQzs7Ozs7SUFFTyxnQkFBZ0IsQ0FBQyxPQUE4QjtRQUNuRCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7WUFDaEIsR0FBRyxDQUFDLENBQUMsdUJBQU0sS0FBSyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxtQkFBQyxLQUFLLENBQUMsTUFBcUIsRUFBQyxDQUFDLENBQUMsQ0FBQztvQkFDakQsdUJBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxtQkFBQyxLQUFLLENBQUMsTUFBcUIsRUFBQyxDQUFDO29CQUMvRCxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLG1CQUFDLEtBQUssQ0FBQyxNQUFxQixFQUFDLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxtQkFBQyxLQUFLLENBQUMsTUFBcUIsRUFBQyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7aUJBQzFIO2FBQ0o7U0FDSixDQUFDLENBQUM7Ozs7WUFwQ1YsVUFBVTs7OztZQUpVLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IFJlc2l6ZU9ic2VydmVyIGZyb20gJ3Jlc2l6ZS1vYnNlcnZlci1wb2x5ZmlsbCc7XG5pbXBvcnQgeyBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcy9SZXBsYXlTdWJqZWN0JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlc2l6ZVNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgcHJpdmF0ZSBfb2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIodGhpcy5lbGVtZW50RGlkUmVzaXplLmJpbmQodGhpcykpO1xuICAgIHByaXZhdGUgX3RhcmdldHMgPSBuZXcgV2Vha01hcDxIVE1MRWxlbWVudCwgUmVwbGF5U3ViamVjdDxSZXNpemVEaW1lbnNpb25zPj4oKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3pvbmU6IE5nWm9uZSkge31cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfVxuXG4gICAgYWRkUmVzaXplTGlzdGVuZXIodGFyZ2V0OiBIVE1MRWxlbWVudCk6IFJlcGxheVN1YmplY3Q8UmVzaXplRGltZW5zaW9ucz4ge1xuICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHRoaXMuX29ic2VydmVyLm9ic2VydmUodGFyZ2V0KSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3RhcmdldHMuaGFzKHRhcmdldCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90YXJnZXRzLmdldCh0YXJnZXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZW1pdHRlciA9IG5ldyBSZXBsYXlTdWJqZWN0PFJlc2l6ZURpbWVuc2lvbnM+KCk7XG4gICAgICAgICAgICB0aGlzLl90YXJnZXRzLnNldCh0YXJnZXQsIGVtaXR0ZXIpO1xuICAgICAgICAgICAgcmV0dXJuIGVtaXR0ZXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVSZXNpemVMaXN0ZW5lcih0YXJnZXQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuX29ic2VydmVyLnVub2JzZXJ2ZSh0YXJnZXQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZWxlbWVudERpZFJlc2l6ZShlbnRyaWVzOiBSZXNpemVPYnNlcnZlckVudHJ5W10pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBlbnRyaWVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3RhcmdldHMuaGFzKGVudHJ5LnRhcmdldCBhcyBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZW1pdHRlciA9IHRoaXMuX3RhcmdldHMuZ2V0KGVudHJ5LnRhcmdldCBhcyBIVE1MRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIubmV4dCh7IHdpZHRoOiAoZW50cnkudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5vZmZzZXRXaWR0aCwgaGVpZ2h0OiAoZW50cnkudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5vZmZzZXRIZWlnaHQgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVzaXplRGltZW5zaW9ucyB7XG4gICAgd2lkdGg6IG51bWJlcjtcbiAgICBoZWlnaHQ6IG51bWJlcjtcbn0iXX0=