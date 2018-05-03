import { ElementFinder, browser, by, element } from 'protractor';
import { InfiniteScrollPage } from '../standard/infinite-scroll.po.spec';

export class InfiniteScrollFullscreenPage extends InfiniteScrollPage {

    getPage(): void {
        browser.get('#/infinite-scroll/fullscreen');
    }

    getPanel() {
        return this.panel;
    }

}