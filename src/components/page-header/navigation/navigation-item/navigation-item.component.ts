import { FocusableOption } from '@angular/cdk/a11y';
import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MenuNavigationToggleDirective } from '../../../../directives/menu-navigation/menu-navigation-toggle.directive';
import { PageHeaderService } from '../../page-header.service';
import { PageHeaderNavigationDropdownItemComponent } from '../navigation-dropdown-item/navigation-dropdown-item.component';
import { PageHeaderNavigationItem } from '../navigation.component';
import { PageHeaderNavigationService } from '../navigation.service';

@Component({
    selector: 'ux-page-header-horizontal-navigation-item',
    templateUrl: './navigation-item.component.html'
})
export class PageHeaderNavigationItemComponent implements AfterViewInit, OnDestroy, FocusableOption {

    /** Access the data for this dropdown item */
    @Input() item: PageHeaderNavigationItem;

    /** Access the menu navigation toggle directive */
    @ViewChild('button', { static: false }) button: MenuNavigationToggleDirective;

    /** Access the dropdown menu directive */
    @ViewChild('menu', { static: false }) menu: BsDropdownDirective;

    /** Access the navigation button element */
    @ViewChild('navigationBtn', { static: false }) navigationBtn: ElementRef;

    /** Access the dropdown item components */
    @ViewChildren(PageHeaderNavigationDropdownItemComponent) dropdowns: QueryList<PageHeaderNavigationDropdownItemComponent>;

    /** Store the secondary state */
    secondary$: BehaviorSubject<boolean> = this._pageHeaderService.secondary$;

    /** Store the open state of the item dropdown */
    isOpen: boolean;

    /** Update the tabindex based on keyboard input */
    _tabindex: Observable<number> = this._navigationService.getTabIndex(this);

    /** Unsubscribe when the component is destroyed */
    private _onDestroy = new Subject();

    constructor(
        public elementRef: ElementRef,
        private _pageHeaderService: PageHeaderService,
        private _navigationService: PageHeaderNavigationService) { }

    ngAfterViewInit(): void {
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

    focus(): void {
        this.navigationBtn.nativeElement.focus();
    }

    select(): void {

        // if the item is disabled or has children then do nothing at this stage
        if (this.item.disabled || (this.item.children && this._pageHeaderService.secondary$.getValue() === false)) {
            return;
        }

        // otherwise select the current item
        this._pageHeaderService.select(this.item);
    }

    @HostListener('keydown', ['$event'])
    onKeydown(event: KeyboardEvent): void {
        if (event.keyCode === LEFT_ARROW || event.keyCode === RIGHT_ARROW) {
            this._navigationService.onKeydown(event);
        }
    }
}