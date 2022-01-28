import { $$, browser, by, element, Key } from 'protractor';
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

    it('should invoke href links when anchor tags are used as the menuItem', async () => {
        await page.openMenuBtn.click();

        await page.menuItem4.click();

        const alert = await browser.switchTo().alert();

        expect(await alert.getText()).toBe('href works!');

        await alert.accept();
    });

    it('should tab to the next tabbable item and close the menu when pressing the tab key on a menu item', async () => {
        // first change placement to bottom
        await page.placementBottomBtn.click();

        // tab to menu and open it with the keyboard
        await page.topFocusBtn.click();
        await browser.actions().sendKeys(Key.TAB).perform();
        await browser.actions().sendKeys(Key.ARROW_DOWN).perform();

        // expect menu to be open
        expect(await element(by.className('ux-menu')).isPresent()).toBe(true);

        await browser.actions().sendKeys(Key.TAB).perform();

        // expect menu to be closed and focus to be on the next element
        expect(await element(by.className('ux-menu')).isPresent()).toBe(false);
        expect(await page.activeElementAttr('id')).toBe('placement-left');
    });

    it('should tab to the next tabbable item and close the menu when pressing the tab key on a sub menu item', async () => {
        // first change placement to bottom
        await page.placementBottomBtn.click();

        // tab to menu and open it with the keyboard
        await page.topFocusBtn.click();
        await browser.actions().sendKeys(Key.TAB).perform();
        await browser.actions().sendKeys(Key.ARROW_DOWN).perform();
        await browser.actions().sendKeys(Key.ARROW_RIGHT).perform();

        // expect menu and submenu to be open
        expect(await element(by.className('ux-menu')).isPresent()).toBe(true);
        expect((await $$('.ux-menu')).length).toBe(2);

        await browser.actions().sendKeys(Key.TAB).perform();

        // expect menu to be closed
        expect(await element(by.className('ux-menu')).isPresent()).toBe(false);
        expect(await page.activeElementAttr('id')).toBe('placement-left');
    });

    describe('- closeOnBlur (false)', () => {

        it('should not close the menu when tabbed away from the menu', async () => {
            // tab to menu and open it with the keyboard
            await page.topFocusBtn.click();
            await browser.actions().sendKeys(Key.TAB).perform();
            await browser.actions().sendKeys(Key.SPACE).perform();
            await browser.actions().sendKeys(Key.TAB).perform();

            // check menu open
            expect(await element(by.className('ux-menu')).isPresent()).toBe(true);
        });
    });

    describe('- closeOnBlur (true)', () => {

        beforeEach(async () => {
            await page.closeOnBlurBtn.click();
        });

        it('should close the menu when tabbed away from the menu', async () => {
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
            await browser.actions().sendKeys(Key.ARROW_LEFT).perform();
            await browser.actions().sendKeys(Key.ARROW_RIGHT).perform();

            // check menu open and submenu are open
            expect((await $$('.ux-menu')).length).toBe(2);
        });
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

        it('should open the submenu on the left when the placement is set to the left', async () => {
            // Change menu placement to the right to allow for room to open the submenu
            await page.placementRightBtn.click();

            await page.submenuPlacementLeftBtn.click();

            await page.openMenuBtn.click();
            await browser.actions().mouseMove(page.menuItem1).perform();

            expect(await imageCompare('menu-sub-menu-item1-open-left')).toEqual(0);
        });

        it('should open the submenu on the right when the placement is set to the top', async () => {
            await page.submenuPlacementTopBtn.click();

            await page.openMenuBtn.click();
            await browser.actions().mouseMove(page.menuItem1).perform();

            expect(await imageCompare('menu-sub-menu-item1-open-right')).toEqual(0);
        });

        it('should open the submenu on the right when the placement is set to the bottom', async () => {
            await page.submenuPlacementBottomBtn.click();

            await page.openMenuBtn.click();
            await browser.actions().mouseMove(page.menuItem1).perform();

            expect(await imageCompare('menu-sub-menu-item1-open-right')).toEqual(0);
        });
    });

});
