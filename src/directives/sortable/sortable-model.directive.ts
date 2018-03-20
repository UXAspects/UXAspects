import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[uxSortableModel]'
})
export class SortableModelDirective {
  
  // allow the user to specify a model for the item - allows use with ngFor
  @Input() uxSortableModel: any;

  // this can be used to identify which instance of the directive relates to which element
  constructor(public elementRef: ElementRef) { }
}
