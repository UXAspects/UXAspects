import { QueryList } from '@angular/core';
import { PageHeaderNavigationItemComponent } from './navigation-item/navigation-item.component';
export declare class PageHeaderNavigationComponent {
    menuItems: QueryList<PageHeaderNavigationItemComponent>;
    items: PageHeaderNavigationItem[];
    onSelect(item: PageHeaderNavigationItem): void;
    deselectAll(): void;
    deselect(navItem: PageHeaderNavigationItem | PageHeaderNavigationDropdownItem): void;
}
export interface PageHeaderNavigationItem {
    icon?: string;
    title: string;
    selected?: boolean;
    select?: (item: PageHeaderNavigationItem) => void;
    children?: PageHeaderNavigationDropdownItem[];
}
export interface PageHeaderNavigationDropdownItem {
    title: string;
    selected?: boolean;
    select?: (item: PageHeaderNavigationDropdownItem) => void;
    children?: PageHeaderNavigationDropdownItem[];
}
