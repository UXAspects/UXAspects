import { browser, by, element } from 'protractor';

export class TreeGridVirtualForPage {
    readonly treegridBody = element(by.id('demo-treegrid-body'));
    readonly totalRows = element(by.id('demo-row-count'));

    async getPage() {
        return await browser.get('#/treegrid/virtual-for');
    }

    async getTotalRowCount(): Promise<number> {
        return parseInt(await this.totalRows.getText());
    }

    async getVisibleTitles(): Promise<string[]> {
        const rows = this.treegridBody.$$('tr:not(.ux-virtual-scroll-spacer)');
        return rows.map(elementFinder => elementFinder.$('.demo-title-cell').getText());
    }

    async clickExpander(): Promise<void> {
        const button = this.treegridBody.$('.treegrid-expander > button');
        await button.click();
    }

    async scrollToEnd(): Promise<void> {
        await browser.executeScript('arguments[0].scrollTop = 2000000', this.treegridBody);
    }
}
