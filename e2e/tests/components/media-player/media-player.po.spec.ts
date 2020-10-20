import { $, browser, by, element } from 'protractor';

export class MediaPlayerPage {
    actionBtn = $('.action-button');
    popover = $('.popover');

    async getPage(): Promise<void> {
        await browser.get('#/media-player');
    }
}
