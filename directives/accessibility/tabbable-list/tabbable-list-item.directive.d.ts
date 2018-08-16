import { FocusableOption } from '@angular/cdk/a11y';
import { ElementRef, OnDestroy } from '@angular/core';
import { TabbableListService } from './tabbable-list.service';
export declare class TabbableListItemDirective implements FocusableOption, OnDestroy {
    private _tabbableList;
    private _elementRef;
    disabled: boolean;
    tabindex: number;
    initialized: boolean;
    private _onDestroy;
    constructor(_tabbableList: TabbableListService, _elementRef: ElementRef);
    ngOnDestroy(): void;
    onInit(): void;
    focus(): void;
    onKeydown(event: KeyboardEvent): void;
}
