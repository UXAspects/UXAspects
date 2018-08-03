import { ElementRef, EventEmitter } from '@angular/core';
export declare class ClickOutsideDirective {
    private _elementRef;
    uxClickOutside: EventEmitter<MouseEvent>;
    /** Often a click event makes the element appear - if so we can end up closing it immediately */
    private _initialised;
    constructor(_elementRef: ElementRef);
    click(event: MouseEvent): void;
}
