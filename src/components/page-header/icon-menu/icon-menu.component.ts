import { Component, Input, ViewChild } from '@angular/core';
import { MenuNavigationToggleDirective } from '../../../directives/menu-navigation/menu-navigation-toggle.directive';
import { PageHeaderIconMenu, PageHeaderIconMenuDropdownItem } from '../interfaces';
import { PageHeaderService } from '../page-header.service';

@Component({
    selector: 'ux-page-header-icon-menu',
    templateUrl: './icon-menu.component.html'
})
export class PageHeaderIconMenuComponent {

    @Input() menu: PageHeaderIconMenu;

    get isOpen(): boolean {
        return this._isOpen;
    }

    set isOpen(value: boolean) {
        this._isOpen = value;
        if (value) {
            this._service.activeIconMenu$.next(this.menu);
        }
    }

    @ViewChild('menuNavigationToggle')
    menuNavigationToggle: MenuNavigationToggleDirective;

    private _isOpen: boolean;

    constructor(private _service: PageHeaderService) {
        _service.activeIconMenu$.subscribe((next) => {
            // Close all but the most recently opened menu
            if (next !== this.menu) {
                this._isOpen = false;
            }
        });
    }

    select(item: PageHeaderIconMenu | PageHeaderIconMenuDropdownItem) {
        if (item.select) {
            item.select.call(item, item);
        }
    }

    keydownHandler(item: PageHeaderIconMenu | PageHeaderIconMenuDropdownItem, event: KeyboardEvent): void {

        switch (event.key) {
            case 'Enter':
            case ' ':
                this.select(item);
                this.isOpen = false;
                this.menuNavigationToggle.focus();
                event.preventDefault();
                event.stopPropagation();
                break;
        }
    }
}