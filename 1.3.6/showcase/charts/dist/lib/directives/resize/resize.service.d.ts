import { Renderer2 } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/fromEvent';
export declare class ResizeService {
    addResizeListener(nativeElement: HTMLElement, renderer: Renderer2): Subject<any>;
    private waitUntilReady(iframe, callback);
}
export interface ResizeDimensions {
    width: number;
    height: number;
}
