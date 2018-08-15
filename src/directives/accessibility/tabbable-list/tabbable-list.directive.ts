import { AfterContentInit, ContentChildren, Directive, Input, OnDestroy, QueryList } from '@angular/core';
import { TabbableListItemDirective } from './tabbable-list-item.directive';
import { TabbableListService } from './tabbable-list.service';

@Directive({
    selector: '[uxTabbableList]',
    exportAs: 'ux-tabbable-list',
    providers: [TabbableListService]
})
export class TabbableListDirective implements AfterContentInit, OnDestroy {

    /** Determine whether the up/down arrows should be used or the left/right arrows */
    @Input() direction: 'horizontal' | 'vertical' = 'vertical';

    /** Indicate whether or not focus should loop back to the first element after the last */
    @Input() wrap: boolean = true;

    /** Indicate whether or not the first item should receive focus on show - useful for modals and popovers */
    @Input() focusOnShow: boolean = false;

    /** Indicate whether or not focus should be returned to the previous element (only applicable when using focusOnShow) */
    @Input() returnFocus: boolean = false;

    /** Find all tabbable list items */
    @ContentChildren(TabbableListItemDirective) items: QueryList<TabbableListItemDirective>;

    private _focusedElement: HTMLElement;

    constructor(private _tabbableList: TabbableListService) {}

    ngAfterContentInit(): void {

        // store the currently focused element
        this._focusedElement = document.activeElement as HTMLElement;

        // Set up the focus monitoring
        this._tabbableList.initialize(this.items, this.direction, this.wrap);

        // focus the first element if specified
        if (this.focusOnShow) {
            this._tabbableList.focusKeyManager.setFirstItemActive();
        }
    }

    ngOnDestroy(): void {
        if (this.returnFocus && this._focusedElement instanceof HTMLElement) {
            setTimeout(() => this._focusedElement.focus());
        }
    }

    focus(): void {
        if (this._tabbableList.focusKeyManager && this._tabbableList.focusKeyManager.activeItem) {
            this._tabbableList.focusKeyManager.activeItem.focus();
        }
    }
}