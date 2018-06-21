import { Observable } from 'rxjs/Observable';
export declare class FrameExtractionService {
    private createVideoPlayer(source);
    private createCanvas(width, height);
    private goToFrame(videoPlayer, time);
    private getThumbnail(videoPlayer, canvas, time, width?, height?);
    getFrameThumbnail(source: string, width: number, height: number, time: number): Observable<ExtractedFrame>;
    getFrameThumbnails(source: string, width: number, height: number, start: number, end: number, skip?: number): Observable<ExtractedFrame>;
}
export interface ExtractedFrame {
    image: string;
    width: number;
    height: number;
    time: number;
}
