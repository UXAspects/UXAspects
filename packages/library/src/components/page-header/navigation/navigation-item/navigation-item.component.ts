import { Component, Input, ViewChild, ViewChildren, QueryList, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { PageHeaderNavigationDropdownItemComponent } from '../navigation-dropdown-item/navigation-dropdown-item.component';
import { PageHeaderNavigationItem, PageHeaderNavigationDropdownItem } from '../navigation.component';

@Component({
    selector: 'ux-page-header-horizontal-navigation-item',
    templateUrl: './navigation-item.component.html'
})
export class PageHeaderNavigationItemComponent implements OnInit {

    @ViewChild('menu') menu: BsDropdownDirective;
    @ViewChildren(PageHeaderNavigationDropdownItemComponent) dropdownComponents: QueryList<PageHeaderNavigationDropdownItemComponent>;

    @Input() item: PageHeaderNavigationItem;
    @Output() onSelect: EventEmitter<PageHeaderNavigationDropdownItem> = new EventEmitter<PageHeaderNavigationDropdownItem>();

    constructor(public elementRef: ElementRef) {}

    ngOnInit() {
        this.menu.onHidden.subscribe(() => this.dropdownComponents.forEach(dropdown => dropdown.close()));
    }

    selectItem() {

        // if the item has children then do nothing at this stage 
        if (this.item.children) {
            return;
        }

        // otherwise select the current item
        this.onItemSelect(this.item);
    }

    onItemSelect(item: PageHeaderNavigationItem | PageHeaderNavigationDropdownItem) {
        this.onSelect.emit(item);

        // select the current item
        this.item.selected = true;
    }
}