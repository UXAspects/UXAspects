import { Directive, ElementRef, Input } from '@angular/core';
import { TypeaheadService } from './typeahead.service';

@Directive({
    selector: '[uxTypeaheadHighlight]'
})
export class TypeaheadHighlightDirective {

    @Input('uxTypeaheadHighlight')
    set highlight(value: boolean) {
        if (value) {
            this._service.highlightedElement$.next(this._elementRef.nativeElement);
        }
    }

    constructor(private _service: TypeaheadService, private _elementRef: ElementRef) {}
}
