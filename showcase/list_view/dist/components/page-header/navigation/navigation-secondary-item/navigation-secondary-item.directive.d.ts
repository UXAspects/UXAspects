import { OnDestroy, OnInit } from '@angular/core';
import { PageHeaderService } from '../../page-header.service';
import { PageHeaderNavigationItem } from '../navigation.component';
export declare class PageHeaderNavigationSecondaryItemDirective implements OnInit, OnDestroy {
    private _pageHeaderService;
    item: PageHeaderNavigationItem;
    private _onDestroy;
    constructor(_pageHeaderService: PageHeaderService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
