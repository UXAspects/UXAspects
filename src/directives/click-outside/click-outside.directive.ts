import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
    selector: '[uxClickOutside]'
})
export class ClickOutsideDirective {

    @Output() uxClickOutside = new EventEmitter<MouseEvent>();

    /** Often a click event makes the element appear - if so we can end up closing it immediately */
    private _initialised: boolean = false;

    constructor(private _elementRef: ElementRef) {
        setTimeout(() => this._initialised = true);
    }

    @HostListener('document:click', ['$event'])
    click(event: MouseEvent): void {
        if (this._initialised && this._elementRef.nativeElement !== event.target && !this._elementRef.nativeElement.contains(event.target)) {
            this.uxClickOutside.emit(event);
        }
    }
}