import { Directive, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';

@Directive({ selector: '[focusIf]' })
export class FocusIfDirective implements OnChanges {

    @Input() focusIf: boolean = false;

    constructor(private elementRef: ElementRef) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.focusIf && changes.focusIf.previousValue === false && changes.focusIf.currentValue === true) {
            this.elementRef.nativeElement.focus();
        }
    }
}