/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, NgZone, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
var ResizeService = (function () {
    function ResizeService(rendererFactory, _ngZone) {
        this._ngZone = _ngZone;
        this._subscription = new Subscription();
        this._renderer = rendererFactory.createRenderer(null, null);
    }
    /**
     * @return {?}
     */
    ResizeService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * @param {?} nativeElement
     * @return {?}
     */
    ResizeService.prototype.addResizeListener = /**
     * @param {?} nativeElement
     * @return {?}
     */
    function (nativeElement) {
        var _this = this;
        // create a behavior subject subject
        var /** @type {?} */ subject = new BehaviorSubject({ width: nativeElement.offsetWidth, height: nativeElement.offsetHeight });
        // determine the style of the element
        var /** @type {?} */ displayMode = window.getComputedStyle(nativeElement).getPropertyValue('display');
        // create the iframe element
        var /** @type {?} */ iframe = this._renderer.createElement('iframe');
        // style the iframe to be invisible but fill containing element
        this._renderer.setStyle(iframe, 'position', 'absolute');
        this._renderer.setStyle(iframe, 'width', '100%');
        this._renderer.setStyle(iframe, 'height', '100%');
        this._renderer.setStyle(iframe, 'top', '0');
        this._renderer.setStyle(iframe, 'right', '0');
        this._renderer.setStyle(iframe, 'bottom', '0');
        this._renderer.setStyle(iframe, 'left', '0');
        this._renderer.setStyle(iframe, 'z-index', '-1');
        this._renderer.setStyle(iframe, 'opacity', '0');
        this._renderer.setStyle(iframe, 'border', 'none');
        this._renderer.setStyle(iframe, 'margin', '0');
        this._renderer.setStyle(iframe, 'pointer-events', 'none');
        this._renderer.setStyle(iframe, 'overflow', 'hidden');
        // ensure the iframe ignores any tabbing
        this._renderer.setAttribute(iframe, 'tabindex', '-1');
        this._renderer.setAttribute(iframe, 'aria-hidden', 'true');
        // statically positioned elements need changed to relative for this method to work
        if (displayMode !== 'relative' && displayMode !== 'absolute' && displayMode !== 'fixed') {
            this._renderer.setStyle(nativeElement, 'position', 'relative');
        }
        // add the iframe to the container element
        this._renderer.appendChild(nativeElement, iframe);
        this.waitUntilReady(iframe, function () {
            var /** @type {?} */ iframeDoc = iframe.contentDocument || /** @type {?} */ (iframe.contentWindow.document);
            var /** @type {?} */ attachListener = function () {
                // watch for any future resizes - run inside ngzone as an iframe event listener is not patched
                // watch for any future resizes - run inside ngzone as an iframe event listener is not patched
                _this._subscription.add(fromEvent(iframe.contentWindow, 'resize').subscribe(function (event) {
                    return _this._ngZone.run(function () { return subject.next({ width: nativeElement.offsetWidth, height: nativeElement.offsetHeight }); });
                }));
            };
            if (iframeDoc.readyState === 'complete') {
                attachListener();
            }
            else {
                // wait for iframe to load
                iframe.addEventListener('load', function () { return attachListener(); });
            }
        });
        return subject;
    };
    /**
     * @param {?} iframe
     * @param {?} callback
     * @return {?}
     */
    ResizeService.prototype.waitUntilReady = /**
     * @param {?} iframe
     * @param {?} callback
     * @return {?}
     */
    function (iframe, callback) {
        var _this = this;
        if (iframe.contentDocument || iframe.contentWindow) {
            callback.call(this);
        }
        else {
            setTimeout(function () { return _this.waitUntilReady(iframe, callback); });
        }
    };
    ResizeService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ResizeService.ctorParameters = function () { return [
        { type: RendererFactory2, },
        { type: NgZone, },
    ]; };
    return ResizeService;
}());
export { ResizeService };
function ResizeService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ResizeService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ResizeService.ctorParameters;
    /** @type {?} */
    ResizeService.prototype._renderer;
    /** @type {?} */
    ResizeService.prototype._subscription;
    /** @type {?} */
    ResizeService.prototype._ngZone;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9yZXNpemUvcmVzaXplLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUF3QixnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7SUFTN0MsdUJBQVksZUFBaUMsRUFBVSxPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTs2QkFGOUMsSUFBSSxZQUFZLEVBQUU7UUFHdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxlQUFlLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztLQUMvRDs7OztJQUVELG1DQUFXOzs7SUFBWDtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEM7Ozs7O0lBRUQseUNBQWlCOzs7O0lBQWpCLFVBQWtCLGFBQTBCO1FBQTVDLGlCQTREQzs7UUF6REcscUJBQU0sT0FBTyxHQUFHLElBQUksZUFBZSxDQUFtQixFQUFFLEtBQUssRUFBRSxhQUFhLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQzs7UUFHaEkscUJBQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7UUFHdkYscUJBQU0sTUFBTSxHQUFzQixJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7UUFHekUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDOztRQUd0RCxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUM7O1FBRzNELEVBQUUsQ0FBQyxDQUFDLFdBQVcsS0FBSyxVQUFVLElBQUksV0FBVyxLQUFLLFVBQVUsSUFBSSxXQUFXLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN0RixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQ2xFOztRQUdELElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVsRCxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRTtZQUN4QixxQkFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLGVBQWUsc0JBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFvQixDQUFBLENBQUM7WUFFdEYscUJBQU0sY0FBYyxHQUFHOztnQkFHbkIsQUFEQSw4RkFBOEY7Z0JBQzlGLEtBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQXVCO29CQUMvRixPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLGFBQWEsQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUF0RixDQUFzRixDQUFDO2dCQUE5RyxDQUE4RyxDQUNqSCxDQUFDLENBQUM7YUFDTixDQUFDO1lBRUYsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxjQUFjLEVBQUUsQ0FBQzthQUNwQjtZQUFDLElBQUksQ0FBQyxDQUFDOztnQkFHSixNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLGNBQU0sT0FBQSxjQUFjLEVBQUUsRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO2FBQzNEO1NBQ0osQ0FBQyxDQUFDO1FBR0gsTUFBTSxDQUFDLE9BQU8sQ0FBQztLQUNsQjs7Ozs7O0lBRU8sc0NBQWM7Ozs7O2NBQUMsTUFBeUIsRUFBRSxRQUFvQjs7UUFDbEUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGVBQWUsSUFBSSxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNqRCxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3ZCO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixVQUFVLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxFQUFyQyxDQUFxQyxDQUFDLENBQUM7U0FDM0Q7OztnQkFqRlIsVUFBVTs7OztnQkFOd0MsZ0JBQWdCO2dCQUE5QyxNQUFNOzt3QkFBM0I7O1NBT2EsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSwgT25EZXN0cm95LCBSZW5kZXJlcjIsIFJlbmRlcmVyRmFjdG9yeTIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9mcm9tRXZlbnQnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSZXNpemVTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjI7XG4gICAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gICAgY29uc3RydWN0b3IocmVuZGVyZXJGYWN0b3J5OiBSZW5kZXJlckZhY3RvcnkyLCBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSkge1xuICAgICAgICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyRmFjdG9yeS5jcmVhdGVSZW5kZXJlcihudWxsLCBudWxsKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgYWRkUmVzaXplTGlzdGVuZXIobmF0aXZlRWxlbWVudDogSFRNTEVsZW1lbnQpOiBCZWhhdmlvclN1YmplY3Q8UmVzaXplRGltZW5zaW9ucz4ge1xuXG4gICAgICAgIC8vIGNyZWF0ZSBhIGJlaGF2aW9yIHN1YmplY3Qgc3ViamVjdFxuICAgICAgICBjb25zdCBzdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxSZXNpemVEaW1lbnNpb25zPih7IHdpZHRoOiBuYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoLCBoZWlnaHQ6IG5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0IH0pO1xuXG4gICAgICAgIC8vIGRldGVybWluZSB0aGUgc3R5bGUgb2YgdGhlIGVsZW1lbnRcbiAgICAgICAgY29uc3QgZGlzcGxheU1vZGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShuYXRpdmVFbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCdkaXNwbGF5Jyk7XG5cbiAgICAgICAgLy8gY3JlYXRlIHRoZSBpZnJhbWUgZWxlbWVudFxuICAgICAgICBjb25zdCBpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50ID0gdGhpcy5fcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG5cbiAgICAgICAgLy8gc3R5bGUgdGhlIGlmcmFtZSB0byBiZSBpbnZpc2libGUgYnV0IGZpbGwgY29udGFpbmluZyBlbGVtZW50XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGlmcmFtZSwgJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGlmcmFtZSwgJ3dpZHRoJywgJzEwMCUnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoaWZyYW1lLCAnaGVpZ2h0JywgJzEwMCUnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoaWZyYW1lLCAndG9wJywgJzAnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoaWZyYW1lLCAncmlnaHQnLCAnMCcpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShpZnJhbWUsICdib3R0b20nLCAnMCcpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShpZnJhbWUsICdsZWZ0JywgJzAnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoaWZyYW1lLCAnei1pbmRleCcsICctMScpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShpZnJhbWUsICdvcGFjaXR5JywgJzAnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoaWZyYW1lLCAnYm9yZGVyJywgJ25vbmUnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoaWZyYW1lLCAnbWFyZ2luJywgJzAnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoaWZyYW1lLCAncG9pbnRlci1ldmVudHMnLCAnbm9uZScpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShpZnJhbWUsICdvdmVyZmxvdycsICdoaWRkZW4nKTtcblxuICAgICAgICAvLyBlbnN1cmUgdGhlIGlmcmFtZSBpZ25vcmVzIGFueSB0YWJiaW5nXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZShpZnJhbWUsICd0YWJpbmRleCcsICctMScpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUoaWZyYW1lLCAnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4gICAgICAgIC8vIHN0YXRpY2FsbHkgcG9zaXRpb25lZCBlbGVtZW50cyBuZWVkIGNoYW5nZWQgdG8gcmVsYXRpdmUgZm9yIHRoaXMgbWV0aG9kIHRvIHdvcmtcbiAgICAgICAgaWYgKGRpc3BsYXlNb2RlICE9PSAncmVsYXRpdmUnICYmIGRpc3BsYXlNb2RlICE9PSAnYWJzb2x1dGUnICYmIGRpc3BsYXlNb2RlICE9PSAnZml4ZWQnKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShuYXRpdmVFbGVtZW50LCAncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFkZCB0aGUgaWZyYW1lIHRvIHRoZSBjb250YWluZXIgZWxlbWVudFxuICAgICAgICB0aGlzLl9yZW5kZXJlci5hcHBlbmRDaGlsZChuYXRpdmVFbGVtZW50LCBpZnJhbWUpO1xuXG4gICAgICAgIHRoaXMud2FpdFVudGlsUmVhZHkoaWZyYW1lLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpZnJhbWVEb2MgPSBpZnJhbWUuY29udGVudERvY3VtZW50IHx8IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50IGFzIERvY3VtZW50O1xuXG4gICAgICAgICAgICBjb25zdCBhdHRhY2hMaXN0ZW5lciA9ICgpID0+IHtcblxuICAgICAgICAgICAgICAgIC8vIHdhdGNoIGZvciBhbnkgZnV0dXJlIHJlc2l6ZXMgLSBydW4gaW5zaWRlIG5nem9uZSBhcyBhbiBpZnJhbWUgZXZlbnQgbGlzdGVuZXIgaXMgbm90IHBhdGNoZWRcbiAgICAgICAgICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24uYWRkKGZyb21FdmVudChpZnJhbWUuY29udGVudFdpbmRvdywgJ3Jlc2l6ZScpLnN1YnNjcmliZSgoZXZlbnQ6IFJlc2l6ZURpbWVuc2lvbnMpID0+XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4gc3ViamVjdC5uZXh0KHsgd2lkdGg6IG5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGgsIGhlaWdodDogbmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQgfSkpXG4gICAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoaWZyYW1lRG9jLnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgICAgICAgICBhdHRhY2hMaXN0ZW5lcigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIC8vIHdhaXQgZm9yIGlmcmFtZSB0byBsb2FkXG4gICAgICAgICAgICAgICAgaWZyYW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiBhdHRhY2hMaXN0ZW5lcigpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblxuICAgICAgICByZXR1cm4gc3ViamVjdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHdhaXRVbnRpbFJlYWR5KGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsIGNhbGxiYWNrOiAoKSA9PiB2b2lkKSB7XG4gICAgICAgIGlmIChpZnJhbWUuY29udGVudERvY3VtZW50IHx8IGlmcmFtZS5jb250ZW50V2luZG93KSB7XG4gICAgICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLndhaXRVbnRpbFJlYWR5KGlmcmFtZSwgY2FsbGJhY2spKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZXNpemVEaW1lbnNpb25zIHtcbiAgICB3aWR0aDogbnVtYmVyO1xuICAgIGhlaWdodDogbnVtYmVyO1xufSJdfQ==