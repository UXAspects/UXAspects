import { browser } from 'protractor';
import { imageCompare } from '../common/image-compare';
import { MediaPlayerPage } from './media-player.po.spec';

describe('Media Player Tests', () => {
    let page: MediaPlayerPage;

    beforeEach(async () => {
        page = new MediaPlayerPage();
        await page.getPage();
    });

    it('should have the correct initial state', async () => {
        expect(await imageCompare('media-player-initial')).toEqual(0);
    });

    it('should show subtitles popover on mouse click', async () => {

        // click the button
        await page.actionBtn.click();

        // the popover should now be visible
        expect(await page.popover.isPresent()).toBe(true);
        expect(await imageCompare('media-player-subtitles-open')).toEqual(0);
        browser.ignoreSynchronization = false;
    });

    it('should hide subtitles popover on mouse click', async () => {

        // click the button
        await page.actionBtn.click();

        // the popover should now be visible
        expect(await page.popover.isPresent()).toBe(true);

        // click the button again
        await page.actionBtn.click();

        // the popover should now be visible
         expect(await page.popover.isPresent()).toBe(false);
    });
});
