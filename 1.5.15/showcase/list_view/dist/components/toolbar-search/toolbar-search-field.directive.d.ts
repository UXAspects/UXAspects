import { ElementRef, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';
export declare class ToolbarSearchFieldDirective {
    private _elementRef;
    private _ngModel;
    cancel: EventEmitter<void>;
    submit: EventEmitter<string>;
    readonly text: string;
    constructor(_elementRef: ElementRef, _ngModel: NgModel);
    focus(): void;
    blur(): void;
    clear(): void;
    keydownHandler(event: KeyboardEvent): void;
}
