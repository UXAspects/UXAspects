import { Component, Input, ViewEncapsulation } from '@angular/core';
import { PageHeaderIconMenu, PageHeaderIconMenuDropdownItem } from '../page-header.component';

@Component({
    selector: 'ux-page-header-icon-menu',
    templateUrl: './icon-menu.component.html',
    styleUrls: ['./icon-menu.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class PageHeaderIconMenuComponent {

    @Input() menu: PageHeaderIconMenu;

    select(item: PageHeaderIconMenu | PageHeaderIconMenuDropdownItem) {
        if (item.select) {
            item.select.call(item, item);
        }
    }
}