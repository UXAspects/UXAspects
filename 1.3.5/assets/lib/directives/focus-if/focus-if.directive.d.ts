import { OnChanges, SimpleChanges, ElementRef } from '@angular/core';
export declare class FocusIfDirective implements OnChanges {
    private elementRef;
    focusIf: boolean;
    constructor(elementRef: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
}
