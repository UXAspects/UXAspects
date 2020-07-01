import { Component, ContentChild, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ColorService } from '../../services/color/index';
import { Breadcrumb } from '../breadcrumbs/index';
import { PageHeaderCustomMenuDirective } from './custom-menu/custom-menu.directive';
import { PageHeaderIconMenu } from './interfaces';
import { PageHeaderNavigationItem } from './navigation/navigation.component';
import { PageHeaderNavigation, PageHeaderService } from './page-header.service';

export type NavigationAlignment = 'left' | 'right' | 'center';

@Component({
    selector: 'ux-page-header',
    exportAs: 'ux-page-header',
    templateUrl: 'page-header.component.html',
    providers: [PageHeaderService]
})
export class PageHeaderComponent {

    /** The path to an image to display as the product logo in the left corner. */
    @Input() logo: string;

    /** The product acronym to display in the left corner. This will only be displayed if logo is unset; otherwise it will be used as the alt text for the logo. */
    @Input() header: string;

    /** The optional header to display on the left side of the masthead. */
    @Input() subheader: string;

    /** The alignment of the primary navigation tabs. */
    @Input() alignment: NavigationAlignment;

    /** Determines whether or not to display the page header in the regular or condensed form. */
    @Input() condensed: boolean = false;

    /** The list of icon menus to display in the top right area of the page header. */
    @Input() iconMenus: PageHeaderIconMenu[];

    /** Determines whether or not a back button should be visible in the page header. */
    @Input() backVisible: boolean = true;

    /** The alignment of the secondary navigation tabs. */
    _secondaryNavigationAlignment: NavigationAlignment;

    @Input()
    set secondaryNavigationAlignment(value: NavigationAlignment) {
        this._secondaryNavigationAlignment = value;
    }

    get secondaryNavigationAlignment(): NavigationAlignment {
        let alignment = this._secondaryNavigationAlignment;

        if (
            (alignment === 'left' && this.secondaryNavigationLeadingContentTemplate) ||
            (alignment === 'right' && this.secondaryNavigationTrailingContentTemplate)
         ) {
            alignment = 'center';
        }

        return alignment;
    }

    /** If set, the first child item will get selected when the parent item is selected. */
    @Input()
    set secondaryNavigationAutoselect(value: boolean) {
        this._pageHeaderService.secondaryNavigationAutoselect = value;
    }

    get secondaryNavigationAutoselect(): boolean {
        return this._pageHeaderService.secondaryNavigationAutoselect;
    }

    /** The primary navigation tabs. Use the children property in combination with [secondaryNavigation]="true" to include secondary navigation tabs. */
    @Input()
    set items(items: PageHeaderNavigationItem[]) {
        this._pageHeaderService.setItems(items);
    }

    /** Whether to show a second level of navigation for any items with children. */
    @Input()
    set secondaryNavigation(enabled: boolean) {
        this._pageHeaderService.setSecondaryNavigation(enabled);
    }

    get secondaryNavigation(): boolean {
        return this._pageHeaderService.secondary$.getValue();
    }

    /** The optional set of breadcrumbs to display on the left side of the masthead. */
    @Input()
    set crumbs(crumbs: Breadcrumb[]) {
        this._crumbs = crumbs;
    }

    get crumbs(): Breadcrumb[] {
        return this.condensed ? [...this._crumbs, { title: this.header }] : this._crumbs;
    }

    /**
     * The style of the breadcrumbs.
     *   - standard: The breadcrumbs use the same styling as the navigation tabs.
     *   - small: The breadcrumbs use a smaller font, and case is not adjusted.
     */
    @Input() crumbsStyle: 'standard' | 'small' = 'standard';

    /** The logo background color. This can either be the name of a color from the color palette, or a CSS color value. */
    @Input()
    set logoBackground(color: string) {
        this._logoBackground = this._colorService.resolve(color);
    }

    get logoBackground(): string {
        return this._logoBackground;
    }

    /** The logo text color, when a product acronym is specified via header. This can either be the name of a color from the color palette, or a CSS color value. */
    @Input()
    set logoForeground(color: string) {
        this._logoForeground = this._colorService.resolve(color);
    }

    get logoForeground(): string {
        return this._logoForeground;
    }

    get _hasLogoClick(): boolean {
        return this.logoClick.observers.length > 0;
    }

    /** Emit whenever the back button is clicked */
    @Output() backClick = new EventEmitter<MouseEvent>();

    /** Emit whenever the product logo in the left corner is clicked. */
    @Output() logoClick = new EventEmitter<MouseEvent>();

    /** Access a custom subheader template */
    @ContentChild('subheader', { static: false }) subheaderTemplate: TemplateRef<any>;

    /** Define a custom logo template  */
    @ContentChild('logoTemplate', { static: false }) logoTemplate: TemplateRef<any>;

    /** Define a leading content secondary navigation template */
    @ContentChild('secondaryNavigationLeadingContent', { static: false }) secondaryNavigationLeadingContentTemplate: TemplateRef<any>;

    /** Define a trailing content secondary navigation template */
    @ContentChild('secondaryNavigationTrailingContent', { static: false }) secondaryNavigationTrailingContentTemplate: TemplateRef<any>;

    /** Access all the custom menu TemplateRefs */
    @ContentChildren(PageHeaderCustomMenuDirective, { read: TemplateRef }) customMenus: QueryList<TemplateRef<any>>;

    /** The currently selected page header item */
    selected$: BehaviorSubject<PageHeaderNavigationItem> = this._pageHeaderService.selected$;

    /** The currently selected root menu item - this may be different from selected$ if a child menu item is selected */
    selectedRoot$: BehaviorSubject<PageHeaderNavigationItem> = this._pageHeaderService.selectedRoot$;

    private _crumbs: Breadcrumb[] = [];
    private _logoBackground: string;
    private _logoForeground: string;

    constructor(private _colorService: ColorService, private _pageHeaderService: PageHeaderService) { }

    select(item: PageHeaderNavigation): void {
        this._pageHeaderService.select(item);
    }
}
