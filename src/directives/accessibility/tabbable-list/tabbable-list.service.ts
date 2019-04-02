import { FocusKeyManager, FocusOrigin } from '@angular/cdk/a11y';
import { DOWN_ARROW, END, HOME, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { Injectable, OnDestroy, QueryList } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { TabbableListItemDirective } from './tabbable-list-item.directive';

@Injectable()
export class TabbableListService implements OnDestroy {

    /** Indicate is this is being using on a hierarchichal set of items */
    hierarchy: boolean = false;

    /** Determine if we all the alt key */
    allowAltModifier: boolean = true;

    /** Determine if we all the ctrl key */
    allowCtrlModifier: boolean = true;

    /** Determine if we allow the Home/End keys */
    allowBoundaryKeys: boolean = false;

    /** Determine if we should scroll the item into view on focus */
    shouldScrollInView: boolean = true;

    /** Store the instance of the focus key manager */
    focusKeyManager: FocusKeyManager<TabbableListItemDirective>;

    /** Indicate if we should refocus an item on QueryList change - for use within virtual lists */
    shouldFocusOnChange: boolean = true;

    /** Store the container element */
    containerRef: HTMLElement;

    /** Emit whenever focus does not change but tabindexes have */
    onTabIndexChange = new Subject<void>();

    /** Determine if focus is currently within the tabbable list */
    isFocused: boolean = false;

    /** Store the list of tabbable items */
    private _items: QueryList<TabbableListItemDirective>;

    /** Store the direction of the list */
    private _direction: 'horizontal' | 'vertical';

    /** Unsubscribe from all observables on destroy */
    private _onDestroy = new Subject<void>();

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
        this.onTabIndexChange.complete();
    }

    initialize(items: QueryList<TabbableListItemDirective>, direction: 'horizontal' | 'vertical', wrap: boolean): void {

        // store the items
        this._items = items;

        // create the new focus key manager
        this.focusKeyManager = new FocusKeyManager(items);

        // set the direction of the list
        direction === 'vertical' ? this.focusKeyManager.withVerticalOrientation() : this.focusKeyManager.withHorizontalOrientation('ltr');
        this._direction = direction;

        // enable wrapping if required
        if (wrap) {
            this.focusKeyManager.withWrap();
        }

        // make sure the first item in the list is tabbable
        this.setFirstItemTabbable();

        // call the init function on each item
        this._items.forEach(item => item.onInit());

        // if the list changes we need to ensure there is always at least one tabbable item
        this._items.changes.pipe(takeUntil(this._onDestroy)).subscribe(() => {

            // call the on init function on any new items
            this._items.filter(item => !item.initialized).forEach(item => item.onInit());

            // ensure there is at least one item tabbable at all times
            this.ensureTabbableItem();
        });
    }

    /** Give and item focus or just make it the current tabbable item */
    activate(item: TabbableListItemDirective, updateIndexOnly: boolean = false): void {

        if (!item) {
            return;
        }

        // get the item index
        const index = this._items.toArray().indexOf(item);

        this.activateItemAtIndex(index, updateIndexOnly);
    }

    /** Give and item focus or just make it the current tabbable item */
    activateItemAtIndex(index: number, updateIndexOnly: boolean = false): void {

        // if we only want to update the index
        if (updateIndexOnly) {
            return this.updateActiveItemIndex(index);
        }

        // update active the item only if it is not already active
        if (this.focusKeyManager.activeItemIndex !== index) {
            this.focusKeyManager.setActiveItem(index);
        }
    }

    isItemActive(item: TabbableListItemDirective): boolean {

        // if this is called before the items have been set then do nothing
        if (!this._items) {
            return false;
        }

        // find the index of the item
        const index = this._items.toArray().findIndex(_item => _item.id === item.id);

        // check if the item is active (we check against index as it can be updated without setting the activeItem)
        return this.focusKeyManager && this.focusKeyManager.activeItemIndex === index;
    }

    setFirstItemTabbable(): void {
        // find the first item that is not disabled
        const first = this._items.toArray().findIndex(item => !item.disabled);

        if (first !== -1) {
            this.updateActiveItemIndex(first);
        }
    }

    ensureTabbableItem(): void {
        // check to see if any item is tabbable
        const active = this._items.find(item => this.isItemActive(item));

        if (!active) {
            this.setFirstItemTabbable();
        }
    }

    focusTabbableItem(): void {

        if (!this._items) {
            return;
        }

        // find the item in the list with a tab index
        const index = this._items.toArray().findIndex(item => this.isItemActive(item));

        // if an item was found then focus it
        if (index !== -1) {
            this.focusKeyManager.setActiveItem(index);
        }
    }

    onKeydown(source: TabbableListItemDirective, event: KeyboardEvent): any {

        // prevent anything happening when modifier keys are pressed if they have been disabled
        if (!this.allowAltModifier && event.altKey || !this.allowCtrlModifier && event.ctrlKey) {
            return;
        }

        this.focusKeyManager.onKeydown(event);

        // if the key is a boundary key and boundary keys are enabled
        if (this.allowBoundaryKeys) {
            switch (event.which) {
                case HOME:
                    this.focusKeyManager.setFirstItemActive();
                    event.preventDefault();
                    break;

                case END:
                    this.focusKeyManager.setLastItemActive();
                    event.preventDefault();
                    break;
            }
        }

        if (this.hierarchy) {

            if ((this._direction === 'horizontal' && event.keyCode === DOWN_ARROW) ||
                (this._direction === 'vertical' && event.keyCode === RIGHT_ARROW)) {
                source.keyboardExpanded$.next(true);
            } else if ((this._direction === 'horizontal' && event.keyCode === UP_ARROW) ||
                (this._direction === 'vertical' && event.keyCode === LEFT_ARROW)) {

                if (source.children.length > 0 && source.expanded) {
                    source.keyboardExpanded$.next(false);
                } else if (source.parent) {
                    source.parent.keyboardExpanded$.next(false);
                }
            }
        }
    }

    sortItemsByHierarchy(list: QueryList<TabbableListItemDirective>): TabbableListItemDirective[] {

        const topLevel: TabbableListItemDirective[] = [];

        // Populating children - clear previously generated collection
        list.forEach(item => item.children = []);

        // Populating children - map from child -> parent relationship
        list.forEach(item => {
            if (item.parent) {
                item.parent.children.push(item);
            } else {
                topLevel.push(item);
            }
        });

        // Flatten the tree to produce the cursor key order
        return this.flattenHierarchy(topLevel);
    }

    /**
     * In a uxVirtualFor list cells can be resused. This means that when we scroll
     * the data associated with a given element may change and not the actual elements. If only the data changes
     * then the QueryList will not emit a change so we may show focus indicatator on the element that previously displayed
     * the correct data but no longer does.
     *
     * We need to handle this correctly here. We already have keys implements to handle virtual elements so we can check
     * if a key changes and use it to update the focused item even if the QueryList doesn't inform us that we have changed.
     */
    itemReferenceChange(previousKey: any, origin: FocusOrigin): void {
        // find the item that now has the previously focused key
        const item = this.getItemByKey(previousKey);

        // if no key was found then we should ensure there is a tabbable item
        if (!item) {
            return this.ensureTabbableItem();
        }

        // get the item index
        const index = this._items.toArray().indexOf(item);

        // activate the item without side effects
        this.updateActiveItemIndex(index);

        // focus the item with the same origin that it previously had
        item.focusWithOrigin(origin);
    }

    /** Update the active item without causing focus */
    updateActiveItemIndex(index: number): void {
        this.focusKeyManager.updateActiveItemIndex(index);
        this.onTabIndexChange.next();
    }

    /** Determine if there is an item with a tabindex of 0 */
    hasTabbableItem(): boolean {
        return this.focusKeyManager && this.focusKeyManager.activeItemIndex >= 0;
    }

    private getItemByKey(key: any): TabbableListItemDirective | null {
        return this._items.find(item => item.key === key);
    }

    private flattenHierarchy(items: TabbableListItemDirective[]): TabbableListItemDirective[] {
        const flatList: TabbableListItemDirective[] = [];
        items.forEach(item => {
            item.children.sort((a, b) => a.rank - b.rank);
            flatList.push(item, ...this.flattenHierarchy(item.children));
        });
        return flatList;
    }
}
