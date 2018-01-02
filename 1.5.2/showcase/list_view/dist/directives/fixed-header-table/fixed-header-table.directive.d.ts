import { ElementRef, OnInit, Renderer2, EventEmitter } from '@angular/core';
export declare class FixedHeaderTableDirective implements OnInit {
    private _elementRef;
    private _renderer;
    tableHeight: number | string;
    tablePaging: EventEmitter<number>;
    private _tableHead;
    private _tableBody;
    constructor(_elementRef: ElementRef, _renderer: Renderer2);
    ngOnInit(): void;
    /**
     * Get the table element
     * Primarily used by column width directive
     */
    getTable(): HTMLTableElement;
    /**
     * Handle scroll events
     */
    private onScroll(event);
    /**
     * Update the size of the table header to account for the scrollbar.
     * This is important to keep the columns aligned
     */
    private setLayout();
}
