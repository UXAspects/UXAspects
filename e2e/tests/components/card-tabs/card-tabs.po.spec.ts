import { $, $$, browser, ElementFinder } from 'protractor';

export class CardTabsPage {

    tabset = $('ux-card-tabset');
    tabs = $$('.card-tab');
    content = $('.card-tab-content');
    cardlist = $('.card-tabs-list');

    previousBtn = $('.card-tabs-paging-btn-previous');
    nextBtn = $('.card-tabs-paging-btn-next');
    positionBtn = $('.button-primary');

    async getPage(): Promise<void> {
        await browser.get('#/card-tabs');
    }

    async getTab(index: number): Promise<ElementFinder> {
        return await this.tabs.get(index);
    }

    async getTabContent(): Promise<string> {
        return await this.content.getText();
    }

    async getTabSelected(index: number): Promise<boolean> {
        const tab: ElementFinder = await this.getTab(index);
        const classes = await tab.getAttribute('class');

        return classes.includes('active');
    }

    async getPosition(): Promise<string> {
        return await this.tabset.getAttribute('class');
    }

    async getScrollPosition(): Promise<number> {
        const styles = await this.cardlist.getAttribute('style');
        return parseInt(styles.substring(styles.indexOf('translateX(') + 'translateX('.length, styles.indexOf('px')));
    }
}

