import { $, browser } from 'protractor';

export class MenuPage {

    placementLeftBtn = $('#placement-left');
    placementRightBtn = $('#placement-right');
    placementTopBtn = $('#placement-top');
    placementBottomBtn = $('#placement-bottom');
    openMenuBtn = $('#open-menu');

    async getPage(): Promise<void> {
        await browser.get('#/menu');
    }
}