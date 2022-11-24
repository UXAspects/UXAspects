import { Component } from '@angular/core';

@Component({
    selector: 'uxd-menu-item-focus',
    templateUrl: './menu-item-focus.testpage.component.html',
    styleUrls: ['./menu-item-focus.testpage.component.less']
})
export class MenuItemFocusTestPageComponent {
    radioSelected: string = 'option1';
    toggleSwitchValue: boolean = false;

    radioOptions = {
        option1: 'option1',
        option2: 'option2',
        option3: 'option3',
    };

    checkOptions = {
        option1: true,
        option2: false,
        option3: false,
    };

    disabled = false;
}
