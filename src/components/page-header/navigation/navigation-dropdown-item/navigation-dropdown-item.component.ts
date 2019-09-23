import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { Component, Input } from '@angular/core';
import { PageHeaderService } from '../../page-header.service';
import { PageHeaderNavigationDropdownItem } from '../navigation.component';

@Component({
    selector: 'ux-page-header-horizontal-navigation-dropdown-item',
    exportAs: 'ux-page-header-horizontal-navigation-dropdown-item',
    templateUrl: './navigation-dropdown-item.component.html'
})
export class PageHeaderNavigationDropdownItemComponent {

    /** Access the data for this item */
    @Input() item: PageHeaderNavigationDropdownItem;

    constructor(private _pageHeaderService: PageHeaderService) { }

    select(item: PageHeaderNavigationDropdownItem): void {

        // clicking on an item that is disabled or with children then return
        if (item.disabled || item.children) {
            return;
        }

        // emit the selected item in an event
        this._pageHeaderService.select(item);
    }

    keydownHandler(event: KeyboardEvent, item: PageHeaderNavigationDropdownItem): void {

        switch (event.which) {
            case ENTER:
            case SPACE:
                this.select(item);
                event.preventDefault();
                event.stopPropagation();
                break;
        }
    }
}