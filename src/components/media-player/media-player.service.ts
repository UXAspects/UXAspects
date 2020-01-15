import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, Observer, ReplaySubject, Subject } from 'rxjs';
import { ExtractedFrame, FrameExtractionService } from '../../services/frame-extraction/index';
import { MediaPlayerType } from './media-player.component';

@Injectable()
export class MediaPlayerService {

    source: string;
    type: MediaPlayerType = 'video';
    loaded: boolean = false;

    /*
        Create observables for media player events
    */
    playing: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    initEvent: ReplaySubject<boolean> = new ReplaySubject<boolean>();
    abortEvent: Subject<void> = new Subject<void>();
    canPlayEvent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    canPlayThroughEvent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    durationChangeEvent: Subject<number> = new Subject<number>();
    endedEvent: Subject<void> = new Subject<void>();
    errorEvent: Subject<any> = new Subject<any>();
    loadedDataEvent: Subject<any> = new Subject<any>();
    loadedMetadataEvent: Subject<any> = new Subject<any>();
    loadStartEvent: Subject<void> = new Subject<void>();
    pauseEvent: Subject<void> = new Subject<void>();
    playEvent: Subject<void> = new Subject<void>();
    playingEvent: Subject<boolean> = new Subject<boolean>();
    rateChangeEvent: Subject<number> = new Subject<number>();
    seekedEvent: Subject<number> = new Subject<number>();
    seekingEvent: Subject<number> = new Subject<number>();
    stalledEvent: Subject<void> = new Subject<void>();
    suspendEvent: Subject<void> = new Subject<void>();
    timeUpdateEvent: Subject<number> = new Subject<number>();
    volumeChangeEvent: Subject<number> = new Subject<number>();
    waitingEvent: Subject<void> = new Subject<void>();
    mediaClickEvent: Subject<MouseEvent> = new Subject<MouseEvent>();
    fullscreenEvent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    quietModeEvent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    progressEvent: Observable<TimeRanges> = Observable.create((observer: Observer<TimeRanges>) => {

        // repeat until the whole video has fully loaded
        const interval = setInterval(() => {

            const buffered = this._mediaPlayer.buffered as TimeRanges;
            observer.next(buffered);

            if (buffered.length === 1 && buffered.start(0) === 0 && buffered.end(0) === this.duration) {
                observer.complete();
                clearInterval(interval);
            }
        }, 1000);
    });

    private _mediaPlayer: HTMLMediaElement;
    private _hostElement: HTMLElement;
    private _fullscreen: boolean = false;
    private _quietMode: boolean;

    constructor(private _frameExtractionService: FrameExtractionService) { }

    /*
        Create all the getters and setters the can be used by media player extensions
    */
    get mediaPlayer(): HTMLMediaElement {
        return this._mediaPlayer;
    }

    get quietMode(): boolean {
        return this._quietMode;
    }

    set quietMode(value: boolean) {

        // quiet mode cannot be enabled on audio player
        if (this.type === 'audio') {
            value = false;
        }

        this._quietMode = value;
        this.quietModeEvent.next(value);
    }

    get mediaPlayerWidth(): number {
        return this._mediaPlayer ? this._mediaPlayer.offsetWidth : 0;
    }

    get mediaPlayerHeight(): number {
        return this._mediaPlayer ? this._mediaPlayer.offsetHeight : 0;
    }

    get audioTracks(): AudioTrackList | Array<any> {
        return this._mediaPlayer ? this._mediaPlayer.audioTracks : [];
    }

    get autoplay(): boolean {
        return this._mediaPlayer ? this._mediaPlayer.autoplay : false;
    }
    set autoplay(value: boolean) {
        this._mediaPlayer.autoplay = value;
    }

    get buffered(): TimeRanges {
        return this._mediaPlayer ? this._mediaPlayer.buffered : new TimeRanges();
    }

    get crossOrigin(): string {
        return this._mediaPlayer ? this._mediaPlayer.crossOrigin : null;
    }
    set crossOrigin(value: string) {
        this._mediaPlayer.crossOrigin = value;
    }

    get currentSrc(): string {
        return this._mediaPlayer ? this._mediaPlayer.currentSrc : null;
    }

    get currentTime(): number {
        return this._mediaPlayer ? this._mediaPlayer.currentTime : 0;
    }
    set currentTime(value: number) {
        this._mediaPlayer.currentTime = value;
    }

    get defaultMuted(): boolean {
        return this._mediaPlayer ? this._mediaPlayer.defaultMuted : false;
    }
    set defaultMuted(value: boolean) {
        this._mediaPlayer.defaultMuted = value;
    }

    get defaultPlaybackRate(): number {
        return this._mediaPlayer ? this._mediaPlayer.defaultPlaybackRate : 1;
    }
    set defaultPlaybackRate(value: number) {
        this._mediaPlayer.defaultPlaybackRate = value;
    }

    get duration(): number {
        return this._mediaPlayer && !isNaN(this.mediaPlayer.duration) ? this._mediaPlayer.duration : 0;
    }

    get ended(): boolean {
        return this._mediaPlayer ? this._mediaPlayer.ended : false;
    }

    get loop(): boolean {
        return this._mediaPlayer ? this._mediaPlayer.loop : false;
    }
    set loop(value: boolean) {
        this._mediaPlayer.loop = value;
    }

