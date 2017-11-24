import { EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { ResizeService, ResizeDimensions } from './resize.service';
import 'rxjs/add/operator/debounceTime';
export declare class ResizeDirective {
    private _elementRef;
    private _resizeService;
    private _renderer;
    throttle: number;
    resize: EventEmitter<ResizeDimensions>;
    constructor(_elementRef: ElementRef, _resizeService: ResizeService, _renderer: Renderer2);
    ngOnInit(): void;
}
