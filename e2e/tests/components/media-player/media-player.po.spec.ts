import { $, browser } from 'protractor';

export class MediaPlayerPage {

    actionBtn = $('.action-button');
    popover = $('.popover');

    async getPage(): Promise<void> {
        await browser.get('#/media-player');
    }

    async clickSubtitles(): Promise<void> {
        return this.actionBtn.click();
    }
}
