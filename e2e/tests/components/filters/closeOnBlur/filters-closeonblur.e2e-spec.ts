import { browser, Key } from 'protractor';
import { FiltersCloseOnBlurPage } from './filters-closeonblur.po.spec';

describe('Filters - closeOnBlur Tests', () => {

    let page: FiltersCloseOnBlurPage;

    beforeEach(async () => {
        page = new FiltersCloseOnBlurPage();
        await page.getPage();
    });

    it('should tab into the dynamic filter input when closeOnBlur is false', async () => {
        await page.topFocus.click();

        await browser.actions().sendKeys(Key.TAB).perform();
        await browser.actions().sendKeys(Key.ARROW_DOWN).perform();
        await browser.actions().sendKeys(Key.TAB).perform();

        expect(await page.activeElementClasses()).toContain('form-control');

    });

    it('should tab into the dynamic filter input when closeOnBlur is true', async () => {
        await page.closeOnBlur.click();
        await page.topFocus.click();

        await browser.actions().sendKeys(Key.TAB).perform();
        await browser.actions().sendKeys(Key.ARROW_DOWN).perform();
        await browser.actions().sendKeys(Key.TAB).perform();

        expect(await page.activeElementClasses()).toContain('form-control');
    });

    it('should have the correct tab order when closeOnBlur is true', async () => {
        await page.closeOnBlur.click();
        await page.topFocus.click();

        await browser.actions().sendKeys(Key.TAB).perform();
        await browser.actions().sendKeys(Key.TAB).perform();
        await browser.actions().sendKeys(Key.ARROW_DOWN).perform();
        await browser.actions().sendKeys(Key.TAB).perform();

        expect(await page.activeElementClasses()).toContain('ux-checkbox');
    });

});