import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { PageHeaderIconMenu } from './interfaces';
import { PageHeaderNavigationDropdownItem, PageHeaderNavigationItem } from './navigation/navigation.component';

@Injectable()
export class PageHeaderService implements OnDestroy {

    items$ = new BehaviorSubject<PageHeaderNavigationItem[]>([]);
    selected$ = new BehaviorSubject<PageHeaderNavigationItem>(null);
    selectedRoot$ = new BehaviorSubject<PageHeaderNavigationItem>(null);
    secondary$ = new BehaviorSubject<boolean>(false);
    activeIconMenu$ = new BehaviorSubject<PageHeaderIconMenu>(null);
    secondaryNavigationAutoselect = false;

    private _subscription: Subscription;

    constructor() {
        this._subscription = this.selected$.pipe(map(selected => this.getRoot(selected))).subscribe(root => this.selectedRoot$.next(root));
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    select(item: PageHeaderNavigationItem): void {

        if (this.secondaryNavigationAutoselect && item && item.children && item.children.length > 0) {

            // Select the first child in secondaryNavigationAutoselect mode
            this.selected$.next(item.children[0]);

        } else {

            // if we are in secondary navigation mode and we click a parent - dont deselect the child
            if (this.secondary$.getValue() === true && this.isParentOf(this.selected$.getValue(), item)) {
                return;
            }

            // Otherwise select the given item
            this.selected$.next(item);
        }
    }

    deselect(item: PageHeaderNavigationItem | PageHeaderNavigationDropdownItem): void {

        // deselect the current item
        item.selected = false;

        // iterate any children and deselect them
        if (item.children) {
            item.children.forEach(_item => this.deselect(_item));
        }
    }

    deselectAll(): void {
        this.items$.getValue().forEach(item => this.deselect(item));
    }

    updateItem(item: PageHeaderNavigationItem, selected: PageHeaderNavigationItem): void {

        // Item is selected if it is the selected item, or one of the selected item's ancestors.
        item.selected = (item === selected) || this.isParentOf(selected, item);

        if (item === selected) {
            // call the select function if present
            if (item.select) {
                item.select.call(item, item);
            }
        }
    }

    setItems(items: PageHeaderNavigationItem[] = []): void {
        // identify all parent elements
        items.forEach(item => this.setParent(item));

        this.items$.next(items);

        // Set up the initally selected item
        const initialSelectedItem = items.find(item => item.selected === true);
        this.select(initialSelectedItem);
    }

    setSecondaryNavigation(enabled: boolean): void {
        this.secondary$.next(enabled);
    }

    private getRoot(item: PageHeaderNavigation): PageHeaderNavigation {
        return item && item.parent ? this.getRoot(item.parent) : item;
    }

    private setParent(item: PageHeaderNavigation, parent?: PageHeaderNavigation | null): void {
        // set the parent field
        item.parent = parent;

        // call this function recursively on all children
        if (item.children) {
            item.children.forEach(child => this.setParent(child, item));
        }
    }

    private isParentOf(node: PageHeaderNavigation, parent: PageHeaderNavigation): boolean {

        // if there are no parents return false
        if (!node || !node.parent) {
            return false;
        }

        // if the parent is the match we are looking for return true
        if (node.parent === parent) {
            return true;
        }

        // if there are potentially grandparents then check them too
        return this.isParentOf(node.parent, parent);
    }
}

export type PageHeaderNavigation = PageHeaderNavigationItem | PageHeaderNavigationDropdownItem;