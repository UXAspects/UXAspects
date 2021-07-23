import { $, browser } from 'protractor';

export class MenuPage {

    placementLeftBtn = $('#placement-left');
    placementRightBtn = $('#placement-right');
    placementTopBtn = $('#placement-top');
    placementBottomBtn = $('#placement-bottom');
    openMenuBtn = $('#open-menu');

    menuItem1 = $('#menu-item-1');
    menuItem2 = $('#menu-item-2');
    menuItem3 = $('#menu-item-3');
    menuItem4 = $('#menu-item-4');

    async getPage(): Promise<void> {
        await browser.get('#/menu');
    }
}