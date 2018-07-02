import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef } from '@angular/core';
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
    @Input() alignment: 'left' | 'right' | 'center' = 'center';
    @Input() condensed: boolean = false;
    @Input() iconMenus: PageHeaderIconMenu[];
    @Input() backVisible: boolean = true;
    @Input() secondaryNavigationAlignment: string = 'center';

    @Input() set secondaryNavigationAutoselect(value: boolean) {
        this._pageHeaderService.secondaryNavigationAutoselect = value;
    }

    get secondaryNavigationAutoselect(): boolean {
        return this._pageHeaderService.secondaryNavigationAutoselect;
    }

    @Input() set items(items: PageHeaderNavigationItem[]) {
        this._pageHeaderService.setItems(items);
    }

    @Input() set secondaryNavigation(enabled: boolean) {
        this._pageHeaderService.setSecondaryNavigation(enabled);
    }

    get secondaryNavigation(): boolean {
        return this._pageHeaderService.secondary$.getValue();
    }

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

    selected$: BehaviorSubject<PageHeaderNavigationItem> = this._pageHeaderService.selected$;
    selectedRoot$: BehaviorSubject<PageHeaderNavigationItem> = this._pageHeaderService.selectedRoot$;

    private _crumbs: Breadcrumb[] = [];
    private _familyBackground: string;
    private _familyForeground: string;

    constructor(private _colorService: ColorService, private _pageHeaderService: PageHeaderService) { }

    goBack(): void {
        this.backClick.emit();
    }

    select(item: PageHeaderNavigation): void {
        this._pageHeaderService.select(item);
    }
}