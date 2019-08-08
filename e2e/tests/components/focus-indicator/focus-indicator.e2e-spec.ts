import { browser } from 'protractor';
import { FocusIndicatorButtonsPage } from './focus-indicator.po.spec';

describe('Focus Indicator Tests', () => {

    let page = new FocusIndicatorButtonsPage();

    beforeEach(() => {
        page.getPage();
    });

    it('should have correct initial states', async () => {
        // should now be controlled by the directive
        expect(await page.getFocusIndicatorClass()).toBe(true);

        // should not be initially active
        expect(await page.getFocusIndicatorActiveClass()).toBe(false);

        // the initial indicator state should be false
        expect(await page.getIndicatorLabel()).toBe('false');

        expect(browser.imageComparison.checkScreen('focus-indicator-initial')).toEqual(0);
    });

    it('should not focus on click when mouseFocusIndicator: false', async () => {

        // perform a click on the target element
        await page.target.click();

        // check if the indicator is now active
        expect(await page.getFocusIndicatorActiveClass()).toBe(false);

        // the indicator state should be false
        expect(await page.getIndicatorLabel()).toBe('false');
    });

    it('should focus on click when mouseFocusIndicator: true', async () => {

        // toggle the mouseFocusIndicator state
        await page.mouseToggle.click();

        // perform a click on the target element
        await page.target.click();

        // check if the indicator is now active
        expect(await page.getFocusIndicatorActiveClass()).toBe(true);

        // the indicator state should be false
        expect(await page.getIndicatorLabel()).toBe('true');
    });

    it('should not focus on programmatic focus when programmaticFocusIndicator: false', async () => {

        // perform a programmatic focus on the target element
        await page.setProgrammaticFocus();

        // check if the indicator is now active
        expect(await page.getFocusIndicatorActiveClass()).toBe(false);

        // the indicator state should be false
        expect(await page.getIndicatorLabel()).toBe('false');
    });

    it('should focus on programmatic focus when programmaticFocusIndicator: true', async () => {

        // toggle the programmaticFocusIndicator state
        await page.programmaticToggle.click();

        // perform a programmatic focus on the target element
        await page.setProgrammaticFocus();

        // check if the indicator is now active
        expect(await page.getFocusIndicatorActiveClass()).toBe(true);

        // the indicator state should be false
        expect(await page.getIndicatorLabel()).toBe('true');

        expect(browser.imageComparison.checkScreen('focus-indicator-focused')).toEqual(0);
    });

    it('should not focus on keyboard when keyboardFocusIndicator: false', async () => {

        // focus the container element so pressing tab will bring us to the target next
        await page.setContainerFocused();

        // tab to the target element
        await page.pressTab();

        // check if the indicator is now active
        expect(await page.getFocusIndicatorActiveClass()).toBe(false);

        // the indicator state should be false
        expect(await page.getIndicatorLabel()).toBe('false');
    });

    it('should focus on keyboard when keyboardFocusIndicator: true', async () => {

        // toggle the programmaticFocusIndicator state
        await page.keyboardToggle.click();

        // focus the container element so pressing tab will bring us to the target next
        await page.setContainerFocused();

        // tab to the target element
        await page.pressTab();

        // check if the indicator is now active
        expect(await page.getFocusIndicatorActiveClass()).toBe(true);

        // the indicator state should be false
        expect(await page.getIndicatorLabel()).toBe('true');
    });

});