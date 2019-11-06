import { browser } from 'protractor';
import { imageCompare } from '../../common/image-compare';
import { ColumnResizingPageAlt } from './column-resizing-alt.po.spec';

describe('Column Resizing Alt Tests', () => {

    let page: ColumnResizingPageAlt = new ColumnResizingPageAlt();

    beforeEach(async () => {
        await page.getPage();
    });

    // reset the browser window once we have finished to ensure we dont effect any other tests
    afterAll(async () => {
        await browser.driver.manage().window().setSize(800, 600);
    });

    it('should have correct initial states (fixed table alt)', async () => {
        await page.updateLayout();
        expect(await page.getColumnHeaderWidth(page.fixedAltTable, 0)).toBe(50);
        expect(await page.getColumnHeaderWidth(page.fixedAltTable, 1)).toBe(260);
        expect(await page.getColumnHeaderWidth(page.fixedAltTable, 2)).toBe(300);
        expect(await page.getColumnHeaderWidth(page.fixedAltTable, 3)).toBe(400);

        // check if the overflow class applies when there is a scroll bar
        expect(await page.getOverflowClass()).not.toContain('ux-resizable-table-alt-overflow');

        expect(await imageCompare('column-resize-initial-fixed-alt')).toEqual(0);
    });

    it('can increase the width of a column and the other columns remain the same (fixed table alt)', async () => {
        await page.updateLayout();
        await page.resizeColumn(page.fixedAltTable, 1, 100);
        expect(await page.getColumnHeaderWidth(page.fixedAltTable, 0)).toBe(50);
        expect(await page.getColumnHeaderWidth(page.fixedAltTable, 1)).toBeGreaterThanOrEqual(359);
        expect(await page.getColumnHeaderWidth(page.fixedAltTable, 1)).toBeLessThanOrEqual(366);
        expect(await page.getColumnHeaderWidth(page.fixedAltTable, 2)).toBeGreaterThanOrEqual(299);
        expect(await page.getColumnHeaderWidth(page.fixedAltTable, 2)).toBeLessThanOrEqual(301);
        expect(await page.getColumnHeaderWidth(page.fixedAltTable, 3)).toBeGreaterThanOrEqual(399);
        expect(await page.getColumnHeaderWidth(page.fixedAltTable, 3)).toBeLessThanOrEqual(401);

        // check if the overflow class applies when there is a scroll bar
        expect(await page.getOverflowClass()).not.toContain('ux-resizable-table-alt-overflow');

        expect(await imageCompare('column-resize-increase-fixed-alt')).toEqual(0);
    });

    it('can decrease the width of a column and the other columns remain the same (fixed table alt)', async () => {
        await page.updateLayout();
        await page.resizeColumn(page.fixedAltTable, 1, -100);
        expect(await page.getColumnHeaderWidth(page.fixedAltTable, 0)).toBe(50);
        expect(await page.getColumnHeaderWidth(page.fixedAltTable, 1)).toBeGreaterThanOrEqual(159);
        expect(await page.getColumnHeaderWidth(page.fixedAltTable, 1)).toBeLessThanOrEqual(166);
        expect(await page.getColumnHeaderWidth(page.fixedAltTable, 2)).toBeGreaterThanOrEqual(299);
        expect(await page.getColumnHeaderWidth(page.fixedAltTable, 2)).toBeLessThanOrEqual(301);
        expect(await page.getColumnHeaderWidth(page.fixedAltTable, 3)).toBeGreaterThanOrEqual(399);
        expect(await page.getColumnHeaderWidth(page.fixedAltTable, 3)).toBeLessThanOrEqual(401);

        // check if the overflow class applies when there is a scroll bar
        expect(await page.getOverflowClass()).not.toContain('ux-resizable-table-alt-overflow');

        expect(await imageCompare('column-resize-decrease-fixed-alt')).toEqual(0);
    });

    it('can resize the last column and the other columns remain the same (fixed table alt)', async () => {
        await page.updateLayout();
        await page.resizeColumn(page.fixedAltTable, 3, 100);
        expect(await page.getColumnHeaderWidth(page.fixedAltTable, 0)).toBe(50);
        expect(await page.getColumnHeaderWidth(page.fixedAltTable, 1)).toBeGreaterThanOrEqual(259);
        expect(await page.getColumnHeaderWidth(page.fixedAltTable, 1)).toBeLessThanOrEqual(261);
        expect(await page.getColumnHeaderWidth(page.fixedAltTable, 2)).toBeGreaterThanOrEqual(299);
        expect(await page.getColumnHeaderWidth(page.fixedAltTable, 2)).toBeLessThanOrEqual(301);
        expect(await page.getColumnHeaderWidth(page.fixedAltTable, 3)).toBeGreaterThanOrEqual(499);
        expect(await page.getColumnHeaderWidth(page.fixedAltTable, 3)).toBeLessThanOrEqual(506);

        // check if the overflow class applies when there is a scroll bar
        expect(await page.getOverflowClass()).not.toContain('ux-resizable-table-alt-overflow');

        expect(await imageCompare('column-resize-last-column-fixed-alt')).toEqual(0);
    });

    it('can force update layout after pagination (fixed table alt)', async () => {
        await page.updateLayout();

        // check the initial number of rows
        expect(await page.getNumberOfRows(page.fixedAltTable)).toBe(30);

        // ensure the column width is as expected
        expect(await page.getColumnWidth(page.fixedAltTable, 1, 1)).toBe(260);

        // load the next page
        await page.scrollTableToBottom(page.fixedAltTable);

        // check the initial number of rows we should now have an additional 15
        expect(await page.getNumberOfRows(page.fixedAltTable)).toBe(45);

        // the column width of a newly added row should be wrong until we perform a relayout
        expect(await page.getColumnWidth(page.fixedAltTable, 35, 1)).not.toBe(260);

        // recalculate the layout
        await page.updateLayout();

        // expect the column width to be correct after relayout
        expect(await page.getColumnWidth(page.fixedAltTable, 35, 1)).toBe(260);

    });

    it('can resize the last column and the other columns remain the same (fixed table alt)', async () => {
        await page.updateLayout();
        await page.resizeColumn(page.fixedAltTable, 3, 1000);
        expect(await page.getColumnHeaderWidth(page.fixedAltTable, 0)).toBe(50);
        expect(await page.getColumnHeaderWidth(page.fixedAltTable, 1)).toBeGreaterThanOrEqual(259);
        expect(await page.getColumnHeaderWidth(page.fixedAltTable, 1)).toBeLessThanOrEqual(261);
        expect(await page.getColumnHeaderWidth(page.fixedAltTable, 2)).toBeGreaterThanOrEqual(299);
        expect(await page.getColumnHeaderWidth(page.fixedAltTable, 2)).toBeLessThanOrEqual(301);
        expect(await page.getColumnHeaderWidth(page.fixedAltTable, 3)).toBeGreaterThanOrEqual(1399);
        expect(await page.getColumnHeaderWidth(page.fixedAltTable, 3)).toBeLessThanOrEqual(1406);

        // check if the overflow class applies when there is a scroll bar
        expect(await page.getOverflowClass()).toContain('ux-resizable-table-alt-overflow');

        expect(await imageCompare('column-resize-scroll-fixed-alt')).toEqual(0);
    });

});