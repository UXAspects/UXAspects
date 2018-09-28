import { FocusableOption } from '@angular/cdk/a11y';
import { ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { TabbableListService } from './tabbable-list.service';
export declare class TabbableListItemDirective implements FocusableOption, OnDestroy {
    private _tabbableList;
    private _elementRef;
    parent: TabbableListItemDirective;
    rank: number;
    disabled: boolean;
    expanded: boolean;
    expandedChange: EventEmitter<boolean>;
    tabindex: number;
    id: number;
    initialized: boolean;
    children: TabbableListItemDirective[];
    keyboardExpanded$: Subject<boolean>;
    private _onDestroy;
    constructor(_tabbableList: TabbableListService, _elementRef: ElementRef);
    onInit(): void;
    ngOnDestroy(): void;
    focus(): void;
    onKeydown(event: KeyboardEvent): void;
}
