import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { ResizeService } from '../resize/index';

@Directive({ selector: '[uxLayoutSwitcher]' })
export class LayoutSwitcherDirective {

    constructor(elementRef: ElementRef, resizeService: ResizeService, renderer: Renderer2) {
        resizeService.addResizeListener(elementRef.nativeElement, renderer).subscribe(event => {
            debugger;
        });
    }
}