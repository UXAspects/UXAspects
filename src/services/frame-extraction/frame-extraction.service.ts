import { Injectable } from '@angular/core';
import { concat, fromEvent, Observable, Observer } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FrameExtractionService {

    private createVideoPlayer(source: string): HTMLVideoElement {
        let videoPlayer = document.createElement('video');
        videoPlayer.preload = 'auto';
        videoPlayer.src = source;
        return videoPlayer;
    }

    private createCanvas(width: number, height: number): HTMLCanvasElement {
        let canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        return canvas;
    }

    private goToFrame(videoPlayer: HTMLVideoElement, time: number): Observable<Event> {
        videoPlayer.currentTime = time;
        return fromEvent(videoPlayer, time === 0 ? 'loadeddata' : 'seeked');
    }

    private getThumbnail(videoPlayer: HTMLVideoElement, canvas: HTMLCanvasElement, time: number, width: number = 160, height: number = 90): Observable<ExtractedFrame> {

        return Observable.create((observer: Observer<ExtractedFrame>) => {

            // go to specified frame
            let subscription = this.goToFrame(videoPlayer, time).subscribe(() => {
                // create image from current frame
                canvas.getContext('2d').drawImage(videoPlayer, 0, 0, width, height);
                observer.next({ image: canvas.toDataURL(), width: width, height: height, time: time });
                observer.complete();
                subscription.unsubscribe();
            });
        });
    }

    getFrameThumbnail(source: string, width: number, height: number, time: number): Observable<ExtractedFrame> {

        // create required elements
        let videoPlayer = this.createVideoPlayer(source);
        let canvas = this.createCanvas(width, height);

        let frameSubscription = this.getThumbnail(videoPlayer, canvas, time, width, height);

        // ensure we release memory after we are finished
        frameSubscription.subscribe(null, null, () => {
            videoPlayer = null;
            canvas = null;
        });

        return frameSubscription;
    }

    getFrameThumbnails(source: string, width: number, height: number, start: number, end: number, skip: number = 5): Observable<ExtractedFrame> {

        // create required elements
        let videoPlayer = this.createVideoPlayer(source);
        let canvas = this.createCanvas(width, height);

        return Observable.create((observer: Observer<ExtractedFrame>) => {

            fromEvent(videoPlayer, 'loadedmetadata').subscribe(() => {

                // calculate the frames required
                let frames = [];

                for (let idx = start; idx < end; idx += skip) {
                    frames.push(this.getThumbnail(videoPlayer, canvas, idx, width, height));
                }

                concat(...frames).subscribe((frame: ExtractedFrame) => observer.next(frame), null, () => {
                    videoPlayer = null;
                    canvas = null;
                    observer.complete();
                });
            });

        });
    }

}

export interface ExtractedFrame {
    image: string;
    width: number;
    height: number;
    time: number;
}
