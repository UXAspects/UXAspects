import { Directive, Input, ElementRef, OnChanges } from '@angular/core';

@Directive({ selector: '[uxFocusIf]' })
export class FocusIfDirective implements OnChanges {

    @Input('uxFocusIf') condition: boolean;

    constructor(private elementRef: ElementRef) {}
    
    ngOnChanges(changes: any) {
        if (this.condition) {
            this.elementRef.nativeElement.focus();
        }
    }
}