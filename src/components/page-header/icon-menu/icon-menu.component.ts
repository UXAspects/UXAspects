import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { getIconType } from '../../../common/index';
import { PageHeaderIconMenu, PageHeaderIconMenuDropdownItem } from '../interfaces';

@Component({
    selector: 'ux-page-header-icon-menu',
    templateUrl: './icon-menu.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageHeaderIconMenuComponent {

    /** Get the data for this icon menu */
    @Input() menu: PageHeaderIconMenu;

    select(item: PageHeaderIconMenu | PageHeaderIconMenuDropdownItem): void {
        if (item.select) {
            item.select.call(item, item);
        }
    }

    keydownHandler(item: PageHeaderIconMenu | PageHeaderIconMenuDropdownItem, event: KeyboardEvent): void {
        switch (event.keyCode) {
            case ENTER:
            case SPACE:
                this.select(item);
                event.preventDefault();
                event.stopPropagation();
                break;
        }
    }

    _getIconType(identifier: string): string {
        return identifier ? getIconType(identifier) : '';
    }
}