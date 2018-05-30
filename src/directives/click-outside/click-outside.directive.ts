import { Directive, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Directive({ 
    selector: '[uxClickOutside]'
})
export class ClickOutsideDirective {

    @Output() uxClickOutside = new EventEmitter<MouseEvent>();

    constructor(private _elementRef: ElementRef) { }

    @HostListener('document:click', ['$event'])
    click(event: MouseEvent): void {
        if (this._elementRef.nativeElement !== event.target && !this._elementRef.nativeElement.contains(event.target)) {
            this.uxClickOutside.emit(event);
        }
    }
}