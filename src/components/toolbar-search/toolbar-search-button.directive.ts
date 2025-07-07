import { Directive, ElementRef, EventEmitter, HostListener, inject, Output } from '@angular/core';

@Directive({
  selector: '[uxToolbarSearchButton]',
  standalone: false,
})
export class ToolbarSearchButtonDirective {
  private readonly _elementRef = inject(ElementRef);

  /** Emit whenever the button is clicked */
  @Output() clicked = new EventEmitter<void>();

  /** Get the width of the button element */
  get width(): number {
    return this._elementRef.nativeElement.offsetWidth;
  }

  @HostListener('click')
  clickHandler(): void {
    this.clicked.emit();
  }
}
