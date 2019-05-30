import { FocusKeyManager } from '@angular/cdk/a11y';
import { Injectable, OnDestroy, QueryList } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { PageHeaderNavigationItemComponent } from './navigation-item/navigation-item.component';

@Injectable()
export class PageHeaderNavigationService implements OnDestroy {

    /** Store an instance of the focus key manager */
    private _focusManager: FocusKeyManager<PageHeaderNavigationItemComponent>;

    /** Store the query list */
    private _items: QueryList<PageHeaderNavigationItemComponent>;

    /**
     * Emit when focus changes. We can't directly use the FocusKeyManager
     * `change` observable as it cannot be instantiate until after the view
     * has been instantiated.
     */
    private _onChange = new Subject<void>();

    /** Unsubscribe on destroy */
    private _onDestroy = new Subject<void>();

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /** Make menu items navigable using arrow keys */
    initialize(items: QueryList<PageHeaderNavigationItemComponent>): void {

        // store the query list for future lookups
        this._items = items;

        // create new focus key manager with horizontal orientation
        this._focusManager = new FocusKeyManager<PageHeaderNavigationItemComponent>(items)
            .withHorizontalOrientation('ltr');

        // listen for changes to the focused item
        this._focusManager.change.pipe(takeUntil(this._onDestroy)).subscribe(() => this._onChange.next());

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

    /** Get the tab index for this item as an observable */
    getTabIndex(item: PageHeaderNavigationItemComponent): Observable<number> {
        return this._onChange.pipe(map(() => this.getItemTabIndex(item)));
    }

    /** Determine the tab index of a given item */
    private getItemTabIndex(item: PageHeaderNavigationItemComponent): number {

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