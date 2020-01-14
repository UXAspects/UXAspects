import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';
import { AudioMetadata, AudioService } from '../../services/audio/index';
import { MediaPlayerService } from './media-player.service';

@Component({
    selector: 'ux-media-player',
    templateUrl: './media-player.component.html',
    providers: [MediaPlayerService],
    host: {
        '(keydown.Space)': 'mediaPlayerService.togglePlay(); $event.preventDefault()',
        '[class.standard]': '!mediaPlayerService.fullscreen',
        '[class.fullscreen]': 'mediaPlayerService.fullscreen',
        '[class.quiet]': 'quietMode && type === "video" || mediaPlayerService.fullscreen',
        '[class.hover]': 'hovering || focused',
        '[class.video]': 'type === "video"',
        '[class.audio]': 'type === "audio"',
        '(mouseenter)': 'hovering = true',
        '(mouseleave)': 'hovering = false',
        '(document:fullscreenchange)': 'mediaPlayerService.fullscreenChange()',
        '(document:webkitfullscreenchange)': 'mediaPlayerService.fullscreenChange()',
        '(document:mozfullscreenchange)': 'mediaPlayerService.fullscreenChange()',
        '(document:MSFullscreenChange)': 'mediaPlayerService.fullscreenChange()'
    }
})
export class MediaPlayerComponent implements AfterViewInit, OnDestroy {

    @ViewChild('player', { static: false }) private _playerRef: ElementRef;

    hovering: boolean = false;
    focused: boolean = false;
    audioMetadata: Observable<AudioMetadata>;

    /** The `anonymous` keyword means that there will be no exchange of user credentials when the media source is fetched. */
    @Input() crossorigin: 'use-credentials' | 'anonymous' = 'use-credentials';

    /** Overwrite the filename displayed in the audio media player */
    @Input()
    filename: string;

    get source(): string {
        return this.mediaPlayerService.source;
    }

    /** The url to the media file to be loaded by the media player. */
    @Input()
    set source(value: string) {
        this.mediaPlayerService.source = value;
    }

    get type(): MediaPlayerType {
        return this.mediaPlayerService.type;
    }

    /**
     * Defines the appearance of the media player. The two possible values are `video` and `audio`.
     * The media player will adapt it's appearance to best suit the type specified.
     */
    @Input()
    set type(value: MediaPlayerType) {
        this.mediaPlayerService.type = value;
    }

    get quietMode(): boolean {
        return this.mediaPlayerService.quietMode;
    }

    /**
     * If enabled, the controls in the media player will be hidden unless the mouse is over the player and will appear in a darker style.
     * Dark mode is automatically enabled in full screen mode. Quiet mode is only available for videos.
     */
    @Input()
    set quietMode(value: boolean) {
        this.mediaPlayerService.quietMode = value;
    }

    private _onDestroy = new Subject<void>();

    constructor(public mediaPlayerService: MediaPlayerService, private _audioService: AudioService, private _elementRef: ElementRef) {

        // show controls when hovering and in quiet mode
        fromEvent(this._elementRef.nativeElement, 'mousemove').pipe(
            tap(() => this.hovering = true),
            debounceTime(2000),
            takeUntil(this._onDestroy)
        ).subscribe(() => this.hovering = false);
    }

    ngAfterViewInit(): void {
        this.mediaPlayerService.setMediaPlayer(this._elementRef.nativeElement, this._playerRef.nativeElement);

        this.audioMetadata = this._audioService.getAudioFileMetadata(this._playerRef.nativeElement);
        this.mediaPlayerService.playingEvent.pipe(takeUntil(this._onDestroy)).subscribe(() => this.mediaPlayerService.playing.next(true));
        this.mediaPlayerService.pauseEvent.pipe(takeUntil(this._onDestroy)).subscribe(() => this.mediaPlayerService.playing.next(false));
        this.mediaPlayerService.mediaClickEvent.pipe(takeUntil(this._onDestroy)).subscribe(() => this.mediaPlayerService.togglePlay());
        this.mediaPlayerService.loadedMetadataEvent.pipe(takeUntil(this._onDestroy)).subscribe(() => this.mediaPlayerService.loaded = true);

        // initially hide all text tracks
        this.mediaPlayerService.hideSubtitleTracks();
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}

export type MediaPlayerType = 'video' | 'audio';

export interface MediaPlayerBuffer {
    start: number;
    end: number;
}