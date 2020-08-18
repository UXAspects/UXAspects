import { $, $$, browser, ElementFinder } from 'protractor';

export class ColumnResizingSortingPage {

    table = $('table');
    tableBody = this.table.$('tbody');
    nameHeader = $$('th').first();

    async getPage(): Promise<void> {
        await browser.get('#/column-resizing/column-resizing-sorting');
    }

    async resizeColumn(columnIndex: number, amount: number): Promise<void> {
        const handle = this.getColumnResizeHandle(columnIndex);

        // perform the drag
        await browser.actions().mouseDown(handle).mouseMove({ x: amount, y: 0 }).mouseUp().perform();
    }

    getColumnResizeHandle(columnIndex: number): ElementFinder {
        const columnHeaders = this.table.$$('th');
        const column = columnHeaders.get(columnIndex);

        return column.$('.ux-resizable-table-column-handle');
    }

    async getColumnValues(cellClass: string): Promise<string[]> {
        const cells = this.tableBody.$$(`td.${cellClass}`);
        return await cells.map(async (cell: ElementFinder) => await cell.getText());
    }

    async sortByName(): Promise<void> {
        return this.nameHeader.click();
    }
}
