import { EventEmitter, QueryList, TemplateRef } from '@angular/core';
import { Breadcrumb } from '../breadcrumbs/index';
import { PageHeaderNavigationItem } from './navigation/navigation.component';
import { ColorService } from '../../services/color/index';
export declare class PageHeaderComponent {
    private _colorService;
    logo: string;
    items: PageHeaderNavigationItem[];
    crumbs: Breadcrumb[];
    header: string;
    alignment: 'left' | 'right' | 'center';
    condensed: boolean;
    iconMenus: PageHeaderIconMenu[];
    backVisible: boolean;
    familyBackground: string;
    familyForeground: string;
    backClick: EventEmitter<{}>;
    customMenus: QueryList<TemplateRef<any>>;
    private _familyBackground;
    private _familyForeground;
    constructor(_colorService: ColorService);
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
