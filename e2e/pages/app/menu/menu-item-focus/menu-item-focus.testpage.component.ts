import { Component } from '@angular/core';

@Component({
    selector: 'uxd-menu-item-focus',
    templateUrl: './menu-item-focus.testpage.component.html',
    styleUrls: ['./menu-item-focus.testpage.component.less']
})
export class MenuItemFocusTestPageComponent {
    radioSelected: number | string | object = 100;

    radioOptions = {
        option1: 100,
        option2: 'string',
        option3: {
            test: 1
        },
        option4: 'Wrap-Text'
    };

    checkOptions = {
        option1: true,
        option2: false,
        option3: false,
    };

    disabled = false;
}
