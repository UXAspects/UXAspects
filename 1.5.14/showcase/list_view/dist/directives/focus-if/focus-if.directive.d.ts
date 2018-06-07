import { ElementRef } from '@angular/core';
export declare class FocusIfDirective {
    private _elementRef;
    focusIfDelay: number;
    focusIf: boolean;
    private _timeout;
    constructor(_elementRef: ElementRef);
}
