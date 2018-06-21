/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, NgZone, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { fromEvent } from 'rxjs/observable/fromEvent';
export class ResizeService {
    /**
     * @param {?} rendererFactory
     * @param {?} _ngZone
     */
    constructor(rendererFactory, _ngZone) {
        this._ngZone = _ngZone;
        this._subscription = new Subscription();
        this._renderer = rendererFactory.createRenderer(null, null);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * @param {?} nativeElement
     * @return {?}
     */
    addResizeListener(nativeElement) {
        // create a behavior subject subject
        const /** @type {?} */ subject = new BehaviorSubject({ width: nativeElement.offsetWidth, height: nativeElement.offsetHeight });
        // determine the style of the element
        const /** @type {?} */ displayMode = window.getComputedStyle(nativeElement).getPropertyValue('display');
        // create the iframe element
        const /** @type {?} */ iframe = this._renderer.createElement('iframe');
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
        // statically positioned elements need changed to relative for this method to work
        if (displayMode !== 'relative' && displayMode !== 'absolute' && displayMode !== 'fixed') {
            this._renderer.setStyle(nativeElement, 'position', 'relative');
        }
        // add the iframe to the container element
        this._renderer.appendChild(nativeElement, iframe);
        this.waitUntilReady(iframe, () => {
            const /** @type {?} */ iframeDoc = iframe.contentDocument || /** @type {?} */ (iframe.contentWindow.document);
            const /** @type {?} */ attachListener = () => {
                // watch for any future resizes - run inside ngzone as an iframe event listener is not patched
                this._subscription.add(fromEvent(iframe.contentWindow, 'resize').subscribe((event) => this._ngZone.run(() => subject.next({ width: nativeElement.offsetWidth, height: nativeElement.offsetHeight }))));
            };
            if (iframeDoc.readyState === 'complete') {
                attachListener();
            }
            else {
                // wait for iframe to load
                iframe.addEventListener('load', () => attachListener());
            }
        });
        return subject;
    }
    /**
     * @param {?} iframe
     * @param {?} callback
     * @return {?}
     */
    waitUntilReady(iframe, callback) {
        if (iframe.contentDocument || iframe.contentWindow) {
            callback.call(this);
        }
        else {
            setTimeout(() => this.waitUntilReady(iframe, callback));
        }
    }
}
ResizeService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ResizeService.ctorParameters = () => [
    { type: RendererFactory2, },
    { type: NgZone, },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9yZXNpemUvcmVzaXplLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUF3QixnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUl0RCxNQUFNOzs7OztJQUtGLFlBQVksZUFBaUMsRUFBVSxPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTs2QkFGOUMsSUFBSSxZQUFZLEVBQUU7UUFHdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxlQUFlLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztLQUMvRDs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BDOzs7OztJQUVELGlCQUFpQixDQUFDLGFBQTBCOztRQUd4Qyx1QkFBTSxPQUFPLEdBQUcsSUFBSSxlQUFlLENBQW1CLEVBQUUsS0FBSyxFQUFFLGFBQWEsQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDOztRQUdoSSx1QkFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDOztRQUd2Rix1QkFBTSxNQUFNLEdBQXNCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztRQUd6RSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7O1FBR3RELElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7O1FBR3RELEVBQUUsQ0FBQyxDQUFDLFdBQVcsS0FBSyxVQUFVLElBQUksV0FBVyxLQUFLLFVBQVUsSUFBSSxXQUFXLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN0RixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQ2xFOztRQUdELElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVsRCxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRTtZQUN4Qix1QkFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLGVBQWUsc0JBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFvQixDQUFBLENBQUM7WUFFdEYsdUJBQU0sY0FBYyxHQUFHOztnQkFHbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBdUIsS0FDL0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLGFBQWEsQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQ2pILENBQUMsQ0FBQzthQUNOLENBQUM7WUFFRixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLGNBQWMsRUFBRSxDQUFDO2FBQ3BCO1lBQUMsSUFBSSxDQUFDLENBQUM7O2dCQUdKLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsTUFBTSxjQUFjLEVBQUUsQ0FBQyxDQUFDO2FBQzNEO1NBQ0osQ0FBQyxDQUFDO1FBR0gsTUFBTSxDQUFDLE9BQU8sQ0FBQztLQUNsQjs7Ozs7O0lBRU8sY0FBYyxDQUFDLE1BQXlCLEVBQUUsUUFBb0I7UUFDbEUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGVBQWUsSUFBSSxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNqRCxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3ZCO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixVQUFVLENBQUMsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQzNEOzs7O1lBaEZSLFVBQVU7Ozs7WUFOd0MsZ0JBQWdCO1lBQTlDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUsIE9uRGVzdHJveSwgUmVuZGVyZXIyLCBSZW5kZXJlckZhY3RvcnkyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBmcm9tRXZlbnQgfSBmcm9tICdyeGpzL29ic2VydmFibGUvZnJvbUV2ZW50JztcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVzaXplU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyO1xuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICAgIGNvbnN0cnVjdG9yKHJlbmRlcmVyRmFjdG9yeTogUmVuZGVyZXJGYWN0b3J5MiwgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIgPSByZW5kZXJlckZhY3RvcnkuY3JlYXRlUmVuZGVyZXIobnVsbCwgbnVsbCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGFkZFJlc2l6ZUxpc3RlbmVyKG5hdGl2ZUVsZW1lbnQ6IEhUTUxFbGVtZW50KTogQmVoYXZpb3JTdWJqZWN0PFJlc2l6ZURpbWVuc2lvbnM+IHtcblxuICAgICAgICAvLyBjcmVhdGUgYSBiZWhhdmlvciBzdWJqZWN0IHN1YmplY3RcbiAgICAgICAgY29uc3Qgc3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UmVzaXplRGltZW5zaW9ucz4oeyB3aWR0aDogbmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCwgaGVpZ2h0OiBuYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCB9KTtcblxuICAgICAgICAvLyBkZXRlcm1pbmUgdGhlIHN0eWxlIG9mIHRoZSBlbGVtZW50XG4gICAgICAgIGNvbnN0IGRpc3BsYXlNb2RlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUobmF0aXZlRWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnZGlzcGxheScpO1xuXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgaWZyYW1lIGVsZW1lbnRcbiAgICAgICAgY29uc3QgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCA9IHRoaXMuX3JlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuXG4gICAgICAgIC8vIHN0eWxlIHRoZSBpZnJhbWUgdG8gYmUgaW52aXNpYmxlIGJ1dCBmaWxsIGNvbnRhaW5pbmcgZWxlbWVudFxuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShpZnJhbWUsICdwb3NpdGlvbicsICdhYnNvbHV0ZScpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShpZnJhbWUsICd3aWR0aCcsICcxMDAlJyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGlmcmFtZSwgJ2hlaWdodCcsICcxMDAlJyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGlmcmFtZSwgJ3RvcCcsICcwJyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGlmcmFtZSwgJ3JpZ2h0JywgJzAnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoaWZyYW1lLCAnYm90dG9tJywgJzAnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoaWZyYW1lLCAnbGVmdCcsICcwJyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGlmcmFtZSwgJ3otaW5kZXgnLCAnLTEnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoaWZyYW1lLCAnb3BhY2l0eScsICcwJyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGlmcmFtZSwgJ2JvcmRlcicsICdub25lJyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGlmcmFtZSwgJ21hcmdpbicsICcwJyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGlmcmFtZSwgJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoaWZyYW1lLCAnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG5cbiAgICAgICAgLy8gZW5zdXJlIHRoZSBpZnJhbWUgaWdub3JlcyBhbnkgdGFiYmluZ1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUoaWZyYW1lLCAndGFiaW5kZXgnLCAnLTEnKTtcblxuICAgICAgICAvLyBzdGF0aWNhbGx5IHBvc2l0aW9uZWQgZWxlbWVudHMgbmVlZCBjaGFuZ2VkIHRvIHJlbGF0aXZlIGZvciB0aGlzIG1ldGhvZCB0byB3b3JrXG4gICAgICAgIGlmIChkaXNwbGF5TW9kZSAhPT0gJ3JlbGF0aXZlJyAmJiBkaXNwbGF5TW9kZSAhPT0gJ2Fic29sdXRlJyAmJiBkaXNwbGF5TW9kZSAhPT0gJ2ZpeGVkJykge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUobmF0aXZlRWxlbWVudCwgJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhZGQgdGhlIGlmcmFtZSB0byB0aGUgY29udGFpbmVyIGVsZW1lbnRcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuYXBwZW5kQ2hpbGQobmF0aXZlRWxlbWVudCwgaWZyYW1lKTtcblxuICAgICAgICB0aGlzLndhaXRVbnRpbFJlYWR5KGlmcmFtZSwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaWZyYW1lRG9jID0gaWZyYW1lLmNvbnRlbnREb2N1bWVudCB8fCBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudCBhcyBEb2N1bWVudDtcblxuICAgICAgICAgICAgY29uc3QgYXR0YWNoTGlzdGVuZXIgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyB3YXRjaCBmb3IgYW55IGZ1dHVyZSByZXNpemVzIC0gcnVuIGluc2lkZSBuZ3pvbmUgYXMgYW4gaWZyYW1lIGV2ZW50IGxpc3RlbmVyIGlzIG5vdCBwYXRjaGVkXG4gICAgICAgICAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLmFkZChmcm9tRXZlbnQoaWZyYW1lLmNvbnRlbnRXaW5kb3csICdyZXNpemUnKS5zdWJzY3JpYmUoKGV2ZW50OiBSZXNpemVEaW1lbnNpb25zKSA9PlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHN1YmplY3QubmV4dCh7IHdpZHRoOiBuYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoLCBoZWlnaHQ6IG5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0IH0pKVxuICAgICAgICAgICAgICAgICkpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKGlmcmFtZURvYy5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XG4gICAgICAgICAgICAgICAgYXR0YWNoTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAvLyB3YWl0IGZvciBpZnJhbWUgdG8gbG9hZFxuICAgICAgICAgICAgICAgIGlmcmFtZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4gYXR0YWNoTGlzdGVuZXIoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgcmV0dXJuIHN1YmplY3Q7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB3YWl0VW50aWxSZWFkeShpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LCBjYWxsYmFjazogKCkgPT4gdm9pZCkge1xuICAgICAgICBpZiAoaWZyYW1lLmNvbnRlbnREb2N1bWVudCB8fCBpZnJhbWUuY29udGVudFdpbmRvdykge1xuICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy53YWl0VW50aWxSZWFkeShpZnJhbWUsIGNhbGxiYWNrKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVzaXplRGltZW5zaW9ucyB7XG4gICAgd2lkdGg6IG51bWJlcjtcbiAgICBoZWlnaHQ6IG51bWJlcjtcbn0iXX0=