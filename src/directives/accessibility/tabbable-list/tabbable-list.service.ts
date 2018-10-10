import { FocusKeyManager } from '@angular/cdk/a11y';
import { Injectable, OnDestroy, QueryList } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { TabbableListItemDirective } from './tabbable-list-item.directive';
import { UP_ARROW, RIGHT_ARROW, DOWN_ARROW, LEFT_ARROW } from '@angular/cdk/keycodes';

@Injectable()
export class TabbableListService implements OnDestroy {

    hierarchy: boolean = false;
    allowAltModifier: boolean = true;
    allowCtrlModifier: boolean = true;
    focusKeyManager: FocusKeyManager<TabbableListItemDirective>;

    private _items: QueryList<TabbableListItemDirective>;
    private _direction: 'horizontal' | 'vertical';
    private _onDestroy = new Subject<void>();

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
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

    activate(item: TabbableListItemDirective): void {

        if (!item) {
            return;
        }

        // get the item index
        const index = this._items.toArray().indexOf(item);

        // active the item if it is not already active
        if (this.focusKeyManager.activeItemIndex !== index) {
            this.focusKeyManager.setActiveItem(index);
        }
    }

    isItemActive(item: TabbableListItemDirective): boolean {
        return this.focusKeyManager.activeItem.id === item.id;
    }

    setFirstItemTabbable(): void {
        // delay to prevent expression changed after check error
        setTimeout(() => {
            if (this._items.first) {
                this._items.first.tabindex = 0;
            }
        });
    }

    ensureTabbableItem(): void {
        // check to see if any item is tabbable
        const active = this._items.find(item => item.tabindex === 0);

        if (!active) {
            this.setFirstItemTabbable();
        }
    }

    focusTabbableItem(): void {

        if (!this._items) {
            return;
        }

        // find the item in the list with a tab index
        const index = this._items.toArray().findIndex(item => item.tabindex === 0);

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

        if (this.hierarchy) {

            if (
                (this._direction === 'horizontal' && event.keyCode === DOWN_ARROW) ||
                (this._direction === 'vertical' && event.keyCode === RIGHT_ARROW)
            ) {
                source.keyboardExpanded$.next(true);
            } else if (
                (this._direction === 'horizontal' && event.keyCode === UP_ARROW) ||
                (this._direction === 'vertical' && event.keyCode === LEFT_ARROW)
            ) {
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

    private flattenHierarchy(items: TabbableListItemDirective[]): TabbableListItemDirective[] {
        const flatList: TabbableListItemDirective[] = [];
        items.forEach(item => {
            item.children.sort((a, b) => a.rank - b.rank);
            flatList.push(item, ...this.flattenHierarchy(item.children));
        });
        return flatList;
    }
}
