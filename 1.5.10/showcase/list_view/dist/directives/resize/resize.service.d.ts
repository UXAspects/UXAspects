import { OnDestroy, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export declare class ResizeService implements OnDestroy {
    private _renderer;
    private _subscription;
    constructor(rendererFactory: RendererFactory2);
    ngOnDestroy(): void;
    addResizeListener(nativeElement: HTMLElement): BehaviorSubject<ResizeDimensions>;
    private waitUntilReady(iframe, callback);
}
export interface ResizeDimensions {
    width: number;
    height: number;
}
