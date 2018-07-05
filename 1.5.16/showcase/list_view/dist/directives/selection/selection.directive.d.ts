import { AfterContentInit, EventEmitter, OnDestroy, QueryList } from '@angular/core';
import { SelectionItemDirective } from './selection-item.directive';
import { SelectionMode, SelectionService } from './selection.service';
export declare class SelectionDirective implements AfterContentInit, OnDestroy {
    private _selectionService;
    uxSelection: any[];
    disabled: boolean;
    mode: SelectionMode;
    clickSelection: boolean;
    keyboardSelection: boolean;
    tabindex: number;
    uxSelectionChange: EventEmitter<any[]>;
    items: QueryList<SelectionItemDirective>;
    private _subscriptions;
    constructor(_selectionService: SelectionService);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /**
     * If the directive element receives focus then activate the first item
     */
    focus(): void;
    /**
     * Update the dataset to reflect the latest selection items
     */
    update(): void;
    /**
     * Select all the items in the list
     */
    selectAll(): void;
    /**
     * Deselect all currently selected items
     */
    deselectAll(): void;
}
