import { ElementRef } from '@angular/core';
import { TypeaheadService } from './typeahead.service';
export declare class TypeaheadHighlightDirective {
    private _service;
    private _elementRef;
    highlight: boolean;
    constructor(_service: TypeaheadService, _elementRef: ElementRef);
}
