import { browser } from 'protractor';
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

        expect(await browser.imageComparison.checkScreen('column-resize-initial')).toEqual(0);
    });

    it('should have correct initial states (fixed table)', async () => {
        await page.updateLayout();
        expect(await page.getColumnHeaderWidth(page.fixedTable, 0)).toBe(50);
        expect(await page.getColumnHeaderWidth(page.fixedTable, 1)).toBe(260);
        expect(await page.getColumnHeaderWidth(page.fixedTable, 2)).toBe(300);

        expect(await browser.imageComparison.checkScreen('column-resize-initial-fixed')).toEqual(0);
    });

    it('can increase the width of a column (standard table)', async () => {
        await page.resizeColumn(page.standardTable, 1, 100);
        expect(await page.getColumnHeaderWidth(page.standardTable, 0)).toBe(50);
        expect(await page.getColumnHeaderWidth(page.standardTable, 1)).toBe(365);
        expect(await page.getColumnHeaderWidth(page.standardTable, 2)).toBe(195);

        expect(await browser.imageComparison.checkScreen('column-resize-increase')).toEqual(0);
    });

    it('can increase the width of a column (fixed table)', async () => {
        await page.updateLayout();
        await page.resizeColumn(page.fixedTable, 1, 100);
        expect(await page.getColumnHeaderWidth(page.fixedTable, 0)).toBe(50);
        expect(await page.getColumnHeaderWidth(page.fixedTable, 1)).toBeGreaterThanOrEqual(364);
        expect(await page.getColumnHeaderWidth(page.fixedTable, 1)).toBeLessThanOrEqual(366);
        expect(await page.getColumnHeaderWidth(page.fixedTable, 2)).toBeGreaterThanOrEqual(194);
        expect(await page.getColumnHeaderWidth(page.fixedTable, 2)).toBeLessThanOrEqual(196);

        expect(await browser.imageComparison.checkScreen('column-resize-increase-fixed')).toEqual(0);
    });

    it('can decrease the width of a column (standard table)', async () => {
        await page.resizeColumn(page.standardTable, 1, -100);
        expect(await page.getColumnHeaderWidth(page.standardTable, 0)).toBe(50);
        expect(await page.getColumnHeaderWidth(page.standardTable, 1)).toBe(165);
        expect(await page.getColumnHeaderWidth(page.standardTable, 2)).toBe(395);

        expect(await browser.imageComparison.checkScreen('column-resize-decrease')).toEqual(0);
    });

    it('can decrease the width of a column (fixed table)', async () => {
        await page.updateLayout();
        await page.resizeColumn(page.fixedTable, 1, -100);
        expect(await page.getColumnHeaderWidth(page.fixedTable, 0)).toBe(50);
        expect(await page.getColumnHeaderWidth(page.fixedTable, 1)).toBeGreaterThanOrEqual(164);
        expect(await page.getColumnHeaderWidth(page.fixedTable, 1)).toBeLessThanOrEqual(166);
        expect(await page.getColumnHeaderWidth(page.fixedTable, 2)).toBeGreaterThanOrEqual(394);
        expect(await page.getColumnHeaderWidth(page.fixedTable, 2)).toBeLessThanOrEqual(396);

        expect(await browser.imageComparison.checkScreen('column-resize-decrease-fixed')).toEqual(0);
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

        // the column width of a newly added row should be wrong until we perform a relayout
        expect(await page.getColumnWidth(page.fixedTable, 35, 1)).not.toBe(260);

        // recalculate the layout
        await page.updateLayout();

        // expect the column width to be correct after relayout
        expect(await page.getColumnWidth(page.fixedTable, 35, 1)).toBe(260);

    });
});