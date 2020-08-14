import { ColumnResizingSortingPage } from './column-resizing-sorting.po.spec';
import { imageCompare } from '../../common/image-compare';


describe('Column Resizing Sorting Table Tests', () => {

    const page: ColumnResizingSortingPage = new ColumnResizingSortingPage();

    beforeEach(async () => {
        await page.getPage();
    });

    it('should not sort when resizing a column', async () => {
        await page.resizeColumn(0, -100);
        expect(await imageCompare('column-resize-no-sort')).toEqual(0);
    });

    it('should sort as normal when not resizing', async () => {
        await page.sortByName();
        expect(await imageCompare('column-resize-sort')).toEqual(0);
    });
});
