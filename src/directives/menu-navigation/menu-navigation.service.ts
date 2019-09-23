import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuNavigationItemDirective } from './menu-navigation-item.directive';

@Injectable()
export class MenuNavigationService {

    /** Store a list of items that belong to this menu */
    menuItems: ReadonlyArray<MenuNavigationItemDirective> = [];

    /** Store the current active menu item */
    active$ = new BehaviorSubject<MenuNavigationItemDirective>(null);

    /** Add an item to this menu */
    register(menuItem: MenuNavigationItemDirective): void {
        this.menuItems = [...this.menuItems, menuItem];
    }

    /** Remove an item from the list of menu items */
    unregister(menuItem: MenuNavigationItemDirective): void {
        this.menuItems = this.menuItems.filter(_menuItem => _menuItem !== menuItem);
    }
}