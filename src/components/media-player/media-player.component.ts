import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { of } from 'rxjs/observable/of';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
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
        '[class.hover]': 'hovering',
        '[class.video]': 'type === "video"',
        '[class.audio]': 'type === "audio"',
        '(mouseenter)': 'hovering = true',
        '(mouseleave)': 'hovering = false',
        '(document:webkitfullscreenchange)': 'mediaPlayerService.fullscreenChange($event)',
        '(document:mozfullscreenchange)': 'mediaPlayerService.fullscreenChange($event)',
        '(document:MSFullscreenChange)': 'mediaPlayerService.fullscreenChange($event)'
    }
})
export class MediaPlayerComponent implements AfterViewInit, OnDestroy {

    @ViewChild('player') private _playerRef: ElementRef;

    hovering: boolean = false;
    audioMetadata: Observable<AudioMetadata>;
    controlBarVisible: boolean = false;

    get source(): string {
        return this.mediaPlayerService.source;
    }

    @Input()
    set source(value: string) {
        this.mediaPlayerService.source = value;
    }

    get type(): MediaPlayerType {
        return this.mediaPlayerService.type;
    }

    @Input()
    set type(value: MediaPlayerType) {
        this.mediaPlayerService.type = value;
    }

    get quietMode(): boolean {
        return this.mediaPlayerService.quietMode;
    }

    @Input()
    set quietMode(value: boolean) {
        this.mediaPlayerService.quietMode = value;
    }

    private _onDestroy = new Subject<void>();

    constructor(public mediaPlayerService: MediaPlayerService, private _audioService: AudioService, private _elementRef: ElementRef) {

        // show controls when hovering and in quiet mode
        fromEvent(this._elementRef.nativeElement, 'mousemove').pipe(
            switchMap((event: MouseEvent) => {
                this.hovering = true;
                return of(event);
            }),
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