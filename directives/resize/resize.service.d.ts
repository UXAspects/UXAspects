import { NgZone, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
export declare class ResizeService implements OnDestroy {
    private _zone;
    private _observer;
    private _targets;
    constructor(_zone: NgZone);
    ngOnDestroy(): void;
    addResizeListener(target: HTMLElement): ReplaySubject<ResizeDimensions>;
    removeResizeListener(target: HTMLElement): void;
    private elementDidResize(entries);
}
export interface ResizeDimensions {
    width: number;
    height: number;
}
