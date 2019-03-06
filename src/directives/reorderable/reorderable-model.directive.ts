import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[uxReorderableModel]'
})
export class ReorderableModelDirective<T> {

    // allow the user to specify a model for the item - allows use with ngFor
    @Input() uxReorderableModel: T;

    // this can be used to identify which instance of the directive relates to which element
    constructor(public elementRef: ElementRef) { }
}
