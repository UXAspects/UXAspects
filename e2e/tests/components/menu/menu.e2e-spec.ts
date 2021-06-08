import { browser } from 'protractor';
import { imageCompare } from '../common/image-compare';
import { MenuPage } from './menu.po.spec';

describe('Menu', () => {

    let page: MenuPage;

    beforeEach(async () => {
        page = new MenuPage();
        await page.getPage();
    });

    it('should change menu placement after initialization', async () => {

        // open menu and expect placement to be to the left
        await browser.actions().mouseMove(page.openMenuBtn).click().perform();
        expect(await imageCompare('menu-placement-left')).toEqual(0);

        // close menu and click change placement button
        await browser.actions().mouseMove(page.openMenuBtn).click().perform();
        await browser.actions().mouseMove(page.togglePlacementBtn).click().perform();

        // open menu and expect placement to be to the right
        await browser.actions().mouseMove(page.openMenuBtn).click().perform();
        expect(await imageCompare('menu-placement-right')).toEqual(0);
    });
});
