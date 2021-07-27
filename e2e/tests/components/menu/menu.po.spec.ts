import { $, browser } from 'protractor';

export class MenuPage {

    placementLeftBtn = $('#placement-left');
    placementRightBtn = $('#placement-right');
    placementTopBtn = $('#placement-top');
    placementBottomBtn = $('#placement-bottom');
    openMenuBtn = $('#open-menu');
    topFocusBtn = $('#top-focus');

    async getPage(): Promise<void> {
        await browser.get('#/menu');
    }
}