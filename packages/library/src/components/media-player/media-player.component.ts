import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ExtractedFrame, FrameExtractionService } from '../../services/frame-extraction/frame-extraction.service';
import { MediaPlayerService } from './media-player.service';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { AudioService, AudioMetadata } from '../../services/audio/index';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'ux-media-player',
    templateUrl: './media-player.component.html',
    styleUrls: ['./media-player.component.less'],
    encapsulation: ViewEncapsulation.None,
    providers: [ MediaPlayerService ],
    host: {
        'tabindex': '0',
        '(keydown.Space)': 'mediaPlayerService.togglePlay()',
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
    @ViewChild('trackBar') private _trackBarRef: ElementRef;

    hovering: boolean = false;
    audioMetadata: Observable<AudioMetadata>;
    
    private _hover$: Subscription;
    private _clicked$: Subscription;
    private _paused$: Subscription;
    private _playing$: Subscription;
    private _loading$: Subscription;

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

    constructor(public mediaPlayerService: MediaPlayerService, private _audioService: AudioService, private _elementRef: ElementRef) {

        // show controls when hovering and in quiet mode
        this._hover$ = Observable.fromEvent(this._elementRef.nativeElement, 'mousemove').switchMap((event: MouseEvent) => {
            this.hovering = true;         
            return Observable.of(event);
        }).debounceTime(2000).subscribe(() => this.hovering = false);
    }

    ngAfterViewInit(): void {
        this.mediaPlayerService.setMediaPlayer(this._elementRef.nativeElement, this._playerRef.nativeElement);

        this.audioMetadata = this._audioService.getAudioFileMetadata(this._playerRef.nativeElement);
        this._playing$ = this.mediaPlayerService.playingEvent.subscribe(event => this.mediaPlayerService.playing.next(true));
        this._paused$ = this.mediaPlayerService.pauseEvent.subscribe(event => this.mediaPlayerService.playing.next(false));
        this._clicked$ = this.mediaPlayerService.mediaClickEvent.subscribe(() => this.mediaPlayerService.togglePlay());
        this._loading$ = this.mediaPlayerService.loadedMetadataEvent.subscribe(() => this.mediaPlayerService.loaded = true);
    }

    ngOnDestroy(): void {
        this._hover$.unsubscribe();
        this._playing$.unsubscribe();
        this._paused$.unsubscribe();
        this._clicked$.unsubscribe();
        this._loading$.unsubscribe();
    }
}

export type MediaPlayerType = 'video' | 'audio';

export interface MediaPlayerBuffer {
    start: number;
    end: number;
}