import { Injectable } from '@angular/core';
import { NavigationItem } from './navigation-item.inferface';

@Injectable()
export class NavigationService {

    items: NavigationItem[];

    autoCollapse: boolean = true;

    setExpanded(source: NavigationItem, expanded: boolean): void {
        if (expanded && this.autoCollapse) {
            this.collapseSiblings(source);
        }
    }

    private collapseSiblings(source: NavigationItem): void {
        let siblings = this.items;
        for (let item of this.items) {
            const parent = this.getParent(source, item);
            if (parent) {
                siblings = parent.children;
                break;
            }
        }

        for (let item of siblings) {
            if (item !== source) {
                this.collapseAll(item);
            }
        }
    }

    private collapseAll(item: NavigationItem): void {
        item.expanded = false;
        if (item.children) {
            for (let child of item.children) {
                this.collapseAll(child);
            }
        }
    }

    private getParent(target: NavigationItem, item: NavigationItem): NavigationItem {
        if (item.children) {
            for (let child of item.children) {
                if (child === target) {
                    return item;
                }
            }
        }

        return null;
    }
}