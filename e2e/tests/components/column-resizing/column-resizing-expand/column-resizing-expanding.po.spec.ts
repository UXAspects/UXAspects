import { $, browser, ElementFinder } from 'protractor';

export class ColumnResizingExpandingPage {

    table = $('table');
    fixedExpandTable = $('#fixed-table-expand');
    updateLayoutBtn = $('#update-layout-btn');
    updateColumnsBtn = $('#update-columns-btn');

    async getPage(): Promise<void> {
        await browser.driver.manage().window().setSize(1200, 900);
        await browser.get('#/column-resizing/column-resizing-expanding');
    }

    async getColumnHeaders(table: ElementFinder): Promise<ElementFinder[]> {
        return table.$$('th');
    }

    async getColumnHeaderWidth(table: ElementFinder, index: number): Promise<number> {
        const columns = await this.getColumnHeaders(table);
        return (await columns[index].getSize()).width;
    }

    async scrollTableToBottom(table: ElementFinder): Promise<void> {
        const element = await table.$('tbody');
        await browser.executeScript('arguments[0].scrollTop = arguments[0].scrollHeight', await element.getWebElement());
    }

    async getNumberOfRows(table: ElementFinder): Promise<number> {
        return await table.$('tbody').$$('tr').count();
    }

    async getRow(table: ElementFinder, index: number): Promise<ElementFinder> {
        const body = await table.$('tbody');
        return await body.$$('tr').get(index);
    }

    async getColumnWidth(table: ElementFinder, rowIndex: number, columnIndex: number): Promise<number> {
        const row = await this.getRow(table, rowIndex);
        const column = await row.$$('td').get(columnIndex);
        const { width } = await column.getSize();
        return width;
    }

    async updateLayout(): Promise<void> {
        await this.updateLayoutBtn.click();
    }

    async updateColumns(): Promise<void> {
        await this.updateColumnsBtn.click();
    }

    async resizeColumn(table: ElementFinder, columnIndex: number, amount: number): Promise<void> {
        const columns = await this.getColumnHeaders(table);
        const column = columns[columnIndex];
        const handle = await column.$('.ux-resizable-table-column-handle');

        // perform the drag
        await browser.actions().mouseDown(handle).mouseMove({ x: amount, y: 0 }).mouseUp().perform();
    }

    async getOverflowClass(): Promise<string> {
        return await this.fixedExpandTable.getAttribute('class');
    }
}
