import { Directive, Input, ElementRef } from '@angular/core';

@Directive({ 
    selector: '[focusIf]' 
})
export class FocusIfDirective {

    @Input() 
    set focusIf(focus: boolean) {

        // if a timeout is pending then cancel it
        if (this._timeout !== null) {
            clearTimeout(this._timeout);
        }

        if (focus) {
            this._timeout = setTimeout(() => {
                this._elementRef.nativeElement.focus();
                this._timeout = null;
            });
        }
    }

    private _timeout: number = null;

    constructor(private _elementRef: ElementRef) { }
}