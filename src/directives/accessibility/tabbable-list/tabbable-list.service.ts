import { FocusKeyManager } from '@angular/cdk/a11y';
import { Injectable, OnDestroy, QueryList } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { TabbableListItemDirective } from './tabbable-list-item.directive';

@Injectable()
export class TabbableListService implements OnDestroy {

    allowAltModifier: boolean = true;
    allowCtrlModifier: boolean = true;
    focusKeyManager: FocusKeyManager<TabbableListItemDirective>;

    private _items: QueryList<TabbableListItemDirective>;
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

        // get the item index
        const index = this._items.toArray().indexOf(item);

        // active the item if it is not already active
        if (this.focusKeyManager.activeItemIndex !== index) {
            this.focusKeyManager.setActiveItem(index);
        }
    }

    isItemActive(item: TabbableListItemDirective): boolean {

        // get the item index
        const index = this._items.toArray().indexOf(item);

        // active the item if it is not already active
        return this.focusKeyManager.activeItemIndex === index;
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

        // find the item in the list with a tab index
        const index = this._items.toArray().findIndex(item => item.tabindex === 0);

        // if an item was found then focus it
        if (index !== -1) {
            this.focusKeyManager.setActiveItem(index);
        }
    }
}