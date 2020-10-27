import { $, browser } from 'protractor';

export class MediaPlayerPage {

    actionBtn = $('.action-button');
    popover = $('.popover');

    async getPage(): Promise<void> {
        browser.ignoreSynchronization = true;
        await browser.get('#/media-player');
    }
}
