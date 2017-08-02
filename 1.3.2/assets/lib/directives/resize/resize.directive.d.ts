import { EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { ResizeService } from './resize.service';
import 'rxjs/add/operator/debounceTime';
export declare class ResizeDirective {
    private elementRef;
    private resizeService;
    private renderer;
    throttle: number;
    resize: EventEmitter<any>;
    constructor(elementRef: ElementRef, resizeService: ResizeService, renderer: Renderer2);
    ngOnInit(): void;
}
