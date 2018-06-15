import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[focusIf]'
})
export class FocusIfDirective {

    @Input() focusIfDelay: number = 0;

    @Input()
    set focusIf(focus: boolean) {

        // if a timeout is pending then cancel it
        if (!focus && this._timeout !== null) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }

        if (focus && this._timeout === null) {
            this._timeout = window.setTimeout(() => {
                this._elementRef.nativeElement.focus();
                this._timeout = null;
            }, this.focusIfDelay);
        }
    }

    private _timeout: number = null;

    constructor(private _elementRef: ElementRef) { }
}