import { browser } from 'protractor';
import { imageCompare } from '../common/image-compare';
import { MediaPlayerPage } from './media-player.po.spec';

describe('Media Player Tests', () => {
    let page: MediaPlayerPage;

    beforeEach(async () => {
        page = new MediaPlayerPage();
        await page.getPage();
        await browser.driver.manage().window().setSize(1320, 800);
    });

    // restore the window to its original size after all these tests have run
    afterAll(async () => {
        await browser.driver.manage().window().setSize(800, 600);
    });

    it('should have the correct initial state', async () => {
        expect(await imageCompare('media-player-initial')).toEqual(0);
    });

    it('should show and hide subtitles popover on mouse click', async () => {

        // click the button
        await page.actionBtn.click();

        // the popover should now be visible
        expect(await page.popover.isPresent()).toBe(true);
        expect(await imageCompare('media-player-subtitles-open')).toEqual(0);
        await page.actionBtn.click();
        expect(await page.popover.isPresent()).toBe(false);
        expect(await imageCompare('media-player-subtitles-close')).toEqual(0);
    });
});
