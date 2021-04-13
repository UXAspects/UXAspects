import { imageCompare } from '../../common/image-compare';
import { PopoverFallbackPage } from './popover-fallback.po.spec';

describe('Popover with fallback', () => {

    let page: PopoverFallbackPage;

    beforeEach(async () => {
        page = new PopoverFallbackPage();
        await page.getPage();
    });

    it('should appear in fallback positions', async () => {
        expect(await page.cdkOverlayContainer.isPresent()).toBe(true);
        expect(await page.getClassList('left')).toContain('right');
        expect(await page.getClassList('right')).toContain('left');
        expect(await page.getClassList('bottom')).toContain('top');
        expect(await page.getClassList('top')).toContain('bottom');
        expect(await page.getClassList('custom')).toContain('top');
        await imageCompare('popover-fallback');
    });

    it('should appear in fallback positions with arrows', async () => {
        await page.hasArrowCheckbox.click();
        await imageCompare('popover-fallback-arrow');
    });
});
