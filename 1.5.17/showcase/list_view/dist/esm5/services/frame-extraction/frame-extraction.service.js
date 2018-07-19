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
    /** @nocollapse */
    FrameExtractionService.ctorParameters = function () { return []; };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWUtZXh0cmFjdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2ZyYW1lLWV4dHJhY3Rpb24vZnJhbWUtZXh0cmFjdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2hELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7Ozs7SUFNMUMsa0RBQWlCOzs7O2NBQUMsTUFBYztRQUNwQyxxQkFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRCxXQUFXLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUM3QixXQUFXLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztRQUN6QixNQUFNLENBQUMsV0FBVyxDQUFDOzs7Ozs7O0lBR2YsNkNBQVk7Ozs7O2NBQUMsS0FBYSxFQUFFLE1BQWM7UUFDOUMscUJBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDckIsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDdkIsTUFBTSxDQUFDLE1BQU0sQ0FBQzs7Ozs7OztJQUdWLDBDQUFTOzs7OztjQUFDLFdBQTZCLEVBQUUsSUFBWTtRQUN6RCxXQUFXLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUMvQixNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxJQUFJLEtBQUssQ0FBQyxHQUFHLFlBQVksR0FBRyxRQUFRLENBQUMsQ0FBQzs7Ozs7Ozs7OztJQUdoRSw2Q0FBWTs7Ozs7Ozs7Y0FBQyxXQUE2QixFQUFFLE1BQXlCLEVBQUUsSUFBWSxFQUFFLEtBQW1CLEVBQUUsTUFBbUI7O1FBQXhDLHNCQUFBLEVBQUEsV0FBbUI7UUFBRSx1QkFBQSxFQUFBLFdBQW1CO1FBRWpJLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQUMsUUFBa0M7O1lBR3hELHFCQUFJLFlBQVksR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxLQUFVOztnQkFFdEUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNwRSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ3ZGLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDcEIsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQzlCLENBQUMsQ0FBQztTQUNOLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBR1Asa0RBQWlCOzs7Ozs7O0lBQWpCLFVBQWtCLE1BQWMsRUFBRSxLQUFhLEVBQUUsTUFBYyxFQUFFLElBQVk7O1FBR3pFLHFCQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakQscUJBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTlDLHFCQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDOztRQUdwRixpQkFBaUIsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTtZQUNwQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ25CLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDakIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLGlCQUFpQixDQUFDO0tBQzVCOzs7Ozs7Ozs7O0lBRUQsbURBQWtCOzs7Ozs7Ozs7SUFBbEIsVUFBbUIsTUFBYyxFQUFFLEtBQWEsRUFBRSxNQUFjLEVBQUUsS0FBYSxFQUFFLEdBQVcsRUFBRSxJQUFnQjtRQUE5RyxpQkF5QkM7UUF6QjZGLHFCQUFBLEVBQUEsUUFBZ0I7O1FBRzFHLHFCQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakQscUJBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTlDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQUMsUUFBa0M7WUFFeEQsU0FBUyxDQUFDLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLFNBQVMsQ0FBQzs7Z0JBRy9DLHFCQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7Z0JBRWhCLEdBQUcsQ0FBQyxDQUFDLHFCQUFJLEdBQUcsR0FBRyxLQUFLLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7b0JBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztpQkFDM0U7Z0JBRUQsTUFBTSxnQ0FBSSxNQUFNLEdBQUUsU0FBUyxDQUFDLFVBQUMsS0FBcUIsSUFBSyxPQUFBLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQXBCLENBQW9CLEVBQUUsSUFBSSxFQUFFO29CQUMvRSxXQUFXLEdBQUcsSUFBSSxDQUFDO29CQUNuQixNQUFNLEdBQUcsSUFBSSxDQUFDO29CQUNkLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztpQkFDdkIsQ0FBQyxDQUFDO2FBQ04sQ0FBQyxDQUFDO1NBRU4sQ0FBQyxDQUFDO0tBQ047O2dCQS9FSixVQUFVOzs7O2lDQU5YOztTQU9hLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgY29uY2F0IH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL2NvbmNhdCc7XG5pbXBvcnQgeyBmcm9tRXZlbnQgfSBmcm9tICdyeGpzL29ic2VydmFibGUvZnJvbUV2ZW50JztcbmltcG9ydCB7IE9ic2VydmVyIH0gZnJvbSAncnhqcy9PYnNlcnZlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGcmFtZUV4dHJhY3Rpb25TZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgY3JlYXRlVmlkZW9QbGF5ZXIoc291cmNlOiBzdHJpbmcpOiBIVE1MVmlkZW9FbGVtZW50IHtcbiAgICAgICAgbGV0IHZpZGVvUGxheWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICAgICAgdmlkZW9QbGF5ZXIucHJlbG9hZCA9ICdhdXRvJztcbiAgICAgICAgdmlkZW9QbGF5ZXIuc3JjID0gc291cmNlO1xuICAgICAgICByZXR1cm4gdmlkZW9QbGF5ZXI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVDYW52YXMod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiBIVE1MQ2FudmFzRWxlbWVudCB7XG4gICAgICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHJldHVybiBjYW52YXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnb1RvRnJhbWUodmlkZW9QbGF5ZXI6IEhUTUxWaWRlb0VsZW1lbnQsIHRpbWU6IG51bWJlcik6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgICAgIHZpZGVvUGxheWVyLmN1cnJlbnRUaW1lID0gdGltZTtcbiAgICAgICAgcmV0dXJuIGZyb21FdmVudCh2aWRlb1BsYXllciwgdGltZSA9PT0gMCA/ICdsb2FkZWRkYXRhJyA6ICdzZWVrZWQnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRodW1ibmFpbCh2aWRlb1BsYXllcjogSFRNTFZpZGVvRWxlbWVudCwgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCwgdGltZTogbnVtYmVyLCB3aWR0aDogbnVtYmVyID0gMTYwLCBoZWlnaHQ6IG51bWJlciA9IDkwKTogT2JzZXJ2YWJsZTxFeHRyYWN0ZWRGcmFtZT4ge1xuXG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPEV4dHJhY3RlZEZyYW1lPikgPT4ge1xuXG4gICAgICAgICAgICAvLyBnbyB0byBzcGVjaWZpZWQgZnJhbWVcbiAgICAgICAgICAgIGxldCBzdWJzY3JpcHRpb24gPSB0aGlzLmdvVG9GcmFtZSh2aWRlb1BsYXllciwgdGltZSkuc3Vic2NyaWJlKChldmVudDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIGltYWdlIGZyb20gY3VycmVudCBmcmFtZVxuICAgICAgICAgICAgICAgIGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpLmRyYXdJbWFnZSh2aWRlb1BsYXllciwgMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh7IGltYWdlOiBjYW52YXMudG9EYXRhVVJMKCksIHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQsIHRpbWU6IHRpbWUgfSk7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRGcmFtZVRodW1ibmFpbChzb3VyY2U6IHN0cmluZywgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHRpbWU6IG51bWJlcik6IE9ic2VydmFibGU8RXh0cmFjdGVkRnJhbWU+IHtcblxuICAgICAgICAvLyBjcmVhdGUgcmVxdWlyZWQgZWxlbWVudHNcbiAgICAgICAgbGV0IHZpZGVvUGxheWVyID0gdGhpcy5jcmVhdGVWaWRlb1BsYXllcihzb3VyY2UpO1xuICAgICAgICBsZXQgY2FudmFzID0gdGhpcy5jcmVhdGVDYW52YXMod2lkdGgsIGhlaWdodCk7XG5cbiAgICAgICAgbGV0IGZyYW1lU3Vic2NyaXB0aW9uID0gdGhpcy5nZXRUaHVtYm5haWwodmlkZW9QbGF5ZXIsIGNhbnZhcywgdGltZSwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAgICAgLy8gZW5zdXJlIHdlIHJlbGVhc2UgbWVtb3J5IGFmdGVyIHdlIGFyZSBmaW5pc2hlZFxuICAgICAgICBmcmFtZVN1YnNjcmlwdGlvbi5zdWJzY3JpYmUobnVsbCwgbnVsbCwgKCkgPT4ge1xuICAgICAgICAgICAgdmlkZW9QbGF5ZXIgPSBudWxsO1xuICAgICAgICAgICAgY2FudmFzID0gbnVsbDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZyYW1lU3Vic2NyaXB0aW9uO1xuICAgIH1cblxuICAgIGdldEZyYW1lVGh1bWJuYWlscyhzb3VyY2U6IHN0cmluZywgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyLCBza2lwOiBudW1iZXIgPSA1KTogT2JzZXJ2YWJsZTxFeHRyYWN0ZWRGcmFtZT4ge1xuXG4gICAgICAgIC8vIGNyZWF0ZSByZXF1aXJlZCBlbGVtZW50c1xuICAgICAgICBsZXQgdmlkZW9QbGF5ZXIgPSB0aGlzLmNyZWF0ZVZpZGVvUGxheWVyKHNvdXJjZSk7XG4gICAgICAgIGxldCBjYW52YXMgPSB0aGlzLmNyZWF0ZUNhbnZhcyh3aWR0aCwgaGVpZ2h0KTtcblxuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxFeHRyYWN0ZWRGcmFtZT4pID0+IHtcblxuICAgICAgICAgICAgZnJvbUV2ZW50KHZpZGVvUGxheWVyLCAnbG9hZGVkbWV0YWRhdGEnKS5zdWJzY3JpYmUoKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSBmcmFtZXMgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICBsZXQgZnJhbWVzID0gW107XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpZHggPSBzdGFydDsgaWR4IDwgZW5kOyBpZHggKz0gc2tpcCkge1xuICAgICAgICAgICAgICAgICAgICBmcmFtZXMucHVzaCh0aGlzLmdldFRodW1ibmFpbCh2aWRlb1BsYXllciwgY2FudmFzLCBpZHgsIHdpZHRoLCBoZWlnaHQpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25jYXQoLi4uZnJhbWVzKS5zdWJzY3JpYmUoKGZyYW1lOiBFeHRyYWN0ZWRGcmFtZSkgPT4gb2JzZXJ2ZXIubmV4dChmcmFtZSksIG51bGwsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdmlkZW9QbGF5ZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBjYW52YXMgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXh0cmFjdGVkRnJhbWUge1xuICAgIGltYWdlOiBzdHJpbmc7XG4gICAgd2lkdGg6IG51bWJlcjtcbiAgICBoZWlnaHQ6IG51bWJlcjtcbiAgICB0aW1lOiBudW1iZXI7XG59Il19