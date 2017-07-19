import { EventEmitter } from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import { PageHeaderNavigationDropdownItem } from '../navigation.component';
export declare class PageHeaderNavigationDropdownItemComponent {
    item: PageHeaderNavigationDropdownItem;
    onSelect: EventEmitter<PageHeaderNavigationDropdownItem>;
    dropdownOpen: boolean;
    private dropdownEvents;
    constructor();
    selectItem(item: PageHeaderNavigationDropdownItem, parentItem?: PageHeaderNavigationDropdownItem): void;
    hoverStart(): void;
    hoverLeave(): void;
    close(): void;
}
