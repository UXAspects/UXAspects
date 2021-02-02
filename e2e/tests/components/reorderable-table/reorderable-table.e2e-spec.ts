import { imageCompare } from '../common/image-compare';
import { ReorderableTablePage } from './reorderable-table.po.spec';

describe('Reorderable Table Tests', () => {

    let page: ReorderableTablePage;

    beforeEach(async () => {
        page = new ReorderableTablePage();
        await page.getPage();
    });

    it('should have correct initial states', async () => {

        expect(await page.row1.isDisplayed()).toBeTruthy();
        expect(await page.row2.isDisplayed()).toBeTruthy();
        expect(await page.row3.isDisplayed()).toBeTruthy();

        expect(await page.handle1.isDisplayed()).toBeTruthy();
        expect(await page.handle2.isDisplayed()).toBeTruthy();
        expect(await page.handle3.isDisplayed()).toBeTruthy();

        expect(await imageCompare('reorderable-table-initial')).toEqual(0);

    });
});
