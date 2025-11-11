import { Directive, ElementRef, inject, Input, OnChanges } from '@angular/core';
import { ScrollIntoViewService } from './scroll-into-view.service';

@Directive({
  selector: '[uxScrollIntoViewIf]',
  providers: [ScrollIntoViewService],
})
export class ScrollIntoViewIfDirective implements OnChanges {
  private readonly _element = inject(ElementRef);

  private readonly _scrollIntoViewService = inject(ScrollIntoViewService);

  @Input('uxScrollIntoViewIf') condition = false;
  @Input() scrollParent: HTMLElement;

  ngOnChanges() {
    if (this.condition) {
      setTimeout(() =>
        this._scrollIntoViewService.scrollIntoView(this._element.nativeElement, this.scrollParent)
      );
    }
  }
}
