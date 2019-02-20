import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { PageHeaderService } from '../../page-header.service';
import { PageHeaderNavigationDropdownItem } from '../navigation.component';

@Component({
    selector: 'ux-page-header-horizontal-navigation-dropdown-item',
    exportAs: 'ux-page-header-horizontal-navigation-dropdown-item',
    templateUrl: './navigation-dropdown-item.component.html'
})
export class PageHeaderNavigationDropdownItemComponent implements OnDestroy {

    @Input() item: PageHeaderNavigationDropdownItem;

    @ViewChild('button') button: ElementRef;

    dropdownOpen: boolean = false;

    private _hover$ = new Subject<boolean>();
    private _onDestroy = new Subject<void>();

    constructor(private _pageHeaderService: PageHeaderService) {

        // subscribe to stream with a debounce (a small debounce is all that is required)
        this._hover$.pipe(takeUntil(this._onDestroy), debounceTime(1)).subscribe(visible => this.dropdownOpen = visible);

        // Close submenus when selected item changes
        _pageHeaderService.selected$.pipe(takeUntil(this._onDestroy)).subscribe(() => this.dropdownOpen = false);
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    select(item: PageHeaderNavigationDropdownItem): void {

        // clicking on an item that is disabled or with children then return
        if (item.disabled || item.children) {
            return;
        }

        // emit the selected item in an event
        this._pageHeaderService.select(item);
    }

    focus(): void {
        this.button.nativeElement.focus();
    }

    hoverStart(): void {
        this._hover$.next(true);
    }

    hoverLeave(): void {
        this._hover$.next(false);
    }

    close(): void {
        this.dropdownOpen = false;
    }

    keydownHandler(event: KeyboardEvent, item: PageHeaderNavigationDropdownItem): void {

        switch (event.which) {
            case ENTER:
            case SPACE:
                this.select(item);
                event.preventDefault();
                event.stopPropagation();
                break;
        }
    }
}