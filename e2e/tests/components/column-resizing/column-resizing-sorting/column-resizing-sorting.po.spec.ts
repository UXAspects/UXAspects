import { $, $$, browser, WebElement, ElementFinder } from 'protractor';

export class ColumnResizingSortingPage {

    table = $('table');
    tableBody = this.table.$('tbody');
    nameHeader = $$('th').first();

    async getPage(): Promise<void> {
        await browser.get('#/column-resizing/column-resizing-sorting');
    }

    async resizeColumn(columnIndex: number, amount: number): Promise<void> {
        const handle = await this.getColumnResizeHandle(columnIndex);

        // perform the drag
        await browser.actions().mouseDown(handle).mouseMove({ x: amount, y: 0 }).mouseUp().perform();
    }

    async getColumnResizeHandle(columnIndex: number): Promise<WebElement> {
        const columnHeaders = this.table.$$('th');
        const column = columnHeaders.get(columnIndex);

        return await column.$('.ux-resizable-table-column-handle');
    }

    async getColumnValues(columnIndex: number): Promise<string[]> {
        const allCells = this.tableBody.$$('td[uxresizabletablecell]');
        const columnCells = allCells.filter((_, i: number) => (i + columnIndex) % 3 === 0);

        return await columnCells.map(async (cell: ElementFinder) => await cell.getText());
    }

    async sortByName(): Promise<void> {
        return this.nameHeader.click();
    }
}
