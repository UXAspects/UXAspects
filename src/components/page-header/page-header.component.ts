import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef } from '@angular/core';
import { ColorService } from '../../services/color/index';
import { Breadcrumb } from '../breadcrumbs/index';
import { PageHeaderCustomMenuDirective } from './custom-menu/custom-menu.directive';
import { PageHeaderNavigationItem } from './navigation/navigation.component';

@Component({
    selector: 'ux-page-header',
    exportAs: 'ux-page-header',
    templateUrl: 'page-header.component.html'
})
export class PageHeaderComponent {

    @Input() logo: string;
    @Input() items: PageHeaderNavigationItem[];
    @Input() header: string;
    @Input() alignment: 'left' | 'right' | 'center' = 'center';
    @Input() condensed: boolean = false;
    @Input() iconMenus: PageHeaderIconMenu[];
    @Input() backVisible: boolean = true;
    @Input() secondaryNavigation: boolean = false;

    @Input() set crumbs(crumbs: Breadcrumb[]) {
        this._crumbs = crumbs;
    }

    get crumbs(): Breadcrumb[] {
        return this.condensed ? [...this._crumbs, { title: this.header }] : this._crumbs;
    }

    @Input()
    set familyBackground(color: string) {
        this._familyBackground = this._colorService.resolve(color);
    }

    get familyBackground(): string {
        return this._familyBackground;
    }

    @Input()
    set familyForeground(color: string) {
        this._familyForeground = this._colorService.resolve(color);
    }

    get familyForeground(): string {
        return this._familyForeground;
    }
    
    @Output() backClick = new EventEmitter();

    @ContentChildren(PageHeaderCustomMenuDirective, { read: TemplateRef }) customMenus: QueryList<TemplateRef<any>>;

    selected: PageHeaderNavigationItem;

    private _crumbs: Breadcrumb[] = [];
    private _familyBackground: string;
    private _familyForeground: string;

    constructor(private _colorService: ColorService) {}

    goBack() {
        this.backClick.emit();
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