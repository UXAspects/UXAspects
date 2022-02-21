import { $, browser } from 'protractor';

export class MenuFallbackPage {

    leftMenu = $('#left-menu');
    rightMenu = $('#right-menu');
    topMenu = $('#top-menu');
    bottomMenu = $('#bottom-menu');
    bottomRightMenu = $('#right-bottom-menu');

    cdkOverlayContainer = $('.cdk-overlay-container');
    menu = $('.ux-menu');

    async getPage() {
        return await browser.get('#/menu/fallback');
    }
}
