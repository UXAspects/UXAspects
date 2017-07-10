import { ScrollIntoViewService } from './scroll-into-view.service';
import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({ selector: '[uxScrollIntoViewIf]' })
export class ScrollIntoViewIfDirective implements OnChanges {

    @Input('uxScrollIntoViewIf') condition = false;
    @Input() scrollParent: HTMLElement;

    constructor(private element: ElementRef, private scrollIntoViewService: ScrollIntoViewService) {}
    
    ngOnChanges(changes: SimpleChanges) {
        if (this.condition) {
            setTimeout(() => {
                this.scrollIntoViewService.scrollIntoView(this.element.nativeElement, this.scrollParent);
            });
        }
    }
}