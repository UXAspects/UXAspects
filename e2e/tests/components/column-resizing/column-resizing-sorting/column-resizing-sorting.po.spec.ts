import { $, browser, ElementFinder } from 'protractor';

export class ColumnResizingSortingPage {

    table = $('table');
    nameHeader = $('th');

    async getPage(): Promise<void> {
        await browser.get('#/column-resizing/column-resizing-sorting');
    }

    async resizeColumn(columnIndex: number, amount: number): Promise<void> {
        const columns = await this.getColumnHeaders();
        const column = columns[columnIndex];
        const handle = await column.$('.ux-resizable-table-column-handle');

        // perform the drag
        await browser.actions().mouseDown(handle).mouseMove({ x: amount, y: 0 }).mouseUp().perform();
    }

    async getColumnHeaders(): Promise<ElementFinder[]> {
        return this.table.$$('th');
    }

    async sortByName(): Promise<void> {
        return this.nameHeader.click();
    }
}
