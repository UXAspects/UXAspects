import { AfterContentInit, OnDestroy, QueryList } from '@angular/core';
import { TabbableListItemDirective } from './tabbable-list-item.directive';
import { TabbableListService } from './tabbable-list.service';
export declare class TabbableListDirective implements AfterContentInit, OnDestroy {
    private _tabbableList;
    /** Determine whether the up/down arrows should be used or the left/right arrows */
    direction: 'horizontal' | 'vertical';
    /** Indicate whether or not focus should loop back to the first element after the last */
    wrap: boolean;
    /** Indicate whether or not the first item should receive focus on show - useful for modals and popovers */
    focusOnShow: boolean;
    /** Indicate whether or not focus should be returned to the previous element (only applicable when using focusOnShow) */
    returnFocus: boolean;
    /** Find all tabbable list items */
    items: QueryList<TabbableListItemDirective>;
    private _focusedElement;
    constructor(_tabbableList: TabbableListService);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
}
