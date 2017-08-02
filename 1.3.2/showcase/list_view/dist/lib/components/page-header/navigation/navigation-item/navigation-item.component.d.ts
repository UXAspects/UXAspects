import { QueryList, OnInit, EventEmitter } from '@angular/core';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { PageHeaderNavigationDropdownItemComponent } from '../navigation-dropdown-item/navigation-dropdown-item.component';
import { PageHeaderNavigationItem, PageHeaderNavigationDropdownItem } from '../navigation.component';
export declare class PageHeaderNavigationItemComponent implements OnInit {
    menu: BsDropdownDirective;
    dropdownComponents: QueryList<PageHeaderNavigationDropdownItemComponent>;
    item: PageHeaderNavigationItem;
    onSelect: EventEmitter<PageHeaderNavigationDropdownItem>;
    ngOnInit(): void;
    selectItem(): void;
    onItemSelect(item: PageHeaderNavigationItem | PageHeaderNavigationDropdownItem): void;
}
