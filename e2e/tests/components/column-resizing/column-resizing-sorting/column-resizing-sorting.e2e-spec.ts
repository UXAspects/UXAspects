import { ColumnResizingSortingPage } from './column-resizing-sorting.po.spec';
import { imageCompare } from '../../common/image-compare';


describe('Table with Column Resizing and Sorting', () => {

    const page: ColumnResizingSortingPage = new ColumnResizingSortingPage();

    beforeEach(async () => {
        await page.getPage();
    });

    it('should not sort when resizing a column', async () => {
        await page.resizeColumn(0, -100);
        expect(await page.getColumnValues('name')).toEqual(['Email', 'Email', 'Document']);
    });

    it('should sort as normal when not resizing', async () => {
        await page.sortByName();
        expect(await page.getColumnValues('name')).toEqual(['Document', 'Email', 'Email']);
    });

    it('should allow sorting after resizing a column', async () => {
        await page.resizeColumn(0, -200);
        await page.sortByName();

        expect(await page.getColumnValues('name')).toEqual(['Document', 'Email', 'Email']);
        expect(await imageCompare('column-resize-sort')).toEqual(0);
    });
});
