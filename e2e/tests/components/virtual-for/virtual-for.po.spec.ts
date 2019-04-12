import { $, browser, ElementFinder, Key } from 'protractor';

export class VirtualForPage {

    table = $('tbody');
    spacer = this.table.$('.ux-virtual-scroll-spacer');
    rows = this.table.$$('.table-row');
    reorderBtn = $('#reorder-button');

    async getPage(): Promise<void> {
        return browser.get('#/virtual-for');
    }

    async getVisibleRowCount(): Promise<number> {
        return await this.rows.count();
    }

    async getSpacerHeight(): Promise<string> {
        return await this.spacer.getCssValue('height');
    }

    async getRow(visibleIndex: number): Promise<ElementFinder> {
        return await this.rows.get(visibleIndex);
    }

    async getCell(visibleRow: number, columnIdx: number): Promise<string> {
        const row = await this.getRow(visibleRow);
        const column = await row.$$('td').get(columnIdx);

        return await column.getAttribute('textContent');
    }

    async focusRow(visibleRow: number): Promise<void> {
        const row = await this.getRow(visibleRow);
        await row.click();
    }

    async moveFocusDown(): Promise<void> {
        await browser.actions().sendKeys(Key.ARROW_DOWN).perform();
    }

    async moveFocusUp(): Promise<void> {
        await browser.actions().sendKeys(Key.ARROW_UP).perform();
    }

    async moveFocusHome(): Promise<void> {
        await browser.actions().sendKeys(Key.HOME).perform();
    }

    async moveFocusEnd(): Promise<void> {
        await browser.actions().sendKeys(Key.END).perform();
    }

    async pageFocusDown(): Promise<void> {
        await browser.actions().sendKeys(Key.PAGE_DOWN).perform();
    }

    async pageFocusUp(): Promise<void> {
        await browser.actions().sendKeys(Key.PAGE_UP).perform();
    }

    async getRowFocused(visibleRow: number): Promise<boolean> {
        const row: ElementFinder = await this.getRow(visibleRow);
        const classes: string = await row.getAttribute('class');

        return classes.split(' ').indexOf('ux-focus-indicator-active') !== -1;
    }

    async getFocusedRow(): Promise<number> {
        for (let idx = 0; idx < await this.rows.count(); idx++) {
            if (await this.getRowFocused(idx)) {
                return idx;
            }
        }
    }

    async getValue(visibleRow: number): Promise<string> {
        return await this.getCell(visibleRow, 0);
    }

    async getIndex(visibleRow: number): Promise<string> {
        return await this.getCell(visibleRow, 1);
    }

    async getCount(visibleRow: number): Promise<string> {
        return await this.getCell(visibleRow, 2);
    }

    async getFirst(visibleRow: number): Promise<boolean> {
        return await this.getCell(visibleRow, 3) === 'true';
    }

    async getLast(visibleRow: number): Promise<boolean> {
        return await this.getCell(visibleRow, 4) === 'true';
    }

    async getEven(visibleRow: number): Promise<boolean> {
        return await this.getCell(visibleRow, 5) === 'true';
    }

    async getOdd(visibleRow: number): Promise<boolean> {
        return await this.getCell(visibleRow, 6) === 'true';
    }

    async scrollToPosition(position: number): Promise<void> {
        await browser.executeScript(`arguments[0].scrollTop = ${position}`, this.table);
    }

}