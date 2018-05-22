import { Component, Input, ViewChild } from '@angular/core';
import { MenuNavigationToggleDirective } from '../../../directives/menu-navigation/menu-navigation-toggle.directive';
import { PageHeaderIconMenu, PageHeaderIconMenuDropdownItem } from '../page-header.component';

@Component({
    selector: 'ux-page-header-icon-menu',
    templateUrl: './icon-menu.component.html'
})
export class PageHeaderIconMenuComponent {

    @Input() menu: PageHeaderIconMenu;

    isOpen: boolean;

    @ViewChild('menuNavigationToggle')
    menuNavigationToggle: MenuNavigationToggleDirective;

    select(item: PageHeaderIconMenu | PageHeaderIconMenuDropdownItem) {
        if (item.select) {
            item.select.call(item, item);
        }

        this.isOpen = false;
    }

    keydownHandler(item: PageHeaderIconMenu | PageHeaderIconMenuDropdownItem, event: KeyboardEvent): void {

        switch (event.key) {
            case 'Enter':
            case ' ':
                this.select(item);
                this.menuNavigationToggle.focus();
                event.preventDefault();
                event.stopPropagation();
                break;
        }
    }
}