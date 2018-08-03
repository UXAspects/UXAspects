/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { concat } from 'rxjs/observable/concat';
import { fromEvent } from 'rxjs/observable/fromEvent';
export class FrameExtractionService {
    /**
     * @param {?} source
     * @return {?}
     */
    createVideoPlayer(source) {
        let /** @type {?} */ videoPlayer = document.createElement('video');
        videoPlayer.preload = 'auto';
        videoPlayer.src = source;
        return videoPlayer;
    }
    /**
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    createCanvas(width, height) {
        let /** @type {?} */ canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        return canvas;
    }
    /**
     * @param {?} videoPlayer
     * @param {?} time
     * @return {?}
     */
    goToFrame(videoPlayer, time) {
        videoPlayer.currentTime = time;
        return fromEvent(videoPlayer, time === 0 ? 'loadeddata' : 'seeked');
    }
    /**
     * @param {?} videoPlayer
     * @param {?} canvas
     * @param {?} time
     * @param {?=} width
     * @param {?=} height
     * @return {?}
     */
    getThumbnail(videoPlayer, canvas, time, width = 160, height = 90) {
        return Observable.create((observer) => {
            // go to specified frame
            let /** @type {?} */ subscription = this.goToFrame(videoPlayer, time).subscribe(() => {
                // create image from current frame
                canvas.getContext('2d').drawImage(videoPlayer, 0, 0, width, height);
                observer.next({ image: canvas.toDataURL(), width: width, height: height, time: time });
                observer.complete();
                subscription.unsubscribe();
            });
        });
    }
    /**
     * @param {?} source
     * @param {?} width
     * @param {?} height
     * @param {?} time
     * @return {?}
     */
    getFrameThumbnail(source, width, height, time) {
        // create required elements
        let /** @type {?} */ videoPlayer = this.createVideoPlayer(source);
        let /** @type {?} */ canvas = this.createCanvas(width, height);
        let /** @type {?} */ frameSubscription = this.getThumbnail(videoPlayer, canvas, time, width, height);
        // ensure we release memory after we are finished
        frameSubscription.subscribe(null, null, () => {
            videoPlayer = null;
            canvas = null;
        });
        return frameSubscription;
    }
    /**
     * @param {?} source
     * @param {?} width
     * @param {?} height
     * @param {?} start
     * @param {?} end
     * @param {?=} skip
     * @return {?}
     */
    getFrameThumbnails(source, width, height, start, end, skip = 5) {
        // create required elements
        let /** @type {?} */ videoPlayer = this.createVideoPlayer(source);
        let /** @type {?} */ canvas = this.createCanvas(width, height);
        return Observable.create((observer) => {
            fromEvent(videoPlayer, 'loadedmetadata').subscribe(() => {
                // calculate the frames required
                let /** @type {?} */ frames = [];
                for (let /** @type {?} */ idx = start; idx < end; idx += skip) {
                    frames.push(this.getThumbnail(videoPlayer, canvas, idx, width, height));
                }
                concat(...frames).subscribe((frame) => observer.next(frame), null, () => {
                    videoPlayer = null;
                    canvas = null;
                    observer.complete();
                });
            });
        });
    }
}
FrameExtractionService.decorators = [
    { type: Injectable }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWUtZXh0cmFjdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2ZyYW1lLWV4dHJhY3Rpb24vZnJhbWUtZXh0cmFjdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBSXRELE1BQU07Ozs7O0lBRU0saUJBQWlCLENBQUMsTUFBYztRQUNwQyxxQkFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRCxXQUFXLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUM3QixXQUFXLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztRQUN6QixNQUFNLENBQUMsV0FBVyxDQUFDOzs7Ozs7O0lBR2YsWUFBWSxDQUFDLEtBQWEsRUFBRSxNQUFjO1FBQzlDLHFCQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxNQUFNLENBQUM7Ozs7Ozs7SUFHVixTQUFTLENBQUMsV0FBNkIsRUFBRSxJQUFZO1FBQ3pELFdBQVcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMs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LFFBQVEsRUFBRSxDQUFDO2lCQUN2QixDQUFDLENBQUM7YUFDTixDQUFDLENBQUM7U0FFTixDQUFDLENBQUM7S0FDTjs7O1lBL0VKLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IGNvbmNhdCB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9jb25jYXQnO1xuaW1wb3J0IHsgZnJvbUV2ZW50IH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL2Zyb21FdmVudCc7XG5pbXBvcnQgeyBPYnNlcnZlciB9IGZyb20gJ3J4anMvT2JzZXJ2ZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRnJhbWVFeHRyYWN0aW9uU2VydmljZSB7XG5cbiAgICBwcml2YXRlIGNyZWF0ZVZpZGVvUGxheWVyKHNvdXJjZTogc3RyaW5nKTogSFRNTFZpZGVvRWxlbWVudCB7XG4gICAgICAgIGxldCB2aWRlb1BsYXllciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgICAgIHZpZGVvUGxheWVyLnByZWxvYWQgPSAnYXV0byc7XG4gICAgICAgIHZpZGVvUGxheWVyLnNyYyA9IHNvdXJjZTtcbiAgICAgICAgcmV0dXJuIHZpZGVvUGxheWVyO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlQ2FudmFzKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogSFRNTENhbnZhc0VsZW1lbnQge1xuICAgICAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICByZXR1cm4gY2FudmFzO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ29Ub0ZyYW1lKHZpZGVvUGxheWVyOiBIVE1MVmlkZW9FbGVtZW50LCB0aW1lOiBudW1iZXIpOiBPYnNlcnZhYmxlPEV2ZW50PiB7XG4gICAgICAgIHZpZGVvUGxheWVyLmN1cnJlbnRUaW1lID0gdGltZTtcbiAgICAgICAgcmV0dXJuIGZyb21FdmVudCh2aWRlb1BsYXllciwgdGltZSA9PT0gMCA/ICdsb2FkZWRkYXRhJyA6ICdzZWVrZWQnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRodW1ibmFpbCh2aWRlb1BsYXllcjogSFRNTFZpZGVvRWxlbWVudCwgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCwgdGltZTogbnVtYmVyLCB3aWR0aDogbnVtYmVyID0gMTYwLCBoZWlnaHQ6IG51bWJlciA9IDkwKTogT2JzZXJ2YWJsZTxFeHRyYWN0ZWRGcmFtZT4ge1xuXG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPEV4dHJhY3RlZEZyYW1lPikgPT4ge1xuXG4gICAgICAgICAgICAvLyBnbyB0byBzcGVjaWZpZWQgZnJhbWVcbiAgICAgICAgICAgIGxldCBzdWJzY3JpcHRpb24gPSB0aGlzLmdvVG9GcmFtZSh2aWRlb1BsYXllciwgdGltZSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgaW1hZ2UgZnJvbSBjdXJyZW50IGZyYW1lXG4gICAgICAgICAgICAgICAgY2FudmFzLmdldENvbnRleHQoJzJkJykuZHJhd0ltYWdlKHZpZGVvUGxheWVyLCAwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHsgaW1hZ2U6IGNhbnZhcy50b0RhdGFVUkwoKSwgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCwgdGltZTogdGltZSB9KTtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldEZyYW1lVGh1bWJuYWlsKHNvdXJjZTogc3RyaW5nLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgdGltZTogbnVtYmVyKTogT2JzZXJ2YWJsZTxFeHRyYWN0ZWRGcmFtZT4ge1xuXG4gICAgICAgIC8vIGNyZWF0ZSByZXF1aXJlZCBlbGVtZW50c1xuICAgICAgICBsZXQgdmlkZW9QbGF5ZXIgPSB0aGlzLmNyZWF0ZVZpZGVvUGxheWVyKHNvdXJjZSk7XG4gICAgICAgIGxldCBjYW52YXMgPSB0aGlzLmNyZWF0ZUNhbnZhcyh3aWR0aCwgaGVpZ2h0KTtcblxuICAgICAgICBsZXQgZnJhbWVTdWJzY3JpcHRpb24gPSB0aGlzLmdldFRodW1ibmFpbCh2aWRlb1BsYXllciwgY2FudmFzLCB0aW1lLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgICAgICAvLyBlbnN1cmUgd2UgcmVsZWFzZSBtZW1vcnkgYWZ0ZXIgd2UgYXJlIGZpbmlzaGVkXG4gICAgICAgIGZyYW1lU3Vic2NyaXB0aW9uLnN1YnNjcmliZShudWxsLCBudWxsLCAoKSA9PiB7XG4gICAgICAgICAgICB2aWRlb1BsYXllciA9IG51bGw7XG4gICAgICAgICAgICBjYW52YXMgPSBudWxsO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZnJhbWVTdWJzY3JpcHRpb247XG4gICAgfVxuXG4gICAgZ2V0RnJhbWVUaHVtYm5haWxzKHNvdXJjZTogc3RyaW5nLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIsIHNraXA6IG51bWJlciA9IDUpOiBPYnNlcnZhYmxlPEV4dHJhY3RlZEZyYW1lPiB7XG5cbiAgICAgICAgLy8gY3JlYXRlIHJlcXVpcmVkIGVsZW1lbnRzXG4gICAgICAgIGxldCB2aWRlb1BsYXllciA9IHRoaXMuY3JlYXRlVmlkZW9QbGF5ZXIoc291cmNlKTtcbiAgICAgICAgbGV0IGNhbnZhcyA9IHRoaXMuY3JlYXRlQ2FudmFzKHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPEV4dHJhY3RlZEZyYW1lPikgPT4ge1xuXG4gICAgICAgICAgICBmcm9tRXZlbnQodmlkZW9QbGF5ZXIsICdsb2FkZWRtZXRhZGF0YScpLnN1YnNjcmliZSgoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIGZyYW1lcyByZXF1aXJlZFxuICAgICAgICAgICAgICAgIGxldCBmcmFtZXMgPSBbXTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGlkeCA9IHN0YXJ0OyBpZHggPCBlbmQ7IGlkeCArPSBza2lwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lcy5wdXNoKHRoaXMuZ2V0VGh1bWJuYWlsKHZpZGVvUGxheWVyLCBjYW52YXMsIGlkeCwgd2lkdGgsIGhlaWdodCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbmNhdCguLi5mcmFtZXMpLnN1YnNjcmliZSgoZnJhbWU6IEV4dHJhY3RlZEZyYW1lKSA9PiBvYnNlcnZlci5uZXh0KGZyYW1lKSwgbnVsbCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB2aWRlb1BsYXllciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGNhbnZhcyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBFeHRyYWN0ZWRGcmFtZSB7XG4gICAgaW1hZ2U6IHN0cmluZztcbiAgICB3aWR0aDogbnVtYmVyO1xuICAgIGhlaWdodDogbnVtYmVyO1xuICAgIHRpbWU6IG51bWJlcjtcbn0iXX0=