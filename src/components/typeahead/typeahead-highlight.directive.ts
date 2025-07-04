import { Directive, ElementRef, inject, Input } from '@angular/core';
import { TypeaheadService } from './typeahead.service';

@Directive({
    selector: '[uxTypeaheadHighlight]',
    standalone: false
})
export class TypeaheadHighlightDirective {
    private readonly _service = inject(TypeaheadService);

    private readonly _elementRef = inject(ElementRef);

    @Input('uxTypeaheadHighlight')
    set highlight(value: boolean) {
        if (value) {
            this._service.highlightedElement$.next(this._elementRef.nativeElement);
        }
    }
}
