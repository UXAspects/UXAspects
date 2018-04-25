import { OnDestroy } from '@angular/core';
import { PageHeaderNavigationDropdownItem } from '../navigation.component';
import { PageHeaderService } from '../../page-header.service';
export declare class PageHeaderNavigationDropdownItemComponent implements OnDestroy {
    private _pageHeaderService;
    item: PageHeaderNavigationDropdownItem;
    dropdownOpen: boolean;
    private _subscription;
    private _hover$;
    constructor(_pageHeaderService: PageHeaderService);
    ngOnDestroy(): void;
    select(item: PageHeaderNavigationDropdownItem): void;
    hoverStart(): void;
    hoverLeave(): void;
    close(): void;
}
