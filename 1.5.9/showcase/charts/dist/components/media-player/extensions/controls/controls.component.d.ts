import { OnInit, ElementRef } from '@angular/core';
import { MediaPlayerBaseExtensionDirective } from '../base-extension.directive';
import 'rxjs/add/observable/timer';
export declare class MediaPlayerControlsExtensionComponent extends MediaPlayerBaseExtensionDirective implements OnInit {
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
    volume: number;
    ngOnInit(): void;
    toggleMute(): void;
    togglePlay(): void;
    setFullscreen(): void;
    goToStart(): void;
    goToEnd(): void;
    dragStart(event: MouseEvent): void;
    dragMove(event: MouseEvent): void;
    dragEnd(): void;
}
