import { browser } from 'protractor';
import { imageCompare } from '../../common/image-compare';
import { ColumnResizingPageExpand } from './column-resizing-expand.po.spec';

describe('Column Resizing Expand Tests', () => {

    let page: ColumnResizingPageExpand = new ColumnResizingPageExpand();

    beforeEach(async () => {
        await page.getPage();
    });

    // reset the browser window once we have finished to ensure we dont effect any other tests
    afterAll(async () => {
        await browser.driver.manage().window().setSize(800, 600);
    });

    it('should have correct initial states (fixed table expand)', async () => {
        await page.updateLayout();
        expect(await page.getColumnHeaderWidth(page.fixedExpandTable, 0)).toBe(50);
        expect(await page.getColumnHeaderWidth(page.fixedExpandTable, 1)).toBe(260);
        expect(await page.getColumnHeaderWidth(page.fixedExpandTable, 2)).toBe(300);
        expect(await page.getColumnHeaderWidth(page.fixedExpandTable, 3)).toBe(400);

        // check if the overflow class applies when there is a scroll bar
        expect(await page.getOverflowClass()).not.toContain('ux-resizable-table-expand-overflow');

        expect(await imageCompare('column-resize-initial-fixed-expand')).toEqual(0);
    });

    it('can increase the width of a column and the other columns remain the same (fixed table expand)', async () => {
        await page.updateLayout();
        await page.resizeColumn(page.fixedExpandTable, 1, 100);
        expect(await page.getColumnHeaderWidth(page.fixedExpandTable, 0)).toBe(50);
        expect(await page.getColumnHeaderWidth(page.fixedExpandTable, 1)).toBeGreaterThanOrEqual(359);
        expect(await page.getColumnHeaderWidth(page.fixedExpandTable, 1)).toBeLessThanOrEqual(366);
        expect(await page.getColumnHeaderWidth(page.fixedExpandTable, 2)).toBeGreaterThanOrEqual(299);
        expect(await page.getColumnHeaderWidth(page.fixedExpandTable, 2)).toBeLessThanOrEqual(301);
        expect(await page.getColumnHeaderWidth(page.fixedExpandTable, 3)).toBeGreaterThanOrEqual(399);
        expect(await page.getColumnHeaderWidth(page.fixedExpandTable, 3)).toBeLessThanOrEqual(401);

        // check if the overflow class applies when there is a scroll bar
        expect(await page.getOverflowClass()).not.toContain('ux-resizable-table-expand-overflow');

        expect(await imageCompare('column-resize-increase-fixed-expand')).toEqual(0);
    });

    it('can decrease the width of a column and the other columns remain the same (fixed table expand)', async () => {
        await page.updateLayout();
        await page.resizeColumn(page.fixedExpandTable, 1, -100);
        expect(await page.getColumnHeaderWidth(page.fixedExpandTable, 0)).toBe(50);
        expect(await page.getColumnHeaderWidth(page.fixedExpandTable, 1)).toBeGreaterThanOrEqual(159);
        expect(await page.getColumnHeaderWidth(page.fixedExpandTable, 1)).toBeLessThanOrEqual(166);
        expect(await page.getColumnHeaderWidth(page.fixedExpandTable, 2)).toBeGreaterThanOrEqual(299);
        expect(await page.getColumnHeaderWidth(page.fixedExpandTable, 2)).toBeLessThanOrEqual(301);
        expect(await page.getColumnHeaderWidth(page.fixedExpandTable, 3)).toBeGreaterThanOrEqual(399);
        expect(await page.getColumnHeaderWidth(page.fixedExpandTable, 3)).toBeLessThanOrEqual(401);

        // check if the overflow class applies when there is a scroll bar
        expect(await page.getOverflowClass()).not.toContain('ux-resizable-table-expand-overflow');

        expect(await imageCompare('column-resize-decrease-fixed-expand')).toEqual(0);
    });

    it('can resize the last column and the other columns remain the same (fixed table expand)', async () => {
        await page.updateLayout();
        await page.resizeColumn(page.fixedExpandTable, 3, 100);
        expect(await page.getColumnHeaderWidth(page.fixedExpandTable, 0)).toBe(50);
        expect(await page.getColumnHeaderWidth(page.fixedExpandTable, 1)).toBeGreaterThanOrEqual(259);
        expect(await page.getColumnHeaderWidth(page.fixedExpandTable, 1)).toBeLessThanOrEqual(261);
        expect(await page.getColumnHeaderWidth(page.fixedExpandTable, 2)).toBeGreaterThanOrEqual(299);
        expect(await page.getColumnHeaderWidth(page.fixedExpandTable, 2)).toBeLessThanOrEqual(301);
        expect(await page.getColumnHeaderWidth(page.fixedExpandTable, 3)).toBeGreaterThanOrEqual(499);
        expect(await page.getColumnHeaderWidth(page.fixedExpandTable, 3)).toBeLessThanOrEqual(506);

        // check if the overflow class applies when there is a scroll bar
        expect(await page.getOverflowClass()).not.toContain('ux-resizable-table-expand-overflow');

        expect(await imageCompare('column-resize-last-column-fixed-expand')).toEqual(0);
    });

    it('can force update layout after pagination (fixed table expand)', async () => {
        await page.updateLayout();

        // check the initial number of rows
        expect(await page.getNumberOfRows(page.fixedExpandTable)).toBe(30);

        // ensure the column width is as expected
        expect(await page.getColumnWidth(page.fixedExpandTable, 1, 1)).toBe(260);

        // load the next page
        await page.scrollTableToBottom(page.fixedExpandTable);

        // check the initial number of rows we should now have an additional 15
        expect(await page.getNumberOfRows(page.fixedExpandTable)).toBe(45);

        // the column width of a newly added row should be wrong until we perform a relayout
        expect(await page.getColumnWidth(page.fixedExpandTable, 35, 1)).not.toBe(260);

        // recalculate the layout
        await page.updateLayout();

        // expect the column width to be correct after relayout
        expect(await page.getColumnWidth(page.fixedExpandTable, 35, 1)).toBe(260);

    });

    it('can resize the last column and the other columns remain the same (fixed table expand)', async () => {
        await page.updateLayout();
        await page.resizeColumn(page.fixedExpandTable, 3, 1000);
        expect(await page.getColumnHeaderWidth(page.fixedExpandTable, 0)).toBe(50);
        expect(await page.getColumnHeaderWidth(page.fixedExpandTable, 1)).toBeGreaterThanOrEqual(259);
        expect(await page.getColumnHeaderWidth(page.fixedExpandTable, 1)).toBeLessThanOrEqual(261);
        expect(await page.getColumnHeaderWidth(page.fixedExpandTable, 2)).toBeGreaterThanOrEqual(299);
        expect(await page.getColumnHeaderWidth(page.fixedExpandTable, 2)).toBeLessThanOrEqual(301);
        expect(await page.getColumnHeaderWidth(page.fixedExpandTable, 3)).toBeGreaterThanOrEqual(1399);
        expect(await page.getColumnHeaderWidth(page.fixedExpandTable, 3)).toBeLessThanOrEqual(1406);

        // check if the overflow class applies when there is a scroll bar
        expect(await page.getOverflowClass()).toContain('ux-resizable-table-expand-overflow');

        expect(await imageCompare('column-resize-scroll-fixed-expand')).toEqual(0);
    });

});