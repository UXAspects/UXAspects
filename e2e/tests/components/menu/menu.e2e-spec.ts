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

});
