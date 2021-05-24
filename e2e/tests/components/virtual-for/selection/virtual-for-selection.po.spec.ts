import { $, browser, ElementArrayFinder, ElementFinder, Key } from 'protractor';

export class VirtualForSelectionPage {
    table = $('tbody');
    selectionText = $('#selection-text');

    async getPage(): Promise<void> {
        return await browser.get('#/virtual-for/selection');
    }

    getRow(id: number): ElementFinder {
        return this.table.$(`#row-${id}`);
    }

    getSelectedRows(): ElementArrayFinder {
        return this.table.$$('.table-row.ux-selection-selected');
    }

    async getSelectionText(): Promise<string> {
        return this.selectionText.getText();
    }

    async getSelectionCount(): Promise<number> {
        return (await this.getSelectionText()).split(', ').length;
    }

    async setMode(mode: 'simple' | 'row'): Promise<void> {
        await $(`#mode-${mode}`).click();
    }

    async scrollToPosition(position: number): Promise<void> {
        await browser.executeScript(`arguments[0].scrollTop = ${position}`, this.table);
    }

    async shiftClick(element: ElementFinder): Promise<void> {
        await browser.actions().mouseMove(element).keyDown(Key.SHIFT).click().perform();
    }

    async ctrlClick(element: ElementFinder): Promise<void> {
        await browser.actions().mouseMove(element).keyDown(Key.CONTROL).click().perform();
    }
}
