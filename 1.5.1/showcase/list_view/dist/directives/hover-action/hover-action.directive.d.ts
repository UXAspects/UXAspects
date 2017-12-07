import { ElementRef, OnDestroy } from '@angular/core';
import { HoverActionService } from './hover-action.service';
export declare class HoverActionDirective implements OnDestroy {
    private _elementRef;
    private _hoverActionService;
    tabindex: number;
    active: boolean;
    focused: boolean;
    private active$;
    constructor(_elementRef: ElementRef, _hoverActionService: HoverActionService);
    ngOnDestroy(): void;
    focus(): void;
    onFocus(): void;
    onBlur(): void;
    previous(event: MouseEvent): void;
    next(event: MouseEvent): void;
}
