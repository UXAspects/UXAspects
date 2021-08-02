import { browser } from 'protractor';
import { imageCompare } from '../common/image-compare';
import { MenuPage } from './menu.po.spec';

describe('Menu', () => {

    let page: MenuPage;

    beforeEach(async () => {
        page = new MenuPage();
        await page.getPage();
    });

    it('should initialize with placement to the left', async () => {
        await page.openMenuBtn.click();
        expect(await imageCompare('menu-dynamic-placement-left')).toEqual(0);
    });

    it('should change menu placement to right after initialization', async () => {
        await page.placementRightBtn.click();
        await page.openMenuBtn.click();
        expect(await imageCompare('menu-dynamic-placement-right')).toEqual(0);
    });

    it('should change menu placement to bottom after initialization', async () => {
        await page.placementBottomBtn.click();
        await page.openMenuBtn.click();
        expect(await imageCompare('menu-dynamic-placement-bottom')).toEqual(0);
    });

    it('should change menu placement to top after initialization', async () => {
        await page.placementTopBtn.click();
        await page.openMenuBtn.click();
        expect(await imageCompare('menu-dynamic-placement-top')).toEqual(0);
    });

    it('should change menu placement to left after initialization', async () => {
        // first change placement to right
        await page.placementRightBtn.click();

        await page.placementLeftBtn.click();
        await page.openMenuBtn.click();
        expect(await imageCompare('menu-dynamic-placement-left')).toEqual(0);
    });

    describe('- sub menu', () => {

        it('should open the submenu when the menu is open', async () => {
            await page.openMenuBtn.click();

            await browser.actions().mouseMove(page.menuItem1).perform();
            expect(await imageCompare('menu-sub-menu-item1-open')).toEqual(0);
        });

        it('should open the submenu 2 when the submenu 1 is open with the same uxMenuTriggerFor', async () => {
            await page.openMenuBtn.click();

            await browser.actions().mouseMove(page.menuItem1).perform();
            await browser.actions().mouseMove(page.menuItem2).perform();

            await browser.sleep(500);
            expect(await imageCompare('menu-sub-menu-item2-open')).toEqual(0);
        });

        it('should open the submenu 3 when the submenu 2 is open with a different uxMenuTriggerFor', async () => {
            await page.openMenuBtn.click();

            await browser.actions().mouseMove(page.menuItem2).perform();
            await browser.actions().mouseMove(page.menuItem3).perform();

            await browser.sleep(500);
            expect(await imageCompare('menu-sub-menu-item3-open')).toEqual(0);
        });
    });

});
