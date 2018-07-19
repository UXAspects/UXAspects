import { AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AudioMetadata, AudioService } from '../../services/audio/index';
import { MediaPlayerService } from './media-player.service';
export declare class MediaPlayerComponent implements AfterViewInit, OnDestroy {
    mediaPlayerService: MediaPlayerService;
    private _audioService;
    private _elementRef;
    private _playerRef;
    hovering: boolean;
    audioMetadata: Observable<AudioMetadata>;
    source: string;
    type: MediaPlayerType;
    quietMode: boolean;
    private _onDestroy;
    constructor(mediaPlayerService: MediaPlayerService, _audioService: AudioService, _elementRef: ElementRef);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
export declare type MediaPlayerType = 'video' | 'audio';
export interface MediaPlayerBuffer {
    start: number;
    end: number;
}
