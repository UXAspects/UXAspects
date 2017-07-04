import { OnInit, ElementRef } from '@angular/core';
import { MediaPlayerBaseExtensionDirective } from '../base-extension.directive';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
export declare class MediaPlayerTimelineExtensionComponent extends MediaPlayerBaseExtensionDirective implements OnInit {
    current: number;
    position: number;
    duration: number;
    buffered: MediaPlayerBuffered[];
    mouseDown: boolean;
    quietMode: boolean;
    fullscreen: boolean;
    scrub: {
        visible: boolean;
        position: number;
        time: number;
    };
    timelineRef: ElementRef;
    ngOnInit(): void;
    updateScrub(event?: MouseEvent): void;
}
export interface MediaPlayerBuffered {
    start: number;
    end: number;
}
