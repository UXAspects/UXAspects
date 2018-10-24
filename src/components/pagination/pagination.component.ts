import { Component, EventEmitter, forwardRef, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const PAGINATION_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PaginationComponent),
  multi: true
};

@Component({
  selector: 'ux-pagination',
  templateUrl: './pagination.component.html',
  providers: [PAGINATION_CONTROL_VALUE_ACCESSOR]
})
export class PaginationComponent implements OnInit, ControlValueAccessor {

  /** Specify if we should show the next and previous buttons */
  @Input() directionButtons: boolean = true;

  /** Limit the number of pages shown at any given time */
  @Input() maxSize: number = 5;

  /** Specify if the component should be disabled */
  @Input() disabled: boolean = false;

  /** Apply classes to the bootstrap pagination element */
  @Input('class') classes: string;

  /** Allow custom class to be added to page buttons */
  @Input() pageBtnClass: string;

  /** Aria label for the previous button */
  @Input() previousAriaLabel: string = 'Navigate to the previous page';

  /** Aria label for the next button */
  @Input() nextAriaLabel: string = 'Navigate to the next page';

  /** Specify the index of the active page */
  @Input() set page(page: number) {

    // do nothing if the page has not changed
    if (page === this._page) {
      return;
    }

    this._page = page;
    this.pages = this.getPages();

    // mark this component as changed
    this.onChange(this.page);
  }

  get page(): number {
    return this._page;
  }

  /** Define a custom template for the previous button */
  @Input() previousBtnTemplate: TemplateRef<any>;

  /** Define a custom template for the next button */
  @Input() nextBtnTemplate: TemplateRef<any>;

  /** Specify the page size */
  @Input() set itemsPerPage(pagesize: number) {
    this._pagesize = pagesize;
    this.pages = this.getPages();
  }

  /** Specify how many items there are in total */
  @Input() set totalItems(total: number) {
    this._total = total;
    this.pages = this.getPages();
  }

  /** Emit the current page number */
  @Output() pageChange = new EventEmitter<number>();

  /** Emit the total number of pages */
  @Output() numPages = new EventEmitter<number>();

  /** Store a list of pages to display in the UI */
  pages: ReadonlyArray<Page> = [];

  /** ControlValueAccessor functions */
  onTouched: Function = () => {};
  onChange: Function = () => {};

  isKeyboardEvent: boolean = false;

  private _page: number = 1;
  private _total: number = 100;
  private _pagesize: number = 10;

  get pageCount(): number {
    return Math.ceil(this._total / this._pagesize);
  }

  ngOnInit(): void {
    this.pages = this.getPages();
  }

  select(index: number): void {

    // find the page we want to go to
    const target = this.pages.find(page => page.index === index);

    // if the page is out of bounds then do nothing
    if (!target) {
      return;
    }

    // mark this component as touched
    this.onTouched();

    // set this as the current page
    this.page = target.index;

    // update the visible pages
    this.pages = this.getPages();

    // emit the current page
    this.pageChange.emit(this.page);
  }

  trackByFn(_index: number, item: Page): number {
    return item.index;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(page: number): void {
    this.page = page;
  }

  private getPages(): Page[] {

    // create a new array to store the pages
    const pages: Page[] = [];

    // create all possible pages
    for (let index = 1; index <= this.pageCount; index++) {
      pages.push({ index, visible: this.isPageVisible(index) });
    }

    // emit the number of pages
    this.numPages.emit(this.pageCount);

    return pages;
  }

  private isPageVisible(index: number): boolean {

    // if we do not have a max size specified or the number of pages is less than the max size then it is always visible
    if (!this.maxSize || this.pageCount <= this.maxSize) {
      return true;
    }

    // find the starting position
    let start = Math.max(1, Math.ceil(this.page - (this.maxSize / 2)));
    const end = Math.min(start + this.maxSize, this.pageCount + 1);

    // if the range is less than the max size we need to adjust the starting point
    const range = end - start;

    if (range < this.maxSize) {
      start = start - (this.maxSize - range);
    }

    // if the item equals the start position or is less than the end position then show it
    return index >= start && index < end;
  }
}

export interface Page {
  index: number;
  visible: boolean;
}
