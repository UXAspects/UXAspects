import { Directive, ElementRef, inject, Input, OnDestroy } from '@angular/core';

@Directive({
    selector: '[focusIf]',
    standalone: false
})
export class FocusIfDirective implements OnDestroy {
    private readonly _elementRef = inject(ElementRef);

    /** The delay that should ellapse before focussing the element */
    @Input() focusIfDelay: number = 0;

    /** Determine if we should scroll the element into view when focused */
    @Input() focusIfScroll: boolean = true;

    /** Focus when the boolean value is true */
    @Input()
    set focusIf(focus: boolean) {

        // if a timeout is pending then cancel it
        if (!focus && this._timeout !== null) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }

        if (focus && this._timeout === null) {
            this._timeout = window.setTimeout(() => {
                this._elementRef.nativeElement.focus({ preventScroll: !this.focusIfScroll });
                this._timeout = null;
            }, this.focusIfDelay);
        }
    }

    private _timeout: number = null;

    ngOnDestroy(): void {
        if (this._timeout !== null) {
            clearTimeout(this._timeout);
        }
    }
}