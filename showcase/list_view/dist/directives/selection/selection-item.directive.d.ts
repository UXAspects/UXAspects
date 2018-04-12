import { ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { SelectionService } from './selection.service';
export declare class SelectionItemDirective implements OnInit, OnDestroy {
    private _selectionService;
    private _elementRef;
    uxSelectionItem: any;
    selected: boolean;
    tabindex: number;
    selectedChange: EventEmitter<boolean>;
    active: boolean;
    private _selected;
    private _subscriptions;
    constructor(_selectionService: SelectionService, _elementRef: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    click(event: MouseEvent): void;
    mousedown(event: MouseEvent): void;
    keydown(event: KeyboardEvent): void;
    /**
     * Select this item using the current strategy
     */
    select(): void;
    /**
     * Deselect this item using the current strategy
     */
    deselect(): void;
}
