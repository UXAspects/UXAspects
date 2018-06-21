import { AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
export declare class AutoGrowDirective implements AfterViewInit {
    private _elementRef;
    private _renderer;
    constructor(_elementRef: ElementRef, _renderer: Renderer2);
    ngAfterViewInit(): void;
    update(): void;
}
