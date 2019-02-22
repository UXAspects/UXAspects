import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[uxAutoGrow]'
})
export class AutoGrowDirective implements AfterViewInit {

  /** Specify whether the AutoGrow functionality is enabled */
  @Input() uxAutoGrow: boolean = true;

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
    // ensure this is a textarea or else throw error
    if (_elementRef.nativeElement.tagName.toLowerCase() !== 'textarea') {
      throw new Error('uxAutoGrow directive can only be used on <textarea> elements.');
    }
  }

  ngAfterViewInit(): void {
    this.update();
  }

  @HostListener('input')
  update(): void {

    // check if the AutoGrow functionality is enabled
    if (this.uxAutoGrow === false) {
      return;
    }

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