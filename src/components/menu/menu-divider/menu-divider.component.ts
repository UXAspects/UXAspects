import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'ux-menu-divider',
    templateUrl: './menu-divider.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        role: 'separator'
    }
})
export class MenuDividerComponent { }
