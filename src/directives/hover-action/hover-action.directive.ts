import { Directive, ElementRef, HostListener } from '@angular/core';
import { HoverActionService } from './hover-action.service';

@Directive({
    selector: '[uxHoverAction]' ,
    host: {
        '[class.hover-action-active]': 'active',
        '[class.hover-action-hovered]': 'hovered',
        'tabindex': '0'
    }
})
export class HoverActionDirective {

    active: boolean = false;
    hovered: boolean = false;
    focused: boolean = false;

    constructor(private _elementRef: ElementRef, private _hoverActionService: HoverActionService) {
    }

    focus(): void {
        this.focused = true;
        this._elementRef.nativeElement.focus();
    }

    @HostListener('blur') blur(): void {
        this.focused = false;
    }

    @HostListener('keydown.arrowleft') focusPrevious(): void {
        this._hoverActionService.focusPrevious();
        debugger;
    }

    @HostListener('keydown.arrowright') focusNext(): void {
        this._hoverActionService.focusNext();
        debugger;
    }
}