    get muted(): boolean {
        return this._mediaPlayer ? this._mediaPlayer.muted : false;
    }
    set muted(value: boolean) {
        this._mediaPlayer.muted = value;
    }

    get networkState(): number {
        return this._mediaPlayer.networkState;
    }

    get paused(): boolean {
        return this._mediaPlayer ? this._mediaPlayer.paused : true;
    }

    get playbackRate(): number {
        return this._mediaPlayer ? this._mediaPlayer.playbackRate : 1;
    }
    set playbackRate(value: number) {
        this._mediaPlayer.playbackRate = value;
    }

    get played(): TimeRanges {
        return this._mediaPlayer ? this._mediaPlayer.played : new TimeRanges();
    }

    get preload(): string {
        return this._mediaPlayer ? this._mediaPlayer.preload : 'auto';
    }
    set preload(value: string) {
        this._mediaPlayer.preload = value;
    }

    get readyState(): number {
        return this._mediaPlayer ? this._mediaPlayer.readyState : 0;
    }

    get seekable(): TimeRanges {
        return this._mediaPlayer ? this._mediaPlayer.seekable : new TimeRanges();
    }

    get seeking(): boolean {
        return this._mediaPlayer ? this._mediaPlayer.seeking : false;
    }

    get src(): string {
        return this._mediaPlayer ? this._mediaPlayer.src : '';
    }
    set src(value: string) {
        this._mediaPlayer.src = value;
    }

    get textTracks(): Array<TextTrack> {
        return this._mediaPlayer ? Array.from(this._mediaPlayer.textTracks) : [];
    }

    get videoTracks(): Array<VideoTrack> {
        return this._mediaPlayer ? Array.from(this._mediaPlayer.videoTracks) : [];
    }

    get volume(): number {
        return this._mediaPlayer ? this._mediaPlayer.volume : 1;
    }
    set volume(value: number) {
        if (this._mediaPlayer) {
            this._mediaPlayer.volume = value;
        }
    }

    get fullscreen(): boolean {
        return this._mediaPlayer ? this._fullscreen : false;
    }
    set fullscreen(value: boolean) {
        this._fullscreen = value;
        this.fullscreenEvent.next(value);
    }

    setMediaPlayer(hostElement: HTMLElement, mediaPlayer: HTMLMediaElement): void {
        this._hostElement = hostElement;
        this._mediaPlayer = mediaPlayer;

        this.initEvent.next(true);
    }

    /**
     * Toggle playing state
     */
    togglePlay(): void {

        // prevent any action is not loaded
        if (this.loaded === false) {
            return;
        }

        if (this.paused) {
            this.play();
        } else {
            this.pause();
        }
    }

    /**
     * Starts playing the audio/video
     */
    play(): void {
        this._mediaPlayer.play();
    }

    /**
     * Pauses the currently playing audio/video
     */
    pause(): void {
        this._mediaPlayer.pause();
    }

    /**
     * Re-loads the audio/video element
     */
    load(): void {
        this._mediaPlayer.load();
    }

    /**
     * Checks if the browser can play the specified audio/video type
     */
    canPlayType(type: string): string {
        return this._mediaPlayer.canPlayType(type);
    }

    /**
     * Adds a new text track to the audio/video
     */
    addTextTrack(kind: 'subtitles' | 'captions' | 'descriptions' | 'chapters' | 'metadata', label: string, language: string): TextTrack {
        return this._mediaPlayer.addTextTrack(kind, label, language);
    }

    /**
     * Attempt to display media in fullscreen mode
     */
    requestFullscreen(): void {

        // get the host element (we need to do some browser specific checks and typescript complains)
        const host = this._hostElement as any;
        const requestFullscreen = host.requestFullscreen || host.webkitRequestFullscreen || host.msRequestFullscreen || host.mozRequestFullScreen;

        // if we can perform the action then perform it and update the state
        if (requestFullscreen) {
            requestFullscreen.call(host);

            // update the internal state
            this.fullscreen = true;
        }
    }

    /**
     * Exit full screen mode
     */
    exitFullscreen(): void {

        // get the document element (we need to do some browser specific checks and typescript complains)
        const host = document as any;
        const exitFullscreen = host.exitFullscreen || host.webkitExitFullscreen || host.msExitFullscreen || host.mozCancelFullScreen;

        // if we can perform the action then perform it and update the state
        if (exitFullscreen) {
            exitFullscreen.call(host);

            // update the internal state
            this.fullscreen = false;
        }
    }

    /**
     * Toggle Fullscreen State
     */
    toggleFullscreen(): void {
        if (this.fullscreen) {
            this.exitFullscreen();
        } else {
            this.requestFullscreen();
        }
    }

    fullscreenChange(): void {
        // get the document element (we need to do some browser specific checks and typescript complains)
        const host = document as any;

        // set the fullscreen state (this also emits the event)
        this.fullscreen = host.fullscreen || host.webkitIsFullScreen || host.mozFullScreen || host.msFullscreenElement !== null && host.msFullscreenElement !== undefined;
    }

    /**
     * Extract the frames from the video
     */
    getFrames(width: number, height: number, skip: number): Observable<ExtractedFrame> {

        if (this.type === 'video') {
            return this._frameExtractionService.getFrameThumbnails(this.source, width, height, 0, this.duration, 10);
        }

        return from([]);
    }

    hideSubtitleTracks(): void {
        for (let index = 0; index < this.textTracks.length; index++) {
            this.textTracks[index].mode = 'hidden';
        }
    }
}