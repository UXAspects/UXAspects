import { EventEmitter, ElementRef } from '@angular/core';
export declare class ClickOutsideDirective {
    private _elementRef;
    uxClickOutside: EventEmitter<MouseEvent>;
    constructor(_elementRef: ElementRef);
    click(event: MouseEvent): void;
}
