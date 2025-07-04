import { AfterViewInit, Directive, ElementRef, inject, Input } from '@angular/core';

@Directive({
    selector: '[uxScrollIntoView]',
    standalone: false
})
export class ScrollIntoViewDirective implements AfterViewInit {
    readonly _elementRef = inject(ElementRef);

    /** Allow a condition around whether or not this should scroll into view */
    @Input() uxScrollIntoView: boolean = true;

    /** Allow user to provide the browser supported options */
    @Input() scrollIntoViewOptions: ScrollIntoViewOptions | boolean = true;

    ngAfterViewInit(): void {
        if (this.uxScrollIntoView) {
            this._elementRef.nativeElement.scrollIntoView(this.scrollIntoViewOptions);
        }
    }
}