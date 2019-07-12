import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { Component, Input } from '@angular/core';
import { PageHeaderIconMenu, PageHeaderIconMenuDropdownItem } from '../interfaces';

@Component({
    selector: 'ux-page-header-icon-menu',
    templateUrl: './icon-menu.component.html'
})
export class PageHeaderIconMenuComponent {

    /** Get the data for this icon menu */
    @Input() menu: PageHeaderIconMenu;

    select(item: PageHeaderIconMenu | PageHeaderIconMenuDropdownItem) {
        if (item.select) {
            item.select.call(item, item);
        }
    }

    keydownHandler(item: PageHeaderIconMenu | PageHeaderIconMenuDropdownItem, event: KeyboardEvent): void {
        switch (event.keyCode) {
            case ENTER:
            case SPACE:
                this.select(item);
                event.preventDefault();
                event.stopPropagation();
                break;
        }
    }
}