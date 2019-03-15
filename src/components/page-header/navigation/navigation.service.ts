import { FocusKeyManager } from '@angular/cdk/a11y';
import { Injectable, QueryList } from '@angular/core';
import { PageHeaderNavigationItemComponent } from './navigation-item/navigation-item.component';

@Injectable()
export class PageHeaderNavigationService {

    /** Store an instance of the focus key manager */
    private _focusManager: FocusKeyManager<PageHeaderNavigationItemComponent>;

    /** Store the query list */
    private _items: QueryList<PageHeaderNavigationItemComponent>

    /** Make menu items navigable using arrow keys */
    initialize(items: QueryList<PageHeaderNavigationItemComponent>): void {

        // store the query list for future lookups
        this._items = items;

        // create new focus key manager with horizontal orientation
        this._focusManager = new FocusKeyManager<PageHeaderNavigationItemComponent>(items)
            .withHorizontalOrientation('ltr');

        // make the first item tabbable initially
        this._focusManager.updateActiveItemIndex(0);

        // on changes ensure there is always an active item
        this._items.changes.subscribe(() => {
            if (this._items.length > 0 && this._items.toArray().indexOf(this._focusManager.activeItem) === -1) {
                this._focusManager.updateActiveItemIndex(0);
            }
        });
    }

    /** Listen for keyboard events */
    onKeydown(event: KeyboardEvent): void {
        this._focusManager.onKeydown(event);
    }

    /** Determine the tab index of a given item */
    getTabIndex(item: PageHeaderNavigationItemComponent): number {

        // until the focus key manager is set up make everything tabbable
        if (!this._items) {
            return 0;
        }

        // get the index within the query list
        const index = this._items.toArray().indexOf(item);

        // if it is the current active element then it is tabbable
        return index === this._focusManager.activeItemIndex ? 0 : -1;
    }

}