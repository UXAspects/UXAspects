import { AfterViewInit, ElementRef, OnDestroy, QueryList } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ResizeService } from '../../../directives/resize/index';
import { PageHeaderNavigation, PageHeaderService } from '../page-header.service';
import { PageHeaderNavigationItemComponent } from './navigation-item/navigation-item.component';
export declare class PageHeaderNavigationComponent implements AfterViewInit, OnDestroy {
    private _pageHeaderService;
    menuItems: QueryList<PageHeaderNavigationItemComponent>;
    items$: BehaviorSubject<PageHeaderNavigationItem[]>;
    indicatorVisible: boolean;
    indicatorX: number;
    indicatorWidth: number;
    private _subscription;
    constructor(elementRef: ElementRef, resizeService: ResizeService, _pageHeaderService: PageHeaderService);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    updateSelectedIndicator(): void;
}
export interface PageHeaderNavigationItem {
    icon?: string;
    title: string;
    selected?: boolean;
    routerLink?: string | any[];
    routerExtras?: NavigationExtras;
    select?: (item: PageHeaderNavigationItem) => void;
    children?: PageHeaderNavigationDropdownItem[];
    parent?: PageHeaderNavigation;
}
export interface PageHeaderNavigationDropdownItem {
    title: string;
    selected?: boolean;
    routerLink?: string | any[];
    routerExtras?: NavigationExtras;
    select?: (item: PageHeaderNavigationDropdownItem) => void;
    children?: PageHeaderNavigationDropdownItem[];
    parent?: PageHeaderNavigation;
}
export interface PageHeaderSecondaryNavigationItem extends PageHeaderNavigationDropdownItem {
}
