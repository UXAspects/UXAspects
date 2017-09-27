import { EventEmitter, QueryList, TemplateRef } from '@angular/core';
import { Breadcrumb } from '../breadcrumbs/index';
import { PageHeaderNavigationItem } from './navigation/navigation.component';
export declare class PageHeaderComponent {
    logo: string;
    items: PageHeaderNavigationItem[];
    crumbs: Breadcrumb[];
    header: string;
    alignment: 'left' | 'right' | 'center';
    condensed: boolean;
    iconMenus: PageHeaderIconMenu[];
    backVisible: boolean;
    backClick: EventEmitter<{}>;
    customMenus: QueryList<TemplateRef<any>>;
    goBack(): void;
    getCondensedBreadcrumbs(): Breadcrumb[];
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
