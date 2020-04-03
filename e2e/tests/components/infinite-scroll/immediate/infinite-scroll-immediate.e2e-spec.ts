import { imageCompare } from '../../common/image-compare';
import { InfiniteScrollImmediatePage } from './infinite-scroll-immediate.po.spec';

describe('Infinite Scroll (Immediate) Tests', () => {

    let page: InfiniteScrollImmediatePage;

    beforeEach(async () => {
        page = new InfiniteScrollImmediatePage();
        await page.getPage();
    });

    it('should have correct initial states', async () => {
        // 20 visible employees
        expect(await page.getNumberOfEmployees()).toEqual(20);

        // loadMore not visible
        expect(await page.confirmLoadMoreIsVisible()).toBeFalsy();

        expect(await imageCompare('infinite-scroll-immediate-initial')).toEqual(0);

    });

});