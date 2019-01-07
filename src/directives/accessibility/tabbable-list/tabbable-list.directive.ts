import { FocusKeyManager } from '@angular/cdk/a11y';
import { AfterContentInit, ContentChildren, Directive, Input, OnDestroy, QueryList } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
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

    /** Enabling handling of hierarchical lists via use of the `TabbableListItemDirective.parent` property. */
    @Input() set hierarchy(value: boolean) { this._tabbableList.hierarchy = value; }

    /** Prevent keyboard interaction when alt modifier key is pressed */
    @Input() set allowAltModifier(value: boolean) { this._tabbableList.allowAltModifier = value; }

    /** Prevent keyboard interaction when ctrl modifier key is pressed */
    @Input() set allowCtrlModifier(value: boolean) { this._tabbableList.allowCtrlModifier = value; }

    /** Focus the first or last item when Home or End keys are pressed */
    @Input() set allowBoundaryKeys(value: boolean) { this._tabbableList.allowBoundaryKeys = value; }

    /** Find all tabbable list items */
    @ContentChildren(TabbableListItemDirective, { descendants: true }) items: QueryList<TabbableListItemDirective>;

    private _focusedElement: HTMLElement;
    private _orderedItems: QueryList<TabbableListItemDirective>;
    private _onDestroy = new Subject<void>();

    get focusKeyManager(): FocusKeyManager<TabbableListItemDirective> {
        return this._tabbableList.focusKeyManager;
    }

    constructor(private _tabbableList: TabbableListService) { }

    ngAfterContentInit(): void {

        // store the currently focused element
        this._focusedElement = document.activeElement as HTMLElement;
        this._orderedItems = new QueryList<TabbableListItemDirective>();

        if (this._tabbableList.hierarchy) {

            // Sort items in a hierarchy
            this._orderedItems.reset(this._tabbableList.sortItemsByHierarchy(this.items));

            // Ensure that the child items remain sorted
            this.items.changes.pipe(takeUntil(this._onDestroy)).subscribe(() => {
                this._orderedItems.reset(this._tabbableList.sortItemsByHierarchy(this.items));
                this._orderedItems.notifyOnChanges();
            });

        } else {

            // Sort items by the specified order
            this._orderedItems.reset(this.items.toArray().sort((itemOne, itemTwo) => itemOne.order - itemTwo.order));

            // Ensure that the child items remain sorted
            this.items.changes.pipe(takeUntil(this._onDestroy)).subscribe(() => {
                this._orderedItems.reset(this.items.toArray().sort((itemOne, itemTwo) => {
                    debugger;
                    return itemOne.order - itemTwo.order;
                }));
                this._orderedItems.notifyOnChanges();
            });
        }

        // Set up the focus monitoring
        this._tabbableList.initialize(this._orderedItems, this.direction, this.wrap);

        // focus the first element if specified
        if (this.focusOnShow) {
            this._tabbableList.focusKeyManager.setFirstItemActive();
        }
    }

    ngOnDestroy(): void {
        if (this.returnFocus && this._focusedElement instanceof HTMLElement) {
            setTimeout(() => this._focusedElement.focus());
        }

        this._onDestroy.next();
        this._onDestroy.complete();
    }

    focus(): void {
        if (this._tabbableList.focusKeyManager && this._tabbableList.focusKeyManager.activeItem) {
            this._tabbableList.focusKeyManager.activeItem.focus();
        }
    }

    focusTabbableItem(): void {
        this._tabbableList.focusTabbableItem();
    }
}
