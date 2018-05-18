import { Component, EventEmitter, Input, OnDestroy, Output, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { debounceTime } from 'rxjs/operators';
import { PageHeaderNavigationDropdownItem } from '../navigation.component';
import { PageHeaderService } from '../../page-header.service';
import { MenuNavigationDirective } from '../../../../directives/menu-navigation/index';

@Component({
    selector: 'ux-page-header-horizontal-navigation-dropdown-item',
    exportAs: 'ux-page-header-horizontal-navigation-dropdown-item',
    templateUrl: './navigation-dropdown-item.component.html'
})
export class PageHeaderNavigationDropdownItemComponent implements OnDestroy {

    @Input() item: PageHeaderNavigationDropdownItem;

    @ViewChild('button')
    button: ElementRef;

    @ViewChild('menuNavigation')
    menuNavigation: MenuNavigationDirective;

    dropdownOpen: boolean = false;

    private _subscription: Subscription;
    private _hover$: Subject<boolean> = new Subject<boolean>();

    constructor(private _pageHeaderService: PageHeaderService) {

        // subscribe to stream with a debounce (a small debounce is all that is required)
        this._subscription = this._hover$.pipe(debounceTime(1)).subscribe(visible => this.dropdownOpen = visible);

        // Close submenus when selected item changes
        this._subscription.add(
            _pageHeaderService.selected$.subscribe(() => {
                this.dropdownOpen = false;
            })
        );
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    select(item: PageHeaderNavigationDropdownItem) {

        // clicking on an item with children then return
        if (item.children) {
            return;
        }

        // emit the selected item in an event
        this._pageHeaderService.select(item);
    }

    focus(): void {
        this.button.nativeElement.focus();
    }

    hoverStart() {
        this._hover$.next(true);
    }

    hoverLeave() {
        this._hover$.next(false);
    }

    close() {
        this.dropdownOpen = false;
    }

    keyupHandler(event: KeyboardEvent, item: PageHeaderNavigationDropdownItem): void {

        let handled = false;

        switch (event.key) {
            case 'Enter':
            case ' ':
                this.select(item);
                handled = true;
                break;
        }

        if (handled) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    submenuKeyupHandler(event: KeyboardEvent): void {

        let handled = false;

        switch (event.key) {
            case 'Enter':
            case ' ':
            case 'ArrowRight':
                this.dropdownOpen = true;
                setTimeout(() => {
                    this.menuNavigation.focusFirst();
                });
                handled = true;
                break;
        }

        if (handled) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
}