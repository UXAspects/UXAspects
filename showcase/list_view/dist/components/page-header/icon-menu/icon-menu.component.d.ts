import { OnDestroy } from '@angular/core';
import { MenuNavigationToggleDirective } from '../../../directives/menu-navigation/menu-navigation-toggle.directive';
import { PageHeaderIconMenu, PageHeaderIconMenuDropdownItem } from '../interfaces';
import { PageHeaderService } from '../page-header.service';
export declare class PageHeaderIconMenuComponent implements OnDestroy {
    private _service;
    menu: PageHeaderIconMenu;
    isOpen: boolean;
    menuNavigationToggle: MenuNavigationToggleDirective;
    private _isOpen;
    private _subscription;
    constructor(_service: PageHeaderService);
    ngOnDestroy(): void;
    select(item: PageHeaderIconMenu | PageHeaderIconMenuDropdownItem): void;
    keydownHandler(item: PageHeaderIconMenu | PageHeaderIconMenuDropdownItem, event: KeyboardEvent): void;
}
