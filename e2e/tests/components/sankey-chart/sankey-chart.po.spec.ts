import { browser, by, element } from 'protractor';

export class SankeyChartPage {
    async getPage(): Promise<void> {
        await browser.get('#/sankey-chart');
    }

    async setMinHeightTo56(): Promise<void> {
        await this.clickButton('set-min-height-56');
    }

    async setMinHeightTo75(): Promise<void> {
        await this.clickButton('set-min-height-75');
    }

    async setMinHeightTo100(): Promise<void> {
        await this.clickButton('set-min-height-100');
    }

    async clickButton(id: string): Promise<void> {
        await element(by.id(id)).click();
        await browser.executeScript('window.scrollTo(0, 0);');
    }
}
