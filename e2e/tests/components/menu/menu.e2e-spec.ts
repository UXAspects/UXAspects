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
        expect(await imageCompare('menu-dynamic-placement-left')).toEqual(0);

        // close menu and click change placement to right
        await browser.actions().mouseMove(page.openMenuBtn).click().perform();
        await browser.actions().mouseMove(page.placementRightBtn).click().perform();

        // open menu and expect placement to be to the right
        await browser.actions().mouseMove(page.openMenuBtn).click().perform();
        expect(await imageCompare('menu-dynamic-placement-right')).toEqual(0);

        // close menu and click change placement to bottom
        await browser.actions().mouseMove(page.openMenuBtn).click().perform();
        await browser.actions().mouseMove(page.placementBottomBtn).click().perform();

        // open menu and expect placement to be to the bottom
        await browser.actions().mouseMove(page.openMenuBtn).click().perform();
        expect(await imageCompare('menu-dynamic-placement-bottom')).toEqual(0);

        // close menu and click change placement to top
        await browser.actions().mouseMove(page.openMenuBtn).click().perform();
        await browser.actions().mouseMove(page.placementTopBtn).click().perform();

        // open menu and expect placement to be to the top
        await browser.actions().mouseMove(page.openMenuBtn).click().perform();
        expect(await imageCompare('menu-dynamic-placement-top')).toEqual(0);
    });


});
