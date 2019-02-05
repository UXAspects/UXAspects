import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
    selector: '[uxToolbarSearchButton]'
})
export class ToolbarSearchButtonDirective {

    /** Emit whenever the button is clicked */
    @Output() clicked = new EventEmitter<void>();

    /** Get the width of the button element */
    get width(): number {
        return this._elementRef.nativeElement.offsetWidth;
    }

    constructor(private _elementRef: ElementRef) { }

    @HostListener('click')
    clickHandler(): void {
        this.clicked.emit();
    }
}
