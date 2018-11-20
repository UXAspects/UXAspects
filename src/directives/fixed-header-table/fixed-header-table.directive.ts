import { Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[uxFixedHeaderTable]',
  exportAs: 'ux-fixed-header-table'
})
export class FixedHeaderTableDirective<T> implements OnInit {

  /** Allow dataset changes to trigger re-layout */
  @Input() set dataset(_dataset: ReadonlyArray<T>) {
    requestAnimationFrame(() => this.setLayout());
  }

  /** Define the table height */
  @Input() tableHeight: number | string;

  /** Emit when the table tries to load more data */
  @Output() tablePaging: EventEmitter<number> = new EventEmitter<number>();

  private _tableHead: HTMLElement;
  private _tableBody: HTMLElement;

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) { }

  ngOnInit(): void {

    // add class to the table
    this._renderer.addClass(this._elementRef.nativeElement, 'ux-fixed-header-table');

    // locate the important elements
    this._tableHead = this._elementRef.nativeElement.querySelector('thead');
    this._tableBody = this._elementRef.nativeElement.querySelector('tbody');

    // bind to scroll events on the table body
    this._renderer.listen(this._tableBody, 'scroll', this.onScroll.bind(this));

    // resize the table header to account for scrollbar
    this.setLayout();

    // trigger the loading of the first page
    this.tablePaging.emit();
  }

  /**
   * Get the table element
   * Primarily used by column width directive
   */
  getTable(): HTMLTableElement {
    return this._elementRef.nativeElement;
  }

  /**
   * Update the size of the table header to account for the scrollbar.
   * This is important to keep the columns aligned
   */
  setLayout(): void {

    if (!this._tableBody || !this._tableHead) {
      return;
    }

    // calculate the size of the scrollbar
    const scrollbar = this._tableBody.offsetWidth - this._tableBody.clientWidth;

    // add padding to the header to account for this
    this._renderer.setStyle(this._tableHead, 'padding-right', scrollbar + 'px');

    // set the desired height of the table body
    this._renderer.setStyle(this._tableBody, 'height', typeof this.tableHeight === 'number' ? `${this.tableHeight}px` : this.tableHeight);
  }

  /**
   * Handle scroll events
   */
  private onScroll(): void {

    // determine if we are scrolled to the bottom and if so load the next page
    if (this._tableBody.scrollTop === (this._tableBody.scrollHeight - this._tableBody.offsetHeight)) {
      this.tablePaging.emit();
    }
  }

}
