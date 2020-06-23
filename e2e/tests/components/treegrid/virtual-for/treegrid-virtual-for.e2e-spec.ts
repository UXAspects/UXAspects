import { imageCompare } from '../../common/image-compare';
import { TreeGridVirtualForPage } from './treegrid-virtual-for.po.spec';

describe('Treegrid in virtual for', () => {
    const page = new TreeGridVirtualForPage();

    beforeEach(async () => {
        await page.getPage();
    });

    it('should allow a row to be expanded and contracted', async () => {
        expect(await page.getTotalRowCount()).toBe(1);

        const visibleTitlesContracted = await page.getVisibleTitles();
        expect(visibleTitlesContracted.length).toBe(1);
        expect(visibleTitlesContracted[0]).toBe('Documents');

        await page.clickExpander();

        expect(await page.getTotalRowCount()).toBe(2001);

        const visibleTitlesExpanded = await page.getVisibleTitles();
        expect(visibleTitlesExpanded.length).toBeGreaterThanOrEqual(21); // row height differs between themes
        expect(visibleTitlesExpanded[0]).toBe('Documents');
        expect(visibleTitlesExpanded[20]).toBe('Document 19');

        expect(await imageCompare('treegrid-virtual-for-expanded')).toBe(0);

        await page.clickExpander();
        expect(await page.getTotalRowCount()).toBe(1);

        expect(await imageCompare('treegrid-virtual-for-contracted')).toBe(0);
    });

    it('should be scrollable', async () => {
        await page.clickExpander();
        await page.scrollToEnd();

        const visibleTitles = await page.getVisibleTitles();
        expect(visibleTitles.length).toBeGreaterThanOrEqual(17);
        expect(visibleTitles[visibleTitles.length - 1]).toBe('Document 1999');

        expect(await imageCompare('treegrid-virtual-for-scroll-to-end')).toBe(0);
    });
});
