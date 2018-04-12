import { ElementRef, OnDestroy } from '@angular/core';
import { HoverActionService } from './hover-action.service';
export declare class HoverActionContainerDirective implements OnDestroy {
    private _elementRef;
    private _hoverActionService;
    tabindex: number;
    active: boolean;
    private active$;
    constructor(_elementRef: ElementRef, _hoverActionService: HoverActionService);
    ngOnDestroy(): void;
    focus(): void;
    onFocus(): void;
    onBlur(): void;
    onHover(): void;
    onLeave(): void;
    next(): void;
}
