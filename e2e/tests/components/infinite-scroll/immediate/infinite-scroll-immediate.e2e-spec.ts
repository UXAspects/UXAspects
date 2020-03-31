import { imageCompare } from '../../common/image-compare';
import { InfiniteScrollImmediatePage } from './infinite-scroll-immediate.po.spec';
import { tick, fakeAsync } from '@angular/core/testing';
import { Key } from 'selenium-webdriver';

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

        // loadOnScroll checked
        expect(await page.confirmLoadOnScrollIsChecked()).toBeTruthy();

        // arrows enabled
        expect(await page.confirmPageSizeButtonIsDisabled('up')).toBeFalsy();
        expect(await page.confirmPageSizeButtonIsDisabled('down')).toBeFalsy();

        // valid value in number picker
        expect(await page.confirmValueIsInvalid()).toBeFalsy();

        expect(await imageCompare('infinite-scroll-initial')).toEqual(0);

    });

});