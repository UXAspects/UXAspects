import { ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { SelectionService } from './selection.service';
export declare class SelectionItemDirective<T> implements OnInit, OnDestroy {
    private _selectionService;
    private _elementRef;
    uxSelectionItem: T;
    selected: boolean;
    tabindex: number;
    selectedChange: EventEmitter<boolean>;
    active: boolean;
    readonly attrTabIndex: number;
    private _selected;
    private _managedTabIndex;
    private _onDestroy;
    constructor(_selectionService: SelectionService<T>, _elementRef: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    click(event: MouseEvent): void;
    mousedown(event: MouseEvent): void;
    keydown(event: KeyboardEvent): void;
    focus(): void;
    /**
     * Select this item using the current strategy
     */
    select(): void;
    /**
     * Deselect this item using the current strategy
     */
    deselect(): void;
}
