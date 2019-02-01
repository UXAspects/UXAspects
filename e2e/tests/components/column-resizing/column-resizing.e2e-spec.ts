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
        expect(page.getColumnHeaderWidth(page.standardTable, 0)).toBe(50);
        expect(page.getColumnHeaderWidth(page.standardTable, 1)).toBe(260);
        expect(page.getColumnHeaderWidth(page.standardTable, 2)).toBe(300);
    });

    it('should have correct initial states (fixed table)', async () => {
        await page.updateLayout();
        expect(page.getColumnHeaderWidth(page.fixedTable, 0)).toBe(50);
        expect(page.getColumnHeaderWidth(page.fixedTable, 1)).toBe(260);
        expect(page.getColumnHeaderWidth(page.fixedTable, 2)).toBe(300);
    });

    it('can increase the width of a column (standard table)', async () => {
        await page.resizeColumn(page.standardTable, 1, 100);
        expect(page.getColumnHeaderWidth(page.standardTable, 0)).toBe(50);
        expect(page.getColumnHeaderWidth(page.standardTable, 1)).toBe(365);
        expect(page.getColumnHeaderWidth(page.standardTable, 2)).toBe(195);
    });

    it('can increase the width of a column (fixed table)', async () => {
        await page.updateLayout();
        await page.resizeColumn(page.fixedTable, 1, 100);
        expect(page.getColumnHeaderWidth(page.fixedTable, 0)).toBe(50);
        expect(page.getColumnHeaderWidth(page.fixedTable, 1)).toBe(366);
        expect(page.getColumnHeaderWidth(page.fixedTable, 2)).toBe(194);
    });

    it('can decrease the width of a column (standard table)', async () => {
        await page.resizeColumn(page.standardTable, 1, -100);
        expect(page.getColumnHeaderWidth(page.standardTable, 0)).toBe(50);
        expect(page.getColumnHeaderWidth(page.standardTable, 1)).toBe(165);
        expect(page.getColumnHeaderWidth(page.standardTable, 2)).toBe(395);
    });

    it('can decrease the width of a column (fixed table)', async () => {
        await page.updateLayout();
        await page.resizeColumn(page.fixedTable, 1, -100);
        expect(page.getColumnHeaderWidth(page.fixedTable, 0)).toBe(50);
        expect(page.getColumnHeaderWidth(page.fixedTable, 1)).toBe(166);
        expect(page.getColumnHeaderWidth(page.fixedTable, 2)).toBe(394);
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