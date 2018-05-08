import { Directive, Input, ElementRef } from '@angular/core';

@Directive({ 
    selector: '[focusIf]' 
})
export class FocusIfDirective {

    @Input() 
    set focusIf(focus: boolean) {
        if (focus) {
            setTimeout(() => this._elementRef.nativeElement.focus());
        }
    }

    constructor(private _elementRef: ElementRef) { }
}