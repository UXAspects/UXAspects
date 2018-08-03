import { OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { SliderOptions } from '../../../slider/index';
import { MediaPlayerBaseExtensionDirective } from '../base-extension.directive';
export declare class MediaPlayerControlsExtensionComponent extends MediaPlayerBaseExtensionDirective implements OnInit, OnDestroy {
    volumeActive: boolean;
    volumeFocus: boolean;
    returnFocus: boolean;
    subtitlesId: string;
    subtitlesOpen: boolean;
    mouseEnterVolume: Subject<void>;
    mouseLeaveVolume: Subject<void>;
    options: SliderOptions;
    private _volume;
    private _previousVolume;
    private _onDestroy;
    volume: number;
    ngOnInit(): void;
    ngOnDestroy(): void;
    toggleMute(): void;
    goToStart(): void;
    goToEnd(): void;
    isSubtitleActive(): boolean;
    setSubtitleTrack(track: TextTrack): void;
    getSubtitleTrack(): string;
}
