import { Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuNavigationToggleDirective } from '../../../directives/menu-navigation/menu-navigation-toggle.directive';
import { PageHeaderIconMenu, PageHeaderIconMenuDropdownItem } from '../interfaces';
import { PageHeaderService } from '../page-header.service';

@Component({
    selector: 'ux-page-header-icon-menu',
    templateUrl: './icon-menu.component.html'
})
export class PageHeaderIconMenuComponent implements OnDestroy {

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

    @ViewChild('menuNavigationToggle') menuNavigationToggle: MenuNavigationToggleDirective;

    private _isOpen: boolean;
    private _subscription: Subscription;

    constructor(private _service: PageHeaderService) {
        this._subscription = _service.activeIconMenu$.subscribe((next) => {
            // Close all but the most recently opened menu
            if (next !== this.menu) {
                this._isOpen = false;
            }
        });
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
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