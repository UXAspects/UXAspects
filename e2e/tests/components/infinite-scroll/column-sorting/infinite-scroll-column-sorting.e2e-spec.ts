import { browser } from 'protractor';
import { InfiniteScrollColumnSortingPage } from './infinite-scroll-column-sorting.po.spec';

describe('Infinite Scroll (Column Sorting) Tests', () => {

    let page: InfiniteScrollColumnSortingPage;

    beforeEach(async () => {
        page = new InfiniteScrollColumnSortingPage();
        await page.getPage();
    });

    it('should have correct initial states', async () => {

        await page.nameColumn.click();

        // wait for the animations to finish
        await browser.sleep(250);

        await page.nameColumn.click();
        expect((await page.employeesRows).length).toBe(0);

        await browser.sleep(1000);

        expect((await page.employeesRows).length).toBe(90);

    });

});
