import { Directive, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResizeService } from '../resize/index';

@Directive({
    selector: '[uxFixedHeaderTable]',
    exportAs: 'ux-fixed-header-table'
})
export class FixedHeaderTableDirective<T> implements OnInit, OnDestroy {

    /** Allow dataset changes to trigger re-layout */
    @Input() set dataset(_dataset: ReadonlyArray<T>) {
        requestAnimationFrame(() => this.setLayout());
    }

    /** Define the table height */
    @Input() tableHeight: number | string;

    /** Emit when the table tries to load more data */
    @Output() tablePaging: EventEmitter<number> = new EventEmitter<number>();


    /** Apply a class whenever the table has scrolled */
    @HostBinding('class.ux-fixed-header-table-scrolled') _hasScrolled: boolean = false;

    /** Store the table head element */
    private _tableHead: HTMLTableSectionElement;

    /** Store the table body element */
    private _tableBody: HTMLTableSectionElement;

    /** Unsubscribe from all observables on destroy */
    private _onDestroy = new Subject<void>();

    constructor(
        private _elementRef: ElementRef,
        private _renderer: Renderer2,
        private _resizeService: ResizeService
    ) { }

    ngOnInit(): void {

        // add class to the table
        this._renderer.addClass(this._elementRef.nativeElement, 'ux-fixed-header-table');

        // locate the important elements
        this._tableHead = this._elementRef.nativeElement.querySelector('thead') as HTMLTableSectionElement;
        this._tableBody = this._elementRef.nativeElement.querySelector('tbody') as HTMLTableSectionElement;

        // bind to scroll events on the table body
        this._renderer.listen(this._tableBody, 'scroll', this.onScroll.bind(this));

        // resize the table header to account for scrollbar
        this.setLayout();

        // if a resize occurs perform a relayout (this can be useful when displaying tables in modals)
        this._resizeService.addResizeListener(this._elementRef.nativeElement).pipe(takeUntil(this._onDestroy))
            .subscribe(() => this.setLayout());

        // trigger the loading of the first page
        this.tablePaging.emit();
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
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
        const scrollTop = this._tableBody.scrollTop;
        const scrollHeight = this._tableBody.scrollHeight - this._tableBody.offsetHeight;
        const delta = Math.max(scrollTop, scrollHeight) - Math.min(scrollTop, scrollHeight);

        // its possible for the difference to be a value < 1 when we are at the bottom. Account for this:
        if (delta < 1) {
            this.tablePaging.emit();
        }

        // update the class based on the scroll position
        this._hasScrolled = (scrollTop > 0);
    }

}
