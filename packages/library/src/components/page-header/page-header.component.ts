import { Component, EventEmitter, Input, Output, ContentChildren, QueryList, TemplateRef } from '@angular/core';
import { Breadcrumb } from '../breadcrumbs/index';
import { PageHeaderNavigationItem } from './navigation/navigation.component';
import { PageHeaderCustomMenuDirective } from './custom-menu/custom-menu.directive';

@Component({
    selector: 'ux-page-header',
    exportAs: 'ux-page-header',
    templateUrl: 'page-header.component.html',
    host: {
        '[class.page-header-condensed]': 'condensed'
    }
})
export class PageHeaderComponent {

    @Input() logo: string;
    @Input() items: PageHeaderNavigationItem[];
    @Input() crumbs: Breadcrumb[];
    @Input() header: string;
    @Input() alignment: 'left' | 'right' | 'center' = 'center';
    @Input() condensed: boolean = false;
    @Input() iconMenus: PageHeaderIconMenu[];
    @Input() backVisible: boolean = true;
    
    @Output() backClick = new EventEmitter();

    @ContentChildren(PageHeaderCustomMenuDirective, { read: TemplateRef }) customMenus: QueryList<TemplateRef<any>>;

    goBack() {
        this.backClick.emit();
    }

    getCondensedBreadcrumbs(): Breadcrumb[] {
        if (this.crumbs) {

            let crumbs = this.crumbs.slice();
            crumbs.push({ title: this.header });

            return crumbs;
        }

        return [{ title: this.header }];
    }
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