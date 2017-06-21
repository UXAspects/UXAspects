import { ScrollIntoViewService } from './scroll-into-view.service';
import { ElementRef, OnChanges, SimpleChanges } from '@angular/core';
export declare class ScrollIntoViewIfDirective implements OnChanges {
    private element;
    private scrollIntoViewService;
    condition: boolean;
    scrollParent: ElementRef;
    constructor(element: ElementRef, scrollIntoViewService: ScrollIntoViewService);
    ngOnChanges(changes: SimpleChanges): void;
}
