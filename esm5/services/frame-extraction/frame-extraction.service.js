/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { concat } from 'rxjs/observable/concat';
import { fromEvent } from 'rxjs/observable/fromEvent';
var FrameExtractionService = /** @class */ (function () {
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
            var /** @type {?} */ subscription = _this.goToFrame(videoPlayer, time).subscribe(function () {
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
        { type: Injectable }
    ];
    return FrameExtractionService;
}());
export { FrameExtractionService };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWUtZXh0cmFjdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2ZyYW1lLWV4dHJhY3Rpb24vZnJhbWUtZXh0cmFjdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2hELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7Ozs7SUFNMUMsa0RBQWlCOzs7O2NBQUMsTUFBYztRQUNwQyxxQkFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRCxXQUFXLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUM3QixXQUFXLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztRQUN6QixNQUFNLENBQUMsV0FBVyxDQUFDOzs7Ozs7O0lBR2YsNkNBQVk7Ozs7O2NBQUMsS0FBYSxFQUFFLE1BQWM7UUFDOUMscUJBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDckIsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDdkIsTUFBTSxDQUFDLE1BQU0sQ0FBQzs7Ozs7OztJQUdWLDBDQUFTOzs7OztjQUFDLFdBQTZCLEVBQUUsSUFBWTtRQUN6RCxXQUFXLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUMvQixNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FB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QUksQ0FBQztvQkFDbkIsTUFBTSxHQUFHLElBQUksQ0FBQztvQkFDZCxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQ3ZCLENBQUMsQ0FBQzthQUNOLENBQUMsQ0FBQztTQUVOLENBQUMsQ0FBQztLQUNOOztnQkEvRUosVUFBVTs7aUNBTlg7O1NBT2Esc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBjb25jYXQgfSBmcm9tICdyeGpzL29ic2VydmFibGUvY29uY2F0JztcbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9mcm9tRXZlbnQnO1xuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzL09ic2VydmVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZyYW1lRXh0cmFjdGlvblNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBjcmVhdGVWaWRlb1BsYXllcihzb3VyY2U6IHN0cmluZyk6IEhUTUxWaWRlb0VsZW1lbnQge1xuICAgICAgICBsZXQgdmlkZW9QbGF5ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgICAgICB2aWRlb1BsYXllci5wcmVsb2FkID0gJ2F1dG8nO1xuICAgICAgICB2aWRlb1BsYXllci5zcmMgPSBzb3VyY2U7XG4gICAgICAgIHJldHVybiB2aWRlb1BsYXllcjtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUNhbnZhcyh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IEhUTUxDYW52YXNFbGVtZW50IHtcbiAgICAgICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgcmV0dXJuIGNhbnZhcztcbiAgICB9XG5cbiAgICBwcml2YXRlIGdvVG9GcmFtZSh2aWRlb1BsYXllcjogSFRNTFZpZGVvRWxlbWVudCwgdGltZTogbnVtYmVyKTogT2JzZXJ2YWJsZTxFdmVudD4ge1xuICAgICAgICB2aWRlb1BsYXllci5jdXJyZW50VGltZSA9IHRpbWU7XG4gICAgICAgIHJldHVybiBmcm9tRXZlbnQodmlkZW9QbGF5ZXIsIHRpbWUgPT09IDAgPyAnbG9hZGVkZGF0YScgOiAnc2Vla2VkJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUaHVtYm5haWwodmlkZW9QbGF5ZXI6IEhUTUxWaWRlb0VsZW1lbnQsIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsIHRpbWU6IG51bWJlciwgd2lkdGg6IG51bWJlciA9IDE2MCwgaGVpZ2h0OiBudW1iZXIgPSA5MCk6IE9ic2VydmFibGU8RXh0cmFjdGVkRnJhbWU+IHtcblxuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxFeHRyYWN0ZWRGcmFtZT4pID0+IHtcblxuICAgICAgICAgICAgLy8gZ28gdG8gc3BlY2lmaWVkIGZyYW1lXG4gICAgICAgICAgICBsZXQgc3Vic2NyaXB0aW9uID0gdGhpcy5nb1RvRnJhbWUodmlkZW9QbGF5ZXIsIHRpbWUpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIGltYWdlIGZyb20gY3VycmVudCBmcmFtZVxuICAgICAgICAgICAgICAgIGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpLmRyYXdJbWFnZSh2aWRlb1BsYXllciwgMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh7IGltYWdlOiBjYW52YXMudG9EYXRhVVJMKCksIHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQsIHRpbWU6IHRpbWUgfSk7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRGcmFtZVRodW1ibmFpbChzb3VyY2U6IHN0cmluZywgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHRpbWU6IG51bWJlcik6IE9ic2VydmFibGU8RXh0cmFjdGVkRnJhbWU+IHtcblxuICAgICAgICAvLyBjcmVhdGUgcmVxdWlyZWQgZWxlbWVudHNcbiAgICAgICAgbGV0IHZpZGVvUGxheWVyID0gdGhpcy5jcmVhdGVWaWRlb1BsYXllcihzb3VyY2UpO1xuICAgICAgICBsZXQgY2FudmFzID0gdGhpcy5jcmVhdGVDYW52YXMod2lkdGgsIGhlaWdodCk7XG5cbiAgICAgICAgbGV0IGZyYW1lU3Vic2NyaXB0aW9uID0gdGhpcy5nZXRUaHVtYm5haWwodmlkZW9QbGF5ZXIsIGNhbnZhcywgdGltZSwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAgICAgLy8gZW5zdXJlIHdlIHJlbGVhc2UgbWVtb3J5IGFmdGVyIHdlIGFyZSBmaW5pc2hlZFxuICAgICAgICBmcmFtZVN1YnNjcmlwdGlvbi5zdWJzY3JpYmUobnVsbCwgbnVsbCwgKCkgPT4ge1xuICAgICAgICAgICAgdmlkZW9QbGF5ZXIgPSBudWxsO1xuICAgICAgICAgICAgY2FudmFzID0gbnVsbDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZyYW1lU3Vic2NyaXB0aW9uO1xuICAgIH1cblxuICAgIGdldEZyYW1lVGh1bWJuYWlscyhzb3VyY2U6IHN0cmluZywgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyLCBza2lwOiBudW1iZXIgPSA1KTogT2JzZXJ2YWJsZTxFeHRyYWN0ZWRGcmFtZT4ge1xuXG4gICAgICAgIC8vIGNyZWF0ZSByZXF1aXJlZCBlbGVtZW50c1xuICAgICAgICBsZXQgdmlkZW9QbGF5ZXIgPSB0aGlzLmNyZWF0ZVZpZGVvUGxheWVyKHNvdXJjZSk7XG4gICAgICAgIGxldCBjYW52YXMgPSB0aGlzLmNyZWF0ZUNhbnZhcyh3aWR0aCwgaGVpZ2h0KTtcblxuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxFeHRyYWN0ZWRGcmFtZT4pID0+IHtcblxuICAgICAgICAgICAgZnJvbUV2ZW50KHZpZGVvUGxheWVyLCAnbG9hZGVkbWV0YWRhdGEnKS5zdWJzY3JpYmUoKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSBmcmFtZXMgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICBsZXQgZnJhbWVzID0gW107XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpZHggPSBzdGFydDsgaWR4IDwgZW5kOyBpZHggKz0gc2tpcCkge1xuICAgICAgICAgICAgICAgICAgICBmcmFtZXMucHVzaCh0aGlzLmdldFRodW1ibmFpbCh2aWRlb1BsYXllciwgY2FudmFzLCBpZHgsIHdpZHRoLCBoZWlnaHQpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25jYXQoLi4uZnJhbWVzKS5zdWJzY3JpYmUoKGZyYW1lOiBFeHRyYWN0ZWRGcmFtZSkgPT4gb2JzZXJ2ZXIubmV4dChmcmFtZSksIG51bGwsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdmlkZW9QbGF5ZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBjYW52YXMgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXh0cmFjdGVkRnJhbWUge1xuICAgIGltYWdlOiBzdHJpbmc7XG4gICAgd2lkdGg6IG51bWJlcjtcbiAgICBoZWlnaHQ6IG51bWJlcjtcbiAgICB0aW1lOiBudW1iZXI7XG59Il19