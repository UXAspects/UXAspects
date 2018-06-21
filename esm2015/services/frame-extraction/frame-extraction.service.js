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
            let /** @type {?} */ subscription = this.goToFrame(videoPlayer, time).subscribe((event) => {
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
    { type: Injectable },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWUtZXh0cmFjdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2ZyYW1lLWV4dHJhY3Rpb24vZnJhbWUtZXh0cmFjdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBSXRELE1BQU07Ozs7O0lBRU0saUJBQWlCLENBQUMsTUFBYztRQUNwQyxxQkFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRCxXQUFXLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUM3QixXQUFXLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztRQUN6QixNQUFNLENBQUMsV0FBVyxDQUFDOzs7Ozs7O0lBR2YsWUFBWSxDQUFDLEtBQWEsRUFBRSxNQUFjO1FBQzlDLHFCQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxNQUFNLENBQUM7Ozs7Ozs7SUFHVixTQUFTLENBQUMsV0FBNkIsRUFBRSxJQUFZO1FBQ3pELFdBQVcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksS0FBSyxDQUFDLEdBQUcsWUFBWSxHQUFHLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7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Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBjb25jYXQgfSBmcm9tICdyeGpzL29ic2VydmFibGUvY29uY2F0JztcbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9mcm9tRXZlbnQnO1xuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzL09ic2VydmVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZyYW1lRXh0cmFjdGlvblNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBjcmVhdGVWaWRlb1BsYXllcihzb3VyY2U6IHN0cmluZyk6IEhUTUxWaWRlb0VsZW1lbnQge1xuICAgICAgICBsZXQgdmlkZW9QbGF5ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgICAgICB2aWRlb1BsYXllci5wcmVsb2FkID0gJ2F1dG8nO1xuICAgICAgICB2aWRlb1BsYXllci5zcmMgPSBzb3VyY2U7XG4gICAgICAgIHJldHVybiB2aWRlb1BsYXllcjtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUNhbnZhcyh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IEhUTUxDYW52YXNFbGVtZW50IHtcbiAgICAgICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgcmV0dXJuIGNhbnZhcztcbiAgICB9XG5cbiAgICBwcml2YXRlIGdvVG9GcmFtZSh2aWRlb1BsYXllcjogSFRNTFZpZGVvRWxlbWVudCwgdGltZTogbnVtYmVyKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICAgICAgdmlkZW9QbGF5ZXIuY3VycmVudFRpbWUgPSB0aW1lO1xuICAgICAgICByZXR1cm4gZnJvbUV2ZW50KHZpZGVvUGxheWVyLCB0aW1lID09PSAwID8gJ2xvYWRlZGRhdGEnIDogJ3NlZWtlZCcpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0VGh1bWJuYWlsKHZpZGVvUGxheWVyOiBIVE1MVmlkZW9FbGVtZW50LCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LCB0aW1lOiBudW1iZXIsIHdpZHRoOiBudW1iZXIgPSAxNjAsIGhlaWdodDogbnVtYmVyID0gOTApOiBPYnNlcnZhYmxlPEV4dHJhY3RlZEZyYW1lPiB7XG5cbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogT2JzZXJ2ZXI8RXh0cmFjdGVkRnJhbWU+KSA9PiB7XG5cbiAgICAgICAgICAgIC8vIGdvIHRvIHNwZWNpZmllZCBmcmFtZVxuICAgICAgICAgICAgbGV0IHN1YnNjcmlwdGlvbiA9IHRoaXMuZ29Ub0ZyYW1lKHZpZGVvUGxheWVyLCB0aW1lKS5zdWJzY3JpYmUoKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgaW1hZ2UgZnJvbSBjdXJyZW50IGZyYW1lXG4gICAgICAgICAgICAgICAgY2FudmFzLmdldENvbnRleHQoJzJkJykuZHJhd0ltYWdlKHZpZGVvUGxheWVyLCAwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHsgaW1hZ2U6IGNhbnZhcy50b0RhdGFVUkwoKSwgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCwgdGltZTogdGltZSB9KTtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldEZyYW1lVGh1bWJuYWlsKHNvdXJjZTogc3RyaW5nLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgdGltZTogbnVtYmVyKTogT2JzZXJ2YWJsZTxFeHRyYWN0ZWRGcmFtZT4ge1xuXG4gICAgICAgIC8vIGNyZWF0ZSByZXF1aXJlZCBlbGVtZW50c1xuICAgICAgICBsZXQgdmlkZW9QbGF5ZXIgPSB0aGlzLmNyZWF0ZVZpZGVvUGxheWVyKHNvdXJjZSk7XG4gICAgICAgIGxldCBjYW52YXMgPSB0aGlzLmNyZWF0ZUNhbnZhcyh3aWR0aCwgaGVpZ2h0KTtcblxuICAgICAgICBsZXQgZnJhbWVTdWJzY3JpcHRpb24gPSB0aGlzLmdldFRodW1ibmFpbCh2aWRlb1BsYXllciwgY2FudmFzLCB0aW1lLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgICAgICAvLyBlbnN1cmUgd2UgcmVsZWFzZSBtZW1vcnkgYWZ0ZXIgd2UgYXJlIGZpbmlzaGVkXG4gICAgICAgIGZyYW1lU3Vic2NyaXB0aW9uLnN1YnNjcmliZShudWxsLCBudWxsLCAoKSA9PiB7XG4gICAgICAgICAgICB2aWRlb1BsYXllciA9IG51bGw7XG4gICAgICAgICAgICBjYW52YXMgPSBudWxsO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZnJhbWVTdWJzY3JpcHRpb247XG4gICAgfVxuXG4gICAgZ2V0RnJhbWVUaHVtYm5haWxzKHNvdXJjZTogc3RyaW5nLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIsIHNraXA6IG51bWJlciA9IDUpOiBPYnNlcnZhYmxlPEV4dHJhY3RlZEZyYW1lPiB7XG5cbiAgICAgICAgLy8gY3JlYXRlIHJlcXVpcmVkIGVsZW1lbnRzXG4gICAgICAgIGxldCB2aWRlb1BsYXllciA9IHRoaXMuY3JlYXRlVmlkZW9QbGF5ZXIoc291cmNlKTtcbiAgICAgICAgbGV0IGNhbnZhcyA9IHRoaXMuY3JlYXRlQ2FudmFzKHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPEV4dHJhY3RlZEZyYW1lPikgPT4ge1xuXG4gICAgICAgICAgICBmcm9tRXZlbnQodmlkZW9QbGF5ZXIsICdsb2FkZWRtZXRhZGF0YScpLnN1YnNjcmliZSgoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIGZyYW1lcyByZXF1aXJlZFxuICAgICAgICAgICAgICAgIGxldCBmcmFtZXMgPSBbXTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGlkeCA9IHN0YXJ0OyBpZHggPCBlbmQ7IGlkeCArPSBza2lwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lcy5wdXNoKHRoaXMuZ2V0VGh1bWJuYWlsKHZpZGVvUGxheWVyLCBjYW52YXMsIGlkeCwgd2lkdGgsIGhlaWdodCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbmNhdCguLi5mcmFtZXMpLnN1YnNjcmliZSgoZnJhbWU6IEV4dHJhY3RlZEZyYW1lKSA9PiBvYnNlcnZlci5uZXh0KGZyYW1lKSwgbnVsbCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB2aWRlb1BsYXllciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGNhbnZhcyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBFeHRyYWN0ZWRGcmFtZSB7XG4gICAgaW1hZ2U6IHN0cmluZztcbiAgICB3aWR0aDogbnVtYmVyO1xuICAgIGhlaWdodDogbnVtYmVyO1xuICAgIHRpbWU6IG51bWJlcjtcbn0iXX0=