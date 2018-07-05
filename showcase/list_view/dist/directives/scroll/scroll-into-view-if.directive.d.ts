import { ElementRef, OnChanges } from '@angular/core';
import { ScrollIntoViewService } from './scroll-into-view.service';
export declare class ScrollIntoViewIfDirective implements OnChanges {
    private _element;
    private _scrollIntoViewService;
    condition: boolean;
    scrollParent: HTMLElement;
    constructor(_element: ElementRef, _scrollIntoViewService: ScrollIntoViewService);
    ngOnChanges(): void;
}
