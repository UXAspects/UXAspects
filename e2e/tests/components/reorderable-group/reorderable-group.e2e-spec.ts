import { browser, element, by } from 'protractor';
import { ReorderableGroupPage } from './reorderable-group.po.spec';

describe('Reorderable Group', () => {

    let page: ReorderableGroupPage;

    beforeEach(() => {
        page = new ReorderableGroupPage();
        page.getPage();
    });

    it('should have correct initial states', async () => {
        expect(await page.container1Rows.count()).toBe(3);
        expect(await page.container2Rows.count()).toBe(0);

        const objects1 = await page.getObjects1();
        expect(objects1.length).toBe(3);
        expect(objects1[0].document).toBe('Document 0');
        expect(objects1[1].document).toBe('Document 1');
        expect(objects1[2].document).toBe('Document 2');

        const objects2 = await page.getObjects2();
        expect(objects2.length).toBe(0);
    });

    it('should be able to reorder within a container', async () => {
        const row0 = element(by.id('item1-0'));

        // get the height of a table row
        const { height } = await row0.getSize();

        // perform drag and drop
        await browser.driver.actions().mouseDown(row0).mouseMove({ x: 0, y: Math.round(height * 1.5) }).mouseUp().perform();

        expect(await page.container1Rows.count()).toBe(3);
        expect(await page.container2Rows.count()).toBe(0);

        const objects1 = await page.getObjects1();
        expect(objects1.length).toBe(3);
        expect(objects1[0].document).toBe('Document 1');
        expect(objects1[1].document).toBe('Document 0');
        expect(objects1[2].document).toBe('Document 2');

        const objects2 = await page.getObjects2();
        expect(objects2.length).toBe(0);
    });

    it('should be able to drag between containers', async () => {
        const row0 = element(by.id('item1-0'));

        await browser.actions().dragAndDrop(row0, page.container2).perform();

        expect(await page.container1Rows.count()).toBe(2);
        expect(await page.container2Rows.count()).toBe(1);

        let objects1 = await page.getObjects1();
        expect(objects1.length).toBe(2);
        expect(objects1[0].document).toBe('Document 1');
        expect(objects1[1].document).toBe('Document 2');

        let objects2 = await page.getObjects2();
        expect(objects2.length).toBe(1);
        expect(objects2[0].document).toBe('Document 0');

        await browser.actions().dragAndDrop(row0, page.container2).perform();

        expect(await page.container1Rows.count()).toBe(1);
        expect(await page.container2Rows.count()).toBe(2);

        objects1 = await page.getObjects1();
        expect(objects1.length).toBe(1);
        expect(objects1[0].document).toBe('Document 2');

        objects2 = await page.getObjects2();
        expect(objects2.length).toBe(2);
        expect(objects2[0].document).toBe('Document 0');
        expect(objects2[1].document).toBe('Document 1');
    });

});