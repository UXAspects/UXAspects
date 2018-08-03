/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { ReplaySubject } from 'rxjs/ReplaySubject';
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
        this.initEvent = new ReplaySubject();
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
            const /** @type {?} */ interval = setInterval(() => {
                const /** @type {?} */ buffered = /** @type {?} */ (this._mediaPlayer.buffered);
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
        return this._mediaPlayer ? this._mediaPlayer.audioTracks : [];
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
        return this._mediaPlayer ? Array.from(this._mediaPlayer.textTracks) : [];
    }
    /**
     * @return {?}
     */
    get videoTracks() {
        return this._mediaPlayer ? Array.from(this._mediaPlayer.videoTracks) : [];
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
        if (this._mediaPlayer) {
            this._mediaPlayer.volume = value;
        }
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
     * @return {?}
     */
    fullscreenChange() {
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
    /**
     * @return {?}
     */
    hideSubtitleTracks() {
        for (let /** @type {?} */ index = 0; index < this.textTracks.length; index++) {
            this.textTracks[index].mode = 'hidden';
        }
    }
}
MediaPlayerService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MediaPlayerService.ctorParameters = () => [
    { type: FrameExtractionService }
];
function MediaPlayerService_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEtcGxheWVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9tZWRpYS1wbGF5ZXIvbWVkaWEtcGxheWVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFNUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFrQixzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBSS9GLE1BQU07Ozs7SUFzREYsWUFBb0IsdUJBQStDO1FBQS9DLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBd0I7b0JBbkQzQyxPQUFPO3NCQUNiLEtBQUs7Ozs7dUJBS2EsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDO3lCQUNuQyxJQUFJLGFBQWEsRUFBVzswQkFDcEMsSUFBSSxPQUFPLEVBQVE7NEJBQ04sSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDO21DQUM1QixJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUM7bUNBQzVDLElBQUksT0FBTyxFQUFVOzBCQUNoQyxJQUFJLE9BQU8sRUFBUTswQkFDcEIsSUFBSSxPQUFPLEVBQU87K0JBQ2IsSUFBSSxPQUFPLEVBQU87bUNBQ2QsSUFBSSxPQUFPLEVBQU87OEJBQ3RCLElBQUksT0FBTyxFQUFROzBCQUN2QixJQUFJLE9BQU8sRUFBUTt5QkFDcEIsSUFBSSxPQUFPLEVBQVE7NEJBQ2IsSUFBSSxPQUFPLEVB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VSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7U0FDMUM7S0FDSjs7O1lBN1ZKLFVBQVU7Ozs7WUFIYyxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IGZyb20gfSBmcm9tICdyeGpzL29ic2VydmFibGUvZnJvbSc7XG5pbXBvcnQgeyBPYnNlcnZlciB9IGZyb20gJ3J4anMvT2JzZXJ2ZXInO1xuaW1wb3J0IHsgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMvUmVwbGF5U3ViamVjdCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IEV4dHJhY3RlZEZyYW1lLCBGcmFtZUV4dHJhY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZnJhbWUtZXh0cmFjdGlvbi9pbmRleCc7XG5pbXBvcnQgeyBNZWRpYVBsYXllclR5cGUgfSBmcm9tICcuL21lZGlhLXBsYXllci5jb21wb25lbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWVkaWFQbGF5ZXJTZXJ2aWNlIHtcblxuICAgIHNvdXJjZTogc3RyaW5nO1xuICAgIHR5cGU6IE1lZGlhUGxheWVyVHlwZSA9ICd2aWRlbyc7XG4gICAgbG9hZGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKlxuICAgICAgICBDcmVhdGUgb2JzZXJ2YWJsZXMgZm9yIG1lZGlhIHBsYXllciBldmVudHNcbiAgICAqL1xuICAgIHBsYXlpbmc6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICAgIGluaXRFdmVudDogUmVwbGF5U3ViamVjdDxib29sZWFuPiA9IG5ldyBSZXBsYXlTdWJqZWN0PGJvb2xlYW4+KCk7XG4gICAgYWJvcnRFdmVudDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICAgY2FuUGxheUV2ZW50OiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgICBjYW5QbGF5VGhyb3VnaEV2ZW50OiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgICBkdXJhdGlvbkNoYW5nZUV2ZW50OiBTdWJqZWN0PG51bWJlcj4gPSBuZXcgU3ViamVjdDxudW1iZXI+KCk7XG4gICAgZW5kZWRFdmVudDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICAgZXJyb3JFdmVudDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICAgIGxvYWRlZERhdGFFdmVudDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICAgIGxvYWRlZE1ldGFkYXRhRXZlbnQ6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgICBsb2FkU3RhcnRFdmVudDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICAgcGF1c2VFdmVudDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICAgcGxheUV2ZW50OiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgICBwbGF5aW5nRXZlbnQ6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuICAgIHJhdGVDaGFuZ2VFdmVudDogU3ViamVjdDxudW1iZXI+ID0gbmV3IFN1YmplY3Q8bnVtYmVyPigpO1xuICAgIHNlZWtlZEV2ZW50OiBTdWJqZWN0PG51bWJlcj4gPSBuZXcgU3ViamVjdDxudW1iZXI+KCk7XG4gICAgc2Vla2luZ0V2ZW50OiBTdWJqZWN0PG51bWJlcj4gPSBuZXcgU3ViamVjdDxudW1iZXI+KCk7XG4gICAgc3RhbGxlZEV2ZW50OiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgICBzdXNwZW5kRXZlbnQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICAgIHRpbWVVcGRhdGVFdmVudDogU3ViamVjdDxudW1iZXI+ID0gbmV3IFN1YmplY3Q8bnVtYmVyPigpO1xuICAgIHZvbHVtZUNoYW5nZUV2ZW50OiBTdWJqZWN0PG51bWJlcj4gPSBuZXcgU3ViamVjdDxudW1iZXI+KCk7XG4gICAgd2FpdGluZ0V2ZW50OiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgICBtZWRpYUNsaWNrRXZlbnQ6IFN1YmplY3Q8TW91c2VFdmVudD4gPSBuZXcgU3ViamVjdDxNb3VzZUV2ZW50PigpO1xuICAgIGZ1bGxzY3JlZW5FdmVudDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gICAgcXVpZXRNb2RlRXZlbnQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICAgIHByb2dyZXNzRXZlbnQ6IE9ic2VydmFibGU8VGltZVJhbmdlcz4gPSBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFRpbWVSYW5nZXM+KSA9PiB7XG5cbiAgICAgICAgLy8gcmVwZWF0IHVudGlsIHRoZSB3aG9sZSB2aWRlbyBoYXMgZnVsbHkgbG9hZGVkXG4gICAgICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBidWZmZXJlZCA9IHRoaXMuX21lZGlhUGxheWVyLmJ1ZmZlcmVkIGFzIFRpbWVSYW5nZXM7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KGJ1ZmZlcmVkKTtcblxuICAgICAgICAgICAgaWYgKGJ1ZmZlcmVkLmxlbmd0aCA9PT0gMSAmJiBidWZmZXJlZC5zdGFydCgwKSA9PT0gMCAmJiBidWZmZXJlZC5lbmQoMCkgPT09IHRoaXMuZHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxMDAwKTtcbiAgICB9KTtcblxuICAgIHByaXZhdGUgX21lZGlhUGxheWVyOiBIVE1MTWVkaWFFbGVtZW50O1xuICAgIHByaXZhdGUgX2hvc3RFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBwcml2YXRlIF9mdWxsc2NyZWVuOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfcXVpZXRNb2RlOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZnJhbWVFeHRyYWN0aW9uU2VydmljZTogRnJhbWVFeHRyYWN0aW9uU2VydmljZSkgeyB9XG5cbiAgICAvKlxuICAgICAgICBDcmVhdGUgYWxsIHRoZSBnZXR0ZXJzIGFuZCBzZXR0ZXJzIHRoZSBjYW4gYmUgdXNlZCBieSBtZWRpYSBwbGF5ZXIgZXh0ZW5zaW9uc1xuICAgICovXG4gICAgZ2V0IG1lZGlhUGxheWVyKCk6IEhUTUxNZWRpYUVsZW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXI7XG4gICAgfVxuXG4gICAgZ2V0IHF1aWV0TW9kZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1aWV0TW9kZTtcbiAgICB9XG5cbiAgICBzZXQgcXVpZXRNb2RlKHZhbHVlOiBib29sZWFuKSB7XG5cbiAgICAgICAgLy8gcXVpZXQgbW9kZSBjYW5ub3QgYmUgZW5hYmxlZCBvbiBhdWRpbyBwbGF5ZXJcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ2F1ZGlvJykge1xuICAgICAgICAgICAgdmFsdWUgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3F1aWV0TW9kZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnF1aWV0TW9kZUV2ZW50Lm5leHQodmFsdWUpO1xuICAgIH1cblxuICAgIGdldCBtZWRpYVBsYXllcldpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IHRoaXMuX21lZGlhUGxheWVyLm9mZnNldFdpZHRoIDogMDtcbiAgICB9XG5cbiAgICBnZXQgbWVkaWFQbGF5ZXJIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyID8gdGhpcy5fbWVkaWFQbGF5ZXIub2Zmc2V0SGVpZ2h0IDogMDtcbiAgICB9XG5cbiAgICBnZXQgYXVkaW9UcmFja3MoKTogQXVkaW9UcmFja0xpc3QgfCBBcnJheTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyID8gdGhpcy5fbWVkaWFQbGF5ZXIuYXVkaW9UcmFja3MgOiBbXTtcbiAgICB9XG5cbiAgICBnZXQgYXV0b3BsYXkoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IHRoaXMuX21lZGlhUGxheWVyLmF1dG9wbGF5IDogZmFsc2U7XG4gICAgfVxuICAgIHNldCBhdXRvcGxheSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9tZWRpYVBsYXllci5hdXRvcGxheSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBidWZmZXJlZCgpOiBUaW1lUmFuZ2VzIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyID8gdGhpcy5fbWVkaWFQbGF5ZXIuYnVmZmVyZWQgOiBuZXcgVGltZVJhbmdlcygpO1xuICAgIH1cblxuICAgIGdldCBjcm9zc09yaWdpbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9tZWRpYVBsYXllci5jcm9zc09yaWdpbiA6IG51bGw7XG4gICAgfVxuICAgIHNldCBjcm9zc09yaWdpbih2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX21lZGlhUGxheWVyLmNyb3NzT3JpZ2luID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IGN1cnJlbnRTcmMoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyID8gdGhpcy5fbWVkaWFQbGF5ZXIuY3VycmVudFNyYyA6IG51bGw7XG4gICAgfVxuXG4gICAgZ2V0IGN1cnJlbnRUaW1lKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IHRoaXMuX21lZGlhUGxheWVyLmN1cnJlbnRUaW1lIDogMDtcbiAgICB9XG4gICAgc2V0IGN1cnJlbnRUaW1lKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fbWVkaWFQbGF5ZXIuY3VycmVudFRpbWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgZGVmYXVsdE11dGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9tZWRpYVBsYXllci5kZWZhdWx0TXV0ZWQgOiBmYWxzZTtcbiAgICB9XG4gICAgc2V0IGRlZmF1bHRNdXRlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9tZWRpYVBsYXllci5kZWZhdWx0TXV0ZWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgZGVmYXVsdFBsYXliYWNrUmF0ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9tZWRpYVBsYXllci5kZWZhdWx0UGxheWJhY2tSYXRlIDogMTtcbiAgICB9XG4gICAgc2V0IGRlZmF1bHRQbGF5YmFja1JhdGUodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9tZWRpYVBsYXllci5kZWZhdWx0UGxheWJhY2tSYXRlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IGR1cmF0aW9uKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IHRoaXMuX21lZGlhUGxheWVyLmR1cmF0aW9uIDogMDtcbiAgICB9XG5cbiAgICBnZXQgZW5kZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IHRoaXMuX21lZGlhUGxheWVyLmVuZGVkIDogZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0IGxvb3AoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IHRoaXMuX21lZGlhUGxheWVyLmxvb3AgOiBmYWxzZTtcbiAgICB9XG4gICAgc2V0IGxvb3AodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fbWVkaWFQbGF5ZXIubG9vcCA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBtdXRlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyID8gdGhpcy5fbWVkaWFQbGF5ZXIubXV0ZWQgOiBmYWxzZTtcbiAgICB9XG4gICAgc2V0IG11dGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX21lZGlhUGxheWVyLm11dGVkID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IG5ldHdvcmtTdGF0ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIubmV0d29ya1N0YXRlO1xuICAgIH1cblxuICAgIGdldCBwYXVzZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IHRoaXMuX21lZGlhUGxheWVyLnBhdXNlZCA6IHRydWU7XG4gICAgfVxuXG4gICAgZ2V0IHBsYXliYWNrUmF0ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9tZWRpYVBsYXllci5wbGF5YmFja1JhdGUgOiAxO1xuICAgIH1cbiAgICBzZXQgcGxheWJhY2tSYXRlKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fbWVkaWFQbGF5ZXIucGxheWJhY2tSYXRlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHBsYXllZCgpOiBUaW1lUmFuZ2VzIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyID8gdGhpcy5fbWVkaWFQbGF5ZXIucGxheWVkIDogbmV3IFRpbWVSYW5nZXMoKTtcbiAgICB9XG5cbiAgICBnZXQgcHJlbG9hZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9tZWRpYVBsYXllci5wcmVsb2FkIDogJ2F1dG8nO1xuICAgIH1cbiAgICBzZXQgcHJlbG9hZCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX21lZGlhUGxheWVyLnByZWxvYWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgcmVhZHlTdGF0ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9tZWRpYVBsYXllci5yZWFkeVN0YXRlIDogMDtcbiAgICB9XG5cbiAgICBnZXQgc2Vla2FibGUoKTogVGltZVJhbmdlcyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IHRoaXMuX21lZGlhUGxheWVyLnNlZWthYmxlIDogbmV3IFRpbWVSYW5nZXMoKTtcbiAgICB9XG5cbiAgICBnZXQgc2Vla2luZygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyID8gdGhpcy5fbWVkaWFQbGF5ZXIuc2Vla2luZyA6IGZhbHNlO1xuICAgIH1cblxuICAgIGdldCBzcmMoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyID8gdGhpcy5fbWVkaWFQbGF5ZXIuc3JjIDogJyc7XG4gICAgfVxuICAgIHNldCBzcmModmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9tZWRpYVBsYXllci5zcmMgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgdGV4dFRyYWNrcygpOiBBcnJheTxUZXh0VHJhY2s+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyID8gQXJyYXkuZnJvbSh0aGlzLl9tZWRpYVBsYXllci50ZXh0VHJhY2tzKSA6IFtdO1xuICAgIH1cblxuICAgIGdldCB2aWRlb1RyYWNrcygpOiBBcnJheTxWaWRlb1RyYWNrPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IEFycmF5LmZyb20odGhpcy5fbWVkaWFQbGF5ZXIudmlkZW9UcmFja3MpIDogW107XG4gICAgfVxuXG4gICAgZ2V0IHZvbHVtZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9tZWRpYVBsYXllci52b2x1bWUgOiAxO1xuICAgIH1cbiAgICBzZXQgdm9sdW1lKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuX21lZGlhUGxheWVyKSB7XG4gICAgICAgICAgICB0aGlzLl9tZWRpYVBsYXllci52b2x1bWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBmdWxsc2NyZWVuKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9mdWxsc2NyZWVuIDogZmFsc2U7XG4gICAgfVxuICAgIHNldCBmdWxsc2NyZWVuKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2Z1bGxzY3JlZW4gPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5mdWxsc2NyZWVuRXZlbnQubmV4dCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgc2V0TWVkaWFQbGF5ZXIoaG9zdEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBtZWRpYVBsYXllcjogSFRNTE1lZGlhRWxlbWVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9ob3N0RWxlbWVudCA9IGhvc3RFbGVtZW50O1xuICAgICAgICB0aGlzLl9tZWRpYVBsYXllciA9IG1lZGlhUGxheWVyO1xuXG4gICAgICAgIHRoaXMuaW5pdEV2ZW50Lm5leHQodHJ1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlIHBsYXlpbmcgc3RhdGVcbiAgICAgKi9cbiAgICB0b2dnbGVQbGF5KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIHByZXZlbnQgYW55IGFjdGlvbiBpcyBub3QgbG9hZGVkXG4gICAgICAgIGlmICh0aGlzLmxvYWRlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnBhdXNlZCkge1xuICAgICAgICAgICAgdGhpcy5wbGF5KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdGFydHMgcGxheWluZyB0aGUgYXVkaW8vdmlkZW9cbiAgICAgKi9cbiAgICBwbGF5KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9tZWRpYVBsYXllci5wbGF5KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGF1c2VzIHRoZSBjdXJyZW50bHkgcGxheWluZyBhdWRpby92aWRlb1xuICAgICAqL1xuICAgIHBhdXNlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9tZWRpYVBsYXllci5wYXVzZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlLWxvYWRzIHRoZSBhdWRpby92aWRlbyBlbGVtZW50XG4gICAgICovXG4gICAgbG9hZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbWVkaWFQbGF5ZXIubG9hZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgYnJvd3NlciBjYW4gcGxheSB0aGUgc3BlY2lmaWVkIGF1ZGlvL3ZpZGVvIHR5cGVcbiAgICAgKi9cbiAgICBjYW5QbGF5VHlwZSh0eXBlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIuY2FuUGxheVR5cGUodHlwZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIG5ldyB0ZXh0IHRyYWNrIHRvIHRoZSBhdWRpby92aWRlb1xuICAgICAqL1xuICAgIGFkZFRleHRUcmFjayhraW5kOiAnc3VidGl0bGVzJyB8ICdjYXB0aW9ucycgfCAnZGVzY3JpcHRpb25zJyB8ICdjaGFwdGVycycgfCAnbWV0YWRhdGEnLCBsYWJlbDogc3RyaW5nLCBsYW5ndWFnZTogc3RyaW5nKTogVGV4dFRyYWNrIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyLmFkZFRleHRUcmFjayhraW5kLCBsYWJlbCwgbGFuZ3VhZ2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEF0dGVtcHQgdG8gZGlzcGxheSBtZWRpYSBpbiBmdWxsc2NyZWVuIG1vZGVcbiAgICAgKi9cbiAgICByZXF1ZXN0RnVsbHNjcmVlbigpOiB2b2lkIHtcblxuICAgICAgICBpZiAodGhpcy5faG9zdEVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIHRoaXMuX2hvc3RFbGVtZW50LnJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5faG9zdEVsZW1lbnQud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIHRoaXMuX2hvc3RFbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoKDxhbnk+dGhpcy5faG9zdEVsZW1lbnQpLm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgICg8YW55PnRoaXMuX2hvc3RFbGVtZW50KS5tc1JlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoKDxhbnk+dGhpcy5faG9zdEVsZW1lbnQpLm1velJlcXVlc3RGdWxsU2NyZWVuKSB7XG4gICAgICAgICAgICAoPGFueT50aGlzLl9ob3N0RWxlbWVudCkubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4aXQgZnVsbCBzY3JlZW4gbW9kZVxuICAgICAqL1xuICAgIGV4aXRGdWxsc2NyZWVuKCk6IHZvaWQge1xuXG4gICAgICAgIGlmICgoPGFueT50aGlzLl9ob3N0RWxlbWVudCkuZXhpdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoKDxhbnk+ZG9jdW1lbnQpLm1zRXhpdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgICg8YW55PmRvY3VtZW50KS5tc0V4aXRGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoKDxhbnk+ZG9jdW1lbnQpLm1vekNhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgICAgICg8YW55PmRvY3VtZW50KS5tb3pDYW5jZWxGdWxsU2NyZWVuKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdWxsc2NyZWVuQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLmZ1bGxzY3JlZW4gPSAoPGFueT5kb2N1bWVudCkuZnVsbHNjcmVlbiB8fCBkb2N1bWVudC53ZWJraXRJc0Z1bGxTY3JlZW4gfHwgKDxhbnk+ZG9jdW1lbnQpLm1vekZ1bGxTY3JlZW4gfHwgKDxhbnk+ZG9jdW1lbnQpLm1zRnVsbHNjcmVlbkVsZW1lbnQgIT09IG51bGwgJiYgKDxhbnk+ZG9jdW1lbnQpLm1zRnVsbHNjcmVlbkVsZW1lbnQgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5mdWxsc2NyZWVuRXZlbnQubmV4dCh0aGlzLmZ1bGxzY3JlZW4pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZSBGdWxsc2NyZWVuIFN0YXRlXG4gICAgICovXG4gICAgdG9nZ2xlRnVsbHNjcmVlbigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZnVsbHNjcmVlbikge1xuICAgICAgICAgICAgdGhpcy5leGl0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXh0cmFjdCB0aGUgZnJhbWVzIGZyb20gdGhlIHZpZGVvXG4gICAgICovXG4gICAgZ2V0RnJhbWVzKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBza2lwOiBudW1iZXIpOiBPYnNlcnZhYmxlPEV4dHJhY3RlZEZyYW1lPiB7XG5cbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZyYW1lRXh0cmFjdGlvblNlcnZpY2UuZ2V0RnJhbWVUaHVtYm5haWxzKHRoaXMuc291cmNlLCB3aWR0aCwgaGVpZ2h0LCAwLCB0aGlzLmR1cmF0aW9uLCAxMCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnJvbShbXSk7XG4gICAgfVxuXG4gICAgaGlkZVN1YnRpdGxlVHJhY2tzKCk6IHZvaWQge1xuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy50ZXh0VHJhY2tzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgdGhpcy50ZXh0VHJhY2tzW2luZGV4XS5tb2RlID0gJ2hpZGRlbic7XG4gICAgICAgIH1cbiAgICB9XG59Il19