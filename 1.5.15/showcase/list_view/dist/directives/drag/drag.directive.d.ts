import { ElementRef, EventEmitter, NgZone, OnDestroy } from '@angular/core';
export declare class DragDirective implements OnDestroy {
    dragstart: EventEmitter<MouseEvent>;
    drag: EventEmitter<MouseEvent>;
    dragend: EventEmitter<void>;
    private _subscription;
    constructor(elementRef: ElementRef, ngZone: NgZone);
    ngOnDestroy(): void;
}
