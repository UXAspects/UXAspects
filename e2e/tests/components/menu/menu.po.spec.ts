import { $, browser } from 'protractor';

export class MenuPage {

    menu = $('menu');
    togglePlacementBtn = $('#placement-change');
    openMenuBtn = $('#open-menu > span');

    async getPage(): Promise<void> {
        await browser.get('#/menu');
    }
}
