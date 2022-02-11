import { $, browser } from 'protractor';

export class MenuPage {

    placementLeftBtn = $('#placement-left');
    placementRightBtn = $('#placement-right');
    placementTopBtn = $('#placement-top');
    placementBottomBtn = $('#placement-bottom');

    submenuPlacementLeftBtn = $('#submenu-placement-left');
    submenuPlacementRightBtn = $('#submenu-placement-right');
    submenuPlacementTopBtn = $('#submenu-placement-top');
    submenuPlacementBottomBtn = $('#submenu-placement-bottom');

    openMenuBtn = $('#open-menu');
    topFocusBtn = $('#top-focus');
    closeOnBlurBtn = $('#closeOnBlur');

    menuItem1 = $('#menu-item-1');
    menuItem2 = $('#menu-item-2');
    menuItem3 = $('#menu-item-3');
    menuItem4 = $('#menu-item-4');

    async getPage(): Promise<void> {
        await browser.get('#/menu');
    }

    async activeElementAttr(attr: string): Promise<string> {
        return await browser.driver.switchTo().activeElement().getAttribute(attr);
    };
}