import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { debounceTime } from 'rxjs/operators';
import { PageHeaderNavigationDropdownItem } from '../navigation.component';
import { PageHeaderService } from '../../page-header.service';

@Component({
    selector: 'ux-page-header-horizontal-navigation-dropdown-item',
    templateUrl: './navigation-dropdown-item.component.html'
})
export class PageHeaderNavigationDropdownItemComponent implements OnDestroy {

    @Input() item: PageHeaderNavigationDropdownItem;
    
    dropdownOpen: boolean = false;
    
    private _subscription: Subscription;
    private _hover$: Subject<boolean> = new Subject<boolean>();

    constructor(private _pageHeaderService: PageHeaderService) {

        // subscribe to stream with a debounce (a small debounce is all that is required)
        this._subscription = this._hover$.pipe(debounceTime(1)).subscribe(visible => this.dropdownOpen = visible);
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

    hoverStart() {
        this._hover$.next(true);
    }

    hoverLeave() {
        this._hover$.next(false);
    }

    close() {
        this.dropdownOpen = false;
    }
}