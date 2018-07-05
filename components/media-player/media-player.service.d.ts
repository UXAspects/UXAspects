import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ExtractedFrame, FrameExtractionService } from '../../services/frame-extraction/index';
import { MediaPlayerType } from './media-player.component';
export declare class MediaPlayerService {
    private _frameExtractionService;
    source: string;
    type: MediaPlayerType;
    loaded: boolean;
    playing: BehaviorSubject<boolean>;
    initEvent: BehaviorSubject<boolean>;
    abortEvent: Subject<void>;
    canPlayEvent: BehaviorSubject<boolean>;
    canPlayThroughEvent: BehaviorSubject<boolean>;
    durationChangeEvent: Subject<number>;
    endedEvent: Subject<void>;
    errorEvent: Subject<any>;
    loadedDataEvent: Subject<any>;
    loadedMetadataEvent: Subject<any>;
    loadStartEvent: Subject<void>;
    pauseEvent: Subject<void>;
    playEvent: Subject<void>;
    playingEvent: Subject<boolean>;
    rateChangeEvent: Subject<number>;
    seekedEvent: Subject<number>;
    seekingEvent: Subject<number>;
    stalledEvent: Subject<void>;
    suspendEvent: Subject<void>;
    timeUpdateEvent: Subject<number>;
    volumeChangeEvent: Subject<number>;
    waitingEvent: Subject<void>;
    mediaClickEvent: Subject<MouseEvent>;
    fullscreenEvent: BehaviorSubject<boolean>;
    quietModeEvent: BehaviorSubject<boolean>;
    progressEvent: Observable<TimeRanges>;
    private _mediaPlayer;
    private _hostElement;
    private _fullscreen;
    private _quietMode;
    constructor(_frameExtractionService: FrameExtractionService);
    readonly mediaPlayer: HTMLMediaElement;
    quietMode: boolean;
    readonly mediaPlayerWidth: number;
    readonly mediaPlayerHeight: number;
    readonly audioTracks: AudioTrackList;
    autoplay: boolean;
    readonly buffered: TimeRanges;
    crossOrigin: string;
    readonly currentSrc: string;
    currentTime: number;
    defaultMuted: boolean;
    defaultPlaybackRate: number;
    readonly duration: number;
    readonly ended: boolean;
    loop: boolean;
    muted: boolean;
    readonly networkState: number;
    readonly paused: boolean;
    playbackRate: number;
    readonly played: TimeRanges;
    preload: string;
    readonly readyState: number;
    readonly seekable: TimeRanges;
    readonly seeking: boolean;
    src: string;
    readonly textTracks: TextTrackList;
    readonly videoTracks: VideoTrackList;
    volume: number;
    fullscreen: boolean;
    setMediaPlayer(hostElement: HTMLElement, mediaPlayer: HTMLMediaElement): void;
    /**
     * Toggle playing state
     */
    togglePlay(): void;
    /**
     * Starts playing the audio/video
     */
    play(): void;
    /**
     * Pauses the currently playing audio/video
     */
    pause(): void;
    /**
     * Re-loads the audio/video element
     */
    load(): void;
    /**
     * Checks if the browser can play the specified audio/video type
     */
    canPlayType(type: string): string;
    /**
     * Adds a new text track to the audio/video
     */
    addTextTrack(kind: string, label: string, language: string): TextTrack;
    /**
     * Attempt to display media in fullscreen mode
     */
    requestFullscreen(): void;
    /**
     * Exit full screen mode
     */
    exitFullscreen(): void;
    fullscreenChange(event: Event): void;
    /**
     * Toggle Fullscreen State
     */
    toggleFullscreen(): void;
    /**
     * Extract the frames from the video
     */
    getFrames(width: number, height: number, skip: number): Observable<ExtractedFrame>;
}
