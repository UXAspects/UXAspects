import { Component, Input } from '@angular/core';
import { PageHeaderIconMenu, PageHeaderIconMenuDropdownItem } from '../page-header.component';

@Component({
    selector: 'ux-page-header-icon-menu',
    templateUrl: './icon-menu.component.html'
})
export class PageHeaderIconMenuComponent {

    @Input() menu: PageHeaderIconMenu;

    isOpen: boolean;

    select(item: PageHeaderIconMenu | PageHeaderIconMenuDropdownItem) {
        if (item.select) {
            item.select.call(item, item);
        }
    }
}