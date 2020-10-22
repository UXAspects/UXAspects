import { $, browser } from 'protractor';

export class MediaPlayerPage {
    mediaPlayer = $('#media-player');
    actionBtn = this.mediaPlayer.$$('.action-button');
    popover = this.mediaPlayer.$$('.popover');

    async getPage(): Promise<void> {
        await browser.get('#/media-player');
    }

    async clickSubtitles(): Promise<void> {
        return this.actionBtn.click();
    }
}
