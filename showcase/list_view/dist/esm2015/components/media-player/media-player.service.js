/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { Subject } from 'rxjs/Subject';
import { FrameExtractionService } from '../../services/frame-extraction/index';
export class MediaPlayerService {
    /**
     * @param {?} _frameExtractionService
     */
    constructor(_frameExtractionService) {
        this._frameExtractionService = _frameExtractionService;
        this.type = 'video';
        this.loaded = false;
        /*
                Create observables for media player events
            */
        this.playing = new BehaviorSubject(false);
        this.initEvent = new BehaviorSubject(false);
        this.abortEvent = new Subject();
        this.canPlayEvent = new BehaviorSubject(false);
        this.canPlayThroughEvent = new BehaviorSubject(false);
        this.durationChangeEvent = new Subject();
        this.endedEvent = new Subject();
        this.errorEvent = new Subject();
        this.loadedDataEvent = new Subject();
        this.loadedMetadataEvent = new Subject();
        this.loadStartEvent = new Subject();
        this.pauseEvent = new Subject();
        this.playEvent = new Subject();
        this.playingEvent = new Subject();
        this.rateChangeEvent = new Subject();
        this.seekedEvent = new Subject();
        this.seekingEvent = new Subject();
        this.stalledEvent = new Subject();
        this.suspendEvent = new Subject();
        this.timeUpdateEvent = new Subject();
        this.volumeChangeEvent = new Subject();
        this.waitingEvent = new Subject();
        this.mediaClickEvent = new Subject();
        this.fullscreenEvent = new BehaviorSubject(false);
        this.quietModeEvent = new BehaviorSubject(false);
        this.progressEvent = Observable.create((observer) => {
            // repeat until the whole video has fully loaded
            let /** @type {?} */ interval = setInterval(() => {
                let /** @type {?} */ buffered = /** @type {?} */ (this._mediaPlayer.buffered);
                observer.next(buffered);
                if (buffered.length === 1 && buffered.start(0) === 0 && buffered.end(0) === this.duration) {
                    observer.complete();
                    clearInterval(interval);
                }
            }, 1000);
        });
        this._fullscreen = false;
    }
    /**
     * @return {?}
     */
    get mediaPlayer() {
        return this._mediaPlayer;
    }
    /**
     * @return {?}
     */
    get quietMode() {
        return this._quietMode;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set quietMode(value) {
        // quiet mode cannot be enabled on audio player
        if (this.type === 'audio') {
            value = false;
        }
        this._quietMode = value;
        this.quietModeEvent.next(value);
    }
    /**
     * @return {?}
     */
    get mediaPlayerWidth() {
        return this._mediaPlayer ? this._mediaPlayer.offsetWidth : 0;
    }
    /**
     * @return {?}
     */
    get mediaPlayerHeight() {
        return this._mediaPlayer ? this._mediaPlayer.offsetHeight : 0;
    }
    /**
     * @return {?}
     */
    get audioTracks() {
        return this._mediaPlayer ? this._mediaPlayer.audioTracks : null;
    }
    /**
     * @return {?}
     */
    get autoplay() {
        return this._mediaPlayer ? this._mediaPlayer.autoplay : false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set autoplay(value) {
        this._mediaPlayer.autoplay = value;
    }
    /**
     * @return {?}
     */
    get buffered() {
        return this._mediaPlayer ? this._mediaPlayer.buffered : new TimeRanges();
    }
    /**
     * @return {?}
     */
    get crossOrigin() {
        return this._mediaPlayer ? this._mediaPlayer.crossOrigin : null;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set crossOrigin(value) {
        this._mediaPlayer.crossOrigin = value;
    }
    /**
     * @return {?}
     */
    get currentSrc() {
        return this._mediaPlayer ? this._mediaPlayer.currentSrc : null;
    }
    /**
     * @return {?}
     */
    get currentTime() {
        return this._mediaPlayer ? this._mediaPlayer.currentTime : 0;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set currentTime(value) {
        this._mediaPlayer.currentTime = value;
    }
    /**
     * @return {?}
     */
    get defaultMuted() {
        return this._mediaPlayer ? this._mediaPlayer.defaultMuted : false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set defaultMuted(value) {
        this._mediaPlayer.defaultMuted = value;
    }
    /**
     * @return {?}
     */
    get defaultPlaybackRate() {
        return this._mediaPlayer ? this._mediaPlayer.defaultPlaybackRate : 1;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set defaultPlaybackRate(value) {
        this._mediaPlayer.defaultPlaybackRate = value;
    }
    /**
     * @return {?}
     */
    get duration() {
        return this._mediaPlayer ? this._mediaPlayer.duration : 0;
    }
    /**
     * @return {?}
     */
    get ended() {
        return this._mediaPlayer ? this._mediaPlayer.ended : false;
    }
    /**
     * @return {?}
     */
    get loop() {
        return this._mediaPlayer ? this._mediaPlayer.loop : false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set loop(value) {
        this._mediaPlayer.loop = value;
    }
    /**
     * @return {?}
     */
    get muted() {
        return this._mediaPlayer ? this._mediaPlayer.muted : false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set muted(value) {
        this._mediaPlayer.muted = value;
    }
    /**
     * @return {?}
     */
    get networkState() {
        return this._mediaPlayer.networkState;
    }
    /**
     * @return {?}
     */
    get paused() {
        return this._mediaPlayer ? this._mediaPlayer.paused : true;
    }
    /**
     * @return {?}
     */
    get playbackRate() {
        return this._mediaPlayer ? this._mediaPlayer.playbackRate : 1;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set playbackRate(value) {
        this._mediaPlayer.playbackRate = value;
    }
    /**
     * @return {?}
     */
    get played() {
        return this._mediaPlayer ? this._mediaPlayer.played : new TimeRanges();
    }
    /**
     * @return {?}
     */
    get preload() {
        return this._mediaPlayer ? this._mediaPlayer.preload : 'auto';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set preload(value) {
        this._mediaPlayer.preload = value;
    }
    /**
     * @return {?}
     */
    get readyState() {
        return this._mediaPlayer ? this._mediaPlayer.readyState : 0;
    }
    /**
     * @return {?}
     */
    get seekable() {
        return this._mediaPlayer ? this._mediaPlayer.seekable : new TimeRanges();
    }
    /**
     * @return {?}
     */
    get seeking() {
        return this._mediaPlayer ? this._mediaPlayer.seeking : false;
    }
    /**
     * @return {?}
     */
    get src() {
        return this._mediaPlayer ? this._mediaPlayer.src : '';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set src(value) {
        this._mediaPlayer.src = value;
    }
    /**
     * @return {?}
     */
    get textTracks() {
        return this._mediaPlayer ? this._mediaPlayer.textTracks : new TextTrackList();
    }
    /**
     * @return {?}
     */
    get videoTracks() {
        return this._mediaPlayer ? this._mediaPlayer.videoTracks : new VideoTrackList();
    }
    /**
     * @return {?}
     */
    get volume() {
        return this._mediaPlayer ? this._mediaPlayer.volume : 1;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set volume(value) {
        this._mediaPlayer.volume = value;
    }
    /**
     * @return {?}
     */
    get fullscreen() {
        return this._mediaPlayer ? this._fullscreen : false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set fullscreen(value) {
        this._fullscreen = value;
        this.fullscreenEvent.next(value);
    }
    /**
     * @param {?} hostElement
     * @param {?} mediaPlayer
     * @return {?}
     */
    setMediaPlayer(hostElement, mediaPlayer) {
        this._hostElement = hostElement;
        this._mediaPlayer = mediaPlayer;
        this.initEvent.next(true);
    }
    /**
     * Toggle playing state
     * @return {?}
     */
    togglePlay() {
        // prevent any action is not loaded
        if (this.loaded === false) {
            return;
        }
        if (this.paused) {
            this.play();
        }
        else {
            this.pause();
        }
    }
    /**
     * Starts playing the audio/video
     * @return {?}
     */
    play() {
        this._mediaPlayer.play();
    }
    /**
     * Pauses the currently playing audio/video
     * @return {?}
     */
    pause() {
        this._mediaPlayer.pause();
    }
    /**
     * Re-loads the audio/video element
     * @return {?}
     */
    load() {
        this._mediaPlayer.load();
    }
    /**
     * Checks if the browser can play the specified audio/video type
     * @param {?} type
     * @return {?}
     */
    canPlayType(type) {
        return this._mediaPlayer.canPlayType(type);
    }
    /**
     * Adds a new text track to the audio/video
     * @param {?} kind
     * @param {?} label
     * @param {?} language
     * @return {?}
     */
    addTextTrack(kind, label, language) {
        return this._mediaPlayer.addTextTrack(kind, label, language);
    }
    /**
     * Attempt to display media in fullscreen mode
     * @return {?}
     */
    requestFullscreen() {
        if (this._hostElement.requestFullscreen) {
            this._hostElement.requestFullscreen();
        }
        else if (this._hostElement.webkitRequestFullscreen) {
            this._hostElement.webkitRequestFullscreen();
        }
        else if ((/** @type {?} */ (this._hostElement)).msRequestFullscreen) {
            (/** @type {?} */ (this._hostElement)).msRequestFullscreen();
        }
        else if ((/** @type {?} */ (this._hostElement)).mozRequestFullScreen) {
            (/** @type {?} */ (this._hostElement)).mozRequestFullScreen();
        }
    }
    /**
     * Exit full screen mode
     * @return {?}
     */
    exitFullscreen() {
        if ((/** @type {?} */ (this._hostElement)).exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        else if ((/** @type {?} */ (document)).msExitFullscreen) {
            (/** @type {?} */ (document)).msExitFullscreen();
        }
        else if ((/** @type {?} */ (document)).mozCancelFullScreen) {
            (/** @type {?} */ (document)).mozCancelFullScreen();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    fullscreenChange(event) {
        this.fullscreen = (/** @type {?} */ (document)).fullscreen || document.webkitIsFullScreen || (/** @type {?} */ (document)).mozFullScreen || (/** @type {?} */ (document)).msFullscreenElement !== null && (/** @type {?} */ (document)).msFullscreenElement !== undefined;
        this.fullscreenEvent.next(this.fullscreen);
    }
    /**
     * Toggle Fullscreen State
     * @return {?}
     */
    toggleFullscreen() {
        if (this.fullscreen) {
            this.exitFullscreen();
        }
        else {
            this.requestFullscreen();
        }
    }
    /**
     * Extract the frames from the video
     * @param {?} width
     * @param {?} height
     * @param {?} skip
     * @return {?}
     */
    getFrames(width, height, skip) {
        if (this.type === 'video') {
            return this._frameExtractionService.getFrameThumbnails(this.source, width, height, 0, this.duration, 10);
        }
        return from([]);
    }
}
MediaPlayerService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
MediaPlayerService.ctorParameters = () => [
    { type: FrameExtractionService, },
];
function MediaPlayerService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MediaPlayerService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MediaPlayerService.ctorParameters;
    /** @type {?} */
    MediaPlayerService.prototype.source;
    /** @type {?} */
    MediaPlayerService.prototype.type;
    /** @type {?} */
    MediaPlayerService.prototype.loaded;
    /** @type {?} */
    MediaPlayerService.prototype.playing;
    /** @type {?} */
    MediaPlayerService.prototype.initEvent;
    /** @type {?} */
    MediaPlayerService.prototype.abortEvent;
    /** @type {?} */
    MediaPlayerService.prototype.canPlayEvent;
    /** @type {?} */
    MediaPlayerService.prototype.canPlayThroughEvent;
    /** @type {?} */
    MediaPlayerService.prototype.durationChangeEvent;
    /** @type {?} */
    MediaPlayerService.prototype.endedEvent;
    /** @type {?} */
    MediaPlayerService.prototype.errorEvent;
    /** @type {?} */
    MediaPlayerService.prototype.loadedDataEvent;
    /** @type {?} */
    MediaPlayerService.prototype.loadedMetadataEvent;
    /** @type {?} */
    MediaPlayerService.prototype.loadStartEvent;
    /** @type {?} */
    MediaPlayerService.prototype.pauseEvent;
    /** @type {?} */
    MediaPlayerService.prototype.playEvent;
    /** @type {?} */
    MediaPlayerService.prototype.playingEvent;
    /** @type {?} */
    MediaPlayerService.prototype.rateChangeEvent;
    /** @type {?} */
    MediaPlayerService.prototype.seekedEvent;
    /** @type {?} */
    MediaPlayerService.prototype.seekingEvent;
    /** @type {?} */
    MediaPlayerService.prototype.stalledEvent;
    /** @type {?} */
    MediaPlayerService.prototype.suspendEvent;
    /** @type {?} */
    MediaPlayerService.prototype.timeUpdateEvent;
    /** @type {?} */
    MediaPlayerService.prototype.volumeChangeEvent;
    /** @type {?} */
    MediaPlayerService.prototype.waitingEvent;
    /** @type {?} */
    MediaPlayerService.prototype.mediaClickEvent;
    /** @type {?} */
    MediaPlayerService.prototype.fullscreenEvent;
    /** @type {?} */
    MediaPlayerService.prototype.quietModeEvent;
    /** @type {?} */
    MediaPlayerService.prototype.progressEvent;
    /** @type {?} */
    MediaPlayerService.prototype._mediaPlayer;
    /** @type {?} */
    MediaPlayerService.prototype._hostElement;
    /** @type {?} */
    MediaPlayerService.prototype._fullscreen;
    /** @type {?} */
    MediaPlayerService.prototype._quietMode;
    /** @type {?} */
    MediaPlayerService.prototype._frameExtractionService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEtcGxheWVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9tZWRpYS1wbGF5ZXIvbWVkaWEtcGxheWVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFNUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQWtCLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFJL0YsTUFBTTs7OztJQXNERixZQUFvQix1QkFBK0M7UUFBL0MsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF3QjtvQkFuRDNDLE9BQU87c0JBQ2IsS0FBSzs7Ozt1QkFLYSxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUM7eUJBQ2pDLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQzswQkFDN0MsSUFBSSxPQUFPLEVBQVE7NEJBQ04sSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDO21DQUM1QixJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUM7bUNBQzVDLElBQUksT0FBTyxFQUFVOzBCQUNoQyxJQUFJLE9BQU8sRUFBUTswQkFDcEIsSUFBSSxPQUFPLEVBQU87K0JBQ2IsSUFBSSxPQUFPLEVBQU87bUNBQ2QsSUFBSSxPQUFPLEVBQU87OEJBQ3RCLElBQUksT0FBTyxFQUFROzBCQUN2QixJQUFJLE9BQU8sRUFBUTt5QkFDcEIsSUFBSSxPQUFPLEVBQVE7NEJBQ2IsSUFBSSxPQUFPLEVBQVc7K0JBQ3BCLElBQUksT0FBTyxFQUFVOzJCQUN6QixJ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RUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDNUc7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ25COzs7WUFyVkosVUFBVTs7OztZQUhjLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgZnJvbSB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9mcm9tJztcbmltcG9ydCB7IE9ic2VydmVyIH0gZnJvbSAncnhqcy9PYnNlcnZlcic7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IEV4dHJhY3RlZEZyYW1lLCBGcmFtZUV4dHJhY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZnJhbWUtZXh0cmFjdGlvbi9pbmRleCc7XG5pbXBvcnQgeyBNZWRpYVBsYXllclR5cGUgfSBmcm9tICcuL21lZGlhLXBsYXllci5jb21wb25lbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWVkaWFQbGF5ZXJTZXJ2aWNlIHtcblxuICAgIHNvdXJjZTogc3RyaW5nO1xuICAgIHR5cGU6IE1lZGlhUGxheWVyVHlwZSA9ICd2aWRlbyc7XG4gICAgbG9hZGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKlxuICAgICAgICBDcmVhdGUgb2JzZXJ2YWJsZXMgZm9yIG1lZGlhIHBsYXllciBldmVudHNcbiAgICAqL1xuICAgIHBsYXlpbmc6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICAgIGluaXRFdmVudDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gICAgYWJvcnRFdmVudDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICAgY2FuUGxheUV2ZW50OiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgICBjYW5QbGF5VGhyb3VnaEV2ZW50OiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgICBkdXJhdGlvbkNoYW5nZUV2ZW50OiBTdWJqZWN0PG51bWJlcj4gPSBuZXcgU3ViamVjdDxudW1iZXI+KCk7XG4gICAgZW5kZWRFdmVudDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICAgZXJyb3JFdmVudDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICAgIGxvYWRlZERhdGFFdmVudDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICAgIGxvYWRlZE1ldGFkYXRhRXZlbnQ6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgICBsb2FkU3RhcnRFdmVudDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICAgcGF1c2VFdmVudDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICAgcGxheUV2ZW50OiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgICBwbGF5aW5nRXZlbnQ6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuICAgIHJhdGVDaGFuZ2VFdmVudDogU3ViamVjdDxudW1iZXI+ID0gbmV3IFN1YmplY3Q8bnVtYmVyPigpO1xuICAgIHNlZWtlZEV2ZW50OiBTdWJqZWN0PG51bWJlcj4gPSBuZXcgU3ViamVjdDxudW1iZXI+KCk7XG4gICAgc2Vla2luZ0V2ZW50OiBTdWJqZWN0PG51bWJlcj4gPSBuZXcgU3ViamVjdDxudW1iZXI+KCk7XG4gICAgc3RhbGxlZEV2ZW50OiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgICBzdXNwZW5kRXZlbnQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICAgIHRpbWVVcGRhdGVFdmVudDogU3ViamVjdDxudW1iZXI+ID0gbmV3IFN1YmplY3Q8bnVtYmVyPigpO1xuICAgIHZvbHVtZUNoYW5nZUV2ZW50OiBTdWJqZWN0PG51bWJlcj4gPSBuZXcgU3ViamVjdDxudW1iZXI+KCk7XG4gICAgd2FpdGluZ0V2ZW50OiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgICBtZWRpYUNsaWNrRXZlbnQ6IFN1YmplY3Q8TW91c2VFdmVudD4gPSBuZXcgU3ViamVjdDxNb3VzZUV2ZW50PigpO1xuICAgIGZ1bGxzY3JlZW5FdmVudDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gICAgcXVpZXRNb2RlRXZlbnQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICAgIHByb2dyZXNzRXZlbnQ6IE9ic2VydmFibGU8VGltZVJhbmdlcz4gPSBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFRpbWVSYW5nZXM+KSA9PiB7XG5cbiAgICAgICAgLy8gcmVwZWF0IHVudGlsIHRoZSB3aG9sZSB2aWRlbyBoYXMgZnVsbHkgbG9hZGVkXG4gICAgICAgIGxldCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcblxuICAgICAgICAgICAgbGV0IGJ1ZmZlcmVkID0gdGhpcy5fbWVkaWFQbGF5ZXIuYnVmZmVyZWQgYXMgVGltZVJhbmdlcztcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoYnVmZmVyZWQpO1xuXG4gICAgICAgICAgICBpZiAoYnVmZmVyZWQubGVuZ3RoID09PSAxICYmIGJ1ZmZlcmVkLnN0YXJ0KDApID09PSAwICYmIGJ1ZmZlcmVkLmVuZCgwKSA9PT0gdGhpcy5kdXJhdGlvbikge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEwMDApO1xuICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBfbWVkaWFQbGF5ZXI6IEhUTUxNZWRpYUVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBfaG9zdEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIHByaXZhdGUgX2Z1bGxzY3JlZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9xdWlldE1vZGU6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9mcmFtZUV4dHJhY3Rpb25TZXJ2aWNlOiBGcmFtZUV4dHJhY3Rpb25TZXJ2aWNlKSB7fVxuXG4gICAgLypcbiAgICAgICAgQ3JlYXRlIGFsbCB0aGUgZ2V0dGVycyBhbmQgc2V0dGVycyB0aGUgY2FuIGJlIHVzZWQgYnkgbWVkaWEgcGxheWVyIGV4dGVuc2lvbnNcbiAgICAqL1xuICAgIGdldCBtZWRpYVBsYXllcigpOiBIVE1MTWVkaWFFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyO1xuICAgIH1cblxuICAgIGdldCBxdWlldE1vZGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9xdWlldE1vZGU7XG4gICAgfVxuXG4gICAgc2V0IHF1aWV0TW9kZSh2YWx1ZTogYm9vbGVhbikge1xuXG4gICAgICAgIC8vIHF1aWV0IG1vZGUgY2Fubm90IGJlIGVuYWJsZWQgb24gYXVkaW8gcGxheWVyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdhdWRpbycpIHtcbiAgICAgICAgICAgIHZhbHVlID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9xdWlldE1vZGUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5xdWlldE1vZGVFdmVudC5uZXh0KHZhbHVlKTtcbiAgICB9XG5cbiAgICBnZXQgbWVkaWFQbGF5ZXJXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9tZWRpYVBsYXllci5vZmZzZXRXaWR0aCA6IDA7XG4gICAgfVxuXG4gICAgZ2V0IG1lZGlhUGxheWVySGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IHRoaXMuX21lZGlhUGxheWVyLm9mZnNldEhlaWdodCA6IDA7XG4gICAgfVxuXG4gICAgZ2V0IGF1ZGlvVHJhY2tzKCk6IEF1ZGlvVHJhY2tMaXN0IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyID8gdGhpcy5fbWVkaWFQbGF5ZXIuYXVkaW9UcmFja3MgOiBudWxsO1xuICAgIH1cblxuICAgIGdldCBhdXRvcGxheSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyID8gdGhpcy5fbWVkaWFQbGF5ZXIuYXV0b3BsYXkgOiBmYWxzZTtcbiAgICB9XG4gICAgc2V0IGF1dG9wbGF5KHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX21lZGlhUGxheWVyLmF1dG9wbGF5ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IGJ1ZmZlcmVkKCk6IFRpbWVSYW5nZXMge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9tZWRpYVBsYXllci5idWZmZXJlZCA6IG5ldyBUaW1lUmFuZ2VzKCk7XG4gICAgfVxuXG4gICAgZ2V0IGNyb3NzT3JpZ2luKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IHRoaXMuX21lZGlhUGxheWVyLmNyb3NzT3JpZ2luIDogbnVsbDtcbiAgICB9XG4gICAgc2V0IGNyb3NzT3JpZ2luKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fbWVkaWFQbGF5ZXIuY3Jvc3NPcmlnaW4gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgY3VycmVudFNyYygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9tZWRpYVBsYXllci5jdXJyZW50U3JjIDogbnVsbDtcbiAgICB9XG5cbiAgICBnZXQgY3VycmVudFRpbWUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyID8gdGhpcy5fbWVkaWFQbGF5ZXIuY3VycmVudFRpbWUgOiAwO1xuICAgIH1cbiAgICBzZXQgY3VycmVudFRpbWUodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9tZWRpYVBsYXllci5jdXJyZW50VGltZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBkZWZhdWx0TXV0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IHRoaXMuX21lZGlhUGxheWVyLmRlZmF1bHRNdXRlZCA6IGZhbHNlO1xuICAgIH1cbiAgICBzZXQgZGVmYXVsdE11dGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX21lZGlhUGxheWVyLmRlZmF1bHRNdXRlZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBkZWZhdWx0UGxheWJhY2tSYXRlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IHRoaXMuX21lZGlhUGxheWVyLmRlZmF1bHRQbGF5YmFja1JhdGUgOiAxO1xuICAgIH1cbiAgICBzZXQgZGVmYXVsdFBsYXliYWNrUmF0ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX21lZGlhUGxheWVyLmRlZmF1bHRQbGF5YmFja1JhdGUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgZHVyYXRpb24oKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyID8gdGhpcy5fbWVkaWFQbGF5ZXIuZHVyYXRpb24gOiAwO1xuICAgIH1cblxuICAgIGdldCBlbmRlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyID8gdGhpcy5fbWVkaWFQbGF5ZXIuZW5kZWQgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXQgbG9vcCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyID8gdGhpcy5fbWVkaWFQbGF5ZXIubG9vcCA6IGZhbHNlO1xuICAgIH1cbiAgICBzZXQgbG9vcCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9tZWRpYVBsYXllci5sb29wID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IG11dGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9tZWRpYVBsYXllci5tdXRlZCA6IGZhbHNlO1xuICAgIH1cbiAgICBzZXQgbXV0ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fbWVkaWFQbGF5ZXIubXV0ZWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgbmV0d29ya1N0YXRlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllci5uZXR3b3JrU3RhdGU7XG4gICAgfVxuXG4gICAgZ2V0IHBhdXNlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyID8gdGhpcy5fbWVkaWFQbGF5ZXIucGF1c2VkIDogdHJ1ZTtcbiAgICB9XG5cbiAgICBnZXQgcGxheWJhY2tSYXRlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IHRoaXMuX21lZGlhUGxheWVyLnBsYXliYWNrUmF0ZSA6IDE7XG4gICAgfVxuICAgIHNldCBwbGF5YmFja1JhdGUodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9tZWRpYVBsYXllci5wbGF5YmFja1JhdGUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgcGxheWVkKCk6IFRpbWVSYW5nZXMge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9tZWRpYVBsYXllci5wbGF5ZWQgOiBuZXcgVGltZVJhbmdlcygpO1xuICAgIH1cblxuICAgIGdldCBwcmVsb2FkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IHRoaXMuX21lZGlhUGxheWVyLnByZWxvYWQgOiAnYXV0byc7XG4gICAgfVxuICAgIHNldCBwcmVsb2FkKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fbWVkaWFQbGF5ZXIucHJlbG9hZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCByZWFkeVN0YXRlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IHRoaXMuX21lZGlhUGxheWVyLnJlYWR5U3RhdGUgOiAwO1xuICAgIH1cblxuICAgIGdldCBzZWVrYWJsZSgpOiBUaW1lUmFuZ2VzIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyID8gdGhpcy5fbWVkaWFQbGF5ZXIuc2Vla2FibGUgOiBuZXcgVGltZVJhbmdlcygpO1xuICAgIH1cblxuICAgIGdldCBzZWVraW5nKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9tZWRpYVBsYXllci5zZWVraW5nIDogZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0IHNyYygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9tZWRpYVBsYXllci5zcmMgOiAnJztcbiAgICB9XG4gICAgc2V0IHNyYyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX21lZGlhUGxheWVyLnNyYyA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCB0ZXh0VHJhY2tzKCk6IFRleHRUcmFja0xpc3Qge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9tZWRpYVBsYXllci50ZXh0VHJhY2tzIDogbmV3IFRleHRUcmFja0xpc3QoKTtcbiAgICB9XG5cbiAgICBnZXQgdmlkZW9UcmFja3MoKTogVmlkZW9UcmFja0xpc3Qge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9tZWRpYVBsYXllci52aWRlb1RyYWNrcyA6IG5ldyBWaWRlb1RyYWNrTGlzdCgpO1xuICAgIH1cblxuICAgIGdldCB2b2x1bWUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyID8gdGhpcy5fbWVkaWFQbGF5ZXIudm9sdW1lIDogMTtcbiAgICB9XG4gICAgc2V0IHZvbHVtZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX21lZGlhUGxheWVyLnZvbHVtZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBmdWxsc2NyZWVuKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9mdWxsc2NyZWVuIDogZmFsc2U7XG4gICAgfVxuICAgIHNldCBmdWxsc2NyZWVuKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2Z1bGxzY3JlZW4gPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5mdWxsc2NyZWVuRXZlbnQubmV4dCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgc2V0TWVkaWFQbGF5ZXIoaG9zdEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBtZWRpYVBsYXllcjogSFRNTE1lZGlhRWxlbWVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9ob3N0RWxlbWVudCA9IGhvc3RFbGVtZW50O1xuICAgICAgICB0aGlzLl9tZWRpYVBsYXllciA9IG1lZGlhUGxheWVyO1xuXG4gICAgICAgIHRoaXMuaW5pdEV2ZW50Lm5leHQodHJ1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlIHBsYXlpbmcgc3RhdGVcbiAgICAgKi9cbiAgICB0b2dnbGVQbGF5KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIHByZXZlbnQgYW55IGFjdGlvbiBpcyBub3QgbG9hZGVkXG4gICAgICAgIGlmICh0aGlzLmxvYWRlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnBhdXNlZCkge1xuICAgICAgICAgICAgdGhpcy5wbGF5KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdGFydHMgcGxheWluZyB0aGUgYXVkaW8vdmlkZW9cbiAgICAgKi9cbiAgICBwbGF5KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9tZWRpYVBsYXllci5wbGF5KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGF1c2VzIHRoZSBjdXJyZW50bHkgcGxheWluZyBhdWRpby92aWRlb1xuICAgICAqL1xuICAgIHBhdXNlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9tZWRpYVBsYXllci5wYXVzZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlLWxvYWRzIHRoZSBhdWRpby92aWRlbyBlbGVtZW50XG4gICAgICovXG4gICAgbG9hZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbWVkaWFQbGF5ZXIubG9hZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgYnJvd3NlciBjYW4gcGxheSB0aGUgc3BlY2lmaWVkIGF1ZGlvL3ZpZGVvIHR5cGVcbiAgICAgKi9cbiAgICBjYW5QbGF5VHlwZSh0eXBlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIuY2FuUGxheVR5cGUodHlwZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIG5ldyB0ZXh0IHRyYWNrIHRvIHRoZSBhdWRpby92aWRlb1xuICAgICAqL1xuICAgIGFkZFRleHRUcmFjayhraW5kOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcsIGxhbmd1YWdlOiBzdHJpbmcpOiBUZXh0VHJhY2sge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIuYWRkVGV4dFRyYWNrKGtpbmQsIGxhYmVsLCBsYW5ndWFnZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXR0ZW1wdCB0byBkaXNwbGF5IG1lZGlhIGluIGZ1bGxzY3JlZW4gbW9kZVxuICAgICAqL1xuICAgIHJlcXVlc3RGdWxsc2NyZWVuKCk6IHZvaWQge1xuXG4gICAgICAgIGlmICh0aGlzLl9ob3N0RWxlbWVudC5yZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgdGhpcy5faG9zdEVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ob3N0RWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgdGhpcy5faG9zdEVsZW1lbnQud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmICgoPGFueT50aGlzLl9ob3N0RWxlbWVudCkubXNSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgKDxhbnk+dGhpcy5faG9zdEVsZW1lbnQpLm1zUmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmICgoPGFueT50aGlzLl9ob3N0RWxlbWVudCkubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgICAgICg8YW55PnRoaXMuX2hvc3RFbGVtZW50KS5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXhpdCBmdWxsIHNjcmVlbiBtb2RlXG4gICAgICovXG4gICAgZXhpdEZ1bGxzY3JlZW4oKTogdm9pZCB7XG5cbiAgICAgICAgaWYgKCg8YW55PnRoaXMuX2hvc3RFbGVtZW50KS5leGl0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmICgoPGFueT5kb2N1bWVudCkubXNFeGl0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgKDxhbnk+ZG9jdW1lbnQpLm1zRXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmICgoPGFueT5kb2N1bWVudCkubW96Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgICAgICAgICAgKDxhbnk+ZG9jdW1lbnQpLm1vekNhbmNlbEZ1bGxTY3JlZW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bGxzY3JlZW5DaGFuZ2UoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuZnVsbHNjcmVlbiA9ICg8YW55PmRvY3VtZW50KS5mdWxsc2NyZWVuIHx8IGRvY3VtZW50LndlYmtpdElzRnVsbFNjcmVlbiB8fCAoPGFueT5kb2N1bWVudCkubW96RnVsbFNjcmVlbiB8fCAoPGFueT5kb2N1bWVudCkubXNGdWxsc2NyZWVuRWxlbWVudCAhPT0gbnVsbCAmJiAoPGFueT5kb2N1bWVudCkubXNGdWxsc2NyZWVuRWxlbWVudCAhPT0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmZ1bGxzY3JlZW5FdmVudC5uZXh0KHRoaXMuZnVsbHNjcmVlbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlIEZ1bGxzY3JlZW4gU3RhdGVcbiAgICAgKi9cbiAgICB0b2dnbGVGdWxsc2NyZWVuKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5mdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICB0aGlzLmV4aXRGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeHRyYWN0IHRoZSBmcmFtZXMgZnJvbSB0aGUgdmlkZW9cbiAgICAgKi9cbiAgICBnZXRGcmFtZXMod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHNraXA6IG51bWJlcik6IE9ic2VydmFibGU8RXh0cmFjdGVkRnJhbWU+IHtcblxuICAgICAgICBpZiAodGhpcy50eXBlID09PSAndmlkZW8nKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZnJhbWVFeHRyYWN0aW9uU2VydmljZS5nZXRGcmFtZVRodW1ibmFpbHModGhpcy5zb3VyY2UsIHdpZHRoLCBoZWlnaHQsIDAsIHRoaXMuZHVyYXRpb24sIDEwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmcm9tKFtdKTtcbiAgICB9XG59Il19