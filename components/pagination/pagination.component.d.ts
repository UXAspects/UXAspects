import { EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const PAGINATION_CONTROL_VALUE_ACCESSOR: any;
export declare class PaginationComponent implements OnInit, ControlValueAccessor {
    /** Specify if we should show the next and previous buttons */
    directionButtons: boolean;
    /** Limit the number of pages shown at any given time */
    maxSize: number;
    /** Specify if the component should be disabled */
    disabled: boolean;
    /** Apply classes to the bootstrap pagination element */
    classes: string;
    /** Allow custom class to be added to page buttons */
    pageBtnClass: string;
    /** Aria Label for the component navigation */
    ariaLabel: string;
    /** Aria label for the previous button */
    previousAriaLabel: string;
    /** Aria label for the next button */
    nextAriaLabel: string;
    /** Specify the index of the active page */
    page: number;
    /** Define a custom template for the previous button */
    previousBtnTemplate: TemplateRef<any>;
    /** Define a custom template for the next button */
    nextBtnTemplate: TemplateRef<any>;
    /** Specify the page size */
    itemsPerPage: number;
    /** Specify how many items there are in total */
    totalItems: number;
    /** Emit the current page number */
    pageChange: EventEmitter<number>;
    /** Emit the total number of pages */
    numPages: EventEmitter<number>;
    /** Store a list of pages to display in the UI */
    pages: ReadonlyArray<Page>;
    /** ControlValueAccessor functions */
    onTouched: Function;
    onChange: Function;
    isKeyboardEvent: boolean;
    private _page;
    private _total;
    private _pagesize;
    readonly pageCount: number;
    ngOnInit(): void;
    select(index: number): void;
    trackByFn(_index: number, item: Page): number;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    writeValue(page: number): void;
    private getPages();
    private isPageVisible(index);
}
export interface Page {
    index: number;
    visible: boolean;
}
