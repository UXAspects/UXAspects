import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
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

    private _onDestroy = new Subject();

    constructor(private _router: Router) {

        this.selected$
            .pipe(takeUntil(this._onDestroy), map(selected => this.getRoot(selected)))
            .subscribe(root => this.selectedRoot$.next(root));

        this._router.events
            .pipe(takeUntil(this._onDestroy), filter(e => e instanceof NavigationEnd))
            .subscribe(this.updateItemsWithActiveRoute.bind(this));
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    select(item: PageHeaderNavigationItem): void {

        if (!item) {
            return;
        }

        if (item.routerLink) {

            // Trigger router navigation
            const routerLink = Array.isArray(item.routerLink) ? item.routerLink : [item.routerLink];
            this._router.navigate(routerLink, item.routerExtras);

        } else if (this.secondaryNavigationAutoselect && item.children && item.children.length > 0) {

            // Select the first child in secondaryNavigationAutoselect mode
            this.select(item.children[0]);

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
        item.selected = item === selected || this.isParentOf(selected, item);

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
        // If nothing is set as selected, using the initial route
        const initialSelectedItem = items.find(item => item.selected === true);
        if (initialSelectedItem) {
            this.select(initialSelectedItem);
        } else {
            this.updateItemsWithActiveRoute();
        }
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

    private updateItemsWithActiveRoute(): void {
        const selected = this.findActiveItem(this.items$.getValue());
        if (selected) {
            this.selected$.next(selected);
        }
    }

    private findActiveItem(items: PageHeaderNavigationItem[]): PageHeaderNavigationItem {
        for (var item of items) {
            if (item.routerLink && this.isRouterLinkActive(item)) {
                return item;
            }
            if (item.children) {
                const activeItem = this.findActiveItem(item.children);
                if (activeItem) {
                    return activeItem;
                }
            }
        }

        return null;
    }

    private isRouterLinkActive(item: PageHeaderNavigationItem): boolean {
        const routerLink = Array.isArray(item.routerLink) ? item.routerLink : [item.routerLink];
        const urlTree = this._router.createUrlTree(routerLink, item.routerExtras);

        return this._router.isActive(urlTree, true);
    }
}

export type PageHeaderNavigation = PageHeaderNavigationItem | PageHeaderNavigationDropdownItem;
