import { browser } from 'protractor';
import { imageCompare } from '../../common/image-compare';
import { ColumnResizingPage } from './column-resizing.po.spec';

describe('Column Resizing Tests', () => {

    let page: ColumnResizingPage = new ColumnResizingPage();

    beforeEach(async () => {
        await page.getPage();
    });

    // reset the browser window once we have finished to ensure we dont effect any other tests
    afterAll(async () => {
        await browser.driver.manage().window().setSize(800, 600);
    });

    it('should have correct initial states (standard table)', async () => {
        expect(await page.getColumnHeaderWidth(page.standardTable, 0)).toBe(50);
        expect(await page.getColumnHeaderWidth(page.standardTable, 1)).toBe(260);
        expect(await page.getColumnHeaderWidth(page.standardTable, 2)).toBe(300);

        expect(await imageCompare('column-resize-initial')).toEqual(0);
    });

    it('should have correct initial states (fixed table)', async () => {
        await page.updateLayout();
        expect(await page.getColumnHeaderWidth(page.fixedTable, 0)).toBe(50);
        expect(await page.getColumnHeaderWidth(page.fixedTable, 1)).toBe(260);
        expect(await page.getColumnHeaderWidth(page.fixedTable, 2)).toBe(300);

        expect(await imageCompare('column-resize-initial-fixed')).toEqual(0);
    });

    it('can increase the width of a column (standard table)', async () => {
        await page.resizeColumn(page.standardTable, 1, 100);
        expect(await page.getColumnHeaderWidth(page.standardTable, 0)).toBe(50);
        expect(await page.getColumnHeaderWidth(page.standardTable, 1)).toBe(365);
        expect(await page.getColumnHeaderWidth(page.standardTable, 2)).toBe(195);

        expect(await imageCompare('column-resize-increase')).toEqual(0);
    });

    it('can increase the width of a column (fixed table)', async () => {
        await page.updateLayout();
        await page.resizeColumn(page.fixedTable, 1, 100);
        expect(await page.getColumnHeaderWidth(page.fixedTable, 0)).toBe(50);
        expect(await page.getColumnHeaderWidth(page.fixedTable, 1)).toBeGreaterThanOrEqual(364);
        expect(await page.getColumnHeaderWidth(page.fixedTable, 1)).toBeLessThanOrEqual(366);
        expect(await page.getColumnHeaderWidth(page.fixedTable, 2)).toBeGreaterThanOrEqual(194);
        expect(await page.getColumnHeaderWidth(page.fixedTable, 2)).toBeLessThanOrEqual(196);

        expect(await imageCompare('column-resize-increase-fixed')).toEqual(0);
    });

    it('can decrease the width of a column (standard table)', async () => {
        await page.resizeColumn(page.standardTable, 1, -100);
        expect(await page.getColumnHeaderWidth(page.standardTable, 0)).toBe(50);
        expect(await page.getColumnHeaderWidth(page.standardTable, 1)).toBe(165);
        expect(await page.getColumnHeaderWidth(page.standardTable, 2)).toBe(395);

        expect(await imageCompare('column-resize-decrease')).toEqual(0);
    });

    it('can decrease the width of a column (fixed table)', async () => {
        await page.updateLayout();
        await page.resizeColumn(page.fixedTable, 1, -100);
        expect(await page.getColumnHeaderWidth(page.fixedTable, 0)).toBe(50);
        expect(await page.getColumnHeaderWidth(page.fixedTable, 1)).toBeGreaterThanOrEqual(164);
        expect(await page.getColumnHeaderWidth(page.fixedTable, 1)).toBeLessThanOrEqual(166);
        expect(await page.getColumnHeaderWidth(page.fixedTable, 2)).toBeGreaterThanOrEqual(394);
        expect(await page.getColumnHeaderWidth(page.fixedTable, 2)).toBeLessThanOrEqual(396);

        expect(await imageCompare('column-resize-decrease-fixed')).toEqual(0);
    });

    it('should update the column sizes on windows size change', async () => {
        await browser.driver.manage().window().setSize(500, 800);

        // ux-aspects output is slightly different due to styling, this is why we check greater and less than.
        expect(await page.getColumnHeaderWidthText(page.standardTable, 0)).toBeGreaterThan(105);
        expect(await page.getColumnHeaderWidthText(page.standardTable, 0)).toBeLessThan(107);

        expect(await page.getColumnHeaderWidthText(page.standardTable, 1)).toBeGreaterThan(122);
        expect(await page.getColumnHeaderWidthText(page.standardTable, 1)).toBeLessThan(128);

        expect(await page.getColumnHeaderWidthText(page.standardTable, 2)).toBeGreaterThan(245);
        expect(await page.getColumnHeaderWidthText(page.standardTable, 2)).toBeLessThan(251);

        expect(await imageCompare('column-resize-window-resize')).toEqual(0);
    });

    it('can force update layout after pagination (fixed table)', async () => {
        await page.updateLayout();

        // check the initial number of rows
        expect(await page.getNumberOfRows(page.fixedTable)).toBe(30);

        // ensure the column width is as expected
        expect(await page.getColumnWidth(page.fixedTable, 1, 1)).toBe(260);

        // load the next page
        await page.scrollTableToBottom(page.fixedTable);

        // check the initial number of rows we should now have an additional 15
        expect(await page.getNumberOfRows(page.fixedTable)).toBe(45);

        // recalculate the layout
        await page.updateLayout();

        // expect the column width to be correct after relayout
        expect(await page.getColumnWidth(page.fixedTable, 35, 1)).toBe(260);

    });
});
