import { QueryList, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { PageHeaderNavigationItemComponent } from './navigation-item/navigation-item.component';
import { ResizeService } from '../../../directives/resize/index';
export declare class PageHeaderNavigationComponent implements AfterViewInit {
    menuItems: QueryList<PageHeaderNavigationItemComponent>;
    items: PageHeaderNavigationItem[];
    indicatorVisible: boolean;
    indicatorX: number;
    indicatorWidth: number;
    constructor(elementRef: ElementRef, resizeService: ResizeService, renderer: Renderer2);
    ngAfterViewInit(): void;
    onSelect(item: PageHeaderNavigationItem): void;
    deselectAll(): void;
    deselect(navItem: PageHeaderNavigationItem | PageHeaderNavigationDropdownItem): void;
    updateSelectedIndicator(): void;
}
export interface PageHeaderNavigationItem {
    icon?: string;
    title: string;
    selected?: boolean;
    select?: (item: PageHeaderNavigationItem) => void;
    children?: PageHeaderNavigationDropdownItem[];
}
export interface PageHeaderNavigationDropdownItem {
    title: string;
    selected?: boolean;
    select?: (item: PageHeaderNavigationDropdownItem) => void;
    children?: PageHeaderNavigationDropdownItem[];
}
