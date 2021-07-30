import { browser, by, element, Key } from 'protractor';
import { imageCompare } from '../common/image-compare';
import { MenuPage } from './menu.po.spec';

describe('Menu', () => {

    let page: MenuPage;

    beforeEach(async () => {
        page = new MenuPage();
        await page.getPage();
    });

    it('should initialize with placement to the right', async () => {
        await page.openMenuBtn.click();
        expect(await imageCompare('menu-dynamic-placement-right')).toEqual(0);
    });

    it('should change menu placement to left after initialization', async () => {
        await page.placementLeftBtn.click();
        await page.openMenuBtn.click();
        expect(await imageCompare('menu-dynamic-placement-left')).toEqual(0);
    });

    it('should change menu placement to bottom after initialization', async () => {
        await page.placementBottomBtn.click();
        await page.openMenuBtn.click();
        expect(await imageCompare('menu-dynamic-placement-bottom')).toEqual(0);
    });

    it('should change menu placement to top after initialization', async () => {
        await page.placementTopBtn.click();
        await page.openMenuBtn.click();

        await browser.sleep(500);
        expect(await imageCompare('menu-dynamic-placement-top')).toEqual(0);
    });

    it('should change menu placement to right after initialization', async () => {
        // first change placement to right
        await page.placementLeftBtn.click();

        await page.placementRightBtn.click();
        await page.openMenuBtn.click();
        expect(await imageCompare('menu-dynamic-placement-right')).toEqual(0);
    });

    describe('Menu - Keyboard', () => {

        it('should close the menu when the tabbed away from the menu', async () => {
            // tab to menu and open it with the keyboard
            await page.topFocusBtn.click();
            await browser.actions().sendKeys(Key.TAB).perform();
            await browser.actions().sendKeys(Key.SPACE).perform();

            // check menu open
            expect(await element(by.className('ux-menu')).isPresent()).toBe(true);

            await browser.actions().sendKeys(Key.TAB).perform();

            // check menu closed
            expect(await element(by.className('ux-menu')).isPresent()).toBe(false);
        });

        it('should not close the menu when entering the submenu', async () => {
            // tab to menu and open it with the keyboard
            await page.topFocusBtn.click();
            await browser.actions().sendKeys(Key.TAB).perform();
            await browser.actions().sendKeys(Key.SPACE).perform();
            await browser.actions().sendKeys(Key.ARROW_RIGHT).perform();
            await browser.actions().sendKeys(Key.ARROW_RIGHT).perform();

            // check menu open
            expect(await element(by.className('ux-menu')).isPresent()).toBe(true);
        });
    });

});