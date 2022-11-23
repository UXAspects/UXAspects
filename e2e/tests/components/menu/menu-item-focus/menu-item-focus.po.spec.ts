import { $, $$, browser } from 'protractor';

export class MenuItemFocusPage {

    menuTrigger = $('#open-menu');
    topFocus = $('#top-focus');
    cdkOverlayContainer = $('.cdk-overlay-container');
    menu = $('.ux-menu');
    disableCheckbox = $('#disable-checkbox');

    // Component Inputs
    toggleSwitch = $('.ux-menu ux-toggleswitch');
    checkboxes = $$('.cdk-overlay-container ux-checkbox');
    radioButtons = $$('ux-radio-button');


    async getPage() {
        return await browser.get('#/menu/menu-item-focus');
    }

    async activeElementAttr(attr: string): Promise<string> {
        return await browser.driver.switchTo().activeElement().getAttribute(attr);
    };
}
