import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { ScrollIntoViewService } from './scroll-into-view.service';

@Directive({
    selector: '[uxScrollIntoViewIf]',
    providers: [ScrollIntoViewService]
 })
export class ScrollIntoViewIfDirective implements OnChanges {

    @Input('uxScrollIntoViewIf') condition = false;
    @Input() scrollParent: HTMLElement;

    constructor(private _element: ElementRef, private _scrollIntoViewService: ScrollIntoViewService) {}

    ngOnChanges() {
        if (this.condition) {
            setTimeout(() => this._scrollIntoViewService.scrollIntoView(this._element.nativeElement, this.scrollParent));
        }
    }
}