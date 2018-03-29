import { RendererFactory2 } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/fromEvent';
export declare class ResizeService {
    private _renderer;
    constructor(rendererFactory: RendererFactory2);
    addResizeListener(nativeElement: HTMLElement): Subject<ResizeDimensions>;
    private waitUntilReady(iframe, callback);
}
export interface ResizeDimensions {
    width: number;
    height: number;
}
