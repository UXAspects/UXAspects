import { FocusMonitor } from '@angular/cdk/a11y';
import { ElementRef, EventEmitter, NgZone, OnDestroy } from '@angular/core';
export declare class FocusWithinDirective implements OnDestroy {
    private _elementRef;
    private _focusMonitor;
    uxFocusWithin: EventEmitter<void>;
    uxBlurWithin: EventEmitter<void>;
    constructor(_elementRef: ElementRef, _focusMonitor: FocusMonitor, ngZone: NgZone);
    ngOnDestroy(): void;
}
