import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { getIconType } from '../../common/index';
import { NavigationItem } from './navigation-item.interface';
import { NavigationService } from './navigation.service';

@Component({
    selector: 'ux-navigation',
    templateUrl: './navigation.component.html',
    providers: [NavigationService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false
})
export class NavigationComponent {

    /** The navigation items to populate the menu with. */
    @Input()
    set items(items: NavigationItem[]) {
        this._navigationService.items = items;
    }
    get items(): NavigationItem[] {
        return this._navigationService.items;
    }

    /** Whether to present the menu as a hierarchical tree. */
    @Input() tree: boolean = true;

    /** Whether to collapse other menu items when expanding a menu item. */
    @Input()
    set autoCollapse(autoCollapse: boolean) {
        this._navigationService.autoCollapse = autoCollapse;
    }

    /** Access a custom navigation item template if provided */
    @ContentChild('uxNavigationItem', { static: false }) navigationItemTemplate: TemplateRef<any>;

    /** The classes to be added to each different level */
    _hierarchyClasses = [
        '',
        'nav-second-level',
        'nav-third-level',
        'nav-fourth-level',
        'nav-fifth-level',
    ];

    get _depthLimit(): number {
        return this.tree ? this._hierarchyClasses.length : 2;
    }

    constructor(private _navigationService: NavigationService) { }

    /**
     * Returns true if the sets of items needs to be indented to make room for one or more expander.
     */
    _needsIndent(items: NavigationItem[]): boolean {
        return items && items.some(item => item.children && item.children.length > 0);
    }

    /** Determine the type of icon to display. We support `ux-icon` or `component` */
    _getIconType(item: NavigationItem): string {
        return getIconType(item.icon);
    }
}
