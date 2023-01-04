import { AfterViewInit, Directive, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[uxAutoGrow]'
})
export class AutoGrowDirective implements AfterViewInit {
  private readonly _elementRef = inject(ElementRef);
  private readonly _renderer = inject(Renderer2);

  constructor() {
    // ensure this is a textarea or else throw error
    if (this._elementRef.nativeElement.tagName.toLowerCase() !== 'textarea') {
      throw new Error('uxAutoGrow directive can only be used on <textarea> elements.');
    }
  }

  ngAfterViewInit(): void {
    this.update();
  }

  @HostListener('input')
  update(): void {

    // perform sizing
    this._renderer.setStyle(this._elementRef.nativeElement, 'overflowY', 'hidden');
    this._renderer.setStyle(this._elementRef.nativeElement, 'height', 'auto');

    // get the new total height and element height
    const { scrollHeight } = this._elementRef.nativeElement;
    const { maxHeight } = getComputedStyle(this._elementRef.nativeElement);

    // determine what the maximum allowed height is
    const maximum = !isNaN(parseFloat(maxHeight)) ? parseFloat(maxHeight) : Infinity;

    // if there is a max height specifed we want to show the scrollbars
    if (maximum < scrollHeight) {
      this._renderer.setStyle(this._elementRef.nativeElement, 'overflowY', 'auto');
      this._renderer.setStyle(this._elementRef.nativeElement, 'height', maximum + 'px');
    } else {
      this._renderer.setStyle(this._elementRef.nativeElement, 'height', scrollHeight + 'px');
    }
  }

}