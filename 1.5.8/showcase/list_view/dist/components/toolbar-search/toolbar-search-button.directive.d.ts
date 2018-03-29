import { EventEmitter, ElementRef } from '@angular/core';
export declare class ToolbarSearchButtonDirective {
    private _elementRef;
    clicked: EventEmitter<void>;
    readonly width: number;
    constructor(_elementRef: ElementRef);
    clickHandler(): void;
}
