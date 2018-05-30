import { Directive, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Directive({ 
    selector: '[uxOutsideClick]'
})
export class OutsideClickDirective {
    
    @Output() uxOutsideClick = new EventEmitter<MouseEvent>();

    constructor(private _elementRef: ElementRef) { }

    @HostListener('document:click', ['$event'])
    click(event: MouseEvent): void {
        if (this._elementRef.nativeElement !== event.target && !this._elementRef.nativeElement.contains(event.target)) {
            this.uxOutsideClick.emit(event);
        }
    }
}