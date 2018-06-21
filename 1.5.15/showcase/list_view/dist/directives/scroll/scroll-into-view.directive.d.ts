import { AfterViewInit, ElementRef } from '@angular/core';
export declare class ScrollIntoViewDirective implements AfterViewInit {
    private _elementRef;
    /** Allow a condition around whether or not this should scroll into view */
    uxScrollIntoView: boolean;
    /** Allow user to provide the browser supported options */
    scrollIntoViewOptions: ScrollIntoViewOptions | boolean;
    constructor(_elementRef: ElementRef);
    ngAfterViewInit(): void;
}
