import { ElementRef, OnDestroy } from '@angular/core';
import { PageHeaderService } from '../../page-header.service';
import { PageHeaderNavigationDropdownItem } from '../navigation.component';
export declare class PageHeaderNavigationDropdownItemComponent implements OnDestroy {
    private _pageHeaderService;
    item: PageHeaderNavigationDropdownItem;
    button: ElementRef;
    dropdownOpen: boolean;
    private _subscription;
    private _hover$;
    constructor(_pageHeaderService: PageHeaderService);
    ngOnDestroy(): void;
    select(item: PageHeaderNavigationDropdownItem): void;
    focus(): void;
    hoverStart(): void;
    hoverLeave(): void;
    close(): void;
    keydownHandler(event: KeyboardEvent, item: PageHeaderNavigationDropdownItem): void;
}
