import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { NavigationItem } from './navigation-item.inferface';
import { NavigationService } from './navigation.service';

@Component({
    selector: 'ux-navigation',
    templateUrl: './navigation.component.html',
    providers: [NavigationService]
})
export class NavigationComponent {

    @Input()
    set items(items: NavigationItem[]) {
        this._navigationService.items = items;
    }
    get items(): NavigationItem[] {
        return this._navigationService.items;
    }

    @Input()
    tree: boolean = true;

    @Input()
    set autoCollapse(autoCollapse: boolean) {
        this._navigationService.autoCollapse = autoCollapse;
    }

    @ContentChild('uxNavigationItem')
    navigationItemTemplate: TemplateRef<any>;

    hierarchyClasses = [
        '',
        'nav-second-level',
        'nav-third-level',
        'nav-fourth-level',
        'nav-fifth-level',
    ];

    get depthLimit(): number {
        return this.tree ? this.hierarchyClasses.length : 2;
    }

    constructor(private _navigationService: NavigationService) { }

    itemClick(item: NavigationItem, event: Event): void {

        // Toggle expanded state (relevant only if it has children)
        item.expanded = !item.expanded;

        // Invoke the custom click handler if specified
        if (item.click) {
            item.click(event, item);
        }
    }

    needsIndent(items: NavigationItem[]): boolean {
        return items && items.some(item => item.children && item.children.length > 0);
    }
}
