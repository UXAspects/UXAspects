import { InfiniteScrollColumnSortingPage } from './infinite-scroll-column-sorting.po.spec';

describe('Infinite Scroll (Fullscreen) Tests', () => {

    let page: InfiniteScrollColumnSortingPage;

    beforeEach(async () => {
        page = new InfiniteScrollColumnSortingPage();
        await page.getPage();
    });

    it('should have correct initial states', async () => {

        // 20 visible employees
        expect(await page.getNumberOfEmployees()).toEqual(20);


    });

});
