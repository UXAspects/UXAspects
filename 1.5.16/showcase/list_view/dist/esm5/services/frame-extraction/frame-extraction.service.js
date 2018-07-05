/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { concat } from 'rxjs/observable/concat';
import { fromEvent } from 'rxjs/observable/fromEvent';
var FrameExtractionService = (function () {
    function FrameExtractionService() {
    }
    /**
     * @param {?} source
     * @return {?}
     */
    FrameExtractionService.prototype.createVideoPlayer = /**
     * @param {?} source
     * @return {?}
     */
    function (source) {
        var /** @type {?} */ videoPlayer = document.createElement('video');
        videoPlayer.preload = 'auto';
        videoPlayer.src = source;
        return videoPlayer;
    };
    /**
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    FrameExtractionService.prototype.createCanvas = /**
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    function (width, height) {
        var /** @type {?} */ canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        return canvas;
    };
    /**
     * @param {?} videoPlayer
     * @param {?} time
     * @return {?}
     */
    FrameExtractionService.prototype.goToFrame = /**
     * @param {?} videoPlayer
     * @param {?} time
     * @return {?}
     */
    function (videoPlayer, time) {
        videoPlayer.currentTime = time;
        return fromEvent(videoPlayer, time === 0 ? 'loadeddata' : 'seeked');
    };
    /**
     * @param {?} videoPlayer
     * @param {?} canvas
     * @param {?} time
     * @param {?=} width
     * @param {?=} height
     * @return {?}
     */
    FrameExtractionService.prototype.getThumbnail = /**
     * @param {?} videoPlayer
     * @param {?} canvas
     * @param {?} time
     * @param {?=} width
     * @param {?=} height
     * @return {?}
     */
    function (videoPlayer, canvas, time, width, height) {
        var _this = this;
        if (width === void 0) { width = 160; }
        if (height === void 0) { height = 90; }
        return Observable.create(function (observer) {
            // go to specified frame
            var /** @type {?} */ subscription = _this.goToFrame(videoPlayer, time).subscribe(function (event) {
                // create image from current frame
                canvas.getContext('2d').drawImage(videoPlayer, 0, 0, width, height);
                observer.next({ image: canvas.toDataURL(), width: width, height: height, time: time });
                observer.complete();
                subscription.unsubscribe();
            });
        });
    };
    /**
     * @param {?} source
     * @param {?} width
     * @param {?} height
     * @param {?} time
     * @return {?}
     */
    FrameExtractionService.prototype.getFrameThumbnail = /**
     * @param {?} source
     * @param {?} width
     * @param {?} height
     * @param {?} time
     * @return {?}
     */
    function (source, width, height, time) {
        // create required elements
        var /** @type {?} */ videoPlayer = this.createVideoPlayer(source);
        var /** @type {?} */ canvas = this.createCanvas(width, height);
        var /** @type {?} */ frameSubscription = this.getThumbnail(videoPlayer, canvas, time, width, height);
        // ensure we release memory after we are finished
        frameSubscription.subscribe(null, null, function () {
            videoPlayer = null;
            canvas = null;
        });
        return frameSubscription;
    };
    /**
     * @param {?} source
     * @param {?} width
     * @param {?} height
     * @param {?} start
     * @param {?} end
     * @param {?=} skip
     * @return {?}
     */
    FrameExtractionService.prototype.getFrameThumbnails = /**
     * @param {?} source
     * @param {?} width
     * @param {?} height
     * @param {?} start
     * @param {?} end
     * @param {?=} skip
     * @return {?}
     */
    function (source, width, height, start, end, skip) {
        var _this = this;
        if (skip === void 0) { skip = 5; }
        // create required elements
        var /** @type {?} */ videoPlayer = this.createVideoPlayer(source);
        var /** @type {?} */ canvas = this.createCanvas(width, height);
        return Observable.create(function (observer) {
            fromEvent(videoPlayer, 'loadedmetadata').subscribe(function () {
                // calculate the frames required
                var /** @type {?} */ frames = [];
                for (var /** @type {?} */ idx = start; idx < end; idx += skip) {
                    frames.push(_this.getThumbnail(videoPlayer, canvas, idx, width, height));
                }
                concat.apply(void 0, tslib_1.__spread(frames)).subscribe(function (frame) { return observer.next(frame); }, null, function () {
                    videoPlayer = null;
                    canvas = null;
                    observer.complete();
                });
            });
        });
    };
    FrameExtractionService.decorators = [
        { type: Injectable },
    ];
    return FrameExtractionService;
}());
export { FrameExtractionService };
function FrameExtractionService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FrameExtractionService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FrameExtractionService.ctorParameters;
}
/**
 * @record
 */
