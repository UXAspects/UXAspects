import { AfterContentInit, EventEmitter, OnDestroy, QueryList } from '@angular/core';
import { SelectionService } from '../../directives/selection/selection.service';
import { SelectListItemComponent } from './select-list-item/select-list-item.component';
export declare class SelectListComponent implements AfterContentInit, OnDestroy {
    private _selection;
    multiple: boolean;
    selected: any[];
    selectedChange: EventEmitter<any[]>;
    items: QueryList<SelectListItemComponent>;
    private _subscription;
    constructor(_selection: SelectionService);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
}
