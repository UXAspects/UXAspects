import { ElementRef, EventEmitter, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ResizeDimensions, ResizeService } from './resize.service';
export declare class ResizeDirective implements OnInit, OnDestroy {
    private _elementRef;
    private _resizeService;
    private _ngZone;
    throttle: number;
    uxResize: EventEmitter<ResizeDimensions>;
    private _subscription;
    constructor(_elementRef: ElementRef, _resizeService: ResizeService, _ngZone: NgZone);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
