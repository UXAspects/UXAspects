import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { NavigationItem } from './navigation-item.inferface';

@Injectable()
export class NavigationService implements OnDestroy {

    /** The navigation items to populate the menu with */
    items: NavigationItem[];

    /** Whether to collapse other menu items when expanding a menu item. */
    autoCollapse: boolean = true;

    /** Emit when the expanded state has changed */
    expanded$ = new Subject<void>();

    ngOnDestroy(): void {
        this.expanded$.complete();
    }

    /** Set the expanded state of an item */
    setExpanded(source: NavigationItem, expanded: boolean): void {
        if (expanded && this.autoCollapse) {
            this.collapseSiblings(source);
            this.expanded$.next();
        }
    }

    /** Collapse all siblings nodes */
    private collapseSiblings(source: NavigationItem): void {
        let siblings = this.items;

        for (let item of this.items) {
            const parent = this.getParent(source, item);
            if (parent) {
                siblings = parent.children;
                break;
            }
        }

        // collapse every sibling
        siblings.filter(item => item !== source).forEach(item => this.collapseAll(item));
    }

    /** Collapse an item and all its children */
    private collapseAll(item: NavigationItem): void {
        item.expanded = false;
        if (item.children) {
            item.children.forEach(child => this.collapseAll(child));
        }
    }

    /** Get a nodes parent if it has one */
    private getParent(target: NavigationItem, item: NavigationItem): NavigationItem | null {
        return (item.children || []).find(child => child === target) ? item : null;
    }
}