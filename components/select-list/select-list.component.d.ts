import { AfterViewInit, EventEmitter, OnDestroy, QueryList } from '@angular/core';
import { SelectListItemComponent } from './select-list-item/select-list-item.component';
import { SelectListService } from './select-list.service';
export declare class SelectListComponent implements AfterViewInit, OnDestroy {
    private _selectList;
    multiple: boolean;
    selected: any[];
    selectedChange: EventEmitter<any[]>;
    items: QueryList<SelectListItemComponent>;
    private _onDestroy;
    constructor(_selectList: SelectListService);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
