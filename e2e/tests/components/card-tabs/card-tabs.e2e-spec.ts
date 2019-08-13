import { browser, Key } from 'protractor';
import { imageCompare } from '../common/image-compare';
import { CardTabsPage } from './card-tabs.po.spec';

describe('Card Tab Tests', () => {

    let page: CardTabsPage;

    beforeEach(() => {
        page = new CardTabsPage();
        page.getPage();
    });

    it('should have correct initial states', async () => {

        // only the first tab should be selected initially
        expect(await page.getTabSelected(0)).toBe(true);
        expect(await page.getTabSelected(1)).toBe(false);
        expect(await page.getTabSelected(2)).toBe(false);
        expect(await page.getTabSelected(3)).toBe(false);
        expect(await page.getTabSelected(4)).toBe(false);

        // the initial position should be 'top'
        expect(await page.getPosition()).toBe('top');

        // expect the tab content to be correct
        expect(await page.getTabContent()).toBe('Tab 1 Content');

        // screenshot the page
        expect(await imageCompare('card-tabs-initial')).toEqual(0);
    });

    it('should select a card on click', async () => {

        // the first tab should initially be selected
        expect(await page.getTabSelected(0)).toBe(true);
        expect(await page.getTabSelected(1)).toBe(false);

        // get the tab element
        const tab = await page.getTab(1);

        // click on the tab
        await tab.click();

        // the secpnd tab to be selected
        expect(await page.getTabSelected(0)).toBe(false);
        expect(await page.getTabSelected(1)).toBe(true);

        // expect the tab content to be updated
        expect(await page.getTabContent()).toBe('Tab 2 Content');
    });

    it('should select a card on enter', async () => {

        // the first tab should initially be selected
        expect(await page.getTabSelected(0)).toBe(true);
        expect(await page.getTabSelected(1)).toBe(false);

        // tab to the second card
        await browser.actions().sendKeys(Key.TAB).sendKeys(Key.TAB).sendKeys(Key.ENTER).perform();

        // the secpnd tab to be selected
        expect(await page.getTabSelected(0)).toBe(false);
        expect(await page.getTabSelected(1)).toBe(true);

        // expect the tab content to be updated
        expect(await page.getTabContent()).toBe('Tab 2 Content');
    });

    it('should show more items on next button click', async () => {

        // initial scroll position should be 0
        expect(await page.getScrollPosition()).toBe(0);

        // scroll to next page
        await page.nextBtn.click();

        // wait for the animations to finish
        await browser.sleep(500);

        // get the scroll position now
        expect(await page.getScrollPosition()).toBe(-400);

        expect(await imageCompare('card-tabs-show-more')).toEqual(0);
    });

    it('should be able to scroll back again', async () => {

        // initial scroll position should be 0
        expect(await page.getScrollPosition()).toBe(0);

        // scroll to next page
        await page.nextBtn.click();

        // wait for the animations to finish
        await browser.sleep(500);

        // get the scroll position now
        expect(await page.getScrollPosition()).toBe(-400);

        // scroll to next page
        await page.previousBtn.click();

        // wait for the animations to finish
        await browser.sleep(500);

        // get the scroll position now
        expect(await page.getScrollPosition()).toBe(0);

        expect(await imageCompare('card-tabs-click-show-less')).toEqual(0);
    });

    it('should be able to change the position', async () => {

        // get the current position
        expect(await page.getPosition()).toBe('top');

        await page.positionBtn.click();

        // get the current position
        expect(await page.getPosition()).toBe('bottom');

        expect(await imageCompare('card-tabs-position')).toEqual(0);
    });

});