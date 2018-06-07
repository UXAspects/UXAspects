import { OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { PageHeaderIconMenu } from './interfaces';
import { PageHeaderNavigationDropdownItem, PageHeaderNavigationItem } from './navigation/navigation.component';
export declare class PageHeaderService implements OnDestroy {
    items$: BehaviorSubject<PageHeaderNavigationItem[]>;
    selected$: BehaviorSubject<PageHeaderNavigationItem>;
    selectedRoot$: BehaviorSubject<PageHeaderNavigationItem>;
    secondary$: BehaviorSubject<boolean>;
    activeIconMenu$: BehaviorSubject<PageHeaderIconMenu>;
    private _subscription;
    constructor();
    ngOnDestroy(): void;
    select(item: PageHeaderNavigationItem): void;
    deselect(item: PageHeaderNavigationItem | PageHeaderNavigationDropdownItem): void;
    deselectAll(): void;
    setItems(items?: PageHeaderNavigationItem[]): void;
    setSecondaryNavigation(enabled: boolean): void;
    private getRoot(item);
    private setParent(item, parent?);
    private selectParents(item);
    private isParentOf(node, parent);
}
export declare type PageHeaderNavigation = PageHeaderNavigationItem | PageHeaderNavigationDropdownItem;
