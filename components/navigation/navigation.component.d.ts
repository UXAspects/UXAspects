import { TemplateRef } from '@angular/core';
import { NavigationItem } from './navigation-item.inferface';
import { NavigationService } from './navigation.service';
export declare class NavigationComponent {
    private _navigationService;
    /** The navigation items to populate the menu with. */
    items: NavigationItem[];
    /** Whether to present the menu as a hierarchical tree. */
    tree: boolean;
    /** Whether to collapse other menu items when expanding a menu item. */
    autoCollapse: boolean;
    navigationItemTemplate: TemplateRef<any>;
    hierarchyClasses: string[];
    readonly depthLimit: number;
    constructor(_navigationService: NavigationService);
    itemClick(item: NavigationItem, event: Event): void;
    /**
     * Returns true if the sets of items needs to be indented to make room for one or more expander.
     */
    needsIndent(items: NavigationItem[]): boolean;
}
