import { ScrollIntoViewService } from './scroll-into-view.service';
import { Directive, ElementRef, Input } from '@angular/core';

@Directive({ 
    selector: '[uxScrollIntoViewIf]' 
})
export class ScrollIntoViewIfDirective {

    @Input() scrollParent: HTMLElement;
    
    @Input() 
    set uxScrollIntoViewIf(condition: boolean) {
        if (condition) {
            setTimeout(() => this._scrollIntoViewService.scrollIntoView(this._element.nativeElement, this.scrollParent));            
        }
    }

    constructor(private _element: ElementRef, private _scrollIntoViewService: ScrollIntoViewService) {}
}