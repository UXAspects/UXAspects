import { Component, ContentChild, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ColorService } from '../../services/color/index';
import { Breadcrumb } from '../breadcrumbs/index';
import { PageHeaderCustomMenuDirective } from './custom-menu/custom-menu.directive';
import { PageHeaderIconMenu } from './interfaces';
import { PageHeaderNavigationItem } from './navigation/navigation.component';
import { PageHeaderNavigation, PageHeaderService } from './page-header.service';

@Component({
    selector: 'ux-page-header',
    exportAs: 'ux-page-header',
    templateUrl: 'page-header.component.html',
    providers: [ PageHeaderService ]
})
export class PageHeaderComponent {

    @Input() logo: string;
    @Input() header: string;
    @Input() title: string;
    @Input() alignment: 'left' | 'right' | 'center' = 'center';
    @Input() condensed: boolean = false;
    @Input() iconMenus: PageHeaderIconMenu[];
    @Input() backVisible: boolean = true;
    @Input() secondaryNavigationAlignment: 'left' | 'right' | 'center' = 'center';

    @Input()
    set secondaryNavigationAutoselect(value: boolean) {
        this._pageHeaderService.secondaryNavigationAutoselect = value;
    }

    get secondaryNavigationAutoselect(): boolean {
        return this._pageHeaderService.secondaryNavigationAutoselect;
    }

    @Input()
    set items(items: PageHeaderNavigationItem[]) {
        this._pageHeaderService.setItems(items);
    }

    @Input()
    set secondaryNavigation(enabled: boolean) {
        this._pageHeaderService.setSecondaryNavigation(enabled);
    }

    get secondaryNavigation(): boolean {
        return this._pageHeaderService.secondary$.getValue();
    }

    @Input()
    set crumbs(crumbs: Breadcrumb[]) {
        this._crumbs = crumbs;
    }

    get crumbs(): Breadcrumb[] {
        return this.condensed ? [...this._crumbs, { title: this.header }] : this._crumbs;
    }

    @Input() crumbsStyle: 'standard' | 'small' = 'standard';

    @Input()
    set logoBackground(color: string) {
        this._logoBackground = this._colorService.resolve(color);
    }

    get logoBackground(): string {
        return this._logoBackground;
    }

    @Input()
    set logoForeground(color: string) {
        this._logoForeground = this._colorService.resolve(color);
    }

    get logoForeground(): string {
        return this._logoForeground;
    }

    @Input()
    set familyBackground(color: string) {
        this.logoBackground = color;
    }

    @Input()
    set familyForeground(color: string) {
        this.logoForeground = color;
    }

    @Output() backClick = new EventEmitter();

    @ContentChild('title') titleTemplate: TemplateRef<any>;

    @ContentChildren(PageHeaderCustomMenuDirective, { read: TemplateRef }) customMenus: QueryList<TemplateRef<any>>;

    selected$: BehaviorSubject<PageHeaderNavigationItem> = this._pageHeaderService.selected$;
    selectedRoot$: BehaviorSubject<PageHeaderNavigationItem> = this._pageHeaderService.selectedRoot$;

    private _crumbs: Breadcrumb[] = [];
    private _logoBackground: string;
    private _logoForeground: string;

    constructor(private _colorService: ColorService, private _pageHeaderService: PageHeaderService) { }

    goBack(): void {
        this.backClick.emit();
    }

    select(item: PageHeaderNavigation): void {
        this._pageHeaderService.select(item);
    }
}