import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { PageHeaderNavigationDropdownItem } from '../navigation.component';

@Component({
    selector: 'ux-page-header-horizontal-navigation-dropdown-item',
    templateUrl: './navigation-dropdown-item.component.html'
})
export class PageHeaderNavigationDropdownItemComponent {

    @Input() item: PageHeaderNavigationDropdownItem;
    @Output() onSelect: EventEmitter<PageHeaderNavigationDropdownItem> = new EventEmitter<PageHeaderNavigationDropdownItem>();

    dropdownOpen: boolean = false;

    private dropdownEvents: Subject<boolean>;

    constructor() {

        // create a new subject observable
        this.dropdownEvents = new Subject<boolean>();

        // subscribe to stream with a debounce (a small debounce is all that is required)
        this.dropdownEvents.debounceTime(1).subscribe(visible => this.dropdownOpen = visible);
    }

    selectItem(item: PageHeaderNavigationDropdownItem, parentItem?: PageHeaderNavigationDropdownItem) {

        // clicking on an item with children then return
        if (item.children) {
            return;
        }

        // emit the selected item in an event
        this.onSelect.emit(item);

        // select the current item
        item.selected = true;

        // now also select the parent menu
        if (parentItem) {
            parentItem.selected = true;
        }
    }

    hoverStart() {
        this.dropdownEvents.next(true);
    }

    hoverLeave() {
        this.dropdownEvents.next(false);
    }

    close() {
        this.dropdownOpen = false;
    }
}