import { browser } from 'protractor';
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

    it('should not be able to drag table row', async () => {

        // perform drag and drop
        await browser.driver.actions().dragAndDrop(page.row1, page.row2).perform();

        // check the order of the items
        expect(await page.getDocumentOrder()).toEqual(['Document 1', 'Document 2', 'Document 3']);
    });

    it('should be able to drag an item down', async () => {

        // get the height of a table row
        const { height } = await page.row1.getSize();

        // perform drag and drop
        await browser.driver.actions().mouseDown(page.handle1).mouseMove({ x: 0, y: Math.round(height * 1.5) }).mouseUp().perform();

        // check the order of the items
        expect(await page.getDocumentOrder()).toEqual(['Document 2', 'Document 1', 'Document 3']);
    });

    it('should be able to drag an item up', async () => {

        // get the height of a table row
        const { height } = await page.row1.getSize();

        // perform drag and drop
        await browser.driver.actions().mouseDown(page.handle2).mouseMove({ x: 0, y: -height }).mouseUp().perform();

        // check the order of the items
        expect(await page.getDocumentOrder()).toEqual(['Document 2', 'Document 1', 'Document 3']);
    });

});