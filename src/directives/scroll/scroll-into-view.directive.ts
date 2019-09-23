import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[uxScrollIntoView]'
})
export class ScrollIntoViewDirective implements AfterViewInit {

    /** Allow a condition around whether or not this should scroll into view */
    @Input() uxScrollIntoView: boolean = true;

    /** Allow user to provide the browser supported options */
    @Input() scrollIntoViewOptions: ScrollIntoViewOptions | boolean = true;

    constructor(private _elementRef: ElementRef) { }

    ngAfterViewInit(): void {
        if (this.uxScrollIntoView) {
            this._elementRef.nativeElement.scrollIntoView(this.scrollIntoViewOptions);
        }
    }
}