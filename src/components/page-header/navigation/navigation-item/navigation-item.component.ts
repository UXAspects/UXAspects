import { Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { MenuNavigationToggleDirective } from '../../../../directives/menu-navigation/menu-navigation-toggle.directive';
import { PageHeaderService } from '../../page-header.service';
import { PageHeaderNavigationDropdownItemComponent } from '../navigation-dropdown-item/navigation-dropdown-item.component';
import { PageHeaderNavigationItem } from '../navigation.component';

@Component({
    selector: 'ux-page-header-horizontal-navigation-item',
    templateUrl: './navigation-item.component.html'
})
export class PageHeaderNavigationItemComponent implements OnInit, OnDestroy {

    @ViewChild('button') button: MenuNavigationToggleDirective;
    @ViewChild('menu') menu: BsDropdownDirective;
    @ViewChildren(PageHeaderNavigationDropdownItemComponent) dropdowns: QueryList<PageHeaderNavigationDropdownItemComponent>;

    @Input() item: PageHeaderNavigationItem;

    secondary$: BehaviorSubject<boolean> = this._pageHeaderService.secondary$;

    isOpen: boolean;

    private _subscription: Subscription;

    constructor(
        public elementRef: ElementRef,
        private _pageHeaderService: PageHeaderService
    ) { }

    ngOnInit() {

        // Close submenus when selected item changes
        this._subscription = this._pageHeaderService.selected$.subscribe((next) => {
            if (next && this.isOpen) {
                this.isOpen = false;

                // If menu was closed, keep focus on the toggle button
                this.button.focus();
            }
        });

        if (this.menu) {
            this._subscription.add(
                this.menu.onHidden.subscribe(() => this.dropdowns.forEach(dropdown => dropdown.close()))
            );
        }
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    select() {

        // if the item has children then do nothing at this stage
        if (this.item.children && this._pageHeaderService.secondary$.getValue() === false) {
            return;
        }

        // otherwise select the current item
        this._pageHeaderService.select(this.item);
    }
}