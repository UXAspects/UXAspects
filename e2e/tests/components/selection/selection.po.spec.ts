import { browser, by, element, ElementFinder, Key } from 'protractor';

export class SelectionPage {

    selection = element(by.id('selection'));
    simpleMode = element(by.className('simple-mode'));
    rowMode = element(by.className('row-mode'));
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

    async arrowDown() {
        await browser.actions().sendKeys(Key.ARROW_DOWN).perform();
    }

    async arrowUp() {
        await browser.actions().sendKeys(Key.ARROW_UP).perform();
    }

    async spacebar() {
        await browser.actions().sendKeys(Key.SPACE).perform();
    }

}