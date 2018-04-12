import { EventEmitter, ElementRef, NgZone, OnInit } from '@angular/core';
import { ResizeService, ResizeDimensions } from './resize.service';
export declare class ResizeDirective implements OnInit {
    private _elementRef;
    private _resizeService;
    private _ngZone;
    throttle: number;
    uxResize: EventEmitter<ResizeDimensions>;
    constructor(_elementRef: ElementRef, _resizeService: ResizeService, _ngZone: NgZone);
    ngOnInit(): void;
}
