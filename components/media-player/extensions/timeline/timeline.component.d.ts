import { AfterViewInit, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { MediaPlayerBaseExtensionDirective } from '../base-extension.directive';
export declare class MediaPlayerTimelineExtensionComponent extends MediaPlayerBaseExtensionDirective implements OnInit, AfterViewInit, OnDestroy {
    thumb: ElementRef;
    timelineRef: ElementRef;
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
    private _onDestroy;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    updateScrub(event?: MouseEvent): void;
}
export interface MediaPlayerBuffered {
    start: number;
    end: number;
}
