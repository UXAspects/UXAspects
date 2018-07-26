import { FocusKeyManager } from '@angular/cdk/a11y';
import { Injectable, QueryList } from '@angular/core';
import { TabbableListItemDirective } from './tabbable-list-item.directive';

@Injectable()
export class TabbableListService {

    focusKeyManager: FocusKeyManager<TabbableListItemDirective>;

    private _items: QueryList<TabbableListItemDirective>;

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
        if (this._items.first) {
            this._items.first.tabindex = 0;
        }

        // call the init function on each item
        this._items.forEach(item => item.onInit());
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
}