import { OnInit, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MediaPlayerBaseExtensionDirective } from '../base-extension.directive';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/fromEvent';
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
    private _mouseEventSubscription;
    scrub: {
        visible: boolean;
        position: number;
        time: number;
    };
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    updateScrub(event?: MouseEvent): void;
}
export interface MediaPlayerBuffered {
    start: number;
    end: number;
}
