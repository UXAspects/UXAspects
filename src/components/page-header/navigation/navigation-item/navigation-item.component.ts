import { Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
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

    private _onDestroy = new Subject();

    constructor(
        public elementRef: ElementRef,
        private _pageHeaderService: PageHeaderService
    ) { }

    ngOnInit() {

        this._pageHeaderService.selected$.pipe(takeUntil(this._onDestroy)).subscribe(next => {

            // Update selected state for this item
            this._pageHeaderService.updateItem(this.item, next);

            if (next && this.isOpen) {
                this.isOpen = false;

                // If menu was closed, keep focus on the toggle button
                this.button.focus();
            }
        });

        if (this.menu) {
            this.menu.onHidden
                .pipe(takeUntil(this._onDestroy))
                .subscribe(() => this.dropdowns.forEach(dropdown => dropdown.close()));
        }
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    select(): void {

        // if the item has children then do nothing at this stage
        if (this.item.children && this._pageHeaderService.secondary$.getValue() === false) {
            return;
        }

        // otherwise select the current item
        this._pageHeaderService.select(this.item);
    }
}