export function ExtractedFrame() { }
function ExtractedFrame_tsickle_Closure_declarations() {
    /** @type {?} */
    ExtractedFrame.prototype.image;
    /** @type {?} */
    ExtractedFrame.prototype.width;
    /** @type {?} */
    ExtractedFrame.prototype.height;
    /** @type {?} */
    ExtractedFrame.prototype.time;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWUtZXh0cmFjdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2ZyYW1lLWV4dHJhY3Rpb24vZnJhbWUtZXh0cmFjdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2hELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7Ozs7SUFNMUMsa0RBQWlCOzs7O2NBQUMsTUFBYztRQUNwQyxxQkFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRCxXQUFXLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUM3QixXQUFXLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztRQUN6QixNQUFNLENBQUMsV0FBVyxDQUFDOzs7Ozs7O0lBR2YsNkNBQVk7Ozs7O2NBQUMsS0FBYSxFQUFFLE1BQWM7UUFDOUMscUJBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDckIsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDdkIsTUFBTSxDQUFDLE1BQU0sQ0FBQzs7Ozs7OztJQUdWLDBDQUFTOzs7OztjQUFDLFdBQTZCLEVBQUUsSUFBWTtRQUN6RCxXQUFXLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUMvQixNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxJQUFJLEtBQUssQ0FBQyxHQUFHLFlBQVksR0FBRyxRQUFRLENBQUMsQ0FB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QUNuQixNQUFNLEdBQUcsSUFBSSxDQUFDO29CQUNkLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztpQkFDdkIsQ0FBQyxDQUFDO2FBQ04sQ0FBQyxDQUFDO1NBRU4sQ0FBQyxDQUFDO0tBQ047O2dCQS9FSixVQUFVOztpQ0FOWDs7U0FPYSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IGNvbmNhdCB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9jb25jYXQnO1xuaW1wb3J0IHsgZnJvbUV2ZW50IH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL2Zyb21FdmVudCc7XG5pbXBvcnQgeyBPYnNlcnZlciB9IGZyb20gJ3J4anMvT2JzZXJ2ZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRnJhbWVFeHRyYWN0aW9uU2VydmljZSB7XG5cbiAgICBwcml2YXRlIGNyZWF0ZVZpZGVvUGxheWVyKHNvdXJjZTogc3RyaW5nKTogSFRNTFZpZGVvRWxlbWVudCB7XG4gICAgICAgIGxldCB2aWRlb1BsYXllciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgICAgIHZpZGVvUGxheWVyLnByZWxvYWQgPSAnYXV0byc7XG4gICAgICAgIHZpZGVvUGxheWVyLnNyYyA9IHNvdXJjZTtcbiAgICAgICAgcmV0dXJuIHZpZGVvUGxheWVyO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlQ2FudmFzKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogSFRNTENhbnZhc0VsZW1lbnQge1xuICAgICAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICByZXR1cm4gY2FudmFzO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ29Ub0ZyYW1lKHZpZGVvUGxheWVyOiBIVE1MVmlkZW9FbGVtZW50LCB0aW1lOiBudW1iZXIpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgICAgICB2aWRlb1BsYXllci5jdXJyZW50VGltZSA9IHRpbWU7XG4gICAgICAgIHJldHVybiBmcm9tRXZlbnQodmlkZW9QbGF5ZXIsIHRpbWUgPT09IDAgPyAnbG9hZGVkZGF0YScgOiAnc2Vla2VkJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUaHVtYm5haWwodmlkZW9QbGF5ZXI6IEhUTUxWaWRlb0VsZW1lbnQsIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsIHRpbWU6IG51bWJlciwgd2lkdGg6IG51bWJlciA9IDE2MCwgaGVpZ2h0OiBudW1iZXIgPSA5MCk6IE9ic2VydmFibGU8RXh0cmFjdGVkRnJhbWU+IHtcblxuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxFeHRyYWN0ZWRGcmFtZT4pID0+IHtcblxuICAgICAgICAgICAgLy8gZ28gdG8gc3BlY2lmaWVkIGZyYW1lXG4gICAgICAgICAgICBsZXQgc3Vic2NyaXB0aW9uID0gdGhpcy5nb1RvRnJhbWUodmlkZW9QbGF5ZXIsIHRpbWUpLnN1YnNjcmliZSgoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBpbWFnZSBmcm9tIGN1cnJlbnQgZnJhbWVcbiAgICAgICAgICAgICAgICBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKS5kcmF3SW1hZ2UodmlkZW9QbGF5ZXIsIDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQoeyBpbWFnZTogY2FudmFzLnRvRGF0YVVSTCgpLCB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0LCB0aW1lOiB0aW1lIH0pO1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0RnJhbWVUaHVtYm5haWwoc291cmNlOiBzdHJpbmcsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCB0aW1lOiBudW1iZXIpOiBPYnNlcnZhYmxlPEV4dHJhY3RlZEZyYW1lPiB7XG5cbiAgICAgICAgLy8gY3JlYXRlIHJlcXVpcmVkIGVsZW1lbnRzXG4gICAgICAgIGxldCB2aWRlb1BsYXllciA9IHRoaXMuY3JlYXRlVmlkZW9QbGF5ZXIoc291cmNlKTtcbiAgICAgICAgbGV0IGNhbnZhcyA9IHRoaXMuY3JlYXRlQ2FudmFzKHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgICAgIGxldCBmcmFtZVN1YnNjcmlwdGlvbiA9IHRoaXMuZ2V0VGh1bWJuYWlsKHZpZGVvUGxheWVyLCBjYW52YXMsIHRpbWUsIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgICAgIC8vIGVuc3VyZSB3ZSByZWxlYXNlIG1lbW9yeSBhZnRlciB3ZSBhcmUgZmluaXNoZWRcbiAgICAgICAgZnJhbWVTdWJzY3JpcHRpb24uc3Vic2NyaWJlKG51bGwsIG51bGwsICgpID0+IHtcbiAgICAgICAgICAgIHZpZGVvUGxheWVyID0gbnVsbDtcbiAgICAgICAgICAgIGNhbnZhcyA9IG51bGw7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBmcmFtZVN1YnNjcmlwdGlvbjtcbiAgICB9XG5cbiAgICBnZXRGcmFtZVRodW1ibmFpbHMoc291cmNlOiBzdHJpbmcsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlciwgc2tpcDogbnVtYmVyID0gNSk6IE9ic2VydmFibGU8RXh0cmFjdGVkRnJhbWU+IHtcblxuICAgICAgICAvLyBjcmVhdGUgcmVxdWlyZWQgZWxlbWVudHNcbiAgICAgICAgbGV0IHZpZGVvUGxheWVyID0gdGhpcy5jcmVhdGVWaWRlb1BsYXllcihzb3VyY2UpO1xuICAgICAgICBsZXQgY2FudmFzID0gdGhpcy5jcmVhdGVDYW52YXMod2lkdGgsIGhlaWdodCk7XG5cbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogT2JzZXJ2ZXI8RXh0cmFjdGVkRnJhbWU+KSA9PiB7XG5cbiAgICAgICAgICAgIGZyb21FdmVudCh2aWRlb1BsYXllciwgJ2xvYWRlZG1ldGFkYXRhJykuc3Vic2NyaWJlKCgpID0+IHtcblxuICAgICAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgZnJhbWVzIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgbGV0IGZyYW1lcyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaWR4ID0gc3RhcnQ7IGlkeCA8IGVuZDsgaWR4ICs9IHNraXApIHtcbiAgICAgICAgICAgICAgICAgICAgZnJhbWVzLnB1c2godGhpcy5nZXRUaHVtYm5haWwodmlkZW9QbGF5ZXIsIGNhbnZhcywgaWR4LCB3aWR0aCwgaGVpZ2h0KSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uY2F0KC4uLmZyYW1lcykuc3Vic2NyaWJlKChmcmFtZTogRXh0cmFjdGVkRnJhbWUpID0+IG9ic2VydmVyLm5leHQoZnJhbWUpLCBudWxsLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHZpZGVvUGxheWVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEV4dHJhY3RlZEZyYW1lIHtcbiAgICBpbWFnZTogc3RyaW5nO1xuICAgIHdpZHRoOiBudW1iZXI7XG4gICAgaGVpZ2h0OiBudW1iZXI7XG4gICAgdGltZTogbnVtYmVyO1xufSJdfQ==