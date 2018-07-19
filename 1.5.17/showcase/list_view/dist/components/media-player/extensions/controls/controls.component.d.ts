import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { MediaPlayerBaseExtensionDirective } from '../base-extension.directive';
export declare class MediaPlayerControlsExtensionComponent extends MediaPlayerBaseExtensionDirective implements OnInit, OnDestroy {
    playing: boolean;
    quietMode: boolean;
    fullscreen: boolean;
    volumeActive: boolean;
    volumeDragging: boolean;
    volumeIcon: ElementRef;
    volumeSlider: ElementRef;
    volumeContainer: ElementRef;
    private _volume;
    private _previousVolume;
    private _onDestroy;
    volume: number;
    ngOnInit(): void;
    ngOnDestroy(): void;
    toggleMute(): void;
    togglePlay(): void;
    setFullscreen(): void;
    goToStart(): void;
    goToEnd(): void;
    dragStart(event: MouseEvent): void;
    dragMove(event: MouseEvent): void;
    dragEnd(): void;
}
