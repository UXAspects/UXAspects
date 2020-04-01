import { browser, by, element, ElementFinder } from 'protractor';
import { InfiniteScrollPage } from '../standard/infinite-scroll.po.spec';

export class InfiniteScrollImmediatePage extends InfiniteScrollPage {

    async getPage(): Promise<void> {
        await browser.get('#/infinite-scroll/immediate');
    }

}