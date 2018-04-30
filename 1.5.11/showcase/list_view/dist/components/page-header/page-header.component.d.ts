import { EventEmitter, OnDestroy, OnInit, QueryList, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ColorService } from '../../services/color/index';
import { Breadcrumb } from '../breadcrumbs/index';
import { PageHeaderNavigationItem } from './navigation/navigation.component';
import { PageHeaderNavigation, PageHeaderService } from './page-header.service';
export declare class PageHeaderComponent implements OnInit, OnDestroy {
    private _colorService;
    private _pageHeaderService;
    logo: string;
    header: string;
    alignment: 'left' | 'right' | 'center';
    condensed: boolean;
    iconMenus: PageHeaderIconMenu[];
    backVisible: boolean;
    secondaryNavigationAlignment: string;
    secondaryNavigationAutoselect: boolean;
    items: PageHeaderNavigationItem[];
    secondaryNavigation: boolean;
    crumbs: Breadcrumb[];
    familyBackground: string;
    familyForeground: string;
    backClick: EventEmitter<{}>;
    customMenus: QueryList<TemplateRef<any>>;
    selected$: BehaviorSubject<PageHeaderNavigationItem>;
    selectedRoot$: BehaviorSubject<PageHeaderNavigationItem>;
    private _crumbs;
    private _familyBackground;
    private _familyForeground;
    private _subscription;
    constructor(_colorService: ColorService, _pageHeaderService: PageHeaderService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    goBack(): void;
    select(item: PageHeaderNavigation): void;
}
export interface PageHeaderIconMenu {
    icon: string;
    badge?: number | string;
    select?: (menu: PageHeaderIconMenu) => void;
    dropdown?: PageHeaderIconMenuDropdownItem[];
}
export interface PageHeaderIconMenuDropdownItem {
    icon?: string;
    title: string;
    subtitle?: string;
    header?: boolean;
    divider?: boolean;
    select?: () => void;
}
