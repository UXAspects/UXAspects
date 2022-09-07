import { $$, browser } from 'protractor';
import { InfiniteScrollPage } from '../standard/infinite-scroll.po.spec';

export class InfiniteScrollColumnSortingPage extends InfiniteScrollPage {

    async getPage(): Promise<void> {
        await browser.get('#/infinite-scroll/column-sorting');
    }

    employeesRows = $$('.employee-row');
    clickSortTwice = $$('#click-sort-twice');
}