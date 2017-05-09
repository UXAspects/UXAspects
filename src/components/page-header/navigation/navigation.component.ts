import { Component, Input, ViewChildren, QueryList } from '@angular/core';
import { PageHeaderNavigationItemComponent } from './navigation-item/navigation-item.component';

@Component({
    selector: 'ux-page-header-horizontal-navigation',
    templateUrl: './navigation.component.html'
})
export class PageHeaderNavigationComponent {
    
    @ViewChildren(PageHeaderNavigationItemComponent) menuItems: QueryList<PageHeaderNavigationItemComponent>;
     
    @Input() items: PageHeaderNavigationItem[];

    onSelect(item: PageHeaderNavigationItem) {
        
        if (item.select) {
            item.select.call(item, item);
        }

        // deselect all items in all menus
        this.deselectAll();
    }

    deselectAll() {
        this.items.forEach(item => this.deselect(item));
    }

    deselect(navItem: PageHeaderNavigationItem | PageHeaderNavigationDropdownItem) {
        
        // deselect the current item
        navItem.selected = false;

        // iterate any children and deselect them
        if (navItem.children) {
            navItem.children.forEach(item => this.deselect(item));
        }
    }

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