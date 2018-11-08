import { AfterContentInit, EventEmitter, OnDestroy, QueryList } from '@angular/core';
import { SelectionService } from '../../directives/selection/selection.service';
import { SelectListItemComponent } from './select-list-item/select-list-item.component';
export declare class SelectListComponent<T> implements AfterContentInit, OnDestroy {
    private _selection;
    /** Determine if we allow multiple items to be selected */
    multiple: boolean;
    /** Set the selected items */
    selected: T | T[];
    /** Emit when the selection changes */
    selectedChange: EventEmitter<T[]>;
    /** Find all select list items */
    items: QueryList<SelectListItemComponent<T>>;
    /** Automatically unsubscribe all observables */
    private _onDestroy;
    constructor(_selection: SelectionService<T>);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
}
