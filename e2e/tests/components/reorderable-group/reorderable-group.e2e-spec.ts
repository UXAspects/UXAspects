import { browser } from 'protractor';
import { ReorderableGroupPage } from './reorderable-group.po.spec';

describe('Reorderable Group', () => {

    let page: ReorderableGroupPage;

    beforeEach(() => {
        page = new ReorderableGroupPage();
        page.getPage();
    });

    it('should have correct initial states', async () => {

        expect(await page.row1.isDisplayed()).toBeTruthy();
        expect(await page.row2.isDisplayed()).toBeTruthy();
        expect(await page.row3.isDisplayed()).toBeTruthy();

        expect(await page.handle1.isDisplayed()).toBeTruthy();
        expect(await page.handle2.isDisplayed()).toBeTruthy();
        expect(await page.handle3.isDisplayed()).toBeTruthy();

    });

    it('should be able to drag an item down', async () => {

        // get the height of a table row
        const { height } = await page.row1.getSize();

        // perform drag and drop
        browser.driver.actions().mouseDown(page.handle1).mouseMove({ x: 0, y: Math.round(height * 1.5) }).mouseUp().perform();

        // check the order of the items
        expect(await page.data.getText()).toBe('[ "Document 1", "Document 0", "Document 2" ]');
    });

    it('should be able to drag an item up', async () => {

        // get the height of a table row
        const { height } = await page.row1.getSize();

        // perform drag and drop
        browser.driver.actions().mouseDown(page.handle2).mouseMove({ x: 0, y: -height }).mouseUp().perform();

        // check the order of the items
        expect(await page.data.getText()).toBe('[ "Document 1", "Document 0", "Document 2" ]');
    });

});