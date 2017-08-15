import { ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MediaPlayerService } from './media-player.service';
import { Observable } from 'rxjs/Observable';
import { AudioService, AudioMetadata } from '../../services/audio/index';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/switchMap';
export declare class MediaPlayerComponent implements AfterViewInit, OnDestroy {
    mediaPlayerService: MediaPlayerService;
    private _audioService;
    private _elementRef;
    private _playerRef;
    private _trackBarRef;
    hovering: boolean;
    audioMetadata: Observable<AudioMetadata>;
    private _hover$;
    private _clicked$;
    private _paused$;
    private _playing$;
    private _loading$;
    source: string;
    type: MediaPlayerType;
    quietMode: boolean;
    constructor(mediaPlayerService: MediaPlayerService, _audioService: AudioService, _elementRef: ElementRef);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
export declare type MediaPlayerType = 'video' | 'audio';
export interface MediaPlayerBuffer {
    start: number;
    end: number;
}
