import { browser, by, element, ElementFinder, Key } from 'protractor';

export class SelectionPage {

    selection = element(by.id('selection'));
    simpleMode = element(by.className('simple-mode'));
    rowMode = element(by.className('row-mode'));
    rowAltMode = element(by.className('row-alt-mode'));
    row0 = element(by.id('row-0'));
    row1 = element(by.id('row-1'));
    row2 = element(by.id('row-2'));
    row3 = element(by.id('row-3'));
    selectAllBtn = element(by.id('select-all'));
    deselectAllBtn = element(by.id('deselect-all'));

    getPage(): void {
        browser.get('#/selection');
    }

    async getSelection() {
        return await this.selection.getText();
    }

    async setSimpleMode() {
        return await this.simpleMode.click();
    }

    async setRowMode() {
        return await this.rowMode.click();
    }

    async setRowAltMode() {
        return await this.rowAltMode.click();
    }

    async clickSelectRow(row: ElementFinder, shift: boolean = false, ctrl: boolean = false) {

        if (shift) {
            return browser.actions().keyDown(Key.SHIFT).click(row).perform();
        } else if (ctrl) {
            return browser.actions().keyDown(Key.CONTROL).click(row).perform();
        } else {
            return row.click();
        }
    }

    async selectAll() {
        return this.selectAllBtn.click();
    }

    async deselectAll() {
        return this.deselectAllBtn.click();
    }

    async arrowDown(shift: boolean = false, ctrl: boolean = false) {
        let keys = Key.ARROW_DOWN;
        if (shift) {
            keys = Key.chord(Key.SHIFT, Key.ARROW_DOWN);
        } else if (ctrl) {
            keys = Key.chord(Key.CONTROL, Key.ARROW_DOWN);
        }
        await browser.actions().sendKeys(keys).perform();
    }

    async arrowUp(shift: boolean = false, ctrl: boolean = false) {
        let keys = Key.ARROW_UP;
        if (shift) {
            keys = Key.chord(Key.SHIFT, Key.ARROW_UP);
        } else if (ctrl) {
            keys = Key.chord(Key.CONTROL, Key.ARROW_UP);
        }
        await browser.actions().sendKeys(keys).perform();
    }

    async spacebar() {
        await browser.actions().sendKeys(Key.SPACE).perform();
    }

    async getRowButtonTabIndex(row: ElementFinder): Promise<string> {
        const btn = row.$('.row-button');

        return btn.getAttribute('tabindex');
    }

}