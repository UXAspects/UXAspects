import { browser } from 'protractor';
import { InfiniteScrollPage } from '../standard/infinite-scroll.po.spec';

export class InfiniteScrollFullscreenPage extends InfiniteScrollPage {

    async getPage(): Promise<void> {
        await browser.get('#/infinite-scroll/fullscreen');
    }

}