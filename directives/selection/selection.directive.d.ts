import { AfterContentInit, ChangeDetectorRef, EventEmitter, OnDestroy, QueryList } from '@angular/core';
import { SelectionItemDirective } from './selection-item.directive';
import { SelectionMode, SelectionService } from './selection.service';
import { SelectionStrategy } from './strategies/selection.strategy';
export declare class SelectionDirective<T> implements AfterContentInit, OnDestroy {
    private _selectionService;
    private _cdRef;
    uxSelection: T[];
    disabled: boolean;
    mode: SelectionMode | SelectionStrategy<T>;
    clickSelection: boolean;
    keyboardSelection: boolean;
    tabindex: number;
    uxSelectionChange: EventEmitter<T[]>;
    items: QueryList<SelectionItemDirective<T>>;
    private _onDestroy;
    constructor(_selectionService: SelectionService<T>, _cdRef: ChangeDetectorRef);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
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
