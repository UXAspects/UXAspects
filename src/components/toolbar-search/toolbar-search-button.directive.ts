import { Directive, HostListener, Output, EventEmitter, ElementRef } from '@angular/core';

@Directive({
    selector: '[uxToolbarSearchButton]'
})
export class ToolbarSearchButtonDirective {

    @Output()
    clicked = new EventEmitter<void>();

    get width(): number {
        return this._elementRef.nativeElement.offsetWidth;
    }

    constructor(private _elementRef: ElementRef) { }

    @HostListener('click')
    clickHandler() {
        this.clicked.emit();
    }
}
