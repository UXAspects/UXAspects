import { imageCompare } from '../../common/image-compare';
import { PopoverFallbackPage } from './popover-fallback.po.spec';

describe('Popover (Fallback) Tests', () => {

    let page: PopoverFallbackPage;

    beforeEach(async () => {
        page = new PopoverFallbackPage();
        await page.getPage();
    });

    it('should have the correct initial fallback appearance', async () => {
        expect(await imageCompare('popover-fallback-initial')).toBe(0);
    });

    it('should fallback to right when left is unavailable', async () => {
        expect(await page.cdkOverlayContainer.isPresent()).toBe(true);
        expect(await page.popoverHasClass(page.leftPopoverContent, 'right')).toBe(true);
    });

    it('should fallback to left when right is unavailable', async () => {
        expect(await page.cdkOverlayContainer.isPresent()).toBe(true);
        expect(await page.popoverHasClass(page.rightPopoverContent, 'left')).toBe(true);
    });

    it('should fallback to top when bottom is unavailable', async () => {
        expect(await page.cdkOverlayContainer.isPresent()).toBe(true);
        expect(await page.popoverHasClass(page.bottomPopoverContent, 'top')).toBe(true);
    });

    it('should fallback to bottom when top is unavailable', async () => {
        expect(await page.cdkOverlayContainer.isPresent()).toBe(true);
        expect(await page.popoverHasClass(page.topPopoverContent, 'bottom')).toBe(true);
    });

});
