import { Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { PageHeaderService } from '../../page-header.service';
import { PageHeaderNavigationDropdownItem } from '../navigation.component';

@Component({
    selector: 'ux-page-header-horizontal-navigation-dropdown-item',
    exportAs: 'ux-page-header-horizontal-navigation-dropdown-item',
    templateUrl: './navigation-dropdown-item.component.html'
})
export class PageHeaderNavigationDropdownItemComponent implements OnDestroy {

    @Input() item: PageHeaderNavigationDropdownItem;

    @ViewChild('button')
    button: ElementRef;

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

        // clicking on an item that is disabled or with children then return
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

    keydownHandler(event: KeyboardEvent, item: PageHeaderNavigationDropdownItem): void {

        switch (event.key) {
            case 'Enter':
            case ' ':
                this.select(item);
                event.preventDefault();
                event.stopPropagation();
                break;
        }
    }
}