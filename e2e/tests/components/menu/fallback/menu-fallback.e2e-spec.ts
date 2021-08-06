import { imageCompare } from '../../common/image-compare';
import { MenuFallbackPage } from './menu-fallback.po.spec';

describe('Menu (Fallback) Tests', () => {

    let page: MenuFallbackPage;

    beforeEach(async () => {
        page = new MenuFallbackPage();
        await page.getPage();
    });

    it('should fallback to right when left is unavailable', async () => {
        await page.leftMenu.click();

        expect(await page.cdkOverlayContainer.isPresent()).toBe(true);
        expect(await imageCompare('menu-fallback-right')).toEqual(0);
    });

    it('should fallback to left when right is unavailable', async () => {
        await page.rightMenu.click();

        expect(await page.cdkOverlayContainer.isPresent()).toBe(true);
        expect(await imageCompare('menu-fallback-left')).toEqual(0);
    });

    it('should fallback to bottom when top is unavailable', async () => {
        await page.topMenu.click();

        expect(await page.cdkOverlayContainer.isPresent()).toBe(true);
        expect(await imageCompare('menu-fallback-bottom')).toEqual(0);
    });

    it('should fallback to top when bottom is unavailable', async () => {
        await page.bottomMenu.click();

        expect(await page.cdkOverlayContainer.isPresent()).toBe(true);
        expect(await imageCompare('menu-fallback-top')).toEqual(0);
    });
});
