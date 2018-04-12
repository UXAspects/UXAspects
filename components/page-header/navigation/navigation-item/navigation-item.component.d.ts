import { ElementRef, OnDestroy, OnInit, QueryList } from '@angular/core';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { PageHeaderService } from '../../page-header.service';
import { PageHeaderNavigationDropdownItemComponent } from '../navigation-dropdown-item/navigation-dropdown-item.component';
import { PageHeaderNavigationItem } from '../navigation.component';
export declare class PageHeaderNavigationItemComponent implements OnInit, OnDestroy {
    elementRef: ElementRef;
    private _pageHeaderService;
    menu: BsDropdownDirective;
    dropdowns: QueryList<PageHeaderNavigationDropdownItemComponent>;
    item: PageHeaderNavigationItem;
    secondary$: BehaviorSubject<boolean>;
    private _subscription;
    constructor(elementRef: ElementRef, _pageHeaderService: PageHeaderService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    select(): void;
}
