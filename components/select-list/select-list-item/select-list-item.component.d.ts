import { FocusableOption } from '@angular/cdk/a11y';
import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { SelectListService } from '../select-list.service';
export declare class SelectListItemComponent implements OnInit, OnDestroy, FocusableOption {
    private _selectTable;
    private _elementRef;
    data: any;
    tabindex: number;
    isSelected: boolean;
    private _onDestroy;
    constructor(_selectTable: SelectListService, _elementRef: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    focus(): void;
    select(): void;
    onKeydown(event: KeyboardEvent): void;
}
